"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = void 0;
const restify_errors_1 = require("restify-errors");
const authorize = (...profiles) => {
    return (req, resp, next) => {
        if (req.authenticated !== undefined &&
            req.authenticated.hasAny(...profiles)) {
            req.log.debug("User %s is authorized with profiles %j on Route %s. Required profiles %j", req.authenticated._id, req.authenticated.profiles, req.path(), profiles);
            next();
        }
        else {
            if (req.authenticated) {
                req.log.debug("Permission denied for %s. Required profiles: %j User profiles: %j", req.authenticated._id, profiles, req.authenticated.profiles);
            }
            next(new restify_errors_1.ForbiddenError("Permissão negada"));
        }
    };
};
exports.authorize = authorize;
