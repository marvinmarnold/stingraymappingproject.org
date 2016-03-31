Meteor.startup(function(){
  if(Tracts.find().count() === 0) {
    console.log('Started adding tracts');
    _.each(rawTracts, rawTract => {
      console.log('Processing tract ' + rawTract.properties.GEOID10);
      var p = rawTract.properties
      var tract = {
        geoId: p.GEOID10,
        landArea: p.ALAND10,
        waterArea: p.AWATER10,
        latitude: parseFloat(p.INTPTLAT10),
        longitude: parseFloat(p.INTPTLON10),
        totalPop: p.TOTAL_POP,
        white: p.WHITE,
        black: p.BLACK,
        amerIndian: p.AMER_IND,
        asian: p.ASIAN,
        pacIslander: p.PAC_ISLNDR,
        other: p.OTHER_RACE,
        multi: p.MULTI_RACE,
        hispanic: p.HISPANIC,
        nonHispanic: p.NON_HISP,
        totalHomes: p.TOTAL_HU,
        occupiedHomes: p.OCC_HU,
        unoccoupiedHomes: p.VACANT_HU
      }

      var tractId = Tracts.insert(tract)

      _.each(rawTract.geometry.coordinates[0], coords => {
        // console.log(coords);
        TractBoundaries.insert({
          tractId: tractId,
          latitude: coords[1],
          longitude: coords[0],
          ordinal: TractBoundaries.find({tractId: tractId}).count() + 1
        })
      } )

    })

    console.log('Finished adding tracts');
    getServiceCalls();
  }
});
