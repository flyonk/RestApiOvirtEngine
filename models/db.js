const fs = require("fs");
const path = require("path");

class DB {
  constructor() {}

  async save(aData) {
    if (aData.length < 2) {
      return;
    }

    let counterFail = 0;
    const db = await DB.getAll();

    if (db.length === 0) {
      for (const oELText of aData) {
        if (!oELText.includes("User admin") || !oELText.includes(" AM" || " PM")) {
          db.push([oELText, "text"]);
        }
      }
    } else {
      for (const oELText of aData) {
        if (!JSON.stringify(db).includes(oELText)) {
          db.push([oELText, "textForTranslate"]);
        } else {
          counterFail++;
        }
      }
    }

    console.log(counterFail, "elements not added because already was added to DataBase");

    return new Promise((resolve, reject) => {
      fs.writeFile(path.join(__dirname, "..", "data", "db.json"), JSON.stringify(db), (err) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  async singleSave(string) {
    const db = await DB.getAll();

    if (!JSON.stringify(db).includes(string)) {
      db.push([string, "textForTranslate"]);
    } else {
      console.log(`${string} already exists in DataBase!`);
    }

    return new Promise((resolve, reject) => {
      fs.writeFile(path.join(__dirname, "..", "data", "db.json"), JSON.stringify(db), (err) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  static getAll() {
    return new Promise((resolve, reject) => {
      fs.readFile(path.join(__dirname, "..", "data", "db.json"), "utf-8", (err, content) => {
        if (err) reject(err);

        resolve((content && JSON.parse(content)) || []);
      });
    });
  }
}

module.exports = DB;
