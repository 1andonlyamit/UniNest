const express = require('express');
const router = express.Router();
const CompanyController = require('../../controller/company_c/company_c');

const companyController = new CompanyController();

// University invites a company
router.post('/invite', (req, res) => companyController.inviteCompany(req, res));

// Company signup page validation (GET request to validate token)
router.get('/signup', (req, res) => companyController.getSignupPage(req, res));

// Company completes signup (POST request to submit details)
router.post('/signup', (req, res) => companyController.completeSignup(req, res));

// University gets pending companies for verification
router.get('/pending', (req, res) => companyController.getPendingCompanies(req, res));

// University verifies a company
router.put('/verify/:companyId', (req, res) => companyController.verifyCompany(req, res));

// University gets company details
router.get('/:companyId', (req, res) => companyController.getCompanyDetails(req, res));

// University deletes a company (only unverified ones)
router.delete('/:companyId', (req, res) => companyController.deleteCompany(req, res));

// Cleanup expired invitations for the university
router.post('/cleanup/expired', (req, res) => companyController.cleanupExpiredInvitations(req, res));

module.exports = router;
