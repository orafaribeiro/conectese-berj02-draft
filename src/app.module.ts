import { Module } from '@nestjs/common';
import { PlacesModule } from './places/places.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [PlacesModule, CategoriesModule],
})
export class AppModule {}
