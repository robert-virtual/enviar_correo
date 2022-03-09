const nodemailer = require("nodemailer");
const { round, random } = Math;

exports.ramdonCode = () => {
  return `${round(random() * 999) + 1000}`;
};

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

exports.transport = transport;
