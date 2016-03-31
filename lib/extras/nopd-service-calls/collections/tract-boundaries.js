TractBoundaries = new Mongo.Collection("TractBoundaries");

TractBoundariesSchema = new SimpleSchema({
  tractId: {
    type: String
  },
  latitude: {
    type: Number,
    decimal: true
  },
  longitude: {
    type: Number,
    decimal: true
  },
  ordinal: {
    type: Number
  }
})

TractBoundaries.attachSchema(TractBoundariesSchema);
