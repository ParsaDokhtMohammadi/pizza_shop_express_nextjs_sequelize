import request from "supertest";
import { app } from "../../app.js";
import sequelize from "../../config/sequelize.config.js";
import { seed } from "../../seed.js";

describe("Discount tests", () => {
    let agent;
    let createdDiscountId;

    beforeAll(async () => {
        await seed();
        agent = request.agent(app);

        const loginRes = await agent
            .post("/api/auth/login")
            .send({
                email: "admin@example.com",
                password: "Aa12345678",
            });

        expect(loginRes.status).toBe(200);
    });

    afterAll(async () => {
        await sequelize.close();
    });


    test("should fail because percentage is required", async () => {
        const res = await agent.post("/api/discount").send({
            name: "Yalda Discount",
            code: "yalda-test",
            limit: 10
        });

        expect(res.status).toBe(400);
        expect(res.body.message).toContain("درصد تخفیف الزامی است");
    });


    test("should create discount successfully", async () => {
        const res = await agent.post("/api/discount").send({
            name: "Test Discount",
            code: "test-20",
            percentage: 20,
            limit: 5
        });

        expect(res.status).toBe(200);
        expect(res.body.message).toBe("کد تخفیف ایجاد شد");


        const all = await agent.get("/api/discount");
        const created = all.body.data.find(d => d.code === "test-20");
        createdDiscountId = created.id;
    });

    test("should fail on duplicate discount code", async () => {
        const res = await agent.post("/api/discount").send({
            name: "Duplicate",
            code: "test-20",
            percentage: 10
        });

        expect(res.status).toBe(409);
        expect(res.body.message).toBe("یک تخفیف دیگر با این کد وجود دارد");
    });

    test("should get all discounts", async () => {
        const res = await agent.get("/api/discount");

        expect(res.status).toBe(200);
        expect(Array.isArray(res.body.data)).toBe(true);
        expect(res.body.data.length).toBeGreaterThan(0);
    });


    test("should fail deleting non-existing discount", async () => {
        const res = await agent.delete("/api/discount/not-exist-id");

        expect(res.status).toBe(404);
        expect(res.body.message).toBe("کد تخفیف یافت نشد");
    });


    test("should delete discount successfully", async () => {
        const res = await agent.delete(`/api/discount/${createdDiscountId}`);

        expect(res.status).toBe(200);
        expect(res.body.message).toBe("کد تخفیف با موفقیت حذف شد");
    });
});
