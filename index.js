import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import routes from "./routes/index.js";
import session from "express-session";
dotenv.config();
const app = express();

app.use(express.json());
app.use(session({
  secret:process.env.PUBLIC_KEY,
  cookie:{maxAge:60000},
  resave:true,
  saveUninitialized:false,
  
}))
mongoose
  .connect(process.env.MongoUrl, { useNewUrlParser: true })
  .then(() => console.log("MongoDB is connected Succesfuly"))
  .catch((error) => console.log(error));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});
app.get("/ping", function (req, res) {
  return res.status(200).json({ message: "pong" });
});
app.use("/", routes);

app.listen(process.env.PORT || 3333, () => {
  console.log("server Running On PORT 3333");
});
