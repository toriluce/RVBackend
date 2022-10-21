import express from 'express';
import dotenv from "dotenv"
dotenv.config()
import cors from "cors";
import { createCampgroundHandler, sendPingHandler, getAllCampgroundsHandler } from './handlers';

const app = express();

app.use(express.json());

app.use(cors({ origin: true, credentials: true }));

app.get("/ping", sendPingHandler);

app.get("/campgrounds", getAllCampgroundsHandler);

app.post("/admin/campground", createCampgroundHandler);

const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`Server is running on port ${port}`));