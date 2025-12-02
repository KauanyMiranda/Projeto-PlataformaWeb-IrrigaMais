import { IsNotEmpty, MinLength, } from 'class-validator';

export class PlantaDto {
  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  @MinLength(4, { message: 'O nome deve ter no mínimo 3 caracteres.' })
  nome: string;

  @IsNotEmpty({ message: 'A necessidade hídrica é obrigatória.' })
  necHidrica: number;

  @IsNotEmpty({ message: 'A rotina é obrigatória.' })
  rotina: number;

  @IsNotEmpty({ message: 'O sensor é obrigatório.' })
  sensor: number;
}
