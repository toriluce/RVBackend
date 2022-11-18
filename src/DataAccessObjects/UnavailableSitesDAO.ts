import {
  AttributeValue,
  DynamoDBClient,
  PutItemCommand,
  QueryCommand,
  ScanCommand,
} from "@aws-sdk/client-dynamodb";
import {
  marshall,
  unmarshall,
} from "@aws-sdk/util-dynamodb";
import UnavailableSiteInterface from "../../models/IUnavailableSite";

const REGION = "us-east-1";
const TABLENAME = "UnavailableSites"

const ddbClient = new DynamoDBClient({ region: REGION });

/**
 * This function takes a unavailableSite object and sends it to the dynamodb UnavailableSites table.
 * @param item unavailableSite object to send to table
 */
export const putUnavailableSite = async (
  item: UnavailableSiteInterface
) => {
  await ddbClient.send(
    new PutItemCommand({
      TableName: TABLENAME,
      Item: marshall(item),
    })
  );
};

/**
 * This function receives the starting and ending date of a desired reservation and finds which siteIds have bookings within that date range. If a siteId is returned, that siteId is not available for the entire desired reservation.
 * @param startDate string
 * @param endDate string
 * @returns list of UnavailableSites bookings or empty string
 */
export const getUnavailableSites = async (
  campgroundId: string,
  startDate: string,
  endDate: string
): Promise<UnavailableSiteInterface[]> => {
  const result = await ddbClient.send(
    new QueryCommand({
      TableName: TABLENAME,
      IndexName: "campgroundId-date-index",
      KeyConditionExpression:
        "#campgroundId = :campgroundId and #date BETWEEN :startDate AND :endDate",
      ExpressionAttributeNames: {
        "#campgroundId": "campgroundId",
        "#date": "date",
      },
      ExpressionAttributeValues: {
        ":startDate": { S: startDate },
        ":endDate": { S: endDate },
        ":campgroundId": { S: campgroundId },
      },
    })
  );

  if (!result.Items) {
    return [];
  }

  return result.Items.map((item) => unmarshall(item) as UnavailableSiteInterface);
};
