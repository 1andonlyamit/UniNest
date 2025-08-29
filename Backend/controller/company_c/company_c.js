const CompanyModel = require('../../model/company_m/company_m');
const emailService = require('../../services/emailService');
const crypto = require('crypto');

class CompanyController {
    constructor() {
        this.companyModel = new CompanyModel();
    }

    async inviteCompany(req, res) {
        try {
            // Check if request body exists
            if (!req.body) {
                return res.status(400).json({ message: 'Request body is required' });
            }

            const { companyEmail, companyName, universityId } = req.body;

            if (!companyEmail || !companyName || !universityId) {
                return res.status(400).json({ message: 'Company email, name, and university ID are required' });
            }

            // Check if company already exists
            const existingCompany = await this.companyModel.getCompanyByEmail(companyEmail);
            if (existingCompany) {
                return res.status(400).json({ message: 'Company with this email already exists' });
            }

            // Create invitation
            const { invitationToken, companyId } = await this.companyModel.inviteCompany(universityId, companyEmail, companyName);

            // Send invitation email
            const signupLink = `${req.protocol}://${req.get('host')}/university/company/signup?token=${invitationToken}`;

            const emailSubject = 'Invitation to Join UniNest Platform';
            const emailText = `You have been invited to join the UniNest platform. Please click the following link to complete your registration: ${signupLink}`;
            const emailHtml = `
                <h2>Welcome to UniNest!</h2>
                <p>You have been invited to join our platform as a company partner.</p>
                <p>Please click the button below to complete your registration:</p>
                <a href="${signupLink}" style="background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">Complete Registration</a>
                <p>This invitation link will expire in 7 days.</p>
            `;

            await emailService.sendMail({
                to: companyEmail,
                subject: emailSubject,
                text: emailText,
                html: emailHtml
            });

            res.status(200).json({
                message: 'Company invitation sent successfully',
                companyId
            });

        } catch (error) {
            console.error('Error inviting company:', error);

            // Provide more specific error messages
            if (error.message.includes('ER_NO_REFERENCED_ROW')) {
                res.status(400).json({ message: 'Invalid university ID. University does not exist.' });
            } else {
                res.status(500).json({ message: 'Failed to send company invitation', error: error.message });
            }
        }
    }

    async getSignupPage(req, res) {
        try {
            const { token } = req.query;

            if (!token) {
                return res.status(400).json({ message: 'Invitation token is required' });
            }

            const company = await this.companyModel.getCompanyByInvitationToken(token);
            if (!company) {
                return res.status(400).json({ message: 'Invalid or expired invitation token' });
            }

            res.status(200).json({
                message: 'Valid invitation token',
                company: {
                    id: company.id,
                    name: company.name,
                    email: company.email,
                    university_name: company.university_name
                }
            });

        } catch (error) {
            console.error('Error getting signup page:', error);
            res.status(500).json({ message: 'Failed to validate invitation' });
        }
    }

    async completeSignup(req, res) {
        try {
            // Check if request body exists
            if (!req.body) {
                return res.status(400).json({ message: 'Request body is required' });
            }

            const { token, sector, address, website, contact_person_name, contact_person_email, phone, password } = req.body;

            if (!token || !sector || !address || !website || !contact_person_name || !contact_person_email || !phone || !password) {
                return res.status(400).json({ message: 'All fields are required' });
            }

            const company = await this.companyModel.getCompanyByInvitationToken(token);
            if (!company) {
                return res.status(400).json({ message: 'Invalid or expired invitation token' });
            }

            // Hash password
            const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

            // Update company profile
            await this.companyModel.updateCompanyProfile(company.id, {
                name: company.name,
                sector,
                address,
                website,
                contact_person_name,
                contact_person_email,
                phone,
                password: hashedPassword
            });

            res.status(200).json({
                message: 'Company registration completed successfully. Please wait for university verification.'
            });

        } catch (error) {
            console.error('Error completing signup:', error);
            res.status(500).json({ message: 'Failed to complete registration' });
        }
    }

    async getPendingCompanies(req, res) {
        try {
            const { universityId } = req.query; // Get from query params

            if (!universityId) {
                return res.status(400).json({ message: 'University ID is required' });
            }

            const pendingCompanies = await this.companyModel.getPendingCompanies(universityId);
            res.status(200).json({
                message: 'Pending companies retrieved successfully',
                companies: pendingCompanies
            });

        } catch (error) {
            console.error('Error getting pending companies:', error);
            res.status(500).json({ message: 'Failed to get pending companies' });
        }
    }

    async verifyCompany(req, res) {
        try {
            const { companyId } = req.params;
            const { universityId } = req.query; // Get from query params

            if (!universityId) {
                return res.status(400).json({ message: 'University ID is required' });
            }

            const success = await this.companyModel.verifyCompanyByUniversity(companyId, universityId);
            if (!success) {
                return res.status(404).json({ message: 'Company not found or not authorized to verify' });
            }

            res.status(200).json({ message: 'Company verified successfully' });

        } catch (error) {
            console.error('Error verifying company:', error);
            res.status(500).json({ message: 'Failed to verify company' });
        }
    }

    async getCompanyDetails(req, res) {
        try {
            const { companyId } = req.params;
            const { universityId } = req.query; // Get from query params

            if (!universityId) {
                return res.status(400).json({ message: 'University ID is required' });
            }

            const company = await this.companyModel.getCompanyById(companyId);
            if (!company) {
                return res.status(404).json({ message: 'Company not found' });
            }

            // Check if university is authorized to view this company
            if (company.invited_by !== universityId) {
                return res.status(403).json({ message: 'Not authorized to view this company' });
            }

            res.status(200).json({
                message: 'Company details retrieved successfully',
                company
            });

        } catch (error) {
            console.error('Error getting company details:', error);
            res.status(500).json({ message: 'Failed to get company details' });
        }
    }

    async deleteCompany(req, res) {
        try {
            const { companyId } = req.params;
            const { universityId } = req.query; // Get from query params

            if (!universityId) {
                return res.status(400).json({ message: 'University ID is required' });
            }

            const company = await this.companyModel.getCompanyById(companyId);
            if (!company) {
                return res.status(404).json({ message: 'Company not found' });
            }

            // Check if university is authorized to delete this company
            if (company.invited_by !== universityId) {
                return res.status(403).json({ message: 'Not authorized to delete this company' });
            }

            // Only allow deletion of unverified companies
            if (company.is_verified_by_university) {
                return res.status(400).json({ message: 'Cannot delete verified companies' });
            }

            const success = await this.companyModel.deleteCompany(companyId);
            if (!success) {
                return res.status(500).json({ message: 'Failed to delete company' });
            }

            res.status(200).json({ message: 'Company deleted successfully' });

        } catch (error) {
            console.error('Error deleting company:', error);
            res.status(500).json({ message: 'Failed to delete company' });
        }
    }

    async cleanupExpiredInvitations(req, res) {
        try {
            const { universityId } = req.query; // Get from query params

            if (!universityId) {
                return res.status(400).json({ message: 'University ID is required' });
            }

            const deletedCount = await this.companyModel.cleanupExpiredInvitations(universityId);

            res.status(200).json({
                message: 'Cleanup completed successfully',
                deletedCount
            });

        } catch (error) {
            console.error('Error cleaning up expired invitations:', error);
            res.status(500).json({ message: 'Failed to cleanup expired invitations' });
        }
    }
}

module.exports = CompanyController;
