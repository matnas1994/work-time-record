const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const HttpError = require('./models/http-error');
const usersRoutes = require('./routes/users');
const employeesRoutes = require('./routes/employees');
const workTimeRecordsRoutes = require('./routes/workTimeRecords');

const app = express();

const corsOptions = {
    origin: [process.env.CLIENT_URL]
}



app.use(bodyParser.json());
app.use(cors(corsOptions));

app.use('/api/users', usersRoutes);
app.use('/api/employees', employeesRoutes);
app.use('/api/workTimeRecords', workTimeRecordsRoutes);

app.use((req, res, next) => {
    const error = new HttpError('Could not find this route.', 404);
    throw error;
});


app.use((error, req, res, next) => {
    if(res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({message: error.message || 'An unknow error occurred!'});
});

mongoose
    .connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0-vjh0m.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`, { 
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    .then(() => {
        app.listen(process.env.PORT || 5000);
    })
    .catch(err => {
        console.log(err);
    });