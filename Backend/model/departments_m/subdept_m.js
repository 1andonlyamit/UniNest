// models/subdept_m.js
const DatabaseService = require("../../services/dbhelper"); // updated path
const db = new DatabaseService();

class SubDepartmentsModel {
    constructor() {
        // Ensure the DB is connected when model is instantiated
        db.connect().catch(err => console.error("DB Connection Error:", err));
    }

    // Create a new sub-department
    async createSubDepartment(data) {
        const { department_id, name } = data;
        const query = `
            INSERT INTO sub_departments (department_id, name)
            VALUES (?, ?)
        `;
        const result = await db.executeQuery(query, [department_id, name]);
        return {
            id: result.insertId,
            department_id,
            name
        };
    }

    // Get all sub-departments
    async getAllSubDepartments() {
        const query = "SELECT * FROM sub_departments";
        return await db.executeQuery(query);
    }

    // Get sub-department by ID
    async getSubDepartmentById(id) {
        const query = "SELECT * FROM sub_departments WHERE id = ?";
        const rows = await db.executeQuery(query, [id]);
        return rows[0];
    }

    // Update sub-department
    async updateSubDepartment(id, data) {
        const { department_id, name } = data;
        const query = `
            UPDATE sub_departments 
            SET department_id = ?, name = ?
            WHERE id = ?
        `;
        const result = await db.executeQuery(query, [department_id, name, id]);
        if (result.affectedRows === 0) return null;
        return { id, department_id, name };
    }

    // Delete sub-department
    async deleteSubDepartment(id) {
        const query = "DELETE FROM sub_departments WHERE id = ?";
        const result = await db.executeQuery(query, [id]);
        return result.affectedRows > 0;
    }
}

module.exports = SubDepartmentsModel;
