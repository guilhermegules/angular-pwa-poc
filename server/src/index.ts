import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { saveSecure, listSecures } from './services/secure-service';

const app = express();

app.use(bodyParser.json());
app.use(cors({ origin: true, credentials: true }));

app.route('/api/seguros').post(saveSecure);
app.route('/api/seguros').get(listSecures);

const HOST = 'localhost';
const PORT = 9000;

app.listen(PORT, HOST, () => {
  console.log(`Server is listening http://${HOST}:${PORT}`);
});
