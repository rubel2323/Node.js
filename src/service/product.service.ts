
import fs from "fs"
import { readFileSync } from "fs";
import path from "path";

const filePath=path.join(process.cwd(),"./src/database/db.json");

export const readProduct=()=>{
  
   const product= fs.readFileSync(filePath,"utf-8")
   // console.log(product);
   return JSON.parse(product);
}

// write the file and send it  into db.json
export const insertProduct=(payload:any)=>{
   fs.writeFileSync(filePath,JSON.stringify(payload));
   console.log(payload);

}