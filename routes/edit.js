const { Router } = require("express");
const router = Router();
const DB = require("../models/db");

router.get("/", (req, res) => {
  res.render("edit", {
    title: "Edit Page",
    isEdit: true,
  });
});

module.exports = router;
