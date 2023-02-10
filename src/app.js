//jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
// const https = require("https");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(`${__dirname}/signup.html`);
});

app.post("/", function (req, res) {
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  const data = {
    email_address: email,
    status: "subscribed",
    merge_fields: {
      FNAME: firstName,
      LNAME: lastName,
    },
  };

  //what we're sending to mailchimp
  const jsonData = JSON.stringify(data);

  const options = {
    method: "POST",
    url: "https://us21.api.mailchimp.com/3.0/lists/2028ff4f7e/members",
    headers: {
      Authorization:
        "Basic TmFkaWFoTToxMWM4YTM4ZmNmZTViMzY3MTVmYTUwODhkZDVkYTExOS11czIx",
      "Content-Type": "application/json",
      // Cookie: 'ak_bmsc=F9676713F72BD24CB41F35CB1E1ED090~000000000000000000000000000000~YAAQf1YbOiX05C+GAQAA5jilNxLqKtEY5CZHxugsU8l+esB4hfcNB3NqPG47r8RXslix+TVspDZCWH4YIG0mFBNBKm9Qz91uO37RdaRZvyxatmg84MyDuMBHcUbrbHX6GSpvhXzRacmSA7FQsEpEpQkuJnKeEQa2//bUde/B7ivb5Uqivo74VG+b8L5J/YIOXN35hKlCXW2kn0ACBA3B0Ql3gUGatsMDeoFfXIyHuPKIYAHvQzAGqzXac+5jrIkIpX0DrDRpj7PpkNZCfl1DbNKF6t/m3/68C65CDST6Txrb5LfMe6pUpbwyf03XgMTJKwerdZKXPtH1P5YiPhg4yxYBZUvbs+WL6P9MiwZx4CLa2LR5ZiLTCErGr4sOjcmC8Wk=; bm_sv=A8A18701E063D8136AB6FD0034F45B67~YAAQf1YbOvP15C+GAQAAbA6qNxKyuMDMZHA3y0cXcPX1Xsl/ZRTtRYxOT2nCay5HvMbn/CTPp7SFDv89edo9Hj3Lwwmanoi9gkfqn7XvHyq+Wmp2YnsU3aIiNu8ROPYKjQn7d0qJmRroyVnsWPyBnsPyuYqNtd9Iu6EYZwC1o8lTHGVATeTeuF0kwjGEXfx/3NRfsJuPRr6w5Yosk+KmnXTtl43dnbSjwh9K+mA2oYrf8eyQS+uwUYDl8w4FP9WnUbbslL3rXA==~1'
    },
    body: jsonData,
  };

  request(options, function (error, response) {
    // if (error) throw new Error(error);
    console.log(response.body);
    if (response.statusCode === 200) {
      res.sendFile(`${__dirname}/success.html`);
      // res.send("successfully subscribed!")
    } else {
      res.sendFile(`${__dirname}/failure.html`);
      // res.send("something went wrong!")
    }
  });
});

app.post("/failure", function (req, res) {
  res.redirect("/");
});

app.listen(port, function () {
  console.log(`The server is running on port ${port}`);
});

//API key
//11c8a38fcfe5b36715fa5088dd5da119-us21

//List ID or Audience ID
//2028ff4f7e
