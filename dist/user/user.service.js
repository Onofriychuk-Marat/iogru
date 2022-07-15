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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("./user.schema");
const work_service_1 = require("../work/work.service");
const jsonwebtoken_1 = require("jsonwebtoken");
const config_1 = require("../config");
const bcrypt_1 = require("bcrypt");
let UserService = class UserService {
    constructor(userModel, workService) {
        this.userModel = userModel;
        this.workService = workService;
    }
    async login(dto) {
        const user = await this.userModel.findOne(Object.assign({}, dto));
        const isPasswordCorrect = await (0, bcrypt_1.compare)(dto.password, user.password);
        if (!isPasswordCorrect) {
            throw new common_1.HttpException({
                errors: {
                    password: 'is invalid',
                },
            }, common_1.HttpStatus.UNPROCESSABLE_ENTITY);
        }
        const token = this.generateJwt(user);
        return user.getAuthResponse(user.id, token);
    }
    async registration(newUser) {
        const createdUser = await new this.userModel(newUser).save();
        const token = this.generateJwt(createdUser);
        return createdUser.getAuthResponse(createdUser.id, token);
    }
    generateJwt(user) {
        return (0, jsonwebtoken_1.sign)({
            id: user.id,
            username: user.login,
        }, config_1.JWT_SECRET, { expiresIn: config_1.JWT_EXPIRATION });
    }
    show(user) {
        return user.getResponse(user.id, '');
    }
    async edit(user, newDataUser) {
        const updatedUser = await this.userModel
            .findByIdAndUpdate(user.id, newDataUser)
            .exec();
        return updatedUser.getResponse(user.id, '');
    }
    async goToBarWithColleagues(user) {
        user.levelMood += 5;
        if (user.levelMood > 100) {
            await this.workService.create(user, {
                position: 'cleaner',
                work: 'вкусная точка',
                location: 'сыктывкар',
            });
        }
        else {
            await user.save();
        }
        return user.getResponse(user.id, '');
    }
    async findById(id) {
        return this.userModel.findById(id).exec();
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        work_service_1.WorkService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map