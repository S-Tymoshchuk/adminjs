import { Module } from '@nestjs/common';
import { AdminJsImportsModule } from './admin/admin.module';
import { initAppModules } from './init/app.module';

@Module({
  imports: [...initAppModules, AdminJsImportsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
