const express = require("express");
require("dotenv").config();
const { transport, ramdonCode } = require("./config/mailer");
const app = express();
const port = process.env.PORT || 3000;

const users = [
  {
    username: "robert945",
    email: "robertocastill63@gmail.com",
    password: "hola",
  },
];

app.use(express.json());
app.get("/", (req, res) => {
  res.json(users);
});
app.put("/resetpasswd", async (req, res) => {
  const { email } = req.body;

  const user = users.find((user) => user.email == email);
  if (!user) {
    return res.json({ error: "user not found" });
  }
  let pin = ramdonCode();
  user.pin = pin;
  let userIndex = users.findIndex((user) => user.email == email);
  users[userIndex] = user;

  await transport.sendMail({
    from: `"Amazing Inc" <${process.env.GMAIL_USER}>`,
    to: user.email,
    subject: "Pin de recuperacion.",
    html: `<p>Este es su pin de recuperacion:</p><h1>${pin}</h1>`,
  });
  res.json({ msg: "mail sent" });
});

app.listen(port, () => {
  console.log(`sever running on port ${port}...`);
});
