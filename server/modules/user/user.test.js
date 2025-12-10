import request from "supertest"
import {app} from "../../app.js";
import {modelsInit} from "../../config/models.init.js";
import {UserModel} from "./user.model.js";
import sequelize from "../../config/sequelize.config.js";


describe("POST /api/auth/register", () => {
    beforeAll(async () => {
        await modelsInit()
    })

    afterAll(async () => {1
        await sequelize.close();
    });
    test("should create user", async () => {
        const response = await request(app).post('/api/auth/register').send({
            full_name: "John Doe",
            password: "Aa12345678",
            email: "johnDoe@gmail.com"
        })
        expect(response.status).toBe(200)
        expect(response.type).toBe('application/json')
        expect(response.body.message).toBe('user created successfully.')
    })
    test("email, password and full_name is not given", async () => {
        const response = await request(app).post('/api/auth/register').send({
            full_name: "John Doe",
            password: "Aa12345678",
        })
        expect(response.status).toBe(400)
        expect(response.type).toBe('application/json')
        expect(response.body.message).toBe('Email is required')
    })
    test("should say invalid email", async () => {
        const response = await request(app).post('/api/auth/register').send({
            full_name: "John Doe",
            password: "Aa12345678",
            email: "johnDoel.com"
        })
        expect(response.status).toBe(400)
        expect(response.type).toBe('application/json')
        expect(response.body.message).toBe('Invalid email')
    })
    test("should say password must be between 8 and 32 chars", async () => {
        const response = await request(app).post('/api/auth/register').send({
            full_name: "John Doe",
            password: "1234",
            email: "johnDoel@gmail.com"})
        expect(response.status).toBe(400)
        expect(response.type).toBe('application/json')
        expect(response.body.message).toBe('Password must be between 8 and 32 charecters')
    })
    test("should say user already exists", async () => {
        const response = await request(app).post('/api/auth/register').send({
            full_name: "John Doe",
            password: "Aa12345678",
            email: "johnDoe@gmail.com"
        })
        expect(response.status).toBe(400)
        expect(response.type).toBe('application/json')
        expect(response.body.message).toBe('user with this email already exists')
    })
    test("should find user in database", async () => {
         const user = await UserModel.findOne({where : {email : "johnDoe@gmail.com"}})
         expect(user).toBeTruthy()
    })
})
