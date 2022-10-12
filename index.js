import express from 'express';
import dotenv from "dotenv"
dotenv.config()
import cors from "cors";

const app = express();

app.use(cors({ origin: true, credentials: true }));

app.get("/ping", function(req, res) {
    res.json({
        message: "Ping works!"});
  });

const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`Server is running on port ${port}`));