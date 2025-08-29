class AccountsModel {
    constructor() {
        this.db = new (require('../services/dbhelper'));
    }

    async login(credentials) {
        const { role_id, email, password } = credentials;

        let table;
        switch (role_id) {
            case 1:
                table = 'admins';
                break;
            case 2:
                table = 'universities';
                break;
            case 3:
                table = 'companies';
                break;
            case 4:
                table = 'students';
                break;
            default:
                throw new Error("Invalid role_id");
        }

        const query = `SELECT id, email, password, name, status, role_id 
                   FROM ${table} 
                   WHERE email = ? AND password = ?`;

        try {
            const users = await this.db.executeQuery(query, [email, password]);

            if (!users || users.length === 0) {
                return null;
            }

            const user = users[0];
            delete user.password;
            return user;
        } catch (error) {
            throw error;
        }
    }


    async registerUniversity(universityData) {
        const {
            email,
            password,
            name,
            address,
            phone,
            role_id,
            status,
            is_email_verified
        } = universityData;

        const query = `
        INSERT INTO universities 
        (email, password, name, address, phone, role_id, status, is_email_verified)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

        const values = [
            email,
            password,
            name,
            address,
            phone,
            role_id,
            status,
            is_email_verified
        ];

        try {
            const result = await this.db.executeQuery(query, values); // ✅ no destructuring here

            if (result.insertId) {
                const university = await this.db.executeQuery(
                    'SELECT id, name, email, status FROM universities WHERE id = ?',
                    [result.insertId]
                );
                return university[0];
            }
            return null;
        } catch (error) {
            throw error;
        }
    }

}

module.exports = AccountsModel;
