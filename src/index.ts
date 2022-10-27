import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import {
  createCampgroundHandler,
  getAllCampgroundsHandler,
  getRequestedCampgroundHandler,
} from "./handlers";

const app = express();

app.use(express.json());

app.use(cors({ origin: true, credentials: true }));

app.get("/campgrounds", getAllCampgroundsHandler);

app.get("/:campgroundId", getRequestedCampgroundHandler);

app.post("/admin/campground", createCampgroundHandler);

const port = process.env.PORT || 3001;

app.listen(port, () =>
  console.log(`Server is running on port ${port}`)
);

