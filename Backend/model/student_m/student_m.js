// models/student_m.js
const DatabaseService = require("../../services/dbhelper");
const db = new DatabaseService();

class StudentModel {
    constructor() {
        db.connect().catch(err => console.error("DB Connection Error:", err));
    }

    async createStudent(data) {
        const {
            full_name,
            enrollment_num,
            class_id,
            email,
            phone,
            password
        } = data;

        const query = `
            INSERT INTO students
            (full_name, enrollment_num, class_id, role_id, email, phone, password)
            VALUES (?, ?, ?, 3, ?, ?, ?)
        `;
        const result = await db.executeQuery(query, [full_name, enrollment_num, class_id, email, phone || null, password]);
        return {
            id: result.insertId,
            full_name,
            enrollment_num,
            class_id,
            role_id: 3,
            email,
            phone: phone || null
        };
    }

    async getAllStudents() {
        const query = "SELECT * FROM students";
        return await db.executeQuery(query);
    }

    async getStudentById(id) {
        const query = "SELECT * FROM students WHERE id = ?";
        const rows = await db.executeQuery(query, [id]);
        return rows[0];
    }

    async updateStudent(id, data) {
        const fields = [];
        const values = [];

        if (data.full_name !== undefined) {
            fields.push("full_name = ?");
            values.push(data.full_name);
        }
        if (data.enrollment_num !== undefined) {
            fields.push("enrollment_num = ?");
            values.push(data.enrollment_num);
        }
        if (data.class_id !== undefined) {
            fields.push("class_id = ?");
            values.push(data.class_id);
        }
        if (data.email !== undefined) {
            fields.push("email = ?");
            values.push(data.email);
        }
        if (data.phone !== undefined) {
            fields.push("phone = ?");
            values.push(data.phone);
        }
        if (data.verification_status !== undefined) {
            fields.push("verification_status = ?");
            values.push(data.verification_status);
        }
        if (data.isBlacklisted !== undefined) {
            fields.push("isBlacklisted = ?");
            values.push(data.isBlacklisted);
        }
        if (data.blacklistReason !== undefined) {
            fields.push("blacklistReason = ?");
            values.push(data.blacklistReason);
        }
        if (data.is_email_verified !== undefined) {
            fields.push("is_email_verified = ?");
            values.push(data.is_email_verified);
        }
        if (data.password !== undefined) {
            fields.push("password = ?");
            values.push(data.password);
        }

        if (fields.length === 0) return 0;

        const query = `UPDATE students SET ${fields.join(", ")} WHERE id = ?`;
        values.push(id);

        const result = await db.executeQuery(query, values);
        if (result.affectedRows === 0) return null;

        return await this.getStudentById(id);
    }


    async deleteStudent(id) {
        const query = "DELETE FROM students WHERE id = ?";
        const result = await db.executeQuery(query, [id]);
        return result.affectedRows > 0;
    }
}

module.exports = StudentModel;
