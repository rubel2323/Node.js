import type { IncomingMessage, ServerResponse } from "http";
import { insertProduct, readProduct } from "../service/product.service";
import type { Iproduct } from "../types/product.type";
import { parseBody } from "../utility/parseBody";

export const productController = async (
  req: IncomingMessage,
  res: ServerResponse,
) => {
  const url = req.url; // '/', '/products',
  const method = req.method;

  const urlparts = url?.split("/");

  const id =
    urlparts && urlparts[1] === "products" ? Number(urlparts[2]) : null;

  if (url === "/products" && method === "GET") {
    const products = readProduct();
    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "message retrieved successfully",
        data: products,
      }),
    );
  } else if (method === "GET" && id !== null) {
    const products = readProduct();
    const product = products.find((p: Iproduct) => p.id === id);

    if (!product) {
      res.writeHead(404, { "content-type": "application/json" });
      res.end(
        JSON.stringify({
          message: "product not found",
          data: null,
        }),
      );
      return;
    }

    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "message created successfully",
        data: product,
      }),
    );
  } else if (
    method === "POST" &&
    url === "/products"
  ) // created product  by Post Method
  {
    const products = readProduct();
    const body = await parseBody(req);
    // console.log("Body",body)
    const newProduct = {
      id: Date.now(),
      ...body,
    };

    products.push(newProduct);

    insertProduct(products);

    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "message created successfully",
      }),
    );
  }

  // updated product by PUT method
  else if (method === "PUT" && id !== null) {
    const body = await parseBody(req);
    const products = readProduct();

    const index = products.findIndex((p: Iproduct) => p.id === id);

    if (index < 0) {
      res.writeHead(404, { "content-type": "application/json" });
      res.end(
        JSON.stringify({
          message: "product not found",
          data: null,
        }),
      );
      return;
    }

    products[index] = {
      id: products[index].id,
      ...body,
    };
    insertProduct(products);

    res.writeHead(200, {
      "content-type": "application/json",
    });

    res.end(
      JSON.stringify({
        success: true,
        message: "product updated successfully",
        data: products[index],
      }),
    );
  }

  // remove products by DELETE method
  else if (method === "DELETE" && id !== null) {
    const products = readProduct();

    const index = products.findIndex((p: Iproduct) => p.id === id);

    if (index < 0) {
      res.writeHead(404, { "content-type": "application/json" });
      res.end(
        JSON.stringify({
          message: "product not found",
          data: null,
        }),
      );
      return;
    }

    products.splice(index, 1);
    console.log("The deleted id has", id);
    insertProduct(products);

    res.writeHead(200, {
      "content-type": "application/json",
    });

    res.end(
      JSON.stringify({
        success: true,
        message: "product deleted successfully",
        data: products[index],
      }),
    );
  }
};
