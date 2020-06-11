const db = require('../models');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

module.exports = (app) => {

  app.post("/api/signup", (req, res) => {
    const { displayName, email, password, icon, color } = req.body;

    db.User.findOne({
      where: { email }
    })
      .then(result => {
        if (result) {
          return res.status(400).json({ email: "Email already exists." });
        } else {
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
              if (err) throw err;
              db.User.create({
                displayName,
                email,
                password: hash,
                icon,
                color
              })
                .then(user => {
                  res.json(user);
                })
                .catch(err => console.log(err));
            })
          });

        }
      })
  });

  app.post("/api/login", (req, res) => {

    const { email, password } = req.body;

    db.User.findOne({
      where: { email: email }
    })
      .then(result => {
        if (!result) {
          return res.status(400).json({ emailnotfound: "Email not found." });
        }

        bcrypt.compare(password, result.dataValues.password)
          .then(isMatch => {
            if (isMatch) {
              const payload = {
                id: result.dataValues.userId,
                name: result.dataValues.displayName,
                icon: result.dataValues.icon,
                color: result.dataValues.color
              };

              jwt.sign(
                payload,
                'shhhhhhh',
                (err, token) => {
                  return res.json({
                    success: true,
                    token: "Bearer " + token
                  });
                }
              );
            } else {
              return res.status(400).json({ passwordincorrect: "Password incorrect" });
            }
          });
      });
  });

  app.get("/api/getuser/:userId", (req, res) => {
    db.User.findByPk(req.params.userId)
      .then(result => {
        return res.json(result);
      });
  });

  app.get("/api/finduser/:email", (req, res) => {
    db.User.findOne({
      where: { email: req.params.email }
    })
      .then(result => {
        if (result === 0) {
          // not found 
          return res.status(404).end();
        }
        else {
          return res.json(result);
        }
      });

  });
}