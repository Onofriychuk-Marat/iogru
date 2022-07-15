import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminModule } from './admin/admin.module';
import { AuthAdminMiddleware } from './admin/middlewares/admin-auth.middlewar';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthMiddleware } from './user/middlewares/auth.middleware';
import { UserModule } from './user/user.module';
import { WorkModule } from './work/work.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest'),
    WorkModule,
    AdminModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: '/admin/login', method: RequestMethod.POST },
        { path: '/admin/logout', method: RequestMethod.DELETE },
        { path: '/admin/users', method: RequestMethod.ALL },
        { path: '/admin/users/*', method: RequestMethod.ALL },
      )
      .forRoutes({
        path: '*',
        method: RequestMethod.ALL,
      });

    consumer
      .apply(AuthAdminMiddleware)
      .forRoutes(
        { path: '/admin/login', method: RequestMethod.POST },
        { path: '/admin/logout', method: RequestMethod.DELETE },
        { path: '/admin/users', method: RequestMethod.ALL },
        { path: '/admin/users/*', method: RequestMethod.ALL },
      );
  }
}
