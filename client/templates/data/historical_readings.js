var map;
var markers;
var heat;
Template.historicalReadings.rendered = function () {
  this.autorun(function (computation) {
    if (Mapbox.loaded()) {
      setMapboxToken();
      // Center the map at some hardcoded arbitrary point towards the middle of the USA
      map = L.mapbox.map('historical-map', 'mapbox.light').setView([38.731407,  -96.386617], 4);

      var bbox = [-126,25,-66,50];

      computation.stop();
    }
  });
}

var data = {
  "type": "FeatureCollection",
  "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },

  "features": [
    { "type": "Feature", "properties": { "YR": "1955" }, "geometry": { "type": "LineString", "coordinates": [ [ -101.5, 32.199999999999577 ], [ -101.499900700865354, 32.200095324327116 ] ] } },
    { "type": "Feature", "properties": { "YR": "1955" }, "geometry": { "type": "LineString", "coordinates": [ [ -92.58, 38.579999999999771 ], [ -92.579880351524707, 38.580087102950912 ] ] } },
    { "type": "Feature", "properties": { "YR": "1956" }, "geometry": { "type": "LineString", "coordinates": [ [ -89.68, 41.199999999999839 ], [ -89.679872175196309, 41.200083969623044 ] ] } },
    { "type": "Feature", "properties": { "YR": "1957" }, "geometry": { "type": "LineString", "coordinates": [ [ -87.4, 39.279999999999795 ], [ -87.399872977508949, 39.280081603707217 ] ] } },
    { "type": "Feature", "properties": { "YR": "1957" }, "geometry": { "type": "LineString", "coordinates": [ [ -87.78, 41.779999999999852 ], [ -87.77986876959595, 41.7800818892919 ] ] } },
    { "type": "Feature", "properties": { "YR": "1957" }, "geometry": { "type": "LineString", "coordinates": [ [ -90.08, 39.499999999999808 ], [ -90.079875741777514, 39.500084474275873 ] ] } },
    { "type": "Feature", "properties": { "YR": "1957" }, "geometry": { "type": "LineString", "coordinates": [ [ -88.0, 38.379999999999775 ], [ -87.999875262976602, 38.380082260692511 ] ] } },
    { "type": "Feature", "properties": { "YR": "1965" }, "geometry": { "type": "LineString", "coordinates": [ [ -86.08, 37.879999999999754 ], [ -86.079873964010844, 37.880080163253815 ] ] } },
    { "type": "Feature", "properties": { "YR": "1966" }, "geometry": { "type": "LineString", "coordinates": [ [ -86.0, 37.879999999999747 ], [ -85.999873875023951, 37.880080075278926 ] ] } },
    { "type": "Feature", "properties": { "YR": "1977" }, "geometry": { "type": "LineString", "coordinates": [ [ -84.58, 37.999999999999766 ], [ -84.579872098751935, 38.000078505107425 ] ] } },
    { "type": "Feature", "properties": { "YR": "1977" }, "geometry": { "type": "LineString", "coordinates": [ [ -79.68, 36.499999999999702 ], [ -79.679869657314441, 36.500072894743944 ] ] } },
    { "type": "Feature", "properties": { "YR": "1980" }, "geometry": { "type": "LineString", "coordinates": [ [ -79.9, 36.699999999999712 ], [ -79.899869520612555, 36.700073157685011 ] ] } },
    { "type": "Feature", "properties": { "YR": "1990" }, "geometry": { "type": "LineString", "coordinates": [ [ -89.0, 37.999999999999751 ], [ -88.99987707352048, 38.000083333017663 ] ] } },
    { "type": "Feature", "properties": { "YR": "1990" }, "geometry": { "type": "LineString", "coordinates": [ [ -78.78, 36.199999999999712 ], [ -78.779869303990438, 36.200071835024083 ] ] } },
    { "type": "Feature", "properties": { "YR": "1990" }, "geometry": { "type": "LineString", "coordinates": [ [ -86.08, 39.879999999999818 ], [ -86.079870364383922, 39.880080145651505 ] ] } },
    { "type": "Feature", "properties": { "YR": "1990" }, "geometry": { "type": "LineString", "coordinates": [ [ -80.9, 35.199999999999683 ], [ -80.899873130221877, 35.200074224246485 ] ] } },
    { "type": "Feature", "properties": { "YR": "1990" }, "geometry": { "type": "LineString", "coordinates": [ [ -80.9, 35.279999999999667 ], [ -80.899872994012043, 35.280074230020929 ] ] } },
    { "type": "Feature", "properties": { "YR": "2015" }, "geometry": { "type": "LineString", "coordinates": [ [ -84.68, 33.699999999999612 ], [ -84.679879426993168, 33.70007834918956 ] ] } }
  ]
};