const mongoose = require('mongoose');
const dotenv = require('dotenv');

// uncaught exception error handler
process.on('uncaughtException', (err) => {
    console.log(err.name, err.message);
    console.log('UNCAUGHT EXCEPTION! Shutting down...');
    process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app');

const db = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
);

mongoose.connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then((con) => {
    console.log('DB connection successful');
});

const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', (err) => {
    console.log('UNHANDLED REJECTION! Shutting down...');
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});

process.on('SIGTERM', () => {
    console.log('SIGTERM RECEIVED! Shutting down gracefully...');
    server.close(() => {
        console.log('Process terminated!');
    });
});