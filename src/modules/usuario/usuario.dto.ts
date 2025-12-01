import { IsNotEmpty, MinLength } from "class-validator";

export class UsuarioDto{
    @IsNotEmpty({ message: "O E-mail é obrogatório" })
    email: string;

    @IsNotEmpty({ message: "A senha é obrogatória" })
    @MinLength(8, { message: "A senha deve conter no mínimo 4 caracteres "})
    senha: string;
}