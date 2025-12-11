import request, { agent } from "supertest"
import { app } from "../../app.js";
import { modelsInit } from "../../config/models.init.js";
import { UserModel } from "../user/user.model.js";
import sequelize from "../../config/sequelize.config.js";


describe("auth tests register,login,logout", () => {
    let agent
    beforeAll(async () => {
        await modelsInit()
    })
    beforeEach(() => {
        agent = request.agent(app)
    })

    afterAll(async () => {
        1
        await sequelize.close();
    });
    test("should create user", async () => {
        const response = await agent.post('/api/auth/register').send({
            full_name: "John Doe",
            password: "Aa12345678",
            email: "johnDoe@gmail.com"
        })
        expect(response.status).toBe(200)
        expect(response.type).toBe('application/json')
        expect(response.body.message).toBe('user created successfully.')
    })
    test("email, password and full_name is not given", async () => {
        const response = await agent.post('/api/auth/register').send({
            full_name: "John Doe",
            password: "Aa12345678",
        })
        expect(response.status).toBe(400)
        expect(response.type).toBe('application/json')
        expect(response.body.message).toBe('Email is required')
    })
    test("should say invalid email", async () => {
        const response = await agent.post('/api/auth/register').send({
            full_name: "John Doe",
            password: "Aa12345678",
            email: "johnDoel.com"
        })
        expect(response.status).toBe(400)
        expect(response.type).toBe('application/json')
        expect(response.body.message).toBe('Invalid email')
    })
    test("should say password must be between 8 and 32 chars", async () => {
        const response = await agent.post('/api/auth/register').send({
            full_name: "John Doe",
            password: "1234",
            email: "johnDoel@gmail.com"
        })
        expect(response.status).toBe(400)
        expect(response.type).toBe('application/json')
        expect(response.body.message).toBe('Password must be between 8 and 32 charecters')
    })
    test("should say user already exists", async () => {
        const response = await agent.post('/api/auth/register').send({
            full_name: "John Doe",
            password: "Aa12345678",
            email: "johnDoe@gmail.com"
        })
        expect(response.status).toBe(400)
        expect(response.type).toBe('application/json')
        expect(response.body.message).toBe('user with this email already exists')
    })
    test("should find user in database", async () => {
        const user = await UserModel.findOne({ where: { email: "johnDoe@gmail.com" } })
        expect(user).toBeTruthy()
    })
    test("should login user And not allow second login", async () => {
        const response = await agent.post('/api/auth/login').send({
            email: "johnDoe@gmail.com",
            password: "Aa12345678"
        })
        expect(response.status).toBe(200)
        expect(response.type).toBe('application/json')
        expect(response.body.message).toBe('login successful.')
        expect(response.headers['set-cookie']).toBeDefined()
        const responstAfterLogin = await agent.post("/api/auth/login").send({
            email: "johnDoe@gmail.com",
            password: "Aa12345678"
        })
        expect(responstAfterLogin.status).toBe(400)
        expect(responstAfterLogin.type).toBe('application/json')
        expect(responstAfterLogin.body.message).toBe("you are already logged in.")
    })
    test("should say password error", async () => {
        const response = await agent.post("/api/auth/login").send({
            email: "johnDoe@gmail.com",
            password: "12345678"
        })
        expect(response.status).toBe(400)
        expect(response.body.message).toBe("Password must contain at least one letter and one number")
        expect(response.type).toBe('application/json')
        expect(response.headers['set-cookie']).not.toBeDefined() 
    })
    test("should say password is incorect",async()=>{
        const response = await agent.post("/api/auth/login").send({
            email: "johnDoe@gmail.com",
            password: "12345678"
        })
        expect(response.status).toBe(400)
        expect(response.body.message).toBe("Password must contain at least one letter and one number")
        expect(response.type).toBe('application/json')
        expect(response.headers['set-cookie']).not.toBeDefined() 
    })
    test("should say password is required",async()=>{
        const response = await agent.post("/api/auth/login").send({
            email: "johnDoe@gmail.com"
        })
        expect(response.status).toBe(400)
        expect(response.body.message).toBe("Password is required")
        expect(response.type).toBe('application/json')
        expect(response.headers['set-cookie']).not.toBeDefined() 
    })
    test("should logout user",async()=>{
        const response = await agent.get("/api/auth/logout")
        expect(response.status).toBe(200)
        expect(response.type).toBe('application/json')
        expect(response.body.message).toBe("logout successful.")
    })
})
