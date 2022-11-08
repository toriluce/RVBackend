import {
  DynamoDBClient,
  PutItemCommand,
} from "@aws-sdk/client-dynamodb";
import {
  marshall,
  unmarshall,
} from "@aws-sdk/util-dynamodb";
import ReservationInterface from "../../models/IReservation";

const REGION = "us-east-1";

const ddbClient = new DynamoDBClient({ region: REGION });

/**
 * This function takes a reservation object and adds it to the Reservations table in ddb.
 * @param item reservation object
 */
export const putReservation = async (
  item: ReservationInterface
) => {
  await ddbClient.send(
    new PutItemCommand({
      TableName: "Reservations",
      Item: marshall(item),
    })
  );
};
