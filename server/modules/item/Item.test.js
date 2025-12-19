import request from "supertest"
import { app } from "../../app"
import sequelize from "../../config/sequelize.config.js";
import { seed } from "../../seed.js";
import path from "path"
describe('item tests', () => {
    let agent
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
    })
    afterAll(async () => {
        await sequelize.close()
    })
    test("should fail because price is required", async () => {
        const res = await agent
            .post("/api/product")
            .field("name", "testing")
            .field("description", "MyDesc")
            .field("category", "Pizza")
            .attach(
                "image",
                path.resolve("assets/test.png")
            );
        expect(res.status).toBe(400)
        expect(res.type).toBe("application/json")
    })
    test("should fail because image is required", async () => {
        const res = await agent
            .post("/api/product")
            .field("name", "testing")
            .field("description", "MyDesc")
            .field("category", "Pizza")
            .field("price", 10000)
        expect(res.status).toBe(500)
        expect(res.type).toBe("application/json")
    })
    test("should fail because category is not correct", async () => {
        const res = await agent
            .post("/api/product")
            .field("name", "testing")
            .field("description", "MyDesc")
            .field("category", "random")
            .field("price", 100000)
            .attach(
                "image",
                path.resolve("assets/test.png")
            )
        expect(res.status).toBe(400)
        expect(res.type).toBe("application/json")
    })
    test("should create item",async()=>{
         const res = await agent
            .post("/api/product")
            .field("name", "testing")
            .field("description", "MyDesc")
            .field("category", "Pizza")
            .field("price", "100000")
            .attach(
                "image",
                path.resolve("assets/test.png")
            )
            expect(res.status).toBe(200)
            expect(res.type).toBe("application/json")
            expect(res.body.message).toBe("آیتم ساخته شد")
    })
    
    test("should fail update because item was not found",async()=>{
         const res = await agent
            .post("/api/product/sefsefse")
            .field("name", "testing")
            .field("description", "MyDesc")
            .field("category", "Pizza")
            .field("price", "100000")
            .attach(
                "image",
                path.resolve("assets/test.png")
            )
            expect(res.status).toBe(404)
            expect(res.type).toBe("application/json")
            expect(res.body.message).toBe("محصول یافت نشد")
    })
    
    test("should update item",async()=>{
         const res = await agent
            .post("/api/product/i1")
            .field("name", "testing")
            .field("description", "MyDesc")
            .field("category", "Pizza")
            .field("price", "100000")
            .attach(
                "image",
                path.resolve("assets/test.png")
            )
            expect(res.status).toBe(200)
            expect(res.type).toBe("application/json")
            expect(res.body.message).toBe("محصول با موفقیت بروزرسانی شد")
    })
    test("should get item by id",async()=>{
         const res = await agent
            .get("/api/product/i1")
            
            expect(res.status).toBe(200)
            expect(res.type).toBe("application/json")
            expect(res.body.message).toBe("محصول دریافت شدند")
    })
    test("should get all items",async()=>{
         const res = await agent
            .get("/api/product")
            
            expect(res.status).toBe(200)
            expect(res.type).toBe("application/json")
            expect(res.body.message).toBe("محصولات دریافت شدند")
    })
    test("should delete item",async()=>{
         const res = await agent
            .delete("/api/product/i1")
            
            expect(res.status).toBe(200)
            expect(res.type).toBe("application/json")
            expect(res.body.message).toBe("محصول با موفقیت حذف شد")
    })
    
})
