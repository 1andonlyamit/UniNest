class DepartmentsController {
    constructor() {
        this.departmentModel = new (require("../model/departments_m"));
    }

    // CREATE
    async create(req, res) {
        const { university_id, name, department_coordinator_name } = req.body;

        if (!university_id || !name) {
            return res.status(400).json({ message: "University ID and department name are required." });
        }

        const departmentData = {
            university_id,
            name,
            department_coordinator_name: department_coordinator_name || null
        };

        try {
            const result = await this.departmentModel.createDepartment(departmentData);
            if (!result) {
                return res.status(400).json({ message: "Department creation failed." });
            }
            return res.status(201).json({
                message: "Department created successfully",
                data: result
            });
        } catch (error) {
            return res.status(500).json({ message: "Server error.", error });
        }
    }

    // READ ALL
    async getAll(req, res) {
        try {
            const departments = await this.departmentModel.getAllDepartments();
            return res.status(200).json(departments);
        } catch (error) {
            return res.status(500).json({ message: "Server error.", error });
        }
    }

    // READ ONE
    async getOne(req, res) {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "Department ID is required." });
        }

        try {
            const department = await this.departmentModel.getDepartmentById(id);
            if (!department) {
                return res.status(404).json({ message: "Department not found." });
            }
            return res.status(200).json(department);
        } catch (error) {
            return res.status(500).json({ message: "Server error.", error });
        }
    }

    // UPDATE
    async update(req, res) {
        const { id } = req.params;
        const { university_id, name, department_coordinator_name } = req.body;

        if (!id || !university_id || !name) {
            return res.status(400).json({ message: "Department ID, university ID and department name are required." });
        }

        const departmentData = {
            university_id,
            name,
            department_coordinator_name: department_coordinator_name || null
        };

        try {
            const updated = await this.departmentModel.updateDepartment(id, departmentData);
            if (!updated) {
                return res.status(404).json({ message: "Department not found or not updated." });
            }
            return res.status(200).json({
                message: "Department updated successfully",
                data: updated
            });
        } catch (error) {
            return res.status(500).json({ message: "Server error.", error });
        }
    }

    // DELETE
    async delete(req, res) {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "Department ID is required." });
        }

        try {
            const deleted = await this.departmentModel.deleteDepartment(id);
            if (!deleted) {
                return res.status(404).json({ message: "Department not found." });
            }
            return res.status(200).json({ message: "Department deleted successfully" });
        } catch (error) {
            return res.status(500).json({ message: "Server error.", error });
        }
    }
}

module.exports = DepartmentsController;
