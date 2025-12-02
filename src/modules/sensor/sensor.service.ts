import { Injectable } from '@nestjs/common';
import { Sensor } from './sensor.entity';
import { Like } from 'typeorm';

@Injectable()
export class SensorService {
  async getAll() {
    const sensor = await Sensor.find({ relations: ["tipoSensor"] });

    return sensor;
  }

  async buscarPorNome(nome: string) {
    return await Sensor.find({
      where: { nome: Like(`%${nome}%`) },
      relations: ["tipoSensor"],
    });
  }

  async findOne(id: number) {
    const sensor = await Sensor.findOne({
      where: {id: id},
      relations: ["tipoSensor"],
    });

    return sensor;

  }

  async create(data: any) {
    const sensor = Sensor.create({
      ...data,
      tipoSensor: { id: data.tipoSensor},
    });

    return await sensor.save();
  }

  async update(id: number, data: any) {
    return await Sensor.update(id, {
      ...data,
      tipoSensor: { id: data.tipoSensor},
    });
  }

  async remove(id: number) {
    await Sensor.delete(id);
  }
}
