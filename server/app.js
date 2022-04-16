const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const SHA256 = require("crypto-js/sha256");
const jwt = require('jsonwebtoken');
const {
    Pool
} = require('pg');
require('dotenv').config();

let pool = new Pool();

const whitelist = ['http://localhost:8080']
let corsOption = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}

app.use(morgan('dev'));
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json());
app.use(cors(corsOption));

app.disable('etag');


const port = process.env.PORT

app.post('/api/auth/register', (req, res) => {
    try {
        pool.connect(async (error, client, release) => {
            const hashedPassword = SHA256(req.body.password).toString()
            let resp = await client.query(`INSERT INTO "Users" ("firstName", "lastName", "email", "password") VALUES ('${req.body.firstName}', '${req.body.lastName}', '${req.body.email}', '${hashedPassword}')`);
            res.send(resp.rows)
            release()
        })
    } catch (error) {
        console.log(error)
    }
});

app.post('/api/auth/user-login', (req, res) => {
    try {
        pool.connect(async (error, client, release) => {
            let token
            let user = await client.query(`SELECT * FROM "Users" WHERE "email"='${req.body.email}'`);
            if (user.rows.length === 0) {
                res.sendStatus(401)
            } else {
                if (user.rows[0].password === SHA256(req.body.password).toString()) {
                    token = jwt.sign(req.body, 'secret');
                    await client.query(`UPDATE "Users" SET "token"='${token}' WHERE "email"='${req.body.email}'`)
                    res.send({
                        ...user.rows[0],
                        token
                    })
                    release()
                } else {
                    res.sendStatus(401)
                    release()
                }
            }
        })
    } catch (error) {
        console.log(error)
        res.sendStatus(401)
        release()
    }
});


app.post('/api/auth/user-doctor', (req, res) => {
    try {
        pool.connect(async (error, client, release) => {
            let token
            let user = await client.query(`SELECT * FROM "Doctors" WHERE "email"='${req.body.email}'`);
            if (user.rows.length === 0) {
                res.sendStatus(401)
            } else {
                if (user.rows[0].password === SHA256(req.body.password).toString()) {
                    token = jwt.sign(req.body, 'secret');
                    await client.query(`UPDATE "Doctors" SET "token"='${token}' WHERE "email"='${req.body.email}'`)
                    res.send({
                        ...user.rows[0],
                        token
                    })
                    release()
                } else {
                    res.sendStatus(401)
                    release()
                }
            }
        })
    } catch (error) {
        console.log(error)
        res.sendStatus(401)
        release()
    }
});

app.get('/api/doctors/list', (req, res) => {
    try {
        pool.connect(async (error, client, release) => {
            let resp = await client.query(`SELECT "id", "firstName", "lastName", "specialisation", "photo" FROM "Doctors"`);
            res.send(resp.rows)
            release()
        })
    } catch (error) {
        console.log(error)
    }
});

app.get('/api/doctors/details/:id', (req, res) => {
    const {
        id
    } = req.params
    try {
        pool.connect(async (error, client, release) => {
            let resp = await client.query(`SELECT "firstName", "lastName", "specialisation", "cost", "description", "photo" FROM "Doctors" WHERE "id"='${id}'`);
            res.send(resp.rows)
            release()
        })
    } catch (error) {
        console.log(error)
    }
});

app.post('/api/appointments/request', (req, res) => {
    try {
        pool.connect(async (error, client, release) => {
            let resp = await client.query(`INSERT INTO "Appointments" ("userId", "doctorId", "userFirstName", "userLastName", "doctorFirstName", "doctorLastName", "cost", "status") VALUES ('${req.body.userId}', '${req.body.doctorId}', '${req.body.userFirstName}', '${req.body.userLastName}', '${req.body.doctorFistName}', '${req.body.doctorLastName}', '${req.body.cost}', '${req.body.status}')`);
            res.send(resp.rows)
            release()
        })
    } catch (error) {
        console.log(error)
    }
});

app.post('/api/appointments/list', (req, res) => {
    const id = req.body.id
    try {
        pool.connect(async (error, client, release) => {
            let resp = await client.query(`SELECT "id", "userFirstName", "userLastName", "doctorFirstName", "doctorLastName", "dateStart", "timeStart", "status" FROM "Appointments" WHERE "userId"='${id}'`);
            res.send(resp.rows)
            release()
        })
    } catch (error) {
        console.log(error)
    }
});

app.post('/api/appointments/details', (req, res) => {
    const id = req.body.appointmentId
    try {
        pool.connect(async (error, client, release) => {
            let resp = await client.query(`SELECT * FROM "Appointments" WHERE "id"='${id}'`);
            res.send(resp.rows)
            release()
        })
    } catch (error) {
        console.log(error)
    }
});

app.post('/api/appointments/doctor/list', (req, res) => {
    const id = req.body.id
    try {
        pool.connect(async (error, client, release) => {
            let resp = await client.query(`SELECT "id", "userFirstName", "userLastName", "doctorFirstName", "doctorLastName", "dateStart", "timeStart", "status" FROM "Appointments" WHERE "doctorId"='${id}'`);
            res.send(resp.rows)
            release()
        })
    } catch (error) {
        console.log(error)
    }
});

app.post('/api/appointments/update', (req, res) => {
    try {
        pool.connect(async (error, client, release) => {
            let resp = await client.query(`UPDATE "Appointments" SET "status"='${req.body.status}', "dateStart"='${req.body.dateStart}', "timeStart"='${req.body.timeStart}', "preNotes"='${req.body.preNotes}', "postNotes"='${req.body.postNotes}', "code"='${req.body.code}' WHERE "id"='${req.body.appointmentId}'`);
            res.send(resp.rows)
            release()
        })
    } catch (error) {
        console.log(error)
    }
});



app.listen(port, () => {
    console.log('serv' + port)
})