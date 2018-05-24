"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var User_1 = require("../models/User");
var bcrypt = require("bcrypt");
var UserRouter = /** @class */ (function () {
    function UserRouter() {
        this.router = express_1.Router();
        this.routes();
    }
    UserRouter.prototype.GetUsers = function (req, res) {
        User_1.default.find({})
            .then(function (data) {
            var status = res.statusCode;
            res.json({
                status: status,
                data: data
            });
        })
            .catch(function (err) {
            var status = res.statusCode;
            res.json({
                status: status,
                err: err
            });
        });
    };
    UserRouter.prototype.GetUser = function (req, res) {
        var username = req.params.username;
        User_1.default.findOne({ username: username })
            .populate('posts')
            .then(function (data) {
            var status = res.statusCode;
            res.json({
                status: status,
                data: data
            });
        })
            .catch(function (err) {
            var status = res.statusCode;
            res.json({
                status: status,
                err: err
            });
        });
    };
    UserRouter.prototype.CreateUser = function (req, res) {
        var firstname = req.body.firstname;
        var lastname = req.body.lastname;
        var username = req.body.username;
        var email = req.body.email;
        var posts = req.body.posts;
        bcrypt.hash(req.body.password, 10, function (err, hash) {
            if (err) {
                return res.status(500).json({
                    error: err
                });
            }
            else {
                var user = new User_1.default({
                    firstname: firstname,
                    lastname: lastname,
                    username: username,
                    email: email,
                    password: hash,
                    posts: posts
                });
                user.save()
                    .then(function (data) {
                    var status = res.statusCode;
                    res.json({
                        status: status,
                        data: data
                    });
                })
                    .catch(function (err) {
                    var status = res.statusCode;
                    res.json({
                        status: status,
                        err: err
                    });
                });
            }
        });
    };
    UserRouter.prototype.UpdateUser = function (req, res) {
        var username = req.params.username;
        User_1.default.findOneAndUpdate({ username: username }, req.body)
            .then(function (data) {
            var status = res.statusCode;
            res.json({
                status: status,
                data: data
            });
        })
            .catch(function (err) {
            var status = res.statusCode;
            res.json({
                status: status,
                err: err
            });
        });
    };
    UserRouter.prototype.DeleteUser = function (req, res) {
        var username = req.params.username;
        User_1.default.findOneAndRemove({ username: username })
            .then(function (data) {
            var status = res.statusCode;
            res.json({
                status: status,
                data: data
            });
        })
            .catch(function (err) {
            var status = res.statusCode;
            res.json({
                status: status,
                err: err
            });
        });
    };
    UserRouter.prototype.routes = function () {
        this.router.get('/', this.GetUsers);
        this.router.get('/:username', this.GetUser);
        this.router.post('/', this.CreateUser);
        this.router.put('/:username', this.UpdateUser);
        this.router.delete('/:username', this.DeleteUser);
    };
    return UserRouter;
}());
var userRoutes = new UserRouter().router;
exports.default = userRoutes;
