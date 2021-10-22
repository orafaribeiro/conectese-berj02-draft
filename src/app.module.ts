import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlacesModule } from './places/places.module';
import { CategoriesModule } from './categories/categories.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    PlacesModule,
    CategoriesModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'user_berj02',
      password: 'user_berj02',
      database: 'berj_draft',
      autoLoadEntities: true,
      synchronize: true
    }),
    AuthModule
  ],  
})
export class AppModule {}
