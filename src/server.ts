//meu servidor
import Express,{Request,Response,ErrorRequestHandler} from "express";
import mustache from "mustache-express";
import dotenv from "dotenv";
import path = require("path");
import router from "./routers/apirest";
import cors from "cors";
import  { MulterError } from "multer";
dotenv.config();
const app = Express();
app.use(cors({
    origin:'*'
}))
// acessando pasta publica
app.set('view engine','mustache')
app.set('views', path.join(__dirname,'views'));
app.engine('mustache', mustache());
app.use(Express.static(path.join(__dirname,"../public")));
app.use(Express.urlencoded({extended:true}))
app.use(router)
app.use((req:Request,res:Response)=>{
    res.status(404);
    res.json({error:'EndPont não encontrado'})
})
const errorHandler: ErrorRequestHandler = (err,req,res,nex)=>{
  res.status(400);//band request
  if(err instanceof MulterError){
       res.json({error:err.code})
  }else{
    console.log(err);
    res.json("ocorreu algum erro");
  }
}
app.use(errorHandler)
//porta do meu server
app.listen(process.env.PORT,()=>{
    console.log("servidor rodando")
})