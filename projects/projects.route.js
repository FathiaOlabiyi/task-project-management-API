const Controllers = require("./projects.controller");
const Authenticate = require("../auth/auth.middleware");
const express = require("express");

const Router = express.Router();

Router.post("/project", Authenticate.validateToken, Controllers.createProject);
Router.get("/project", Authenticate.validateToken, Controllers.getAllProjects);


module.exports = Router;