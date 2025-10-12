import { Module } from "@nestjs/common";
import { ChamadoController } from "./chamado.controller";

@Module({
    imports: [],
    controllers: [ChamadoController],
    providers: [],
})
export class ChamadoModule {}