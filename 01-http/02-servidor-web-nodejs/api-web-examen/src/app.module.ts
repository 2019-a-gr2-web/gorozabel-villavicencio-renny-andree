import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ComidaModule } from './comida/comida.module';
import { IngredientesModule } from './ingredientes/ingredientes.module';

@Module({
  imports: [ComidaModule,IngredientesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
