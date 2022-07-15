"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_decorator_1 = require("./decorators/user.decorator");
const login_dto_1 = require("./dto/login.dto");
const registration_dto_1 = require("./dto/registration.dto");
const user_service_1 = require("./user.service");
const auth_quard_1 = require("./guards/auth.quard");
const user_dto_1 = require("./dto/user.dto");
let UserController = class UserController {
    constructor(service) {
        this.service = service;
    }
    login(dto) {
        return this.service.login(dto);
    }
    registation(dto) {
        return this.service.registration(dto);
    }
    show(user) {
        return this.service.show(user);
    }
    edit(user, newDataUser) {
        return this.service.edit(user, newDataUser);
    }
    goToBarWithColleagues(user) {
        return this.service.goToBarWithColleagues(user);
    }
};
__decorate([
    (0, common_1.Post)('/login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('/registation'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [registration_dto_1.RegistrationUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "registation", null);
__decorate([
    (0, common_1.Get)('/profile'),
    (0, common_1.UseGuards)(auth_quard_1.AuthUserGuard),
    __param(0, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], UserController.prototype, "show", null);
__decorate([
    (0, common_1.Patch)('/profile'),
    (0, common_1.UseGuards)(auth_quard_1.AuthUserGuard),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_dto_1.UserDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "edit", null);
__decorate([
    (0, common_1.Post)('/go-to-bar-with-colleagues'),
    (0, common_1.UseGuards)(auth_quard_1.AuthUserGuard),
    __param(0, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "goToBarWithColleagues", null);
UserController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map