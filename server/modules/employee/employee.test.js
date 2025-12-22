import request from "supertest";
import { app } from "../../app.js";
import sequelize from "../../config/sequelize.config.js";
import { seed } from "../../seed.js";
import path from "path";

describe("Employee routes", () => {
  let agent;

  beforeAll(async () => {
    await seed();

    agent = request.agent(app);
    const loginRes = await agent.post("/api/auth/login").send({
      email: "admin@example.com",
      password: "Aa12345678"
    });

    expect(loginRes.status).toBe(200);
  });

  afterAll(async () => {
    await sequelize.close();
  });

  const imagePath = path.join(process.cwd(), "assets/test.png");

  test("should fail when image is not sent", async () => {
    const res = await agent
      .post("/api/employee")
      .field("social_code", "1234567890")
      .field("full_name", "Ali Rezaei")
      .field("email", "ali@test.com")
      .field("phone_number", "09123456789");

    expect(res.status).toBe(400);
  });

  test("should create employee successfully", async () => {
    const res = await agent
      .post("/api/employee")
      .field("social_code", "1234567890")
      .field("full_name", "Ali Rezaei")
      .field("email", "ali@test.com")
      .field("phone_number", "09123456789")
      .attach("image", imagePath);

    expect(res.status).toBe(200);
    expect(res.body.message).toBeDefined();
  });

  test("should update employee if social_code exists", async () => {
    const res = await agent
      .post("/api/employee")
      .field("social_code", "1234567890")
      .field("full_name", "Ali Updated")
      .field("email", "ali@test.com")
      .field("phone_number", "09123456789")
      .attach("image", imagePath);

    expect(res.status).toBe(200);
  });

  test("should get all employees", async () => {
    const res = await agent.get("/api/employee");

    expect(res.status).toBe(200);
  });

  test("should get employee by id", async () => {
    const res = await agent.get("/api/employee/1234567890");

    expect(res.status).toBe(200);
    expect(res.body.data.social_code).toBe("1234567890");
  });

  test("should delete employee", async () => {
    const res = await agent.delete("/api/employee/1234567890");

    expect(res.status).toBe(200);
  });

  test("should return 404 when deleting non-existing employee", async () => {
    const res = await agent.delete("/api/employee/9999999999");

    expect(res.status).toBe(404);
  });
});
