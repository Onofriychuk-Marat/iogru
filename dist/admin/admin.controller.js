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
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const admin_quard_1 = require("./quards/admin.quard");
const registration_dto_1 = require("../user/dto/registration.dto");
const user_dto_1 = require("../user/dto/user.dto");
const user_interface_1 = require("../user/interfaces/user.interface");
const admin_service_1 = require("./admin.service");
const login_admin_dto_1 = require("./dto/login-admin.dto");
let AdminController = class AdminController {
    constructor(service) {
        this.service = service;
    }
    login(loginDto) {
        return this.service.login(loginDto);
    }
    addUser(newUser) {
        return this.service.addUser(newUser);
    }
    showUsers() {
        return this.service.getUsers();
    }
    showUser(id) {
        return this.service.showUser(id);
    }
    changeUser(id, newDataUser) {
        return this.service.changeUser(id, newDataUser);
    }
    deleteUser(id) {
        return this.service.deleteUser(id);
    }
};
__decorate([
    (0, common_1.Post)('/login'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_admin_dto_1.LoginAdminDto]),
    __metadata("design:returntype", Object)
], AdminController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('/users'),
    (0, common_1.UseGuards)(admin_quard_1.AuthAdminGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [registration_dto_1.RegistrationUserDto]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "addUser", null);
__decorate([
    (0, common_1.Get)('/users'),
    (0, common_1.UseGuards)(admin_quard_1.AuthAdminGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "showUsers", null);
__decorate([
    (0, common_1.Get)('/users/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "showUser", null);
__decorate([
    (0, common_1.Patch)('/users/:id'),
    (0, common_1.UseGuards)(admin_quard_1.AuthAdminGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_dto_1.UserDto]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "changeUser", null);
__decorate([
    (0, common_1.Delete)('/users/:id'),
    (0, common_1.UseGuards)(admin_quard_1.AuthAdminGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "deleteUser", null);
AdminController = __decorate([
    (0, common_1.Controller)('/admin'),
    __metadata("design:paramtypes", [admin_service_1.AdminService])
], AdminController);
exports.AdminController = AdminController;
//# sourceMappingURL=admin.controller.js.map