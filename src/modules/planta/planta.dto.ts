import { IsNotEmpty, IsNumber, MaxLength, MinLength, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class PlantaDto {
  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  @MinLength(4, { message: 'O nome deve ter no mínimo 4 caracteres.' })
  @MaxLength(10, { message: 'O nome deve ter no máximo 10 caracteres.' })
  nome: string;

  @IsNotEmpty({ message: 'A necessidade hídrica é obrigatória.' })
  @Type(() => Number)
  @IsNumber({}, { message: 'A necessidade hídrica deve ser um número (ID).' })
  @Min(1, { message: 'A necessidade hídrica é obrigatória.' })
  necessidade_hidrica_id: number;

  @IsNotEmpty({ message: 'A rotina é obrigatória.' })
  @Type(() => Number)
  @IsNumber({}, { message: 'A rotina deve ser um número (ID).' })
  @Min(1, { message: 'A rotina é obrigatória.' })
  rotina_id: number;

  @IsNotEmpty({ message: 'O sensor é obrigatório.' })
  @Type(() => Number)
  @IsNumber({}, { message: 'O sensor deve ser um número (ID).' })
  @Min(1, { message: 'O sensor é obrigatório.' })
  sensor_id: number;
}
