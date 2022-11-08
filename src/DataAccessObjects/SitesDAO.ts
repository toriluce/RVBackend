import {
  DynamoDBClient,
  GetItemCommand,
  PutItemCommand,
} from "@aws-sdk/client-dynamodb";
import {
  marshall,
  unmarshall,
} from "@aws-sdk/util-dynamodb";

import SiteInterface from "../../models/ISite";

const REGION = "us-east-1";

const ddbClient = new DynamoDBClient({ region: REGION });

/**
 * This function receives a siteId and returns matching site object from the Sites table in ddb.
 * @param siteId string
 * @returns site object
 */
export const getSite = async (siteId: string) => {
  const result = await ddbClient.send(
    new GetItemCommand({
      TableName: "Sites",
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
 * This function takes a site object and sends it to the ddb Sites table.
 * @param item Site object to be sent to Sites table
 */
export const putSite = async (item: SiteInterface) => {
  await ddbClient.send(
    new PutItemCommand({
      TableName: "Sites",
      Item: marshall(item),
    })
  );
};
