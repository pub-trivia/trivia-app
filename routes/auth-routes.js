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

  app.post("/api/update/:userId", (req, res) => {
    
    const { displayName, email, password, newpw } = req.body;
    console.log("==> app.post /api/update/:userId");
    console.log(displayName, email, password, newpw);

    db.User.findOne({
      where: { userId: req.params.userId }
    })
      .then(result => {
        console.log("==> result of db.User.findOne");
        console.log(result);
        if(displayName !== result.dataValues.displayName){
            db.User.update(
                  {displayName: displayName},
                  {where: {
                      userId: req.params.userId
                  }}
              ).then(name => {
              }).catch(err => {
                  console.log(err);
              })
        }
        if(email !== result.dataValues.email){
            db.User.update(
                {email: email},
                {where: {
                    userId: req.params.userId
                }}
            ).then(mail => {
            }).catch(err => {
                console.log(err);
            })
        }
        if(newpw){
          bcrypt.compare(password, result.dataValues.password)
           .then(isMatch => {
             if(isMatch){
                bcrypt.genSalt(10, (err, salt) => {
                  bcrypt.hash(newpw, salt, (err, hash) => {
                    if (err) throw err;
                    db.User.update(
                      {password: hash},
                      {where: {
                          userId: req.params.userId
                      }}
                      ).then(pw => {
                      })
                      .catch(err => console.log(err));
                  })
                }); 
              } else {
                return res.status(400).json({ passwordincorrect: "Old password is incorrect" });
              }
          })
        }
        const payload = {
          id: result.dataValues.userId,
          name: displayName,
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
      })
  })

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