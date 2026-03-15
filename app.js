const express = require("express");
const db = require("./config/db");
const passport = require("passport");
require("dotenv").config();

const app = express();
app.use(express.json());

//connect to database
db.connection();

app.get("/homepage", (req, res) => {
    res.status(200).json("Welcome to Task/Project Management API Homepage")
});

// admin routes
const rolesRoute = require("./Admin/roles.route");
app.use("/api/v1/admin/role", rolesRoute);

const permissionRoute = require("./Admin/permissions.route");
app.use("/api/v1/admin/permission", permissionRoute);

const rolePermissionRoute = require("./Admin/role-permission.route");
app.use("/api/v1/admin/role", rolePermissionRoute);


//User routes
app.use(passport.initialize());

const authRoute = require("./auth/auth.route");
app.use("/api/v1/auth", authRoute);



module.exports = app;