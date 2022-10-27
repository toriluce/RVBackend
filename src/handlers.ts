import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { getAllCampgrounds, putCampground, getRequestedCampground } from "./dynamo";

/**
 * This is the handler for the /admin/campground endpoint.
 *
 * It creates a new campground and saves it in dynamodb.
 * @param req Express request
 * @param res Express response
 */
export const createCampgroundHandler = async (
  req: Request,
  res: Response
) => {
  const newUuid = uuidv4();

  const newCampground = {
    campgroundId: "CG|" + newUuid,
    name: req.body.name,
    address: req.body.address,
    photos: req.body.photos,
    description: req.body.description,
  };

  await putCampground(newCampground);

  res.status(201);
  res.send(newCampground);
};

/**
 * This in the handler for the /campgrounds endpoint.
 *
 * It returns all campgrounds in Campground table from dynamodb.
 * @param req Express request
 * @param res Express response
 */
export const getAllCampgroundsHandler = async (
  req: Request,
  res: Response
) => {
  const campgrounds = await getAllCampgrounds();
  res.send(campgrounds);
};

/**
 * This in the handler for the /:campgroundName endpoints.
 *
 * It returns requested campground's webpage and required db info.
 * @param req Express request
 * @param res Express response
 */
export const getRequestedCampgroundHandler = async (
  req: Request,
  res: Response
) => {
  const requestedCampground = await getRequestedCampground(
    req.params.campgroundId
  );
  res.send(requestedCampground);
};
