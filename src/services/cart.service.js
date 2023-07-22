const db = require('../db');
const ENV = process.env;

function addCartService(productLIST){
    return new Promise(async(resolve, reject) => {
        let conn;
        try {
            conn = await db.getConnection();
            //console.log(productLIST);
            const query =`INSERT INTO cart(userId,productId) 
                            VALUES(?,?)`;
            const params = [1,productLIST['ProductId']];
            const result = await conn.query(query, params);
            resolve(result);
        } catch (error) {
            console.log(error);
            reject(error);
        } finally{
            conn.end();
        }
    });
}

function getCartService(){
    return new Promise(async(resolve, reject) => {
        let conn;
        try {
            conn = await db.getConnection();
            const query =`SELECT ProductId,  ProductQuantity, 
                        IsActive FROM product WHERE IsDeleted=? ORDER BY ProductName ASC`;
            const params = [0];
            const result = await conn.query(query, params);
            //console.log(result);
            resolve(result);
        } catch (error) {
            console.log(error);
            reject(error);
        } finally{
            conn.end();
        }
    });
} 

function cartService(){
    return new Promise(async(resolve, reject) => {
        let conn;
        try {
            conn = await db.getConnection();
            const query =`SELECT product.ProductId, product.ProductName, product.Image, product.ProductPrice, product.ProductQuantity, product.IsActive 
            FROM product 
            LEFT JOIN cart 
            ON product.ProductId = cart.productId 
            WHERE product.ProductId = cart.productId ORDER BY product.ProductName ASC`; 
            const params = [0];
            const result = await conn.query(query, params);
            //console.log(result);
            resolve(result);
        } catch (error) {
            console.log(error);
            reject(error);
        } finally{
            conn.end();
        }
    });
} 

module.exports = {
    addCartService,
    getCartService,
    cartService
}