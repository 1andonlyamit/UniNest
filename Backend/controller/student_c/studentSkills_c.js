const StudentSkillsModel = require('../../model/student_m/studentSkills_m');
const skillsModel = new StudentSkillsModel();

class StudentSkillsController {

    async create(req, res) {
        try {
            const { student_id, skill_name, proficiency, is_certified } = req.body;

            if (!student_id || !skill_name) {
                return res.status(400).json({ message: "student_id and skill_name are required" });
            }

            const result = await skillsModel.createSkill({
                student_id,
                skill_name,
                proficiency,
                is_certified
            });

            res.status(201).json({ message: "Skill added successfully", id: result.insertId });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Internal server error", error: err.message });
        }
    }

    async getByStudent(req, res) {
        try {
            const { student_id } = req.params;
            const records = await skillsModel.getSkillsByStudent(student_id);
            res.json(records);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Internal server error", error: err.message });
        }
    }

    async getById(req, res) {
        try {
            const { id } = req.params;
            const record = await skillsModel.getSkillById(id);
            if (!record) return res.status(404).json({ message: "Skill record not found" });
            res.json(record);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Internal server error", error: err.message });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const data = req.body;
            const result = await skillsModel.updateSkill(id, data);
            if (result.affectedRows === 0) return res.status(404).json({ message: "Skill record not found" });
            res.json({ message: "Skill updated successfully" });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Internal server error", error: err.message });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            const result = await skillsModel.deleteSkill(id);
            if (result.affectedRows === 0) return res.status(404).json({ message: "Skill record not found" });
            res.json({ message: "Skill deleted successfully" });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Internal server error", error: err.message });
        }
    }
}

module.exports = new StudentSkillsController();
