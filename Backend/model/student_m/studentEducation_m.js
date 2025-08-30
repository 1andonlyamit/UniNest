const DatabaseService = require('../../services/dbhelper');
const db = new DatabaseService();

class StudentEducationModel {
    constructor() {
        db.connect().catch(err => console.error("DB Connection Error:", err));
    }

    // CREATE
    async createEducation(data) {
        const {
            student_id,
            level,
            is_current,
            institution_name,
            board_university,
            start_year,
            end_year,
            cgpa,
            percentage
        } = data;

        const query = `
            INSERT INTO student_education
            (student_id, level, is_current, institution_name, board_university, start_year, end_year, cgpa, percentage)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const params = [
            student_id,
            level,
            is_current,
            institution_name || null,
            board_university || null,
            start_year || null,
            end_year || null,
            cgpa || null,
            percentage || null
        ];

        return await db.executeQuery(query, params);
    }

    // READ all for a student
    async getEducationsByStudent(student_id) {
        const query = `SELECT * FROM student_education WHERE student_id = ?`;
        return await db.executeQuery(query, [student_id]);
    }

    // READ single record by id
    async getEducationById(id) {
        const query = `SELECT * FROM student_education WHERE id = ?`;
        const rows = await db.executeQuery(query, [id]);
        return rows[0];
    }

    // UPDATE
    async updateEducation(id, data) {
        const {
            level,
            is_current,
            institution_name,
            board_university,
            start_year,
            end_year,
            cgpa,
            percentage
        } = data;

        const query = `
            UPDATE student_education
            SET level = ?, is_current = ?, institution_name = ?, board_university = ?, start_year = ?, end_year = ?, cgpa = ?, percentage = ?
            WHERE id = ?
        `;
        const params = [
            level,
            is_current,
            institution_name || null,
            board_university || null,
            start_year || null,
            end_year || null,
            cgpa || null,
            percentage || null,
            id
        ];

        return await db.executeQuery(query, params);
    }

    // DELETE
    async deleteEducation(id) {
        const query = `DELETE FROM student_education WHERE id = ?`;
        return await db.executeQuery(query, [id]);
    }
}

module.exports = StudentEducationModel;
