import { Module } from "@nestjs/common";
import { PlantaController } from "./planta.controller";

@Module({
    imports: [],
    controllers: [PlantaController],
    providers: [],
})
export class PlantaModule {}