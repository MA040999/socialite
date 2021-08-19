const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const { resolve } = require("path");
const cors = require("cors");

const isProduction = process.env.NODE_ENV === "production";
const PORT = process.env.PORT || 4000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: isProduction ? "http://localhost:5000" : "http://localhost:3000",
    credentials: true,
  })
);

app.use("/signup/", require("./api/signup"));
app.use("/login/", require("./api/login"));
app.use("/auth/", require("./api/auth"));
app.use("/logout/", require("./api/logout"));

// if (isProduction) {
//   // express will serve up production assets
//   app.use(express.static(`./build`));

//   // express will serve up the front-end index.html file if it doesn't recognize the route
//   app.get("*", (req, res) => res.sendFile(resolve(`./build/index.html`)));
// }

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
