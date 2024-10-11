const refreshToken = jwt.sign(user, 'refreshSecretKey', { expiresIn: '7d' });

// Jab access token expire ho jaye, refresh token se naya access token generate karein
jwt.verify(refreshToken, 'refreshSecretKey', (err, decoded) => {
    if (err) {
        return console.log('Refresh token invalid');
    }
    const newToken = jwt.sign({ id: decoded.id }, 'secretKey', { expiresIn: '1h' });
});
