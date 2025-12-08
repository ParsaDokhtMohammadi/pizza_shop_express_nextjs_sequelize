import sequelize from "./sequelize.config.js";

export async function modelsInit(){
    await sequelize.authenticate()
    await sequelize.sync({force:true});


    console.log("connected to db")
}