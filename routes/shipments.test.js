"use strict";

const request = require("supertest");
const app = require("../app");


describe("POST /", function () {
  test("valid", async function () {
    const resp = await request(app).post("/shipments").send({
      productId: 1000,
      name: "Test Tester",
      addr: "100 Test St",
      zip: "12345-6789",
    });

    expect(resp.body).toEqual({ shipped: expect.any(Number) });
  });

  test("invalid productId-- less than 1000", async function () {
    const resp = await request(app).post("/shipments").send({
      productId: 999,
      name: "Test Tester",
      addr: "100 Test St",
      zip: "12345-6789",
    });

    expect(resp.statusCode).toEqual(400);
    console.log("RESP.BODY.ERROR")
    expect(resp.body.error.message).toEqual([
			"instance.productId must be greater than or equal to 1000"
		]);
  });

  test("invalid: missing name", async function () {
    const resp = await request(app).post("/shipments").send({
      productId: 1000,
      addr: "100 Test St",
      zip: "12345-6789",
    });

    expect(resp.statusCode).toEqual(400);
    expect(resp.body.error.message).toEqual([
      "instance requires property \"name\""
    ])
  });

  test("invalid: empty object", async function () {
    const resp = await request(app).post("/shipments").send({});

    expect(resp.statusCode).toEqual(400);
    expect(resp.body.error.message).toEqual([
			"instance requires property \"productId\"",
			"instance requires property \"name\"",
			"instance requires property \"addr\"",
			"instance requires property \"zip\""
		])
  });

});
