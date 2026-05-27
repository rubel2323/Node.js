import type { IncomingMessage, ServerResponse } from "http";

export const productController=(req:IncomingMessage,res:ServerResponse)=>{

    
const url=req.url;// '/', '/products',
const method=req.method;
if(url==='/product' && method==="GET"){


const product=[
    {
        id:1,
        name: 'product-1',
        price:500
    }
]
   res.writeHead(200,{"content-type": "application/json"});
    res.end(JSON.stringify(
        {
            message:"This is Products",
            data: product,
        }
    )
); 
}
}