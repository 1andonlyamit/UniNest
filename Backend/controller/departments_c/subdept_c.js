// src/controllers/subdept_c.js
const SubDeptModel = require('../models/subdept_m');
const subDeptModel = new SubDeptModel();

class SubDeptController {
    async create(req, res) {
        try {
            const data = req.body;
            const newSubDept = await subDeptModel.create(data);
            res.status(201).json(newSubDept);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Failed to create sub-department" });
        }
    }

    async getAll(req, res) {
        try {
            const subDepts = await subDeptModel.getAll();
            res.status(200).json(subDepts);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Failed to fetch sub-departments" });
        }
    }

    async getById(req, res) {
        try {
            const { id } = req.params;
            const subDept = await subDeptModel.getById(id);
            if (!subDept) return res.status(404).json({ error: "Sub-department not found" });
            res.status(200).json(subDept);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Failed to fetch sub-department" });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const data = req.body;
            const updated = await subDeptModel.update(id, data);
            if (!updated) return res.status(404).json({ error: "Sub-department not found" });
            res.status(200).json({ message: "Sub-department updated successfully" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Failed to update sub-department" });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            const deleted = await subDeptModel.delete(id);
            if (!deleted) return res.status(404).json({ error: "Sub-department not found" });
            res.status(200).json({ message: "Sub-department deleted successfully" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Failed to delete sub-department" });
        }
    }
}

module.exports = SubDeptController;
