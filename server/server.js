const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const { resolve } = require("path");
const cors = require("cors");
const fileUpload = require("express-fileupload");

const isProduction = process.env.NODE_ENV === "production";
const PORT = process.env.PORT || 4000;

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());
app.use(fileUpload());
app.use(
  cors({
    origin: isProduction
      ? "https://socialiite.herokuapp.com"
      : "http://localhost:3000",
    credentials: true,
  })
);

// app.use("/uploads", express.static("uploads"));

app.use("/auth/", require("./routes/auth"));
app.use("/posts/", require("./routes/post"));

// if (isProduction) {
//   // express will serve up production assets
//   app.use(express.static(`./build`));

//   // express will serve up the front-end index.html file if it doesn't recognize the route
//   app.get("*", (req, res) => res.sendFile(resolve(`./build/index.html`)));
// }

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
