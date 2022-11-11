import {
  DynamoDBClient,
  PutItemCommand,
  GetItemCommand,
  ScanCommand,
} from "@aws-sdk/client-dynamodb";
import {
  marshall,
  unmarshall,
} from "@aws-sdk/util-dynamodb";

import CampgroundInterface from "../../models/ICampground";

const REGION = "us-east-1";
const TABLENAME = "Campgrounds"

const ddbClient = new DynamoDBClient({ region: REGION });

/**
 * This function takes a campground object and sends it to the dynamodb Campgrounds table.
 * @param item Campground object to send to table
 */
export const putCampground = async (
  item: CampgroundInterface
) => {
  await ddbClient.send(
    new PutItemCommand({
      TableName: TABLENAME,
      Item: marshall(item),
    })
  );
};

/**
 * This function retrieves all campgrounds from the dynamodb Campgrounds table.
 * @returns Unmarshalled objects from Campgrounds table
 */
export const getAllCampgrounds = async () => {
  const scanResult = await ddbClient.send(
    new ScanCommand({
      TableName: TABLENAME,
    })
  );

  if (!scanResult.Items) {
    throw new Error("No campgrounds found in table");
  }

  return scanResult.Items.map((item) => unmarshall(item));
};

/**
 *This function retrieves the campground requested from the dynamodb Campgrounds table.
 * @returns requested unmarshalled Campground object
 */
export const getCampground = async (
  campgroundId: string
) => {
  const result = await ddbClient.send(
    new GetItemCommand({
      TableName: TABLENAME,
      Key: {
        campgroundId: { S: campgroundId },
      },
    })
  );

  if (!result.Item) {
    throw new Error(
      "Campground item unable to be returned"
    );
  }

  return unmarshall(result.Item);
};
