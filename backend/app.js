require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const { sequelize } = require('./models');

const app = express();
const PORT = process.env.PORT || 3306;

app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);

sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log('Server is running on port ${PORT}');
    });
});
