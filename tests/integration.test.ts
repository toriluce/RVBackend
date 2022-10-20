import axios from "axios";
import { DynamoDBClient, GetItemCommand } from "@aws-sdk/client-dynamodb";

const REGION = "us-east-1";
const url = "http://localhost:3001";

describe("/ping", () => {
  it("should work", async () => {
    const pingResult = await axios.get(`${url}/ping`);

    expect(pingResult.data).toEqual({
      message: "Ping works!",
    });
  });
});

describe("/admin/campground", () => {
  it("should return the new campground and create it in dynamodb", async () => {
    const createCampgroundResult = await axios.post(`${url}/admin/campground`, {
      name: "Blah RV Resort",
      address: "Arizona, USA",
      photos: ["photo1"],
      description: "The best RV park for a canyon view!",
    });
    const ddbClient = new DynamoDBClient({ region: REGION });
    const dbRes = await ddbClient.send(
      new GetItemCommand({
        TableName: "Campgrounds",
        Key: {
          S: createCampgroundResult.data.campgroundId,
        },
      })
    );
    expect(createCampgroundResult.status).toEqual(201);
    expect(createCampgroundResult.data).toEqual({
      campgroundId: expect.anything(),
      name: "Canyon RV Resort",
      address: "Arizona, USA",
      photos: ["photo1.jpeg"],
      description: "The best RV park for a canyon view!",
    });

    expect(dbRes.Item).toBeDefined();
  });
});
