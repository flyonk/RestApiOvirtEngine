const express = require("express");
const handlebards = require("express-handlebars");

const app = express();
const PORT = process.env.PORT ?? 3333;

const homeRoutes = require("./routes/home");
const editRoutes = require("./routes/edit");
const observeRoutes = require("./routes/observe");
const BodyParse = require("body-parser");

const hbs = handlebards.create({
  defaultLayout: "main",
  extname: "hbs",
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views");

app.use(BodyParse.json());
app.use(express.static("static"));
app.use(express.static("media"));
app.use(express.urlencoded({ extended: true }));
app.use("/", homeRoutes);
app.use("/edit", editRoutes);
app.use("/observe", observeRoutes);

app.listen(PORT, console.log(`Server has Started on ${PORT}`));
