const express = require("express")
const router = express.Router()
const db = require("../db")



router.get("/", async (req, res) => {
    const [cursos] = await db.execute ("select * from curso")
    return res.json(cursos)
})

router.post("/", async (req, res)=> {
    const{nome, descricao, professor_id} = req.body

    if(!nome || !descricao || !professor_id){
        return res.status(400).json({error: "nome, descricao, professor_id são obrigatórios"})
    }

    const [resultado] = await db.execute(
        "insert into curso (nome, descricao, professor_id) VALUES (?, ?, ?)",
        [nome,descricao,professor_id]
    )

    return res.status(201).json ({id: resultado.insertId, nome, descricao})
})

router.delete("/:id", async (req,res) =>{ 
const id = req.params.id // pega o id da url

const [resultado] = await db.execute(
    "delete from curso where id = ?",
    [id]
)

if(resultado.affectedRows === 0){
    return res.status(404).json({error: "Curso não encontrado!"})
}

return res.status(204).end()

})

module.exports = router 