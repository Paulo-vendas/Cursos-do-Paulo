const express = require("express")
const fs = require("fs")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())

const arquivo = "usuarios.json"

if(!fs.existsSync(arquivo)){

fs.writeFileSync(arquivo,"[]")

}

function lerUsuarios(){

return JSON.parse(fs.readFileSync(arquivo))

}

function salvarUsuarios(lista){

fs.writeFileSync(arquivo,JSON.stringify(lista))

}

app.post("/cadastrar",(req,res)=>{

let usuarios = lerUsuarios()

usuarios.push(req.body)

salvarUsuarios(usuarios)

res.json({msg:"Conta criada com sucesso"})

})

app.post("/login",(req,res)=>{

let usuarios = lerUsuarios()

let encontrado = usuarios.find(u =>
u.usuario==req.body.usuario &&
u.senha==req.body.senha
)

if(encontrado){

res.json({ok:true})

}else{

res.json({ok:false,msg:"Login inválido"})

}

})

app.listen(3000,()=>{

console.log("Servidor rodando")

})
