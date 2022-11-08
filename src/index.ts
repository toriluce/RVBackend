import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import * as UnavailableSitesHandlers from "./handlers/UnavailableSitesHandlers";
import * as CampgroundsHandlers from "./handlers/CampgroundsHandlers";
import * as SitesHandlers from "./handlers/SitesHandlers";
import * as CustomersHandlers from "./handlers/CustomersHandlers";
import * as ReservationsHandlers from "./handlers/ReservationsHandlers";

const app = express();

app.use(express.json());

app.use(cors({ origin: true, credentials: true }));

// Campgrounds TABLE

app.get(
  "/campgrounds",
  CampgroundsHandlers.getAllCampgroundsHandler
);

app.get(
  "/campgrounds/:campgroundId",
  CampgroundsHandlers.getCampgroundHandler
);

app.post(
  "/admin/campground",
  CampgroundsHandlers.createCampgroundHandler
);

// UnavailableSites TABLE

app.get(
  "/unavailableSites",
  UnavailableSitesHandlers.getUnavailableSitesHandler
);

app.post(
  "/admin/unavailableSite",
  UnavailableSitesHandlers.createUnavailableSiteHandler
);

// Sites TABLE

app.get("/sites", SitesHandlers.getSiteHandler);

app.post("/admin/site", SitesHandlers.createSiteHandler);

// Customers TABLE

app.post(
  "/admin/customer",
  CustomersHandlers.createCustomerHandler
);

// Reservations TABLE

app.post(
  "/admin/reservation",
  ReservationsHandlers.createReservationHandler
);

const port = process.env.PORT || 3001;

app.listen(port, () =>
  console.log(`Server is running on port ${port}`)
);
