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
exports.WorkService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../user/user.schema");
const work_shema_1 = require("./work.shema");
let WorkService = class WorkService {
    constructor(workModel) {
        this.workModel = workModel;
    }
    async create(user, newWork) {
        const createdWork = new this.workModel(newWork);
        await createdWork.save();
        await this.changeMood(user, createdWork);
        user.work = createdWork;
        await user.save();
        return createdWork.getResponse();
    }
    show(user) {
        return user.work.getResponse();
    }
    async drop(user) {
        const deletedWork = await user.work.remove();
        await this.changeMood(user, undefined);
        return deletedWork.getResponse();
    }
    async edit(user, newWork) {
        const updatedWork = await user.work.update(newWork).exec();
        await this.changeMood(user, updatedWork);
        return updatedWork.getResponse();
    }
    async changeMood(user, newWork) {
        var _a, _b, _c;
        if (((_a = user.work) === null || _a === void 0 ? void 0 : _a.position) !== newWork.position) {
            if (newWork.position === 'cleaner') {
                user.levelMood -= 10;
            }
            else if (newWork.position === 'backend node.js programmer') {
                user.levelMood += 15;
            }
        }
        if (((_b = user.work) === null || _b === void 0 ? void 0 : _b.work) !== newWork.work) {
            if (newWork.work === 'iogru') {
                user.levelMood = 100;
            }
            else if (newWork.work === 'вкусная точка') {
                user.levelMood -= 50;
            }
        }
        if (((_c = user.work) === null || _c === void 0 ? void 0 : _c.location) !== newWork.location) {
            if (newWork.location === 'Moscow') {
                user.levelMood += 20;
            }
            else if (newWork.location === 'online') {
                user.levelMood -= 20;
            }
            else if (newWork.location === 'USE') {
                user.levelMood += 40;
            }
            else if (newWork.location === 'сыктывкар') {
                user.levelMood = 10;
            }
        }
        if (user.levelMood > 100) {
            user.levelMood = 100;
        }
        else if (user.levelMood < 0) {
            user.levelMood = 0;
        }
        await user.save();
    }
};
WorkService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(work_shema_1.Work.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], WorkService);
exports.WorkService = WorkService;
//# sourceMappingURL=work.service.js.map