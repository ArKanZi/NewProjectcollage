const db = require('../db');
const ENV = process.env;

function createProductServices(body){
    return new Promise(async(resolve, reject) => {
        let conn;
        try {
            conn = await db.getConnection();
            const query =`INSERT INTO Product(ProductName,Image,ProductPrice,ProductQuantity,IsActive,CategoryId,IsDeleted,Description) 
                            VALUES(?,?,?,?,?,?,?,?)`;
            const params = [body['ProductName'],body['filename'], body['ProductPrice'], body['ProductQuantity'],'0','1','0', body['Description']];
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

function getProduct(body){
    return new Promise(async(resolve, reject) => {
        let conn;
        try {
            conn = await db.getConnection();
            const query =`SELECT ProductId, ProductName, product.Image, ProductPrice, ProductQuantity, 
                        IsActive, CategoryId, IsDeleted, Description FROM product WHERE IsDeleted=? ORDER BY ProductName ASC`;
            const params = [0];
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

module.exports = {
    createProductServices,
    getProduct
}