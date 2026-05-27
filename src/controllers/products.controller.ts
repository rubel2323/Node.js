import type { IncomingMessage, ServerResponse } from "http";
import { readProduct } from "../service/product.service";

export const productController=async(req:IncomingMessage,res:ServerResponse)=>{

    
const url=req.url;// '/', '/products',
const method=req.method;
if(url==='/products' && method==="GET"){


// const product=[
//     {
//         id:1,
//         name: 'product-1',
//         price:500
//     }
// ]
const product=readProduct();
   res.writeHead(200,{"content-type": "application/json"});
    res.end(JSON.stringify(
        {
            message:"message retrieved successfully",
            data: product,
        }
    )
); 
}
}