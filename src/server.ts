//meu servidor
import Express,{Request,Response} from "express";
import dotenv from "dotenv";
import path = require("path");
import router from "./routers/apirest";
import cors from "cors";
dotenv.config();
const app = Express();
app.use(cors({
    origin:'*'
}))
// acessando pasta publica
app.use(Express.static(path.join(__dirname,"../public")));
app.use(Express.urlencoded({extended:true}))
app.use(router)
app.use((req:Request,res:Response)=>{
    res.status(404);
    res.json({error:'EndPont não encontrado'})
})
//porta do meu server
app.listen(process.env.PORT,()=>{
    console.log("servidor rodando")
})