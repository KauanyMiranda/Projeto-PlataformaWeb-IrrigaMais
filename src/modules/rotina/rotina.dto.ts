import { IsNotEmpty, IsString, MaxLength, MinLength, IsArray, ArrayNotEmpty } from 'class-validator';
import { Type, Transform } from 'class-transformer';

export class RotinaDto {
  @IsNotEmpty({ message: 'O nome da rotina é obrigatório.' })
  @MinLength(4, { message: 'O nome deve ter no mínimo 4 caracteres.' })
  @MaxLength(10, { message: 'O nome deve ter no máximo 10 caracteres.' })
  nome: string;

  @IsNotEmpty({ message: 'A frequência é obrigatória.' })
  frequencia: string;

  @IsNotEmpty({ message: 'Os dias são obrigatórios.' })
  @Transform(({ value }) => (typeof value === 'string' ? value.split(',') : value))
  dias: string[];

  @IsNotEmpty({ message: 'Os horários são obrigatórios.' })
  @ArrayNotEmpty({ message: 'O horário não pode estar vazio.' })
  @Transform(({ value }) => (typeof value === 'string' ? value.split(',') : value))
  horarios: string[];

  @IsNotEmpty({ message: 'O tipo de execução é obrigatório.' })
  tipo_execucao: string;
}
