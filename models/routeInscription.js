import { Router } from "express"
export const router = Router()


// @ts-ignore
router.post('/inscription', (req, res) => {
    let nom = req.body.name 
    let prenom = req.body.prenom 
    let email = req.body.email 
    let pwd = req.body.password 

    // @ts-ignore
    req.getConnection((error, connection) => {
        if (error) { throw error } else {
            // @ts-ignore
            connection.query("INSERT INTO note(id, name, prenom, email, password) VALUES(?, ?, ?, ?, ?)", [null, nom, prenom, email, pwd], (/** @type {any} */ error, /** @type {any} */ resultat) => {
                if (error) { throw error } else {
                res.redirect('/')
                }
                
            })
        }
    })
})

export const routeInscription = router