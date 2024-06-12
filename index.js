import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import routes from "./routes/index.js";
dotenv.config();
const app = express();

app.use(express.json());
mongoose
  .connect(process.env.MongoUrl, { useNewUrlParser: true })
  .then(() => console.log("MongoDB is connected"))
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
