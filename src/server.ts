import Express from 'express';
import dotenv from 'dotenv';

dotenv.config();
const app = Express();

app.get('/', (req, res) => {
    res.send('Hello, World!');
    }
);
app.listen(3000);