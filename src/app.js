import express from 'express';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());

// Require the Routes API 
const server = app.listen(3000, function () {
    let host = server.address().address
    let port = server.address().port
})

export default app;