import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import * as SitesDao from "../DataAccessObjects/SitesDAO";
import SiteInterface from "../../models/ISite";

/**
 * This is the handler for the /sites endpoint. It returns the site object for a given siteId.
 * @param req express request
 * @param res express response
 */
export const getSiteHandler = async (
  req: Request,
  res: Response
) => {
  const requestedSite = await SitesDao.getSite(
    req.params.siteId
  );
  res.send(requestedSite);
};

/**
 * This is the handler for the /admin/site endpoint. It creates a new site and saves it in dynamodb.
 * @param req Express request
 * @param res Express response
 */
export const createSiteHandler = async (
  req: Request,
  res: Response
) => {
  const newUuid = uuidv4();
  const newSite: SiteInterface = {
    siteId: "S." + newUuid,
    campgroundId: req.body.campgroundId,
    amp15: req.body.amp15,
    amp30: req.body.amp30,
    amp50: req.body.amp50,
    sewer: req.body.sewer,
    water: req.body.water,
    siteType: req.body.siteType,
    campgroundSiteNumber: req.body.campgroundSiteNumber,
    photos: req.body.photos,
    pricePerNight: req.body.pricePerNight,
  };
  await SitesDao.putSite(newSite);

  res.status(201);
  res.send(newSite);
};
