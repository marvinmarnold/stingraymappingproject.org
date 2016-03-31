import React from 'react';
// import { Session } from 'meteor/session';

import { createContainer } from 'meteor/react-meteor-data';
import ServiceCallsShow from './service-calls-show.jsx';
let map
let tractsLayer
export default createContainer(() => {
  const tractsHandle = Meteor.subscribe('tracts/all');

  // const loading = !tractsHandle.ready() && !Mapbox.loaded()
  // const loading = !Mapbox.loaded()

  if(Mapbox.loaded()) {
    console.log('done loading');
    if(!map) {
      L.mapbox.accessToken = Meteor.settings.public.MAPBOX_TOKEN;

      map = L.mapbox.map('map', 'mapbox.streets').setView([
        29.942355,
        -90.078635
      ], 12);

      tractsLayer = L.mapbox.featureLayer().addTo(map);
    }

    if(!!map && tractsHandle.ready()) {
      tractsLayer.setGeoJSON([])

      _.each(Tracts.find().fetch(), tract => {

        L.polygon(tractLatLngs(tract._id), {color: "#000"})
        .bindLabel(tractLabel(tract))
        .addTo(tractsLayer);
      })
    }
  }

  const loading = !tractsHandle.ready()
  console.log(loading);
  // const loading = TractBoundaries.find().count() > 200
  var hasTracts = !!Tracts.findOne()
  return {
    loading: loading,
    tracts: hasTracts ? Tracts.find().fetch() : [],
    map: map
  };
}, ServiceCallsShow);

var tractLatLngs = function(tractId) {

  var boundaries = TractBoundaries.find({tractId: tractId}, {$sort: {ordinal: 1}}).fetch()
  return _.map(boundaries, boundary => {
    return [boundary.latitude, boundary.longitude]
  })
}

var tractLabel = function(tract) {
  return "Percent white: " + (tract.white / tract.totalPop * 100) + "%"
}
