Meteor.methods({

  // Returns an array of districts,
  // by number of service calls, in increasing order
  "districts/gross-service-calls": function(selector) {
    var counts = []

    for(let i = 1; i <= NUM_DISTRICTS; i++) {
      var selector = {district: i}

      counts.push({
        districtNum: i,
        gross_service_calls: ServiceCalls.find(selector).count()
      })
    }

    return _.sortBy(counts, "count")
  },

  // Returns and array of districts,
  // by average wait time (miliseconds) within the district,
  // in increasing order
  "districts/avg-waits": function(selector) {
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
