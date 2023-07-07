const mysql = require('mysql');


const connection = mysql.createConnection({
    host: 'clouda3-instance-1.ckpbypmpghkk.us-east-1.rds.amazonaws.com',
    user: 'admin',
    password: 'Smith123',
    database: 'cloudA3'
});

    connection.connect((err) => {
        if (err) {
            console.error('Error connecting to the database:', err);
            return;
        }
        console.log('Connected to the database!');
    });



module.exports = connection;