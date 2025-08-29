// src/services/database.service.js
const mysql = require('mysql2/promise');
const config = require('../config/config');
const fs = require('fs');
const path = require('path');

class DatabaseService {
    constructor() {
        this.connection = null;
        this.isConnected = false;
        this.config = {
            host: config.database.host,
            user: config.database.user,
            password: config.database.password,
            database: config.database.database,
            port: config.database.port,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        };
    }


    async connect() {
        try {
            const tempConfig = { ...this.config };
            delete tempConfig.database;
            const tempConnection = await mysql.createConnection(tempConfig);

            const [rows] = await tempConnection.execute(
                `SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = '${this.config.database}'`
            );

            if (rows.length === 0) {
                console.log(`Database '${this.config.database}' does not exist. Creating it now...`);
                await tempConnection.execute(`CREATE DATABASE ${this.config.database}`);
                console.log(`Database '${this.config.database}' created successfully.`);
            }

            await tempConnection.end();

            this.connection = await mysql.createPool(this.config);

            await this.connection.query('SELECT 1');
            this.isConnected = true;
            console.log('Successfully connected to the MySQL database.');

            return this.connection;
        } catch (error) {
            console.error('Could not connect to the database:', error);
            throw error;
        }
    }

    async executeQuery(sql, params = []) {
        try {
            if (!this.isConnected) {
                await this.connect();
            }

            const [results] = await this.connection.execute(sql, params);
            return results;
        } catch (error) {
            console.error('Error executing query:', error);
            throw error;
        }
    }

    async tableExists(tableName) {
        try {
            const result = await this.executeQuery(
                `SELECT COUNT(*) as count FROM information_schema.tables 
         WHERE table_schema = ? AND table_name = ?`,
                [this.config.database, tableName]
            );
            return result[0].count > 0;
        } catch (error) {
            console.error(`Error checking if table ${tableName} exists:`, error);
            throw error;
        }
    }

    async initializeTables() {
        try {
            const sqlDir = path.join(__dirname, '../sql');
            const files = fs.readdirSync(sqlDir).filter(f => f.endsWith('.sql'));

            for (const file of files) {
                const sql = fs.readFileSync(path.join(sqlDir, file), 'utf8');
                await this.executeQuery(sql);
                console.log(`Created Table ${file}`);
            }

            await this.seedRoles();


            console.log('All database tables initialized successfully.');
        } catch (error) {
            console.error('Error initializing database tables:', error);
            throw error;
        }
    }

    async seedRoles() {
        try {
            const roles = [
                { id: 1, name: 'admin' },
                { id: 2, name: 'university' },
                { id: 3, name: 'student' },
                { id: 4, name: 'company' }
            ];

            for (const role of roles) {
                await this.executeQuery(
                    `INSERT IGNORE INTO roles (id, role_name) VALUES (?, ?)`,
                    [role.id, role.name]
                );
            }

            console.log("Default roles seeded successfully.");
        } catch (error) {
            console.error("Error seeding roles:", error);
            throw error;
        }
    }
}

module.exports = DatabaseService
