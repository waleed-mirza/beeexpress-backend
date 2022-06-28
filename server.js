const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");

const mongoose = require("mongoose");

require("dotenv").config();

const port = process.env.PORT || 5000;

app.use(express.json());
// app.use(
//   cors({
//     credentials: true,
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST"],
//   })
// );

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  methods: ["GET", "POST"],
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

const menuRouter = require("./routes/menu");
const categoryRouter = require("./routes/category");
const restaurantRouter = require("./routes/restaurant");
const authRouter = require("./customer routes/auth");
const locationRouter = require("./routes/location");

const marqueeRouter = require("./routes/marquee");

const eventorderRouter = require("./routes/eventorder");
const foodorderRouter = require("./routes/foodorder");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    key: "userId",
    secret: "jashdjahdj",
    resave: true,
    saveUninitialized: false,
    cookie: {
      expires: 1000 * 60 * 60 * 60,
    },
  })
);

app.get("/", (req, res) => {
  res.send("Welcome to the Application");
});

app.use("/menu", menuRouter);
app.use("/category", categoryRouter);
app.use("/restaurant", restaurantRouter);
app.use("/location", locationRouter);

app.use("/auth", authRouter);
app.use("/marquee", marqueeRouter);
app.use("/eventorder", eventorderRouter);
app.use("/foodorder", foodorderRouter);
app.use("/files", express.static(path.join(__dirname, "/upload/images")));

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
