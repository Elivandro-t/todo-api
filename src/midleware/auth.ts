import {Request,Response,NextFunction} from 'express';
import JWT from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const auth = {
    private:async(req:Request,res:Response,next:NextFunction)=>{
        //fazendo verificacao de login
        let sucess = false;
        
            //descriptografar
            if(req.headers.authorization){
               const [autType,token] = req.headers.authorization.split(' ');
               if(autType==='Bearer'){
                   try{
                        JWT.verify(
                        token,
                        process.env.JWTKEY_VER as string
                      );
                      sucess=true
                   }catch(err){

                   }
               };
                
               }

                /*
                let altent:string = req.headers.authorization.substring(6);
                
            let decode:string = Buffer.from(altent, 'base64').toString();
            //retorna um array
             let datas:string[] = decode.split(":");//fzendo separacao de dados
             console.log(datas)
             if(datas.length === 2){
                 let hesuser = await User.findOne({
                    where:{email:datas[0],password:datas[1]}
                 });
                 if(hesuser){
                    sucess=true;
                 }
             }
             */
        
        if(sucess){
            next();
        }else{
            res.status(403); //not autorized
            res.json({erro:"não autorido"});
        }
    }     
}