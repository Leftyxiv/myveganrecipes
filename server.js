const express = require('express');

const app = express();
const port = 3001;

app.use(express.static('public'));
app.use(express.json());

app.listen(port, () => {
    console.log(`app running on port ${port}`)
});