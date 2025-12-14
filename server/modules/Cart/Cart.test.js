import request from "supertest"
import { app } from "../../app"
import sequelize from "../../config/sequelize.config.js";
import { setupTestDB } from "../../common/test/setupTestDB.js";



describe("cart tests add/delete", () => {
    let agent;


    beforeAll(async () => {
        await setupTestDB();
        agent = request.agent(app);
        const loginRes = await agent
            .post("/api/auth/login")
            .send({
                email: "john@example.com",
                password: "Aa12345678",
            });

        expect(loginRes.status).toBe(200);
    })

    afterAll(async () => {
        await sequelize.close();
    });
    test("should add item to cart", async () => {
        const res = await agent
            .post("/api/cart/add")
            .send({
                item_id: "i1",
                quantity: 2,
            });

        expect(res.status).toBe(200);
        expect(res.type).toBe("application/json");
        expect(res.body.message).toBe("ایتم به سبد خرید اضافه شد")
    });
    test("should say incompelete data", async () => {
        const res = await agent.post("/api/cart/add")
            .send({
                item_id: "i1"
            })
        expect(res.status).toBe(400)
        expect(res.type).toBe("application/json")
        expect(res.body.message).toBe("فیلد های مورد نیاز ارسال نشده اند")
    })
    test("should delete", async () => {
        const res = await agent.delete("/api/cart/delete").send({
            item_id: "i1"
        })
        expect(res.status).toBe(200);
        expect(res.type).toBe("application/json");
        expect(res.body.message).toBe("آیتم از سبد خرید حذف شد")
    })
    test("should say item not in cart", async () => {
        const res = await agent.delete("/api/cart/delete").send({
            item_id: "i1"
        })
        expect(res.status).toBe(404);
        expect(res.type).toBe("application/json");
        expect(res.body.message).toBe("آیتم در سبد خرید یافت نشد")
    })
    test("should say incompelete data", async () => {
        const res = await agent.delete("/api/cart/delete").send({
           
        })
        expect(res.status).toBe(400);
        expect(res.type).toBe("application/json");
        expect(res.body.message).toBe("فیلد های مورد نیاز ارسال نشده اند")
    })
    test("should say unauthorized",async()=>{
        const res = await agent.get("/api/cart/u2")
        expect(res.status).toBe(401)
        expect(res.type).toBe("application/json")
        expect(res.body.message).toBe("دسترسی ندارید")
    })
    test("should get users cart",async()=>{
        const res = await agent.get("/api/cart/u1")
        expect(res.status).toBe(200)
        expect(res.type).toBe("application/json")
        expect(res.body.message).toBe("سبد خرید دریافت شد")
    })
})