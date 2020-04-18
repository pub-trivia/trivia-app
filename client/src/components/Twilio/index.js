require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const gameMaker = require('twilio')(cfg.accountSid, cfg.authToken);

//number format must be "+19195551212"

const inviteeArray = [];

inviteeArray.forEach(function (value) {
    console.log(value);

    gameMaker.messages.create({
        to: value,
        from: userPhone,
        body: `The Quiz Maker has invited you to play Pub Trivia! <Click this link> Enter Code: R2D2`,
    }, function (err, message) {
        console.log(err);
    });
});
