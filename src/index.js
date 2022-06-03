require("dotenv").config();
const express = require("express");
const connect = require("./config/db");
const {login, register} = require("./controllers/auth.controller");
const userController = require("./controllers/user.controller");
const flatController = require("./controllers/flat.controller");
const dhtmlController = require("./controllers/dhtml.controller");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());


//starting api routers and methods from here.
//sending this call to respective controllers to find route and desired method.

//user controller
app.use("/users", userController);

//flat controller
app.use("/flat", flatController);

//dhtml controller
app.use('/dhtml',dhtmlController);

//login and register controller
app.post("/login", login)
app.post("/register", register)




//connecting ans starting server
const port = process.env.PORT || 1698;

app.listen(port, () => {
    try{
        connect();
        console.log(`Server is running on port ${port}`);
    }catch(err){

    }
})