import {
  DynamoDBClient,
  GetItemCommand,
  PutItemCommand,
  QueryCommand,
} from "@aws-sdk/client-dynamodb";
import {
  marshall,
  unmarshall,
} from "@aws-sdk/util-dynamodb";

import SiteInterface from "../models/ISite";

const REGION = "us-east-1";
const TABLENAME = "Sites";

const ddbClient = new DynamoDBClient({ region: REGION });

/**
 * This function receives a siteId and returns matching site object from the Sites table in ddb.
 * @param siteId string
 * @returns site object
 */
export const getSite = async (siteId: string) => {
  const result = await ddbClient.send(
    new GetItemCommand({
      TableName: TABLENAME,
      Key: {
        siteId: { S: siteId },
      },
    })
  );

  if (!result.Item) {
    throw new Error("Site item unable to be returned");
  }

  return unmarshall(result.Item);
};

/**
 * This function takes a campgroundId and returns a list of all sites with the given campgroundId from ddb.
 * @param campgroundId string
 */
export const getSitesAtCampground = async (
  campgroundId: string
): Promise<SiteInterface[]> => {
  const result = await ddbClient.send(
    new QueryCommand({
      KeyConditionExpression:
        "campgroundId = :campgroundId",
      ExpressionAttributeValues: {
        ":campgroundId": { S: campgroundId },
      },
      TableName: TABLENAME,
    })
  );

  if (!result.Items) {
    throw new Error("No sites found");
  }

  return result.Items.map((item) => unmarshall(item) as SiteInterface);
};

/**
 * This function takes a site object and sends it to the ddb Sites table.
 * @param item Site object to be sent to Sites table
 */
export const putSite = async (item: SiteInterface) => {
  await ddbClient.send(
    new PutItemCommand({
      TableName: TABLENAME,
      Item: marshall(item),
    })
  );
};
