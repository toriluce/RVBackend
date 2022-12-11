import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import ReservationInterface from "../models/IReservation";
import * as ReservationsDAO from "../DataAccessObjects/ReservationsDAO";

/**
 * This is the handler for the /admin/reservation endpoint.
 * This handler receives and packages a new reservation object to send to the reservations DAO.
 * @param req express request
 * @param res express response
 */
export const createReservationHandler = async (
  req: Request,
  res: Response
) => {
  const newUuid = uuidv4();

  const newReservation: ReservationInterface = {
    reservationId: "R." + newUuid,
    campgroundId: req.body.campgroundId,
    customerId: req.body.campgroundId,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    nightlyRate: req.body.nightlyRate,
    totalCost: req.body.totalCost,
    completedPayment: req.body.completedPayment,
    payments: req.body.payments,
  };

  await ReservationsDAO.putReservation(newReservation);

  res.status(201);
  res.send(newReservation);
};
