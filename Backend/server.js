const express = require('express');
const app = express();
const config = require('./config/master-config');
const DatabaseService = require('./services/dbhelper');
const userController = new (require('./controller/accounts_c'));
const otpRouter = require('./router/otp_r');
const cors = require('cors');
app.use(cors());
const appPort = config.app_port;
app.use(express.json());
const departmentsRouter = require('./router/departments_r/departments_r');

const dbService = new DatabaseService();

// app.use(express.static(path.join(__dirname, 'public')));
app.use('/university/departments', departmentsRouter);

//login-resister routes
app.post('/login', (req, res) => userController.login(req, res));
app.post('/registerUniversity', (req, res) => userController.register(req, res));

// OTP routes
app.use('/otp', otpRouter);

// Company routes
const companyRouter = require('./router/company_r');
app.use('/university/company', companyRouter);

app.use((req, res) => {
    res.status(404).send({ "message": "Access Denied" });
});
async function initializeDatabase() {
    try {
        console.log('Connecting to database...');
        await dbService.connect();

        console.log('Initializing database tables...');
        await dbService.initializeTables();

        startServer();
    } catch (error) {
        console.error('Failed to initialize database:', error);
        process.exit(1);
    }
}

function startServer() {
    app.listen(appPort, () => {
        console.log(`UniNest's Backend API is listening on port ${appPort}`);
        console.log(`API available at http://localhost:${appPort}/api`);
    });
}

initializeDatabase();

