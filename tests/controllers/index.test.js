let api = require("./../bootstrap").api;
let Should = require("should");

describe("Index", () => {
  it("home", async () => {
    let body = await api.get("/");
    Should(body.statusCode).be.equal(200);
  });
});
