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
exports.WorkController = void 0;
const common_1 = require("@nestjs/common");
const user_decorator_1 = require("../user/decorators/user.decorator");
const auth_quard_1 = require("../user/guards/auth.quard");
const user_schema_1 = require("../user/user.schema");
const work_dto_1 = require("./dto/work.dto");
const work_service_1 = require("./work.service");
let WorkController = class WorkController {
    constructor(workService) {
        this.workService = workService;
    }
    create(user, work) {
        return this.workService.create(user, work);
    }
    show(user) {
        return this.workService.show(user);
    }
    drop(user) {
        return this.workService.drop(user);
    }
    edit(user, work) {
        return this.workService.edit(user, work);
    }
};
__decorate([
    (0, common_1.Post)('/work'),
    (0, common_1.UseGuards)(auth_quard_1.AuthUserGuard),
    __param(0, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, work_dto_1.WorkDto]),
    __metadata("design:returntype", Promise)
], WorkController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('/work'),
    (0, common_1.UseGuards)(auth_quard_1.AuthUserGuard),
    __param(0, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], WorkController.prototype, "show", null);
__decorate([
    (0, common_1.Delete)('/work'),
    (0, common_1.UseGuards)(auth_quard_1.AuthUserGuard),
    __param(0, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WorkController.prototype, "drop", null);
__decorate([
    (0, common_1.Patch)('/work'),
    (0, common_1.UseGuards)(auth_quard_1.AuthUserGuard),
    __param(0, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, work_dto_1.WorkDto]),
    __metadata("design:returntype", Promise)
], WorkController.prototype, "edit", null);
WorkController = __decorate([
    (0, common_1.Controller)('/profile'),
    __metadata("design:paramtypes", [work_service_1.WorkService])
], WorkController);
exports.WorkController = WorkController;
//# sourceMappingURL=work.controller.js.map