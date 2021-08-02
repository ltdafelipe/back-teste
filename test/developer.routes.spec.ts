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

const developerTeste = {
  name: "Test",
  age: 25,
  birthdate: "1997-07-23T00:00:00.000Z",
  sex: "M",
  hobby: "Drive car",
};

describe("Testing server routes", () => {
  it("Request POST /developers insert and return a developer!", async () => {
    const resultInsert = await request(app)
      .post("/developers")
      .send(developerTeste);

    expect(resultInsert.status).toBe(201);
    expect(resultInsert.body.name).toBe("Test");
    expect(resultInsert.body.age).toBe(25);
    expect(resultInsert.body.sex).toBe("M");
    expect(resultInsert.body.hobby).toBe("Drive car");
    expect(resultInsert.body.birthdate).toBe("1997-07-23T00:00:00.000Z");

    updateState = resultInsert.body._id;
  });

  it("Request GET ALL /developers? should return Array!", async () => {
    const result = await request(app)
      .get("/developers?page=1&limit=5&search=")
      .send();

    expect(result.status).toBe(200);
    expect(result.body.countTotal).toBeTruthy();
    expect(result.body.countPages).toBeTruthy();

    firstState = result.body.developers.find(
      (result) => result.name === "Test"
    )._id;
  });

  it("Request GET ONE /developers/:_id should return one developer!", async () => {
    const result = await request(app).get(`/developers/${firstState}`).send();

    expect(result.status).toBe(200);
    expect(result.body._id).toEqual(firstState);
    expect(result.body.name).toBe("Test");
    expect(result.body.age).toBe(25);
    expect(result.body.sex).toBe("M");
    expect(result.body.hobby).toBe("Drive car");
    expect(result.body.birthdate).toBe("1997-07-23T00:00:00.000Z");
  });

  it("Request PUT /developers/:_id update and return a developer!", async () => {
    const resultUpdate = await request(app)
      .put(`/developers/${updateState}`)
      .send({
        ...developerTeste,
        age: 45,
      });

    expect(resultUpdate.status).toBe(200);
    expect(resultUpdate.body._id).toEqual(updateState);
    expect(resultUpdate.body.name).toBe("Test");
    expect(resultUpdate.body.sex).toBe("M");
    expect(resultUpdate.body.hobby).toBe("Drive car");
    expect(resultUpdate.body.birthdate).toBe("1997-07-23T00:00:00.000Z");
    expect(resultUpdate.body.age).toBe(45);

    deleteState = resultUpdate.body._id;
  });

  it("Request DELETE /developers/:_id delete one developer!", async () => {
    const resultDelete = await request(app)
      .delete(`/developers/${deleteState}`)
      .send();

    expect(resultDelete.status).toBe(204);
  });
});
