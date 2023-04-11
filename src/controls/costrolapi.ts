import {Request,Response} from "express";
import {sequelize} from '../instances/mysql';
import dotenv from 'dotenv';
//importando bibilhoteca de gerar token
import JWT from 'jsonwebtoken';
dotenv.config();
import {unlink} from 'fs/promises';
import {User} from '../models/apiUser'
//bibibloteca de manipulaçao de imagens
import sharp from 'sharp'
export const all = async(req:Request,res:Response)=>{
    const result = await User.findAll();
    res.json({result});
}
export const add = async(req:Request,res:Response)=>{
    let {user,password,email} = req.body;
    const uses = await User.create({
        user,
        password,
        email
    });
    res.json({uses});
}

export const updates = async(req:Request,res:Response)=>{
    let {id} = req.params;
    let {user,password,email} = req.body;
    let updates = await User.findByPk(id);
    if(updates){
        updates.user=user;
        updates.password=password;
        updates.email=email;

        updates.save();

    }else{
        console.log({error:"nada encontrado"})
    }
    res.json({});
}
export const remove = async(req:Request,res:Response)=>{
    let {id} = req.params;
    await User.destroy({where:{id}});
    res.json();
}

export const aploadFiles = async(req:Request,res:Response)=>{
    //manipulando imagens
    if(req.file){
        const filenam = `${req.file.filename}`
        await sharp(req.file.path)
        .resize(300,300,{
            //diminuindo imagems
            fit:sharp.fit.cover,
            /*
            position: 'botton ou top'
            */
        })
        .toFormat("jpg")
        .toFile(`./public/midia/${filenam}`)
        //deletando arquivo da pasta temp
         await unlink(req.file.path);
        res.json({image:`${filenam}`});
    }else{
        res.status(4000);
        res.json({error:'arquivo invalido'});
    }
};

export const registe = async(req:Request,res:Response)=>{
    if(req.body.email&&req.body.email&&req.body.user){
       let {email,password,user} = req.body;
       let hasuser = await User.findOne({where:{email,user}});
       if(!hasuser){
        let newuser = await User.create({email, password,user});
        const token = JWT.sign(
            {id:newuser.id,email:newuser.email},
            process.env.JWTKEY_VER as string,
            {expiresIn:60*2}
        );
        res.json({id: newuser.id, token});
       }else{
        res.json({error:"email ja existe"});
       }
    }
    res.json({error:"email e senha nao enviador"});
}
export const login = async(req:Request,res:Response)=>{
    let email:string=req.body.email;
    let password:number=req.body.password;
    let use = await User.findOne({where:{email,password}});
    if(use){
        const token = JWT.sign(
            {id:use.id,email:use.email},
            process.env.JWTKEY_VER as string,
            {expiresIn:60*2}
        );
       res.json({status:true, token});
       return;
    }
    res.json({status:false});
    console.log("deu erro")

}
export const list = async(req:Request,res:Response)=>{
    const users = await User.findAll();
    let lis:string[]=[];
    for(let i in users){
        lis.push(users[i].email);
    }
     res.json({lis});
}