const express = require("express");
const dao = require("../dao/users");

const router = express.Router();

router.post("/authenticate", async function (req, res) {
  try {
    let uname = req.body.uname;
    let pwd = req.body.pwd;
    let success = await dao.authenticate(uname, pwd);
    console.log(success);
    if (success)
      res.json({
        admin: await dao.isAdmin(req.body.uname),
      });
    else res.send(500);
  } catch (e) {
    console.log(e);
    res.status(500).send({ error: e });
  }
});

router.get("/all", async function (req, res) {
  try {
    let users = await dao.getAllUsers();
    res.json(users);
  } catch (e) {
    console.log(e);
    res.status(500).send({ error: e });
  }
});

module.exports = router;
