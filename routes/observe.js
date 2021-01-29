const { Router } = require("express");
const router = Router();
const DB = require("../models/db");

router.get("/", async (req, res) => {
  const db = await DB.getAll();
  const ruArr = [];
  const engArr = [];
  for (const d of db) {
    ruArr.push(d[0]);
    engArr.push(d[1]);
  }

  res.render("observe", {
    title: "Observe Page",
    isObserve: true,
    ruArr,
    engArr,
  });
});

module.exports = router;
