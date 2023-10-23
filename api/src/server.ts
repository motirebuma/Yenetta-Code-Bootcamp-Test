import express from 'express';
import routes from './routes/routes';
import cors from 'cors';
import path from 'path';

const app = express();


const corsOptions = {
    credentials: true,
    origin: ['http://localhost:3000']
};
  
app.use(cors(corsOptions));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use('/api', routes);

const port = 9000;
app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});