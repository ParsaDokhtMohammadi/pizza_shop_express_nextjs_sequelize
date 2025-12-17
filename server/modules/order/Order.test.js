import request from "supertest"
import { app } from "../../app"
import sequelize from "../../config/sequelize.config"
import { seed } from "../../seed"

describe('order tests', () => {
    let agent
    beforeAll(async () => {
        await seed()
        agent = request.agent(app)
        const loginRes = await agent.post("/api/auth/login")
            .send({ email: "john@example.com", password: "Aa12345678" })
        expect(loginRes.status).toBe(200)
    })
    afterAll(async () => {
        await sequelize.close()
    })
    test("should say invalid request", async () => {
        const res = await agent.post("/api/order").send({})
        expect(res.status).toBe(400)
        expect(res.type).toBe("application/json")
        expect(res.body.message).toBe("نوع سفارش الزامی است")
    })
    test("should say invalid request", async () => {
        const res = await agent.post("/api/order")
            .send({
                type: "notPickUp"
            })
        expect(res.status).toBe(400)
        expect(res.type).toBe("application/json")
        expect(res.body.message).toBe("نوع سفارش فقط می‌تواند pickUp یا delivery باشد")
    })
    test("should say fields not sent correctly", async () => {
        const res = await agent.post("/api/order").send({
            type: "delivery",
            discount: "test",
            phone_number: "09110000000"
        })
        expect(res.status).toBe(400)
        expect(res.type).toBe("application/json")

    })
    test("should say  mobile is required", async () => {
        const res = await agent.post("/api/order").send({
            type: "delivery",
            discount: "test",
            phone_number: ""
        })
        expect(res.status).toBe(400)
        expect(res.type).toBe("application/json")
        expect(res.body.message).toBe("شماره مبایل الزامی است")

    })
    test("should say fields mobile is not valid", async () => {
        const res = await agent.post("/api/order").send({
            type: "delivery",
            discount: "test",
            phone_number: "0911"
        })
        expect(res.status).toBe(400)
        expect(res.type).toBe("application/json")
        expect(res.body.message).toBe("شماره موبایل معتبر نیست")

    })
    test("should say discount not found", async () => {
        const res = await agent.post("/api/order").send({
            type: "pickUp",
            discount: "noDiscount",
            phone_number: "09110000000"
        })
        expect(res.status).toBe(404)
        expect(res.type).toBe("application/json")
        expect(res.body.message).toBe("کد تخفیف یافت نشد")
    })
    test("should say discount expired", async () => {
        const res = await agent.post("/api/order").send({
            type: "pickUp",
            discount: "testDiscount2",
            phone_number: "09110000000"
        })
        expect(res.status).toBe(400)
        expect(res.type).toBe("application/json")
        expect(res.body.message).toBe("کد تخفیف منقضی شده است")
    })
    test("should say order not found", async () => {
        const res = await agent.get("/api/order/aa")
        expect(res.status).toBe(404)
        expect(res.type).toBe("application/json")
        expect(res.body.message).toBe("سفارش موردنظر یافت نشد")
    })
    test("should make order", async () => {
        const res = await agent.post("/api/order").send({
            type: "delivery",
            address: "کوچه علی چپ",
            discount: "testDiscount",
            phone_number: "09115678901"
        })
        expect(res.status).toBe(200)
        expect(res.type).toBe("application/json")
        expect(res.body.message).toBe("سفارش ایجاد شد")
    })
    test("should find all orders by user", async () => {
        const res = await agent.get("/api/order")
        expect(res.status).toBe(200)
        expect(res.type).toBe("application/json")
        expect(res.body.message).toBe("سفارشات دریافت شد")
    })
    
    
})
