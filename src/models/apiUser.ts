import {Model,DataTypes} from 'sequelize';
import {sequelize} from '../instances/mysql';
export interface apiconstances extends Model{
    id: number;
    title:string;
    done:boolean
}
export const User = sequelize.define<apiconstances>("User",{
    id:{
        primaryKey:true,
        autoIncrement:true,
        type:DataTypes.INTEGER
    },
    title:{
        type:DataTypes.STRING
    },
    done:{
        type:DataTypes.BOOLEAN
    }
},
{
    tableName:"api",
    timestamps:false
})