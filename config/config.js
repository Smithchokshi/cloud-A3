const mysql = require('mysql');


const writerConnection = mysql.createConnection({
    host: 'clouda3.cluster-ckpbypmpghkk.us-east-1.rds.amazonaws.com',
    user: 'admin',
    password: 'Smith123',
    database: 'cloudA3'
});

const readerConnection = mysql.createConnection({
    host: 'clouda3.cluster-ro-ckpbypmpghkk.us-east-1.rds.amazonaws.com',
    user: 'admin',
    password: 'Smith123',
    database: 'cloudA3'
});

writerConnection.connect((err) => {
        if (err) {
            console.error('Error connecting to the database:', err);
            return;
        }
        console.log('Connected to the database!');
    });

readerConnection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database!');
});



module.exports = { writerConnection, readerConnection };