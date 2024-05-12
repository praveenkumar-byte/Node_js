const express = require('express');
const app = express();
var bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
// app.use(express.static('public'));
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.get('/style.css', (req, res) => {
    // Set the Content-Type header to 'text/css'
    res.setHeader('Content-Type', 'text/css');

    // Send the CSS file
    res.sendFile(__dirname + '/style.css');
});
app.get('/script.js', (req, res) => {
    try {
        // Set the Content-Type header to 'text/javascript'
        res.setHeader('Content-Type', 'text/javascript');
        // Send the JavaScript file
        res.sendFile(__dirname + '/script.js');
    } catch (err) {
        console.error('Error sending JavaScript file:', err);
        res.status(500).send('Internal Server Error');
    }
});


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
app.post('/calculate', (req, res) => {
    const { num1, num2, operation } = req.body;
    let result;

    switch (operation) {
        case '+':
            result = parseFloat(num1) + parseFloat(num2);
            break;
        case '-':
            result = parseFloat(num1) - parseFloat(num2);
            break;
        case '*':
            result = parseFloat(num1) * parseFloat(num2);
            break;
        case '/':
            if (parseFloat(num2) === 0) {
                result = "Error: Division by zero!";
            } else {
                result = parseFloat(num1) / parseFloat(num2);
            }
            break;
        default:
            result = 'Invalid operation';
    }
    // console.log(result)
    res.send({ result });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));