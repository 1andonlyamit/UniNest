// src/models/subdept_m.js
const db = require('../dbhelper');

class SubDeptModel {
    async create(data) {
        const { department_id, name } = data;
        const query = `INSERT INTO sub_departments (department_id, name) VALUES (?, ?)`;
        const [result] = await db.query(query, [department_id, name]);
        return { id: result.insertId, department_id, name };
    }

    async getAll() {
        const query = `
            SELECT sd.*, d.name AS department_name
            FROM sub_departments sd
            JOIN departments d ON sd.department_id = d.id
        `;
        const [rows] = await db.query(query);
        return rows;
    }

    async getById(id) {
        const query = `
            SELECT sd.*, d.name AS department_name
            FROM sub_departments sd
            JOIN departments d ON sd.department_id = d.id
            WHERE sd.id = ?
        `;
        const [rows] = await db.query(query, [id]);
        return rows[0];
    }

    async update(id, data) {
        const { department_id, name } = data;
        const query = `UPDATE sub_departments SET department_id = ?, name = ? WHERE id = ?`;
        const [result] = await db.query(query, [department_id, name, id]);
        return result.affectedRows > 0;
    }

    async delete(id) {
        const query = `DELETE FROM sub_departments WHERE id = ?`;
        const [result] = await db.query(query, [id]);
        return result.affectedRows > 0;
    }
}

module.exports = SubDeptModel;
