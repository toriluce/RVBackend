import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import * as UnavailableSitesDAO from "../DataAccessObjects/UnavailableSitesDAO";

/**
 * This in the handler for the /admin/unavailableSite endpoint.
 * Send UnavailableSite to DDB.
 * @param req express request
 * @param res Newly unavailable site
 */
export const createUnavailableSiteHandler = async (
  req: Request,
  res: Response
) => {
  const newUnavailableSite = {
    siteId: req.body.siteId,
    date: req.body.date,
    campgroundId: req.body.campgroundId,
    customerId: req.body.customerId,
    reservationId: req.body.reservationId,
    reservationCompleted: req.body.reservationCompleted,
  };

  await UnavailableSitesDAO.putUnavailableSite(
    newUnavailableSite
  );

  res.status(201);
  res.send(newUnavailableSite);
};

/**
 * This in the handler for the /unavailableSites endpoint.
 * Retrieve unavailable sites given date range from ddb.
 * @param req express request
 * @param res express response
 */
export const getUnavailableSitesHandler = async (
  req: Request,
  res: Response
) => {
  const unavailableSites =
    await UnavailableSitesDAO.getUnavailableSites(
      req.params.campgroundId,
      req.query.startDate as string,
      req.query.endDate as string
    );
  res.send(unavailableSites);
};
