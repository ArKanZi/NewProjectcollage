const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
    destination: path.join(__dirname, '../../assets/uploads'),
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      console.log("Filename: ", file.fieldname + '-' + uniqueSuffix + '.' + path.extname(file.originalname));
      cb(null, file.fieldname + '-' + uniqueSuffix +  path.extname(file.originalname)) 
    }
});
const upload = multer({ storage: storage})
const uploadBannerPath = upload.single('Image')


const MAX_PRICE_RANGE = 100000;
const productService = require('../services/product.service');
const CATEGORY_MAP = {
    "All" : 0,
    "Processor" : 1,
    "GraphicsCard" : 2,
    "Ram" : 3,
    "Accesories" : 4
}
function product(req, res){
        const priceRange = req.query.priceRange || MAX_PRICE_RANGE;
        const category = CATEGORY_MAP[req.query.category] || CATEGORY_MAP.All ;
        const order = req.query.order || "" ;
        const compareProduct = (a,b) => a.ProductPrice <= b.ProductPrice ? -1 : 1 ;
        productService.getProduct().then(
            products => {
                let filteredProducts = products.filter(p => p.ProductPrice <= priceRange);
                if(category !== 0) filteredProducts = filteredProducts.filter(p => p.CategoryId === category);
                let sortedProducts = filteredProducts;
                if(order === "asc") sortedProducts = sortedProducts.sort(compareProduct);
                else if(order === "dec") sortedProducts = sortedProducts.sort(compareProduct).reverse();
                return res.render('product/product', {title: 'Shop', priceRange, product: sortedProducts });
            }
        ).catch()
        error => {
            return res.render('product/product', {title: 'Shop', product: [] });

        }
}

function productdetail(req, res){
    const productId = req.params.product_Id
    //console.log(productId);
    productService.getProduct().then(
        productList => {
            //console.log(productList);
            const productLIST = productList.find((productdetail) => productdetail.ProductId == productId)

            res.render('product/product-details', {title: 'Product Details', product: productList, products: productLIST })
            console.log(productLIST);

        }
    ).catch(
        error => {
            console.log(error);
            res.render('product/product-details', {title: 'Product Details', product: [] })
        }
    )
}

function productAdd(req, res){
    productService.getProduct().then(
        products => {
            return res.render('product/product-add', {title: 'Shop', product: products});
            

        }
    ).catch()
    error => {
        return res.render('product/product', {title: 'Shop', product: "not found" });

    }
}

function createProduct(req, res){
    const body = req.body;
    //console.log(body);
    const file = req.file;
    //console.log(file);
    body['filename'] = file.filename;
    //console.log(body);
    productService.createProductServices(body).then(
        result =>{ res.redirect('/product-add')
    }
     ).catch(
         error => {console.log(error);
        }
     )
}

module.exports = {
    product,
    productdetail,
    productAdd,
    createProduct,
    uploadBannerPath
}