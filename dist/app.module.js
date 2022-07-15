"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const admin_module_1 = require("./admin/admin.module");
const admin_auth_middlewar_1 = require("./admin/middlewares/admin-auth.middlewar");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_middleware_1 = require("./user/middlewares/auth.middleware");
const user_module_1 = require("./user/user.module");
const work_module_1 = require("./work/work.module");
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(auth_middleware_1.AuthMiddleware)
            .exclude({ path: '/admin/login', method: common_1.RequestMethod.POST }, { path: '/admin/logout', method: common_1.RequestMethod.DELETE }, { path: '/admin/users', method: common_1.RequestMethod.ALL }, { path: '/admin/users/*', method: common_1.RequestMethod.POST })
            .forRoutes({
            path: '*',
            method: common_1.RequestMethod.ALL,
        });
        consumer
            .apply(admin_auth_middlewar_1.AuthAdminMiddleware)
            .forRoutes({ path: '/admin/login', method: common_1.RequestMethod.POST }, { path: '/admin/logout', method: common_1.RequestMethod.DELETE }, { path: '/admin/users', method: common_1.RequestMethod.ALL }, { path: '/admin/users/*', method: common_1.RequestMethod.POST });
    }
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forRoot('mongodb://localhost/nest'),
            work_module_1.WorkModule,
            admin_module_1.AdminModule,
            user_module_1.UserModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map