const express = require('express');
const corsAnywhere = require('cors-anywhere');
const app = express();
const port = 8080;

// Configure CORS Anywhere
const corsProxy = corsAnywhere.createServer({
    originWhitelist: [], // Allow all origins
    // Additional configuration if needed
});

// Create a route to handle proxy requests
app.use((req, res, next) => {
    corsProxy.emit('request', req, res);
});

app.listen(port, () => {
    console.log(`CORS proxy server running at http://localhost:${port}`);
});

app.use((req, res, next) => {
    console.log(`Proxy request for: ${req.url}`);
    corsProxy.emit('request', req, res);
});
