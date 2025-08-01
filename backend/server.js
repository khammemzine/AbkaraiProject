const express = require("express");
const session = require("express-session");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(session({
  secret: "my-secret",
  resave: false,
  saveUninitialized: true,
}));

app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static(path.join(__dirname, "public")));

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "login.html"));
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "user2025" && password === "pass9876") {
    req.session.authenticated = true;
    res.redirect("/members");
  } else {
    res.send("اسم المستخدم أو كلمة المرور خاطئة");
  }
});

app.get("/members", (req, res) => {
  if (req.session.authenticated) {
    res.sendFile(path.join(__dirname, "views", "members.html"));
  } else {
    res.redirect("/login");
  }
});

app.get("/download", (req, res) => {
  if (req.session.authenticated) {
    res.sendFile(path.join(__dirname, "public", "secret.pdf"));
  } else {
    res.redirect("/login");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

