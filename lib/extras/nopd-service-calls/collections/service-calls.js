ServiceCalls = new Mongo.Collection("ServiceCalls");

ServiceCallsSchema = new SimpleSchema({
  tractId: {
    type: String,
    optional: true
  },
  nopdItem: {
    type: String,
  },
  latitude: {
    type: Number,
    decimal: true
  },
  longitude: {
    type: Number,
    decimal: true
  },
  createdAt: {
    type: Date
  },
  dispactchedAt: {
    type: Date,
    optional: true
  },
  dispatchedIn: {
    // miliseconds
    type: Number,
    optional: true
  },
  arrivedAt: {
    type: Date,
    optional: true
  },
  arrivedIn: {
    // miliseconds
    type: Number,
    optional: true
  },
  closedAt: {
    type: Date,
    optional: true
  },
  nopdType: {
    type: String
  },
  nopdTypeDesc: {
    type: String
  },
  zip: {
    type: String,
    optional: true
  },
  block: {
    type: String
  },
  priorityNum: {
    type: Number
  },
  priorityLetter: {
    type: String
  },
  district: {
    type: Number
  }
})

ServiceCalls.attachSchema(ServiceCallsSchema);
