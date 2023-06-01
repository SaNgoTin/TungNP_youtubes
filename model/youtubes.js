const mongoose = require("mongoose");
require("mongoose-currency").loadType(mongoose);
const schema = mongoose.Schema;

var pageInfoSchema = new schema({
  totalResults: {
    type: Number,
    required: true,
    min: 0,
  },
  resultsPerPage: {
    type: Number,
    required: true,
    min: 0,
  },
});

var idSchema = new schema({
  kind: {
    type: String,
    required: true,
  },
  channelID: {
    type: String,
  },
  videoId: {
    type: String,
  },
});

var itemSchema = new schema(
  {
    kind: {
      type: String,
      required: true,
    },
    etag: {
      type: String,
      required: true,
    },
    id: idSchema,
  },
  { timestamps: true }
);

var youtubeSchema = new schema(
  {
    kind: {
      type: String,
      required: true,
    },
    etag: {
      type: String,
      required: true,
    },
    regionCode: {
      type: String,
      required: true,
    },
    nextPageToken: {
      type: String,
      required: true,
    },
    pageInfo: pageInfoSchema,
    items: [itemSchema],
  },
  { timestamps: true }
);

var Youtubes = mongoose.model("Youtubes", youtubeSchema);
module.exports = Youtubes;
