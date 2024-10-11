jwt.verify(token, 'secretKey', (err, decoded) => {
    if (err) {
        return console.log('Token invalid');
    }
    console.log('Decoded payload:', decoded);
});
