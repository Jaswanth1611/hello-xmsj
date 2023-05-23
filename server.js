const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/upload', upload.single('game-file'), (req, res) => {
    const gameFile = req.file;
    if (gameFile && gameFile.mimetype === 'application/javascript') {
        fs.readFile(gameFile.path, 'utf8', (err, data) => {
            if (err) {
                console.error('Error:', err);
                res.status(500).send('An error occurred while reading the game file.');
            } else {
                fs.unlink(gameFile.path, (unlinkErr) => {
                    if (unlinkErr) {
                        console.error('Error:', unlinkErr);
                    }
                });
                res.send(data);
            }
        });
    } else {
        fs.unlink(gameFile.path, (unlinkErr) => {
            if (unlinkErr) {
                console.error('Error:', unlinkErr);
            }
        });
        res.status(400).send('Please select a valid JavaScript game file!');
    }
});

app.get('/scripts.js', (req, res) => {
    const filePath = path.join(__dirname, 'scripts.js');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error:', err);
            res.status(500).send('An error occurred while reading the JavaScript file.');
        } else {
            res.setHeader('Content-Type', 'application/javascript');
            res.send(data);
        }
    });
});

app.get('/styles.css', (req, res) => {
    const filePath = path.join(__dirname, 'styles.css');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error:', err);
            res.status(500).send('An error occurred while reading the CSS file.');
        } else {
            res.setHeader('Content-Type', 'text/css');
            res.send(data);
        }
    });
});

const listener = app.listen(process.env.PORT, () => {
    console.log(`Your app is listening on port ${listener.address().port}`);
});
