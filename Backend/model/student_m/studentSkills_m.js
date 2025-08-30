const DatabaseService = require('../../services/dbhelper');
const db = new DatabaseService();

class StudentSkillsModel {
    constructor() {
        db.connect().catch(err => console.error("DB Connection Error:", err));
    }

    // CREATE
    async createSkill(data) {
        const { student_id, skill_name, proficiency, is_certified } = data;

        const query = `
            INSERT INTO student_skills
            (student_id, skill_name, proficiency, is_certified)
            VALUES (?, ?, ?, ?)
        `;
        const params = [
            student_id,
            skill_name,
            proficiency || 'beginner',
            is_certified || false
        ];

        return await db.executeQuery(query, params);
    }

    // READ all skills for a student
    async getSkillsByStudent(student_id) {
        const query = `SELECT * FROM student_skills WHERE student_id = ?`;
        return await db.executeQuery(query, [student_id]);
    }

    // READ single skill by id
    async getSkillById(id) {
        const query = `SELECT * FROM student_skills WHERE id = ?`;
        const rows = await db.executeQuery(query, [id]);
        return rows[0];
    }

    // UPDATE
    async updateSkill(id, data) {
        const { skill_name, proficiency, is_certified } = data;

        const query = `
            UPDATE student_skills
            SET skill_name = ?, proficiency = ?, is_certified = ?
            WHERE id = ?
        `;
        const params = [
            skill_name,
            proficiency || 'beginner',
            is_certified || false,
            id
        ];

        return await db.executeQuery(query, params);
    }

    // DELETE
    async deleteSkill(id) {
        const query = `DELETE FROM student_skills WHERE id = ?`;
        return await db.executeQuery(query, [id]);
    }
}

module.exports = StudentSkillsModel;
