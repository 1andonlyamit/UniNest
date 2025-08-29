class DepartmentsModel {
    constructor() {
        this.db = new (require('../../services/dbhelper'));
    }

    // CREATE Department
    async createDepartment(departmentData) {
        const { university_id, name, department_coordinator_name } = departmentData;

        const query = `
            INSERT INTO departments (university_id, name, department_coordinator_name)
            VALUES (?, ?, ?)
        `;

        try {
            const [result] = await this.db.executeQuery(query, [
                university_id,
                name,
                department_coordinator_name || null
            ]);

            if (result.insertId) {
                const [department] = await this.db.executeQuery(
                    'SELECT id, university_id, name, department_coordinator_name, created_at, updated_at FROM departments WHERE id = ?',
                    [result.insertId]
                );
                return department[0];
            }
            return null;
        } catch (error) {
            throw error;
        }
    }

    // READ All
    async getAllDepartments() {
        try {
            const query = 'SELECT id, university_id, name, department_coordinator_name, created_at, updated_at FROM departments';
            const [departments] = await this.db.executeQuery(query);
            return departments;
        } catch (error) {
            throw error;
        }
    }

    // READ One
    async getDepartmentById(id) {
        try {
            const query = 'SELECT id, university_id, name, department_coordinator_name, created_at, updated_at FROM departments WHERE id = ?';
            const [departments] = await this.db.executeQuery(query, [id]);
            return departments.length ? departments[0] : null;
        } catch (error) {
            throw error;
        }
    }

    // UPDATE
    async updateDepartment(id, departmentData) {
        const { university_id, name, department_coordinator_name } = departmentData;

        const query = `
            UPDATE departments
            SET university_id = ?, name = ?, department_coordinator_name = ?
            WHERE id = ?
        `;

        try {
            const [result] = await this.db.executeQuery(query, [
                university_id,
                name,
                department_coordinator_name || null,
                id
            ]);

            if (result.affectedRows > 0) {
                const [updatedDept] = await this.db.executeQuery(
                    'SELECT id, university_id, name, department_coordinator_name, created_at, updated_at FROM departments WHERE id = ?',
                    [id]
                );
                return updatedDept[0];
            }
            return null;
        } catch (error) {
            throw error;
        }
    }

    // DELETE
    async deleteDepartment(id) {
        try {
            const query = 'DELETE FROM departments WHERE id = ?';
            const [result] = await this.db.executeQuery(query, [id]);
            return result.affectedRows > 0;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = DepartmentsModel;
