const Model = require("./projects.model");
const memberModel = require("../members/members.model");
const roleAssignmentModel = require("../assignments/role-assignment.model");
const mongoose = require("mongoose");

const createProject = async({ownerId, title, description, status, dueDate, startedAt}) => {
    const existingProject = await Model.findOne({title});

    if(existingProject) {
        throw new Error(`Project with title ${existingProject.title} exists`)
    };
    if(status == "active") {
        startedAt = Date.now();
    };

    const session = await mongoose.startSession();
    //This session makes sure if there's an error with one of the documents, the others won't be created, it is called all/none

    await session.withTransaction(async () => {
        const createProject = await Model.create(
          [{ ownerId, title, description, status, dueDate, startedAt }],
          { session }
        );

        const updateMember = await memberModel.create(
          [{ projectId: createProject[0]._id, userId: ownerId }],
          { session }
        );

        const updateMemberRole = await roleAssignmentModel.create(
          [
            {
              memberId: updateMember[0]._id,
              roleId: "697027c23ccc90ee256829dd",
              projectId: createProject[0]._id,
            },
          ],
          { session }
        );
    });
    session.endSession();
};

const getAllProjects = async({userId})  => {
    const getMember = await memberModel.find({userId: userId}).populate("projectId").select("projectId");
    return getMember.map(a => a.projectId);
};

module.exports = {
    createProject,
    getAllProjects
};