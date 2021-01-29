const { Router } = require("express");
const router = Router();
const DB = require("../models/db");

router.get("/", (req, res) => {
  res.render("home", {
    title: "Home Page",
    isHome: true,
  });
});

router.post("/postdom", (req, res) => {
  const db = new DB(req.body);
  console.log("ReqBody length:", req.body.length);
  db.save(req.body);

  res.redirect("/");
});

router.post("/singlepost", (req, res) => {
  const db = new DB(req.body);
  db.singleSave(req.body.oEL);

  res.redirect("/");
});

module.exports = router;
