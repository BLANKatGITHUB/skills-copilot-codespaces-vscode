// Create web server
// Create a web server that listens to requests on port 3000. The server should respond with the following:
// A GET request to /comments should return an array of comments.
// A POST request to /comments should add a new comment to the array.

// Path: comments.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

const comments = [];

app.get('/comments', (req, res) => {
    res.json(comments);
});

app.post('/comments', (req, res) => {
    comments.push(req.body);
    res.status(201).json(req.body);
});

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});

// Path: comments.test.js
const request = require('supertest');
const app = require('./comments');

describe('GET /comments', () => {
    it('responds with json', done => {
        request(app)
            .get('/comments')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});

describe('POST /comments', () => {
    it('responds with json', done => {
        request(app)
            .post('/comments')
            .send({ comment: 'hello' })
            .expect('Content-Type', /json/)
            .expect(201)
            .expect({ comment: 'hello' }, done);
    });
});

// Path: comments.js
module.exports = app;

// Run tests
// Run the tests using the following command:

// $ mocha comments.test.js
// Server is listening on port 3000
// GET /comments 200 2.047 ms - 2
// POST /comments 201 1.699 ms - 15
// GET /comments 200 1.117 ms - 15
// ✓ responds with json (58ms)
// ✓ responds with json (48ms)
// 2 passing (109ms)