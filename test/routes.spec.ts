import express from "express";
import developer from "../src/routes/developer";
import bodyParser from "body-parser";
import request from "supertest";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", developer);
let firstState: string;
let updateState: string;
let deleteState: string;

describe("Testing server routes", () => {
  it("Request GET ALL /developers? should return Array!", async () => {
    const result = await request(app)
      .get("/developers?page=1&limit=5&search=")
      .send();

    expect(result.status).toBe(200);
    expect(result.body);
    expect(result.body.countTotal);
    expect(result.body.countPages);
    expect(result.body.developers);

    firstState = result.body.developers[0]._id;
  });

  it("Request GET ONE /developers/:_id should return one developer!", async () => {
    const result = await request(app).get(`/developers/${firstState}`).send();
    expect(result.status).toBe(200);
    expect(result.body);
  });

  it("Request POST /developers insert and return a developer!", async () => {
    let resultInsert = await request(app).post("/developers").send({
      name: "Test",
      age: 25,
      birthdate: "1997-07-23",
      sex: "M",
      hobby: "Drive car",
    });

    expect(resultInsert.status).toBe(201);
    expect(resultInsert.body);

    updateState = resultInsert.body._id;
  });

  it("Request PUT /developers/:_id update and return a developer!", async () => {
    const resultUpdate = await request(app)
      .put(`/developers/${updateState}`)
      .send({
        name: "Test updated",
        age: 30,
        birthdate: "1997-12-25",
        sex: "F",
        hobby: "Makeup",
      });

    expect(resultUpdate.status).toBe(200);
    expect(resultUpdate.body);

    deleteState = resultUpdate.body._id;
  });

  it("Request DELETE /developers/:_id delete one developer!", async () => {
    const resultDelete = await request(app)
      .delete(`/developers/${deleteState}`)
      .send();

    expect(resultDelete.status).toBe(204);
  });
});
