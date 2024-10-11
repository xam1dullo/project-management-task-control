import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from "@nestjs/config";
import { InfraModule } from "./infrastructure/infra.module";


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    InfraModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
