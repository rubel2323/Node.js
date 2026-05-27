import type { IncomingMessage, ServerResponse } from "http";
import { productController } from "../controllers/products.controller";

export const routeHandler=(req:IncomingMessage,res:ServerResponse) => {
const url=req.url;// '/', '/products',
const method=req.method;

if(url === "/" && method === 'GET'){
    // console.log("This is Route Root");
    res.writeHead(200,{"content-type": "application/json"});
    res.end(JSON.stringify({message:"This is Route Root"}));
}

else if(url?.startsWith('/products')){
 productController(req,res);
}
else{
    res.writeHead(404,{"content-type": "application/json"});
    res.end(JSON.stringify({message:"Not found"})); 
}


}