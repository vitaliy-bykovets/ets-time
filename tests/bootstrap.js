const server = require("./../server");
const supertest = require("supertest");

module.exports.api = supertest.agent(server.listen());
