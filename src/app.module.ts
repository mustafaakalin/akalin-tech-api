import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './config/database.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { User } from './users/users.entity';
import { UserModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CaslModule } from './casl/casl.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost', // This should match your service name in docker-compose.yml    // Postgres veritabanı adresi  
      port: 5432,  // PostgreSQL varsayılan portu
      username: 'postgres', // Use your Docker PostgreSQL credentials
      password: '', // Use your Docker PostgreSQL credentials   // Kullanıcı adıc
      database: 'akalin-tech-api-nestjs',  // Veritabanı adı
      entities: [User],
      synchronize: true,  // Veritabanı otomatik olarak güncellenir
      logging: true, // Add this to see SQL queries
    }),
    ConfigModule.forRoot({
      isGlobal: true, // Makes ConfigModule available globally
    }),
    UserModule,
    CaslModule,
  ],
  controllers: [
    AppController,
  ],
  providers: [AppService],
})
export class AppModule {}
