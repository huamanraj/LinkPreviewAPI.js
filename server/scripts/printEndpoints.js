require('dotenv').config();
const colors = require('colors');

// Get the port from .env or default to 3000
const PORT = process.env.PORT || 3000;
const BASE_URL = `http://localhost:${PORT}`;

console.log('\n');
console.log('='.repeat(80).green);
console.log('LinkSight Preview API - Endpoints'.bold.yellow);
console.log('='.repeat(80).green);
console.log('\n');

// Public Endpoints
console.log('PUBLIC ENDPOINTS'.underline.cyan);

console.log(`POST  ${BASE_URL}/api/register`.white);
console.log('  Register a new user\n'.gray);

console.log(`POST  ${BASE_URL}/api/login`.white);
console.log('  Login and get JWT token\n'.gray);

// Protected Endpoints
console.log('PROTECTED ENDPOINTS'.underline.cyan);
console.log('(Requires JWT Authentication)'.italic.gray);

console.log(`POST  ${BASE_URL}/api/generate-key`.white);
console.log('  Generate a new API key\n'.gray);

console.log(`GET   ${BASE_URL}/api/user`.white);
console.log('  Get user information\n'.gray);

// Rate-Limited Endpoints
console.log('RATE-LIMITED ENDPOINTS'.underline.cyan);
console.log('(Requires API Key)'.italic.gray);

console.log(`POST  ${BASE_URL}/api/preview`.white);
console.log('  Get link preview metadata\n'.gray);

console.log('='.repeat(80).green);
console.log(`API Documentation: See ${BASE_URL}/api-docs for detailed documentation`.bold.yellow);
console.log('='.repeat(80).green);
console.log('\n');
