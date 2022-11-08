import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import * as CustomersDAO from "../DataAccessObjects/CustomersDAO";

/**
 * This handler receives a new customer and packages it for the customer DAO.
 * @param req express request
 * @param res express response
 */
export const createCustomerHandler = async (
  req: Request,
  res: Response
) => {
  const newUuid = uuidv4();

  const newCustomer = {
    customerId: "C." + newUuid,
    name: req.body.name,
    rvLength: req.body.rvLength,
    rvType: req.body.rvType,
    phone: req.body.phone,
    email: req.body.email,
  };
  await CustomersDAO.putCustomer(newCustomer);
  res.status(201);
  res.send(newCustomer);
};
