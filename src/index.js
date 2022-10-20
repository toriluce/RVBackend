import express from 'express';
import dotenv from "dotenv"
dotenv.config()
import cors from "cors";
import { v4 as uuidv4 } from 'uuid';
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

const app = express();
app.use(cors({ origin: true, credentials: true }));

REGION = "us-east-1"

const client = new DynamoDBClient({ region: REGION });

app.get("/ping", function(req, res) {
    res.json({
        message: "Ping works!"});
  });

app.post("/admin/campground", function(req, res) {
  res.status(201);
  res.send({
    campgroundId: "CG#" + uuidv4(),
    name: "Canyon RV Resort",
    address: "Arizona, USA",
    photos: ["photo1.jpeg"],
    description: "The best RV park for a canyon view!",
  });
});

const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`Server is running on port ${port}`));