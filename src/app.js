//jshint esversion: 6
require("dotenv").config()

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

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
      Authorization: process.env.MAILCHIMP_AUTH,
      "Content-Type": "application/json",
    },
    body: jsonData,
  };

  request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(response.body);
    if (response.statusCode === 200) {
      res.sendFile(`${__dirname}/success.html`);
    } else {
      res.sendFile(`${__dirname}/failure.html`);
    }
  });
});

app.post("/failure", function (req, res) {
  res.redirect("/");
});

app.listen(port, function () {
  console.log(`The server is running on port ${port}`);
});