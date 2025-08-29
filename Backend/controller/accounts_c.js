class AccountsController {
    constructor() {
        this.userModel = new (require("../model/accounts_m"));
    }

    async login(req, res) {
        const { email, password, role_id } = req.body;

        if (!email || !password || !role_id) {
            return res.status(400).json({ message: "Email, password and role_id are required." });
        }

        try {
            const result = await this.userModel.login(req.body);
            if (!result) {
                return res.status(401).json({ message: "Invalid email or password." });
            }
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({ message: "Server error.", error: error.message });
        }
    }

    async register(req, res) {
        const {
            email,
            password,
            name,
            address,
            phone
        } = req.body;

        if (!email || !password || !name) {
            return res.status(400).json({ message: "Email, password, and university name are required." });
        }

        const universityData = {
            email, password, name, address: address || null, phone: phone || null,
            role_id: 2, // University
            status: 'active',
            is_email_verified: false
        };

        try {
            const result = await this.userModel.registerUniversity(universityData);
            if (!result) {
                return res.status(400).json({ message: "University registration failed." });
            }
            return res.status(201).json({
                message: "University registered successfully",
                data: {
                    id: result.id,
                    name: result.name,
                    email: result.email,
                    status: result.status
                }
            });
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                return res.status(409).json({ message: "Email already exists." });
            }
            return res.status(500).json({ message: "Server error.", error: error.message });
        }
    }
}

module.exports = AccountsController;
