import axios from "axios";
import {
  DynamoDBClient,
  GetItemCommand,
} from "@aws-sdk/client-dynamodb";

const REGION = "us-east-1";
const ddbClient = new DynamoDBClient({ region: REGION });
const url = "http://localhost:3001";

describe("/ping", () => {
  it("should work", async () => {
    const pingResult = await axios.get(`${url}/ping`);

    expect(pingResult.data).toEqual({
      message: "Ping works!",
    });
  });
});

describe("POST /admin/campground", () => {
  it("should return the new campground and create it in dynamodb", async () => {
    const description = "Test #" + Math.random() * 100;

    const createCampgroundResult = await axios.post(
      `${url}/admin/campground`,
      {
        name: "Test RV Resort",
        address: "Test, USA",
        photos: [
          "testPhoto1.jpeg",
          "testPhoto2.jpeg",
          "testPhoto3.jpeg",
        ],
        description: description,
      }
    );

    const dbRes = await ddbClient.send(
      new GetItemCommand({
        TableName: "Campgrounds",
        Key: {
          campgroundId: {
            S: createCampgroundResult.data.campgroundId,
          },
        },
      })
    );
    expect(createCampgroundResult.status).toEqual(201);
    expect(createCampgroundResult.data).toEqual({
      campgroundId: expect.anything(),
      name: "Test RV Resort",
      address: "Test, USA",
      photos: [
        "testPhoto1.jpeg",
        "testPhoto2.jpeg",
        "testPhoto3.jpeg",
      ],
      description: description,
    });

    expect(dbRes.Item).toBeDefined();
  });
});

describe("GET /campgrounds", () => {
  it("should get the campgrounds", async () => {
    const getCampgroundsResult = await axios.get(
      `${url}/campgrounds`
    );

    expect(getCampgroundsResult.status).toEqual(200);
    expect(getCampgroundsResult.data).toBeDefined();
  });
});
