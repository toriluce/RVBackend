import {
  PutItemCommand,
  DynamoDBClient,
} from "@aws-sdk/client-dynamodb";
import {
  marshall,
} from "@aws-sdk/util-dynamodb";
import CustomerInterface from "../models/ICustomer";

const REGION = "us-east-1";
const TABLENAME = "Customers"

const ddbClient = new DynamoDBClient({ region: REGION });

/**
 * This function takes a customer object and stores it in the Customers table in ddb
 * @param item customer object
 */
export const putCustomer = async (
  item: CustomerInterface
) => {
  await ddbClient.send(
    new PutItemCommand({
      TableName: TABLENAME,
      Item: marshall(item),
    })
  );
};
