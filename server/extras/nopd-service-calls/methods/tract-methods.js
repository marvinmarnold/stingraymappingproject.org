Meteor.methods({

  // Returns and array of districts,
  // by average wait time (miliseconds) within the district,
  // in increasing order
  "tracts/avg-waits": function(selector) {
    var avgWaits = []

    _.each(Tracts.find().fetch(), tract => {
      selector.tractId = tract._id
      selector.arrivedIn = {$exists: true}

      var serviceCalls = ServiceCalls.find(selector).fetch()

      var totalWait = _.reduce(serviceCalls, (total, serviceCall) => {
        return total + serviceCall.arrivedIn
      }, 0)

      avgWaits.push({
        tractId: tract._id,
        avg_wait: totalWait / serviceCalls.length,
        pctWhite: tract.white / tract.totalPop * 100,
        latlngs: tractLatLngs(tract._id)
      })
    })

    return avgWaits
    // return _.sortBy(avgWaits, "avg_wait")
  }
});

var tractLatLngs = function(tractId) {
  var boundaries = TractBoundaries.find({tractId: tractId}, {$sort: {ordinal: 1}}).fetch()
  return _.map(boundaries, boundary => {
    return [boundary.latitude, boundary.longitude]
  })
}
