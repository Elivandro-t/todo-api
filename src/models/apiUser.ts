import {Model,DataTypes} from 'sequelize';
import {sequelize} from '../instances/mysql';
export interface apiconstances extends Model{
    id: number;
    user:string;
    password:string
    email:string
}
export const User = sequelize.define<apiconstances>("User",{
    id:{
        primaryKey:true,
        autoIncrement:true,
        type:DataTypes.INTEGER
    },
    user:{
        type:DataTypes.STRING
    },
    password:{
        type:DataTypes.STRING
    },
    email:{
        type:DataTypes.STRING
    }
},
{
    tableName:"api",
    timestamps:false
})