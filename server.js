import express from "express";
import bcrypt from "bcrypt-nodejs";
import cors from "cors";
import knex from "knex";
import handleRegister from "./controllers/register.js";
import handleSignin from "./controllers/signin.js";
import handdleProfileId from "./controllers/profileId.js";
import { handleImage, handleApiCall } from "./controllers/image.js";

const db = knex({
    client: 'pg',
  connection: {
    host : 'dpg-cj8lpdcl975s73edlok0-a',
    user : 'smart_brain_db_smfo_user',
    password : 'OpqZCXKhmUPuuxHAq4N0KLFzyViDUuoa',
    database : 'smart_brain_db_smfo'
  }
});

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.json('success');
})

app.post('/signin', (req, res) => {
    handleSignin(req, res, db, bcrypt)
})

app.post('/register', (req, res) => { handleRegister(req, res, db, bcrypt) 
})

app.get('/profile/:id', (req, res) => {
    handdleProfileId(req, res, db)
})

app.put('/image', (req, res) => {
    handleImage(req, res, db)
})

app.post('/imageurl', (req, res) => {
    handleApiCall(req, res)
})

app.listen(process.env.PORT || 3000, ()=> {
    console.log(`app is running on port ${process.env.PORT}`)
});