const express = require("express")
const rotasProfessores = require("./routes/professores.routes")
const app = express()
const rotasCursos= require("./routes/cursos.routes")

app.use(express.json())
app.use("/professores", rotasProfessores)
app.use("/cursos", rotasCursos)



app.listen(3000, () => console.log("API no ar"))

