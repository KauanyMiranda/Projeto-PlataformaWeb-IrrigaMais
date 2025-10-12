import { Module } from "@nestjs/common";
import { SensorController } from "./sensor.controller";

@Module({
    imports: [],
    controllers: [SensorController],
    providers: [],
})
export class SensorModule {}