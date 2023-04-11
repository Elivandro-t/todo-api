import {Router} from 'express';
import * as control from "../controls/costrolapi";
import multer from "multer";
import { auth } from "../midleware/auth";
const up = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"./tmp")
    },
    filename:(req,file,cb)=>{
      let fel= Math.floor(Math.random()*99999);
        cb(null,`${fel+Date.now()}.jpg`)
    }
})

const upload = multer({
    storage:up,
    //filtrando tipo de imagens 
    fileFilter: (req,file,cb)=>{
        let low:string[] = ["image/jpg","image/jpeg","image/png","png.webp"];
        //cb(null, low.includes(file.mimetype));
        
        if(low.includes(file.mimetype)){
            cb(null,true)
            
        }else{
        cb(null,false)
        }
        
    },
    //limitando tamanho do arquivo
    limits:{fieldSize: 2000000}

}
);
const router = Router();
router.get("/todo",control.all)
router.post("/create",control.add)
router.put("/atualize/:id",control.updates)
router.delete("/delet/:id",auth.private,control.remove)
router.post("/upload",upload.single("havatar")/*upload.array('havatar', 2)*/, control.aploadFiles);
router.post("/registe",control.registe)
router.post("/login",control.login)
router.get("/list",auth.private,control.list)
//router.post("",)
//router.get("",)
//router.get("",)
//router.get("",)
//router.get("",)
//router.get("",)
//router.get("",)
export default router;