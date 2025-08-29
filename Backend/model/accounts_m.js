class AccountsModel {
    constructor() {
        this.db = new (require('../services/dbhelper'));
    }

    async login(credentials) {
        const { email, password } = credentials;

        try {
            const query = 'SELECT id, email, password, name, status, role_id FROM universities WHERE email = ? AND password = ?';
            const [users] = await this.db.executeQuery(query, [email, password]);

            if (users.length === 0) {
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
            const [result] = await this.db.executeQuery(query, values);
            if (result.insertId) {
                const [university] = await this.db.execute(
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