// controllers/student_c.js
const StudentModel = require("../../model/student_m/student_m");
const studentModel = new StudentModel();

class StudentController {
    async create(req, res) {
        try {
            const student = await studentModel.createStudent(req.body);
            res.status(201).json({ message: "Student created", student });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Failed to create student" });
        }
    }

    async getAll(req, res) {
        try {
            const students = await studentModel.getAllStudents();
            res.json(students);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Failed to fetch students" });
        }
    }

    async getById(req, res) {
        try {
            const student = await studentModel.getStudentById(req.params.id);
            if (!student) return res.status(404).json({ error: "Student not found" });
            res.json(student);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Failed to fetch student" });
        }
    }

    async update(req, res) {
        try {
            const affectedRows = await studentModel.updateStudent(req.params.id, req.body);
            if (!affectedRows) return res.status(404).json({ error: "Student not found" });

            const updatedStudent = await studentModel.getStudentById(req.params.id); // fetch updated data
            res.json({ message: "Student updated", student: updatedStudent });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Failed to update student" });
        }
    }


    async delete(req, res) {
        try {
            const deleted = await studentModel.deleteStudent(req.params.id);
            if (!deleted) return res.status(404).json({ error: "Student not found" });
            res.json({ message: "Student deleted" });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Failed to delete student" });
        }
    }
}

module.exports = StudentController;
