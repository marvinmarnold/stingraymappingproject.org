import Socrata from 'node-socrata';

getServiceCalls = function() {
  var config = {
    // find a hostDomain from the listSource method
    hostDomain: 'https://data.nola.gov',
    // An accessible API table from the host domain
    resource: 'wgrp-d3ma',
    // Create account and register app https://opendata.socrata.com
    XAppToken: Meteor.settings.SOCRATA_APP_TOKEN
  };

  soda = new Socrata(config);

  if(Tracts.find().count() > 100)
    sodaFetch(soda, 0)
}

Meteor.startup(function() {
  getServiceCalls()
})

var sodaFetch = function(soda, offset) {
  console.log("Fetching Socrata " + offset);
  var sodaCallback = Meteor.bindEnvironment(function(err, response, data) {
    _.each(data, insertServiceCall)

    if(data.length > 0)
      sodaFetch(soda, offset + 1000)
  }, function(error) {
    console.log("Soda callback could not bind");
  })

  soda.get({$offset: offset}, sodaCallback);
}

var insertServiceCall = function(doc) {
  console.log('insertServiceCall ' + doc.nopd_item);
  var sc = ServiceCalls.findOne({nopdItem: doc.nopd_item})
  var serviceCallId = undefined

  if(!!sc) {
    console.log('Already inserted');
    serviceCallId = sc._id
  } else {
    var serviceCall = {
      nopdItem: doc.nopd_item,
      latitude: doc.location.latitude,
      longitude: doc.location.longitude,
      createdAt: new Date(doc.timecreate),
      closedAt: new Date(doc.timeclosed),
      nopdType: doc.type_,
      nopdTypeDesc: doc.typetext,
      block: doc.block_address,
      priorityNum: doc.priority.substr(0,1),
      priorityLetter: doc.priority.substr(1),
      district: doc.policedistrict,
    }

    if(doc.timearrive)
      serviceCall.arrivedAt = new Date(doc.timearrive)

    if(doc.timedispatch)
      serviceCall.dispatchedAt = new Date(doc.timedispatch)

    if(doc.zip)
      serviceCall.zip = doc.zip

    if(serviceCall.createdAt && serviceCall.dispatchedAt) {
      var createdAt = serviceCall.createdAt.getTime()
      var dispatchedAt = serviceCall.dispatchedAt.getTime()
      serviceCall.dispatchedIn = dispatchedAt - createdAt
    }

    if(serviceCall.createdAt && serviceCall.arrivedAt) {
      var createdAt = serviceCall.createdAt.getTime()
      var arrivedAt = serviceCall.arrivedAt.getTime()
      serviceCall.arrivedIn = arrivedAt - createdAt
    }

    serviceCallId = ServiceCalls.insert(serviceCall)
    sc = serviceCall
  }

  if(!sc.tractId) {
    var tractLookupURL = "http://data.fcc.gov/api/block/2010/find?latitude=" +
      doc.location.latitude +
      "&longitude=" + doc.location.longitude +
      "&format=json"

    // console.log(tractLookupURL);
    HTTP.get(tractLookupURL, function(error, response) {
      // console.log(response);
      if(response.data && response.data.Block && response.data.Block.FIPS) {

        var geoId = response.data.Block.FIPS
        console.log(geoId);
        if(geoId) {
          console.log('got geoid');
          geoId = geoId.substr(0,11)
          var tract = Tracts.findOne({geoId: geoId})

          if(tract) {
            console.log('got tract');
            ServiceCalls.update(serviceCallId, {$set: {tractId: tract._id}})
          }
        }
      }
    })
  }
}
