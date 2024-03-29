"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergePatchBodyParser = void 0;
const restify_errors_1 = require("restify-errors");
const mpContentType = 'application/json+merge-patch';
const mergePatchBodyParser = (req, resp, next) => {
    if (req.getContentType() == mpContentType && req.method == 'PATCH') {
        req.rawBody = req.body;
        try {
            req.body = JSON.parse(req.body);
        }
        catch (e) {
            return next(new restify_errors_1.BadRequestError(`Invalid content: ${e.message}`));
        }
    }
    return next();
};
exports.mergePatchBodyParser = mergePatchBodyParser;
