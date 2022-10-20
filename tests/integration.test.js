const axios = require('axios');

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
    it("should return the new campground", async () => {
        const createCampgroundResult = await axios.post(`${url}/admin/campground`, {
            name: "Blah RV Resort",
            address: "Arizona, USA",
            photos: ["photo1"],
            description: "The best RV park for a canyon view!",
        });
       

        expect(createCampgroundResult.status).toEqual(201);
        expect(createCampgroundResult.data).toEqual({
            campgroundId: expect.anything(),
            name: "Blah RV Resort",
            address: "Arizona, USA",
            photos: ["photo1"],
            description: "The best RV park for a canyon view!",
        });
        
    });
})

