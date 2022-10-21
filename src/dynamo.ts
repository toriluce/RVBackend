import {
  DynamoDBClient,
  PutItemCommand,
  ScanCommand,
} from "@aws-sdk/client-dynamodb";
import {
  marshall,
  unmarshall,
} from "@aws-sdk/util-dynamodb";

const REGION = "us-east-1";

const ddbClient = new DynamoDBClient({ region: REGION });

export const putCampground = async (item: any) => {
  await ddbClient.send(
    new PutItemCommand({
      TableName: "Campgrounds",
      Item: marshall(item),
    })
  );
};

export const getAllCampgrounds = async () => {
  const scanResult = await ddbClient.send(
    new ScanCommand({
      TableName: "Campgrounds",
    })
  );

  if (!scanResult.Items) {
    throw new Error("No campgrounds found in table")
  }

  return scanResult.Items.map(item => unmarshall(item));
};
