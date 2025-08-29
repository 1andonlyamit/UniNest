const DatabaseService = require("../../services/dbhelper");

class DepartmentsController {
    constructor() {
        this.dbService = new DatabaseService();
    }

    // CREATE
    async create(req, res) {
        try {
            const { university_id, name, department_coordinator_name } = req.body;

            const query = `
                INSERT INTO departments (university_id, name, department_coordinator_name)
                VALUES (?, ?, ?)
            `;

            const result = await this.dbService.executeQuery(query, [
                university_id,
                name,
                department_coordinator_name
            ]);

            res.status(201).json({
                message: "Department created successfully",
                departmentId: result.insertId
            });
        } catch (err) {
            console.error("Error creating department:", err);
            res.status(500).json({ message: "Server error", error: err.message });
        }
    }

    // READ all
    async getAll(req, res) {
        try {
            const query = "SELECT * FROM departments";
            const result = await this.dbService.executeQuery(query);
            res.json(result);
        } catch (err) {
            res.status(500).json({ message: "Server error", error: err.message });
        }
    }

    // READ one
    async getOne(req, res) {
        try {
            const { id } = req.params;
            const query = "SELECT * FROM departments WHERE id = ?";
            const result = await this.dbService.executeQuery(query, [id]);

            if (result.length === 0) {
                return res.status(404).json({ message: "Department not found" });
            }
            res.json(result[0]);
        } catch (err) {
            res.status(500).json({ message: "Server error", error: err.message });
        }
    }

    // UPDATE
    async update(req, res) {
        try {
            const { id } = req.params;
            const { name, department_coordinator_name } = req.body;

            const query = `
                UPDATE departments
                SET name = ?, department_coordinator_name = ?
                WHERE id = ?
            `;

            const result = await this.dbService.executeQuery(query, [
                name,
                department_coordinator_name,
                id
            ]);

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "Department not found" });
            }

            res.json({ message: "Department updated successfully" });
        } catch (err) {
            res.status(500).json({ message: "Server error", error: err.message });
        }
    }

    // DELETE
    async delete(req, res) {
        try {
            const { id } = req.params;
            const query = "DELETE FROM departments WHERE id = ?";
            const result = await this.dbService.executeQuery(query, [id]);

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "Department not found" });
            }

            res.json({ message: "Department deleted successfully" });
        } catch (err) {
            res.status(500).json({ message: "Server error", error: err.message });
        }
    }
}

module.exports = DepartmentsController;
