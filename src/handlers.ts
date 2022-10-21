import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { getItemsFromCampgrounds, putItemToCampgrounds } from "./dynamo";

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
    campgroundId: "CG#" + newUuid,
    name: req.body.name,
    address: req.body.address,
    photos: req.body.photos,
    description: req.body.description,
  };

  await putItemToCampgrounds(newCampground);

  res.status(201);
  res.send(newCampground);
};

/**
 * This in the handler for the /campgrounds endpoint.
 * 
 * It returns all campgrounds in Campground table from dynamodb.
 * @param req Express request
 * @param res Express Response
 */
export const getCampgroundsHandler = async (
  req: Request,
  res: Response
) => {
    const campgrounds = await getItemsFromCampgrounds();
    res.send(campgrounds);
};

/**
 * This is the handler for the /ping endpoint.
 *
 * It sends the json message "Ping works!"
 * @param req Express request
 * @param res Express response
 */
export const sendPingHandler = (
  req: Request,
  res: Response
) => {
  res.json({
    message: "Ping works!",
  });
};
