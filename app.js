import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'
import { fileURLToPath } from "url";
import * as dotenv from 'dotenv';
dotenv.config();
import myConnection from "express-myconnection";
import mysql from "mysql"
const app = express()
const PORT = process.env.PORT || 5002
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import { homeRouter } from './models/routeNotes.js'
import session from 'express-session';
// @ts-ignore
import connection from 'express-myconnection';
import { routeInscription } from './models/routeInscription.js';
import { validation, validate} from './controllers/validation.js';
// def param session
app.use(session({
    name: process.env.SESSION_NAME,
    // @ts-ignore
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        secure: false
    }
}))

// definir les parametres de connexion
const dbOptions = {
    host: "localhost",
    user: "root",
    password: "root",
    database: "notes",
    port:8889
}
// definir le midlleware de connexion
app.use(myConnection(mysql, dbOptions, 'pool'))

    app.set('view engine', 'ejs')
    app.set('views', 'views')
    
    app.use(bodyParser.urlencoded({extended:false}))
    app.use(express.static(path.join(__dirname, "public")));
// definition page routeNotes 
app.use(homeRouter)
    // @ts-ignore
    app.get('/error', (req, res) => {
        res.render('error', { title: ' page error' })
    })
    // @ts-ignore
    app.get('/apropos', (req, res) => {
        res.render('apropos', { title: ' page apropos' })
    })
app.get('/inscription', (req, res) => {
res.render('inscription')
})
// def route page inscription
app.use(routeInscription)

app.get('/connexion', (req, res) => {
res.render('connexion')
})
app.post('/connexion', (req, res) => {
    //console.log(req.body)
    let nom = req.body.name 
    let mdp = req.body.password 
    let pwd = req.body.pwd
    // @ts-ignore
    req.getConnection((error, connection) => {
        if (error) { throw error } else {
            // @ts-ignore
            connection.query("INSERT INTO note(id, name, password, pwd  ) VALUES(? , ?, ?, ?)", [null, nom, mdp, pwd], (/** @type {any} */ error, /** @type {any} */ resultat) => {
                if (error) { throw error } else {
                    res.redirect('/')
                }
            
            })
        }
    })
})
    app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`)

})

