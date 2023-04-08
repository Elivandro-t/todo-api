import {Model,DataTypes} from 'sequelize';
import {sequelize} from '../instances/mysql';
export interface apiconstances extends Model{
    id: number;
    name:string;
    age:number;
    ender:string
}
export const User = sequelize.define<apiconstances>("User",{
    id:{
        primaryKey:true,
        autoIncrement:true,
        type:DataTypes.INTEGER
    },
    name:{
        type:DataTypes.STRING
    },
    age:{
        type:DataTypes.INTEGER
    },
    ender:{
        type:DataTypes.STRING
    }
},
{
    tableName:"api",
    timestamps:false
})