const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

const userRoutes = require('./routes/userRoutes');
const kryptonRoutes = require('./routes/kryptonRoutes');
const kryptonGuardianRoutes = require('./routes/kryptonGuardianRoutes');

dotenv.config({ path: './.env' });
const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/user', userRoutes);
app.use('/api/krypton', kryptonRoutes);
app.use('/api/kryptonGuardian', kryptonGuardianRoutes);

app.get('/', (req, res) => {
  res.send('Server on Running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
