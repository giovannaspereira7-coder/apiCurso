const express = require("express")
const router = express.Router() //quando criar um arquivo router precisa usaar o express.Router
const db = require("../db")



router.get("/", async (req,res) => {
    const [professores] = await db.execute("select * from professor")
    return res.json(professores)  
})

router.post("/professores", async (req, res) => {
  const { nome, especialidade } = req.body

  if(!nome || !especialidade){
    return res.status(400).json({error: "Nome e especialidade são campos obrigatórios"})
  }

  if(nome.length < 3){
    return res.status(400).json ({error: "Nome deve conter mais de 3 caracteres"})
  }
  const [resultado] = await db.execute(
    "insert into professor(nome, esecialidade) VALUES (?, ?)",
    [nome, especialidade]
  )
  
  return res.status(201).json({id: resultado.insertId, nome, especialidade})
})

module.exports = router