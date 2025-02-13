const sdk = require('node-appwrite');

const client = new sdk.Client()
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject(process.env.APPWRITE_PROJECT_ID) // Your project ID
    .setKey(process.env.APPWRITE_API_KEY); // Your secret API key

const users = new sdk.Users(client);

exports.handler = async function () {
    try {
        // Fetch all users
        const result = await users.list();
        return {
            statusCode: 200,
            body: JSON.stringify(result),
            headers: {
                'Access-Control-Allow-Origin': '*', // Allow requests from any origin
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS', // Allowed HTTP methods
                'Access-Control-Allow-Headers': 'Content-Type, Authorization' // Allowed headers
            }
            
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
            headers: {
                'Access-Control-Allow-Origin': '*', // Allow requests from any origin
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS', // Allowed HTTP methods
                'Access-Control-Allow-Headers': 'Content-Type, Authorization' // Allowed headers
            }
        };
    }
};