const StudentEducationModel = require('../../model/student_m/studentEducation_m');
const educationModel = new StudentEducationModel();

class StudentEducationController {

    async create(req, res) {
        try {
            const { student_id, level, is_current, institution_name, board_university, start_year, end_year, cgpa, percentage } = req.body;

            if (!student_id || !level || is_current === undefined) {
                return res.status(400).json({ message: "student_id, level, and is_current are required" });
            }

            const result = await educationModel.createEducation({
                student_id,
                level,
                is_current,
                institution_name,
                board_university,
                start_year,
                end_year,
                cgpa,
                percentage
            });

            res.status(201).json({ message: "Education added successfully", id: result.insertId });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Internal server error", error: err.message });
        }
    }

    async getByStudent(req, res) {
        try {
            const { student_id } = req.params;
            const records = await educationModel.getEducationsByStudent(student_id);
            res.json(records);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Internal server error", error: err.message });
        }
    }

    async getById(req, res) {
        try {
            const { id } = req.params;
            const record = await educationModel.getEducationById(id);
            if (!record) return res.status(404).json({ message: "Education record not found" });
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
            const result = await educationModel.updateEducation(id, data);
            if (result.affectedRows === 0) return res.status(404).json({ message: "Education record not found" });
            res.json({ message: "Education updated successfully" });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Internal server error", error: err.message });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            const result = await educationModel.deleteEducation(id);
            if (result.affectedRows === 0) return res.status(404).json({ message: "Education record not found" });
            res.json({ message: "Education deleted successfully" });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Internal server error", error: err.message });
        }
    }
}

module.exports = new StudentEducationController();
