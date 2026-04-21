let product = [
    {id: 1, name: "Laptop", price: 1000 , image: "laptop.jpg"},
    {id: 2, name: "Smartphone", price: 500, image: "smartphone.jpg"}
];

exports.getProducts = (req , res)=>{
    res.json(product);
}
exports.createProduct = (req , res)=>{
    const newProduct = {
        id: product.length + 1,
        name: req.body.name,
        price: req.body.price,
        image:req.file ? req.file.filename : null
    };
    product.push(newProduct);
    res.json(newProduct);
}
exports.updateProduct = (req , res)=>{
    const productId = parseInt(req.params.id);
    const productIndex = product.findIndex(p => p.id === productId);
    if(productIndex === -1){
        return res.status(404).json({message: "Product not found"});
    }
    const updatedProduct = {
        ...product[productIndex],
        name: req.body.name || product[productIndex].name,
        price: req.body.price || product[productIndex].price,
        image: req.file ? req.file.filename : product[productIndex].image
    };
    product[productIndex] = updatedProduct;
    res.json(updatedProduct);

}

//delete product

exports.deleteProduct = (req , res)=>{
    const ProductId = parseInt(req.params.id);
    const productIndex = product.findIndex(p => p.id === ProductId);
    if(productIndex === -1){
        return res.status(404).json({message: "Product not found"});
    }
    product.splice(productIndex, 1);
    res.json({message: "Product deleted"});
}