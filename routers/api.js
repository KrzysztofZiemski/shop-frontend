const express = require('express');
const Product = require('../controllers/products.js');
const Errors = require('../controllers/errors.js');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const checkToken = require('../controllers/checkToken.js');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/img/products');
    },
    filename: function (req, file, cb) {
        cb(null, `${req.body.name}.png`);
    }
})

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 10//10MB
    },
    // fileFilter: filefilter
});

class ApiRouter {
    constructor() {
        this.router = express.Router();
        this.routes();
        this.products = new Product();
    }
    // /server/api
    routes() {
        this.router.get('/', this._getAllProducts.bind(this));
        this.router.get('/:id', this._getProduct.bind(this));
        this.router.post('/', upload.single('image'), this._addProduct.bind(this));
        this.router.put('/:id', upload.single('image'), this._changeProduct.bind(this));
        this.router.delete('/:id', this._deleteProduct.bind(this));
        //this.router.delete('/:id', checkToken, this._deleteProduct.bind(this));
    }

    _getAllProducts(req, res) {
        this.products.getAll()
            .then(response => {
                res.status(200).send(response);
            })
            .catch(err => {
                new Errors(err, res)
                res.send(err)
            })
    }

    _getProduct(req, res) {
        const id = req.params.id;
        this.products.getProduct(id)
            .then(response => {
                res.status(200).send(response)
            })
            .catch(err => {
                new Errors(err, res)
                res.send(err)
            })
    }
    async _addProduct(req, res, next) {
        // if (req.body.tokenId.rol !== 'user') res.status(401).send('unauthorization')
        const data = req.body;
        data['image'] = `http://localhost:3000/img/products/${req.body.name}.png`;
        data['tags'] = data['tags'].split(',')
        data.count = Number(data.count);
        data.price = Number(data.price);

        const isOk = this._checkDataComplete(data, req.file);
        if (!isOk) res.status(400).send('brak wszystkich wymaganych informacji');
        // const isExist = await this.products.searchProduct(data.name);
        // if (isExist) res.status(400).send('produkt już istnieje');
        this.products.addProduct(data)
            .then(response => {
                res.status(200).send(response)
            })
            .catch(err => {
                new Errors(err, res)
                res.send(err)
            })
    }
    _checkDataComplete(data, file) {
        const { name, description, category, count, price, image, tags } = data
        if (!file || !name || !description || !category || count === NaN || price === NaN || typeof tags !== 'object') {
            return false
        }
        return true
    }
    ///////błąd podczas zmiany - do dopracowania!!!!!!!!!
    _changeProduct(req, res, next) {
        // if (req.body.tokenId.rol !== 'user') res.status(401).send('unauthorization')
        const data = req.body;
        data['tags'] = data['tags'].split(',')
        const id = req.params.id;
        this.products.changeProduct(id, data)
            .then(response => {
                res.status(200).send(response);
            })
            .catch(err => {
                new Errors(err, res)
                res.status(500).send('err')
            })
    }

    _deleteProduct(req, res) {
        // if (req.body.tokenId.rol !== 'user') res.status(401).send('unauthorization')
        const id = req.params.id;
        this.products.deleteProduct(id)
            .then(response => {
                res.status(200).send(response);
            })
            .catch(err => {
                new Errors(err, res)
                res.send(err)
            })
    }

}

module.exports = ApiRouter;