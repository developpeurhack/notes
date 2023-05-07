import { Router } from 'express';
export const router = Router()


   // @ts-ignore
router.get('/', (req, res) => {
    // @ts-ignore
    req.getConnection((error, connection) => {
        if (error) { throw error } else {
            // @ts-ignore
            connection.query(" SELECT * FROM note ", [], (/** @type {any} */ error, /** @type {any} */ resultat) => {
                if (error) { throw error } else {
                    const heureConnectee = Date().toString();
                res.render('accueil', {  resultat, heureConnectee})
                }
            })
        }
    })
        /*
        const notes = [{ titre: "javascript" }, { titre: "node js" },
        { titre : "express"},  { titre : "autres"}]
        res.render('accueil', { title: ' page accueil', heureConnectee, notes })
    */
    })
    // @ts-ignore
    router.post('/', (req, res) => {
        //console.log(req.session)
        //console.log(req.body)
        let pseudo = req.body.pseudo;
        let name = req.body.name;
        let titre = req.body.titre;
        let description = req.body.description
        // @ts-ignore
        req.getConnection((error, connection) => {
            if (error) { throw error } else {
                // @ts-ignore
                connection.query("INSERT INTO note(id, pseudo, name, titre, description) VALUES(?, ?, ?, ?, ? )", [null, pseudo, name, titre, description ], (/** @type {any} */ error, /** @type {any} */ resultat) => {
                    if (error) { throw error } else {
                        res.redirect("/")
                    }
                })
            }
        })

    
    })
router.delete('/:id', (req, res) => {
    let id = req.params.id;
    // @ts-ignore
    req.getConnection((error, connection) => {
        if (error) { throw error; } else {
            // @ts-ignore
            connection.query("DELETE FROM note WHERE id = ?", [id], (/** @type {any} */ error, /** @type {any} */ resultat) => {
                if (error) { throw error } else {
                    res.json({ routeRacine: '/' })
                }
            })
        }
    });
});
export  const homeRouter = router;