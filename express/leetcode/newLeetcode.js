const router = require("express").Router();
const { Leetcode } = require("../modal/schemes");
const { jwt_auth } = require("../verifyToken");

router.post("/", jwt_auth, async (req, res) => {
  const newProblemScheme = new Leetcode({
    problem_title:
      req.body.problem_title[0].toUpperCase() + req.body.problem_title.slice(1),
    problem_no: req.body.problem_no,
    // task_details: req.body.problem_description,
    visits: [Date.now],
    // future_ref : Date.now,
    tags: req.body.tags,
    level: req.body.level,
  });
  // console.log("Id From topic Created 1 : ", newProblemScheme);
  const __id = await newProblemScheme.save();
  console.log("Id From topic Created 2 : ", __id);
  res.status(200).send("OK");
});

module.exports = router;
