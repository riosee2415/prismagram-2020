import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, ".env") });
import { adjectives, nouns } from "./words";

const mailgun = require("mailgun-js")({
  apiKey: process.env.MAILGUN_APIKEY,
  domain: "www.prismagram.com",
});

export const generateSecret = () => {
  const randomNumber = Math.floor(Math.random() * adjectives.length);

  return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
};

const sendMail = (email) => {
  return mailgun.messages().send(email, function(error, body) {
    console.log(body);
  });
};

export const sendSecretMail = (adress, secret) => {
  const email = {
    from: "4leaf@prismagram.com",
    to: adress,
    subject: "🔐 Login Secret For Prismagram",
    html: `Hello! Your Login Secret It ${secret}.<br /> Copy Paste On The App/Website To login`,
  };

  return sendMail(email);
};
