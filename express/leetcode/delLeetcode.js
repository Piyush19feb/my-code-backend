const router = require("express").Router();
const { MongoClient, ObjectId } = require("mongodb");
const assert = require("assert");

const { jwt_auth } = require("../verifyToken");
const store = require("../../environment");

const dbName = store.mongo_dbName;
const client = new MongoClient(store.mongo_uri || "");

router.post("/", jwt_auth, async (req, res) => {
  await client.connect();
  try {
    await client
      .db(dbName)
      .collection("qna")
      .deleteOne({ _id: new ObjectId(req.body.leetcode_id) })
      .then((result) => {
        console.log(result);
        assert.equal(1, result.deletedCount);
        res.send("OK");
      });
  } catch (err) {
    console.log(err);
    res.status(500);
  } finally {
    client.close();
  }
});

module.exports = router;
