const express = require('express');
const cors = require('cors');
const { body, query, validationResult } = require('express-validator');
const TLSChecker = require('@BAYRYO/tls-checker');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Create TLS checker instance
const checker = new TLSChecker({
    timeout: 5000,
    concurrency: 20,
    enableTrace: false,
    rejectUnauthorized: false
});

// Validation middleware
const validateDomains = [
    body('domains').isArray().withMessage('Domains must be an array'),
    body('domains.*').isString().isURL({ require_tld: true, require_protocol: false })
        .withMessage('Each domain must be a valid hostname')
];

const validateSingleDomain = [
    query('domain').isString().isURL({ require_tld: true, require_protocol: false })
        .withMessage('Domain must be a valid hostname')
];

// Error handling middleware
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// Routes
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/check', 
    validateSingleDomain,
    handleValidationErrors,
    async (req, res) => {
        try {
            const result = await checker.checkTLS(req.query.domain);
            res.json(result);
        } catch (error) {
            res.status(500).json({
                error: error.message,
                timestamp: new Date().toISOString()
            });
        }
    }
);

app.post('/check-multiple',
    validateDomains,
    handleValidationErrors,
    async (req, res) => {
        try {
            const results = await checker.checkMultiple(req.body.domains);
            res.json(results);
        } catch (error) {
            res.status(500).json({
                error: error.message,
                timestamp: new Date().toISOString()
            });
        }
    }
);

// Start server
app.listen(port, () => {
    console.log(`TLS Checker API running on port ${port}`);
});
