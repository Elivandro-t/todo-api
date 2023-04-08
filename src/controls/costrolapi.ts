import {Request,Response} from "express";
import {sequelize} from '../instances/mysql';
import {User} from '../models/apiUser'

export const home = async(req:Request,res:Response)=>{
    let {name,age,ender} = req.body;
    const user = await User.create({
        name,
        age,
        ender
    });
    res.json({user});
}
export const busc = async(req:Request,res:Response)=>{
    const result = await User.findAll();
    res.json({result});
}
/*
export const pesq = (req:Request,res:Response)=>{
    res.json();
}
export const name = (req:Request,res:Response)=>{
    res.json();
}
export const res = (req:Request,res:Response)=>{
    res.json();
}
export const frons = (req:Request,res:Response)=>{
    res.json();
}*/