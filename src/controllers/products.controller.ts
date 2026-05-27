import type { IncomingMessage, ServerResponse } from "http";
import { readProduct } from "../service/product.service";
import type { Iproduct } from "../types/product.type";
import { parseBody } from "../utility/parseBody";

export const productController=async(req:IncomingMessage,res:ServerResponse)=>{

    
const url=req.url;// '/', '/products',
const method=req.method;

const urlparts=url?.split('/');

const id=urlparts && urlparts[1]==='products'?Number(urlparts[2]):null;

console.log("The id is",id)


if(url==='/products' && method==="GET"){
const products=readProduct();
   res.writeHead(200,{"content-type": "application/json"});
    res.end(JSON.stringify(
        {
            message:"message retrieved successfully",
            data: products,
        }
    )
); 
}

else if(method ==="GET" && id !== null){
    const products=readProduct();
    const product=products.find((p : Iproduct)=>p.id === id);

   res.writeHead(200,{"content-type": "application/json"});
    res.end(JSON.stringify(
        {
            message:"message created successfully",
            data: product,
        }
    )
); 

}

else if(method === "POST" && url === "/products")
{

    const body= await parseBody(req);
    console.log(body);
      res.writeHead(200,{"content-type": "application/json"});
    res.end(JSON.stringify(
        {
            message:"message created successfully",
          
        }
    )
); 
}

}