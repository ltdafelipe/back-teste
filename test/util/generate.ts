import faker from "faker";

export function generateDeveloperData(overide = {}) {
  return {
    id: faker.datatype.uuid(),
    name: faker.name.firstName(),
    age: faker.datatype.number(99),
    birthdate: new Date("20-07-1997"),
    hobby: faker.company.bsAdjective(),
    sex: "M",
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide,
  };
}

export function generateDevelopersData(n = 1) {
  return Array.from(
    {
      length: n,
    },
    (_, _i) => {
      return generateDeveloperData();
    }
  );
}

export function generateDeveloperInsert() {
  return {
    name: faker.name.firstName(),
    sex: "M",
    age: faker.datatype.number(99),
    hobby: faker.company.bsAdjective(),
    birthdate: new Date("20-07-1997"),
  };
}
