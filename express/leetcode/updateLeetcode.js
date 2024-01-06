const router = require("express").Router();
const { ObjectId, MongoClient } = require("mongodb");
const assert = require("assert");

const store = require("../../environment");
const { jwt_auth } = require("../verifyToken");

const client = new MongoClient(store.mongo_uri || "");

const dbName = store.mongo_dbName;

router.post("/", jwt_auth, async (req, res) => {
  await client.connect();
  var Problem = req.body.updated_info;
  var Problem_id = Problem._id;
  delete Problem["_id"];
  try {
    await client
      .db(dbName)
      .collection("qna")
      .updateOne({ _id: new ObjectId(Problem_id) }, { $set: Problem })
      .then((result) => {
        console.log(result);
        assert.equal(1, result.matchedCount);
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
