const express = require('express');
const bcrypt = require('bcryptjs');
const PouchDB = require('pouchdb');
const jwt = require('jsonwebtoken');
const Users = require('./users.js');

class Authentication {
    constructor() {
        this.db = new PouchDB('./db/users');
        this.users = new Users();
    }

    _checkPassword(password, confirmPassword) {
        return bcrypt.compare(confirmPassword, password);
    }
    generateTokens(user) {
        const ACCESS_TOKEN = jwt.sign({
            login: user.login,
            sub: user._id,
            rol: user.permission,
            type: 'ACCESS_TOKEN'
        },
            process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: 1000 * 60 * 15
        });
        const REFRESH_TOKEN = jwt.sign({
            sub: user._id,
            type: 'REFRESH_TOKEN'
        },
            process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: 1000 * 60 * 60
        });
        this.users.updateUser(user, { refreshToken: REFRESH_TOKEN })
        return {
            accessToken: ACCESS_TOKEN,
            refreshToken: REFRESH_TOKEN
        }
    }

    async login(user, confirmPassword) {
        const isCorrect = await this._checkPassword(user.password, confirmPassword);
        if (!isCorrect) return null;
        return this.generateTokens(user)
    }

    checkAdminToken = (req, res, next) => {
        const AUTHORIZATION_TOKEN = req.headers.authorization && req.headers.authorization.split(' ');
        if (!AUTHORIZATION_TOKEN === null) return res.status(401).json('not authorized');
        if (AUTHORIZATION_TOKEN[0] !== 'Bearer') return res.status(401).json('invalid token')


        jwt.verify(AUTHORIZATION_TOKEN[1], process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err || decoded.permission !== 'admin') return res.status(401).json('not access');
            req.token = decoded;
            next()
        })
    }
    checkUserToken = (req, res, next) => {
        const AUTHORIZATION_TOKEN = req.headers.authorization && req.headers.authorization.split(' ');
        if (!AUTHORIZATION_TOKEN === null) return res.status(401).json('not authorized');
        if (AUTHORIZATION_TOKEN[0] !== 'Bearer') return res.status(401).json('invalid token')


        jwt.verify(AUTHORIZATION_TOKEN[1], process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) return res.status(403).json('not access');
            req.token = decoded;
            next()
        })
    }

    refreshToken(token) {
        const data = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            console.log(decoded)
        })
    }

}

module.exports = Authentication;