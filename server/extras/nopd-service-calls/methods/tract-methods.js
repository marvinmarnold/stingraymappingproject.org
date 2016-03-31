Meteor.methods({

  // Returns and array of districts,
  // by average wait time (miliseconds) within the district,
  // in increasing order
  "tracts/avg-waits": function(selector) {
    var avgWaits = []

    for(let i = 1; i <= NUM_DISTRICTS; i++) {
      selector.district = i
      selector.arrivedIn = {$exists: true}

      var serviceCalls = ServiceCalls.find(selector).fetch()

      var totalWait = _.reduce(serviceCalls, (total, serviceCall) => {
        return total + serviceCall.arrivedIn
      }, 0)

      avgWaits.push({
        districtNum: i,
        avg_wait: totalWait / serviceCalls.length
      })
    }

    return _.sortBy(avgWaits, "avg_wait")
  }
});
