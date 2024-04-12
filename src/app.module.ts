import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config/dist';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AppointmentModule } from './appointment/appointment.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports : [ConfigModule.forRoot({
        isGlobal : true,
        envFilePath : '.env'
      })],
      useFactory : (configService : ConfigService) => ({
        type : 'postgres',
        host : configService.get('DB_HOST'),
        port : +configService.get('DB_PORT'),
        username : configService.get('DB_USERNAME'),
        password : configService.get('DB_PASSWORD'),
        database : configService.get('DB_NAME'),
        autoLoadEntities : true,
        entities : [__dirname + '/**/*.entity{.js,.ts}'],
        logging : true,
        synchronize : configService.get('DB_SYNC')
      }),
      inject : [ConfigService]
    }),
    UserModule,
    AppointmentModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
