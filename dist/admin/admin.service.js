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
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const user_dto_1 = require("../user/dto/user.dto");
const user_interface_1 = require("../user/interfaces/user.interface");
const registration_dto_1 = require("../user/dto/registration.dto");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const jsonwebtoken_1 = require("jsonwebtoken");
const config_1 = require("../config");
const user_schema_1 = require("../user/user.schema");
let AdminService = class AdminService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    login(loginDto) {
        if (loginDto.login !== config_1.LOGIN_ADMIN) {
            throw new common_1.HttpException({
                errors: {
                    login: 'is invalid',
                },
            }, common_1.HttpStatus.UNPROCESSABLE_ENTITY);
        }
        if (loginDto.password !== config_1.PASSWORD_ADMIN) {
            throw new common_1.HttpException({
                errors: {
                    password: 'is invalid',
                },
            }, common_1.HttpStatus.UNPROCESSABLE_ENTITY);
        }
        return {
            token: this.generateJwt(loginDto),
        };
    }
    async addUser(newUser) {
        const createdUser = new this.userModel(newUser);
        return (await createdUser.save()).getResponse(createdUser.id);
    }
    async getUsers() {
        const users = await this.userModel.find().exec();
        return users.map((u) => u.getResponse(u.id));
    }
    async showUser(id) {
        const user = await this.userModel.findById(id).exec();
        return user.getResponse(user.id);
    }
    async changeUser(id, newDataUser) {
        const updatedUser = await this.userModel
            .findByIdAndUpdate(id, newDataUser)
            .exec();
        return updatedUser.getResponse(updatedUser.id);
    }
    async deleteUser(id) {
        const deletedUser = await this.userModel.findByIdAndDelete(id).exec();
        return deletedUser.getResponse(deletedUser.id);
    }
    generateJwt(admin) {
        return (0, jsonwebtoken_1.sign)(admin, config_1.JWT_SECRET, { expiresIn: config_1.JWT_EXPIRATION });
    }
};
AdminService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], AdminService);
exports.AdminService = AdminService;
//# sourceMappingURL=admin.service.js.map