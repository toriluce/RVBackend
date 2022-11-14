import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

import * as SitesDAO from "../DataAccessObjects/SitesDAO";
import * as UnavailableSitesDAO from "../DataAccessObjects/UnavailableSitesDAO";
import SiteInterface from "../../models/ISite";

/**
 * This is the handler for the /sites:siteId endpoint.
 * It returns the site object for a given siteId.
 * @param req express request
 * @param res express response
 */
export const getSiteHandler = async (
  req: Request,
  res: Response
) => {
  const requestedSite = await SitesDAO.getSite(
    req.params.siteId
  );
  res.send(requestedSite);
};

/**
 * This is the handler for the /campgrounds/:campgroundId/sites endpoint.
 * It returns a list of all sites at a given campground.
 * @param req express request
 * @param res express response
 */
export const getSitesAtCampgroundHandler = async (
  req: Request,
  res: Response
) => {
  const sitesAtCampground =
    await SitesDAO.getSitesAtCampground(
      req.params.campgroundId
    );
  res.send(sitesAtCampground);
};

/**
 * This is the handler for the /admin/site endpoint.
 * It creates a new site and saves it in dynamodb.
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
  await SitesDAO.putSite(newSite);

  res.status(201);
  res.send(newSite);
};

/**
 * This is the handler for the /campgrounds/:campgroundId/availableSites endpoint.
 * @param req Express request
 * @param res Express response
 * @returns list of sites available at given campground during given date range
 */
export const getAvailableSitesHandler = async (
  req: Request,
  res: Response
) => {
  const allSites =
    await SitesDAO.getSitesAtCampground(
      req.params.campgroundId
    );

  const unavailableSites =
    await UnavailableSitesDAO.getUnavailableSites(
      req.params.campgroundId,
      req.query.startDate as string,
      req.query.endDate as string
    );

  const availableSites: SiteInterface[] = allSites.filter(
    (site: SiteInterface) => {
      return !unavailableSites.find(
        (unavailableSite) =>
          unavailableSite.siteId === site.siteId
      );
    }
  );

  res.send(availableSites);
};
