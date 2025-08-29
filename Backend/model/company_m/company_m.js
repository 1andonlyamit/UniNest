const DatabaseService = require('../../services/dbhelper');
const crypto = require('crypto');

class CompanyModel {
    constructor() {
        this.db = new DatabaseService();
    }

    async connect() {
        await this.db.connect();
    }

    generateInvitationToken() {
        return crypto.randomBytes(32).toString('hex');
    }

    async inviteCompany(universityId, companyEmail, companyName) {
        try {
            // First, check if the university exists
            const universityQuery = 'SELECT id FROM universities WHERE id = ?';
            const universityResult = await this.db.executeQuery(universityQuery, [universityId]);

            if (!universityResult || universityResult.length === 0) {
                throw new Error(`University with ID ${universityId} does not exist`);
            }

            const invitationToken = this.generateInvitationToken();
            const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

            // Company role ID is 4
            const roleId = 4;

            // Generate a temporary password for invitation (will be updated during signup)
            const tempPassword = crypto.randomBytes(16).toString('hex');

            const query = `
                INSERT INTO companies (name, email, invited_by, invitation_token, invitation_expires_at, invitation_sent_at, role_id, password)
                VALUES (?, ?, ?, ?, ?, NOW(), ?, ?)
            `;

            const result = await this.db.executeQuery(query, [companyName, companyEmail, universityId, invitationToken, expiresAt, roleId, tempPassword]);
            return { invitationToken, companyId: result.insertId };
        } catch (error) {
            console.error('Error in inviteCompany:', error);
            throw error;
        }
    }

    async getCompanyByInvitationToken(token) {
        const query = `
            SELECT c.*, u.name as university_name 
            FROM companies c 
            LEFT JOIN universities u ON c.invited_by = u.id 
            WHERE c.invitation_token = ? AND c.invitation_expires_at > NOW()
        `;
        const results = await this.db.executeQuery(query, [token]);
        return results.length > 0 ? results[0] : null;
    }

    async updateCompanyProfile(companyId, companyData) {
        const query = `
            UPDATE companies 
            SET name = ?, sector = ?, address = ?, website = ?, 
                contact_person_name = ?, contact_person_email = ?, 
                phone = ?, password = ?, invitation_token = NULL,
                updated_at = NOW()
            WHERE id = ?
        `;

        const { name, sector, address, website, contact_person_name, contact_person_email, phone, password } = companyData;
        await this.db.executeQuery(query, [name, sector, address, website, contact_person_name, contact_person_email, phone, password, companyId]);
    }

    async verifyCompanyByUniversity(companyId, universityId) {
        const query = `
            UPDATE companies 
            SET is_verified_by_university = TRUE, status = 'active', updated_at = NOW()
            WHERE id = ? AND invited_by = ?
        `;
        const result = await this.db.executeQuery(query, [companyId, universityId]);
        return result.affectedRows > 0;
    }

    async getPendingCompanies(universityId) {
        const query = `
            SELECT id, name, email, contact_person_name, contact_person_email, 
                   sector, website, invitation_sent_at, created_at
            FROM companies 
            WHERE invited_by = ? AND is_verified_by_university = FALSE
            ORDER BY created_at DESC
        `;
        return await this.db.executeQuery(query, [universityId]);
    }

    async getCompanyById(companyId) {
        const query = 'SELECT * FROM companies WHERE id = ?';
        const results = await this.db.executeQuery(query, [companyId]);
        return results.length > 0 ? results[0] : null;
    }

    async getCompanyByEmail(email) {
        const query = 'SELECT * FROM companies WHERE email = ?';
        const results = await this.db.executeQuery(query, [email]);
        return results.length > 0 ? results[0] : null;
    }

    async deleteExpiredInvitations() {
        const query = 'DELETE FROM companies WHERE invitation_expires_at < NOW() AND is_verified_by_university = FALSE';
        return await this.db.executeQuery(query);
    }

    async deleteCompany(companyId) {
        const query = 'DELETE FROM companies WHERE id = ?';
        const result = await this.db.executeQuery(query, [companyId]);
        return result.affectedRows > 0;
    }

    async cleanupExpiredInvitations(universityId) {
        const query = `
            DELETE FROM companies 
            WHERE invited_by = ? 
            AND invitation_expires_at < NOW() 
            AND is_verified_by_university = FALSE
        `;
        const result = await this.db.executeQuery(query, [universityId]);
        return result.affectedRows;
    }
}

module.exports = CompanyModel;
