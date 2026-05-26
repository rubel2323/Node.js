import { createServer, get, IncomingMessage, Server } from "http";

const server: Server = createServer((req:IncomingMessage,res)=>{
// console.log(req.url)
// console.log(req.method)
const url=req.url;// '/', '/products',
const method=req.method;

if(url === "/" && method === 'GET'){
    // console.log("This is Route Root");
    res.writeHead(200,{"content-type": "application/json"});
    res.end(JSON.stringify({message:"This is Route Root"}));
}

else if(url?.startsWith('/products')){
   res.writeHead(200,{"content-type": "application/json"});
    res.end(JSON.stringify({message:"This is Products"}));  
}
else{
    res.writeHead(404,{"content-type": "application/json"});
    res.end(JSON.stringify({message:"Not found"})); 
}


});

server.listen(5000,()=>{
    console.log("This is the first server , I  made it  ");
})