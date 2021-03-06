const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const cors = require('cors');
const path = require('path');

// CUSTOM IMPORTS
const AppError = require('./utils/appError');

// ROUTER IMPORTS
const userRouter = require('./routes/userRoutes');
const recipeRouter = require('./routes/recipeRoutes');
const commentRouter = require('./routes/commentRoutes');

// START APP CODE
const app = express();
app.enable('trust proxy');
const port = 3001;

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
};
app.use(cors());
app.use(helmet());

const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour!'
});
// UNCOMMENT BEFORE LIVE
// app.use('/api', limiter);


app.use(express.static(path.join(__dirname ,'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(mongoSanitize());
app.use(xss());

app.use(hpp({
    whitelist: [
        'duration',
        'ingredients',
        'prep time',
        'servings',
    ]
}));

app.use(compression());

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

app.use('/api/v1/users', userRouter);
app.use('/api/v1/recipes', recipeRouter);
app.use('/api/v1/comments', commentRouter);

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// app.listen(port, () => {
//     console.log(`app running on port ${port}`)
// });

module.exports = app;

// mongodb+srv://<username>:<password>@cluster0.jycnh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority