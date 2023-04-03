const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const transcriptsRoutes = require('./routes/transcripts');
require("dotenv/config")

app.listen(process.env.PORT);
console.log('Server running at ' + process.env.PORT);

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.json());
app.use(cors());

// Cors persmission
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    next();
})

app.use(transcriptsRoutes);

// Error Page
app.use((req, res, next) => {
    res.status(404).render('404', { pageTitle: 'Error 404' })
});