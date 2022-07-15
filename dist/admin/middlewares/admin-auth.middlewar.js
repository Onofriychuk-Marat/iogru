"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthAdminMiddleware = void 0;
const config_1 = require("../../config");
const common_1 = require("@nestjs/common");
const jsonwebtoken_1 = require("jsonwebtoken");
let AuthAdminMiddleware = class AuthAdminMiddleware {
    async use(request, _, next) {
        if (!request.headers.authorization) {
            request.admin = null;
            next();
            return;
        }
        const token = request.headers.authorization.split(' ')[1];
        try {
            const admin = (0, jsonwebtoken_1.verify)(token, config_1.JWT_SECRET);
            if (admin.login === config_1.LOGIN_ADMIN && admin.password === config_1.PASSWORD_ADMIN) {
                request.admin = admin;
            }
            next();
        }
        catch (error) {
            request.admin = null;
            next();
        }
    }
};
AuthAdminMiddleware = __decorate([
    (0, common_1.Injectable)()
], AuthAdminMiddleware);
exports.AuthAdminMiddleware = AuthAdminMiddleware;
//# sourceMappingURL=admin-auth.middlewar.js.map