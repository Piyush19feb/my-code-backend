const router = require("express").Router();
const MongoClient = require("mongodb").MongoClient;

const store = require("../../environment");
const { jwt_auth } = require("../verifyToken");

const client = new MongoClient(store.mongo_uri || "");

const dbName = store.mongo_dbName;

router.post("/", jwt_auth, async (req, res) => {
  await client.connect();
  const list = await client
    .db(dbName)
    .collection("qna")
    .find({})
    .sort({ future_ref: -1 })
    .limit(90)
    .toArray();

  res.send(list);
});

module.exports = router;
