// import React from 'react';
// // import { Session } from 'meteor/session';
//
// import { createContainer } from 'meteor/react-meteor-data';
// // import ServiceCallsShow from './service-calls-show.jsx';
// let map
// let tractsLayer
// export default createContainer(() => {
//   const tractsHandle = Meteor.subscribe('tracts/all');
//
//   if(Mapbox.loaded()) {
//     console.log('done loading');
//     if(!map) {
//       L.mapbox.accessToken = Meteor.settings.public.MAPBOX_TOKEN;
//
//       map = L.mapbox.map('map', 'mapbox.streets').setView([
//         29.942355,
//         -90.078635
//       ], 12);
//
//       tractsLayer = L.mapbox.featureLayer().addTo(map);
//     }
//
//     if(!!map && tractsHandle.ready()) {
//       tractsLayer.setGeoJSON([])
//
//       Meteor.call("tracts/avg-waits", {}, function(error, avgWaits) {
//         _.each(avgWaits, tractWait => {
//           L.polygon(tractLatLngs(tractWait.tractId), {color: "#000"})
//             .bindLabel(tractLabel(tractWait))
//             .addTo(tractsLayer);
//         })
//       })
//     }
//   }
//
//   const loading = !tractsHandle.ready()
//   console.log(loading);
//   // const loading = TractBoundaries.find().count() > 200
//   var hasTracts = !!Tracts.findOne()
//   return {
//     loading: loading,
//     tracts: hasTracts ? Tracts.find().fetch() : [],
//     map: map
//   };
// }, ServiceCallsShow);
//
// var tractLatLngs = function(tractId) {
//
//   var boundaries = TractBoundaries.find({tractId: tractId}, {$sort: {ordinal: 1}}).fetch()
//   return _.map(boundaries, boundary => {
//     return [boundary.latitude, boundary.longitude]
//   })
// }
//
// var tractLabel = function(tractWait) {
//   return "Wait time: " + (tractWait.avg_wait / 1000 / 60 )+ "min\n" +
//     "Percent white: " + parseInt(tractWait.pctWhite) + "%\n"
// }
