// models/departments_m/class_m.js
const DatabaseService = require("../../services/dbhelper");
const db = new DatabaseService();

class ClassesModel {
    constructor() {
        // Ensure DB is connected
        db.connect().catch(err => console.error("DB Connection Error:", err));
    }

    // Create a new class
    async createClass(data) {
        const { sub_department_id, name, batch_year, section } = data;
        const query = `
            INSERT INTO classes (sub_department_id, name, batch_year, section)
            VALUES (?, ?, ?, ?)
        `;
        const result = await db.executeQuery(query, [sub_department_id, name, batch_year, section || null]);
        return {
            id: result.insertId,
            sub_department_id,
            name,
            batch_year,
            section: section || null
        };
    }

    // Get all classes
    async getAllClasses() {
        const query = "SELECT * FROM classes";
        return await db.executeQuery(query);
    }

    // Get class by ID
    async getClassById(id) {
        const query = "SELECT * FROM classes WHERE id = ?";
        const rows = await db.executeQuery(query, [id]);
        return rows[0];
    }

    // Update class
    async updateClass(id, data) {
        const { sub_department_id, name, batch_year, section } = data;
        const query = `
            UPDATE classes
            SET sub_department_id = ?, name = ?, batch_year = ?, section = ?
            WHERE id = ?
        `;
        const result = await db.executeQuery(query, [sub_department_id, name, batch_year, section || null, id]);
        if (result.affectedRows === 0) return null;
        return {
            id,
            sub_department_id,
            name,
            batch_year,
            section: section || null
        };
    }

    // Delete class
    async deleteClass(id) {
        const query = "DELETE FROM classes WHERE id = ?";
        const result = await db.executeQuery(query, [id]);
        return result.affectedRows > 0;
    }
}

module.exports = ClassesModel;
