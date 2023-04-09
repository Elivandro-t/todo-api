import {Request,Response} from "express";
import {sequelize} from '../instances/mysql';
import {unlink} from 'fs/promises';
import {User} from '../models/apiUser'
//bibibloteca de manipulaçao de imagens
import sharp from 'sharp'
export const all = async(req:Request,res:Response)=>{
    const result = await User.findAll();
    res.json({result});
}
export const add = async(req:Request,res:Response)=>{
    let {title,done} = req.body;
    const user = await User.create({
        title,
        done
    });
    res.json({user});
}

export const updates = async(req:Request,res:Response)=>{
    let {id} = req.params;
    let {title,done} = req.body;
    let updates = await User.findByPk(id);
    if(updates){
        updates.title=title;
        updates.done=done;

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
/*
export const frons = (req:Request,res:Response)=>{
    res.json();
}*/