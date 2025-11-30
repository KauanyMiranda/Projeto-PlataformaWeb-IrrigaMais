import { IsNotEmpty, IsBoolean, IsNumber, MaxLength, MinLength, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class SensorDto {
  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  @MinLength(4, { message: 'O nome deve ter no mínimo 4 caracteres.' })
  @MaxLength(10, { message: 'O nome deve ter no máximo 10 caracteres.' })
  nome: string;

  @IsNotEmpty({ message: 'A localização é obrigatória.' })
  localizacao: string;

  @IsBoolean({ message: 'O status deve ser verdadeiro ou falso.' })
  status: boolean;

  @IsNotEmpty({ message: 'O tipo do sensor é obrigatório.' })
  @Type(() => Number)
  @IsNumber({}, { message: 'O tipo do sensor deve ser um número (ID).' })
  @Min(1, { message: 'O tipo do sensor é obrigatório.' })
  tipoSensorId: number;
}
