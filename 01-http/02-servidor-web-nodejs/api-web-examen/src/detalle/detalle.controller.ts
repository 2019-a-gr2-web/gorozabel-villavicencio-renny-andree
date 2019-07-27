import { Controller } from '@nestjs/common';
import { DetalleService } from './detalle.service';

@Controller('/detalle')
export class DetalleController {
  constructor(private readonly detalleService: DetalleService) {
  }
}
