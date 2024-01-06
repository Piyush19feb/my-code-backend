const mongoose = require("mongoose");
const store = require("../../environment");

const userScheme = new mongoose.Schema({
  google_id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  // password:{
  //     type: String,
  //     required : true,
  // },
  img_url: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const LeetcodeScheme = new mongoose.Schema({
  problem_no: {
    type: Number,
    required: true,
  },
  problem_title: {
    type: String,
    required: true,
  },
  problem_description: {
    type: String,
    default: "No description found.... -_-'  \n Please Add One. _i_",
    required: false,
  },
  solutions: {
    type: Array,
    default: [
      { lan: "no Lan selected", code: "No Code Here..", info: " No info Here" },
    ],
  },
  visits: {
    type: Array,
    default: [],
  },
  future_ref: {
    type: Date,
    default: Date.now,
  },
  tags: {
    type: Array,
    default: [],
    required: true,
  },
  level: {
    type: String,
    default: "Easy",
    required: true,
  },
});

const connection_to_leetcode = mongoose.createConnection(
  store.mongo_uri + "/LeetcodeIo"
);
module.exports.Leetcode = connection_to_leetcode.model(
  "qna",
  LeetcodeScheme,
  "qna"
);
module.exports.User = connection_to_leetcode.model("User", userScheme, "Users");
