const jwt = require('jsonwebtoken');
const user = { id: 1, name: 'John Doe' };

const token = jwt.sign(user, 'secretKey', { expiresIn: '1h' });
