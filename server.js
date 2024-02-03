const http = require('http');
const app = require('./app');
const { mongoConnect } = require('./utils/mongo');
require('dotenv').config();

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

async function startServer() {
    await mongoConnect();
    server.listen(PORT, () => {
        console.log('Server Listiening on PORT: ' + PORT);
    });
}

startServer();