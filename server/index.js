const app = require('./app');
const db = require('./db');

const port = 3030;

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
})