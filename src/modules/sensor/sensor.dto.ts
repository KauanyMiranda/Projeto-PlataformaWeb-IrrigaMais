import { IsNotEmpty, IsBoolean, IsNumber, MaxLength, MinLength, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class SensorDto {
  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  @MinLength(4, { message: 'O nome deve ter no mínimo 3 caracteres.' })
  nome: string;

  @IsNotEmpty({ message: 'A localização é obrigatória.' })
  localizacao: string;

  @IsBoolean({ message: 'O status é obrigatório.' })
  status: boolean;

  @IsNotEmpty({ message: 'O tipo do sensor é obrigatório.' })
  tipoSensor: number;
}
