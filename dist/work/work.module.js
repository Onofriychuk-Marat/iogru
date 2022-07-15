"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var WorkModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const work_controller_1 = require("./work.controller");
const work_service_1 = require("./work.service");
const work_shema_1 = require("./work.shema");
let WorkModule = WorkModule_1 = class WorkModule {
};
WorkModule = WorkModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: work_shema_1.Work.name, schema: work_shema_1.WorkSchema }]),
            WorkModule_1,
        ],
        controllers: [work_controller_1.WorkController],
        providers: [work_service_1.WorkService],
        exports: [work_service_1.WorkService],
    })
], WorkModule);
exports.WorkModule = WorkModule;
//# sourceMappingURL=work.module.js.map