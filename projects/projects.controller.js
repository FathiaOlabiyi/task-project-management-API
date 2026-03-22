const Services = require("./projects.service");


const createProject = async(req, res) => {
    try {
        const ownerId = req.user.id;
        const payload = req.body;
            
        const response = await Services.createProject({ownerId, title: payload.title, description: payload.description, status: payload.status, dueDate: payload.dueDate, startedAt: payload.startedAt});
        return res.status(201).json({
            message: "Project created successfully",
            data: response
        });
    }catch(err) {
        if(err && err.message.includes("exists")) {
            return res.status(409).json({
                message: err.message
            });
        };

        res.status(500).json({
            message: "Internal server error",
            error: err.message
        });
        console.log(req.user);
    };
};

const getAllProjects = async(req, res) => {
    try {
        const userId = req.user.id
        const response = await Services.getAllProjects({userId});
        return res.status(200).json({message: "Projects returned successfully", data: response})
    }catch(err) {
        res.status(500).json({error: err.message})
    };
};

module.exports = {
    createProject,
    getAllProjects
};