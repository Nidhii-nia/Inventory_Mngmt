import multer from "multer";
import path from "path";

//specify destination and the filename with which it should be saved to multer.

const storageConfig = multer.diskStorage({
    destination:(req,file,cb)=>{
       cb(null, path.join(process.cwd(), "public", "images"));
    },
    filename:(req,file,cb)=>{
        const name = Date.now()+"-"+file.originalname;
        cb(null,name);
    },
});

export const uploadFile = multer({
    storage:storageConfig,
})