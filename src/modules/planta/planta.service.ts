import { Injectable} from '@nestjs/common';
import { Planta } from './planta.entity';

@Injectable()
export class PlantaService {
    async getAll() {
    const plantas = await Planta.find({ relations: ['necHidrica','sensor', 'sensor.tipoSensor',  'rotina'] });

        return plantas;
    }

    async findOne(id: number) {
        const planta = await Planta.findOne({
            where: { id: id },
            relations: ['necHidrica', 'sensor', 'sensor.tipoSensor', 'rotina'],
        });

        return planta;
    }

    async getUltimas(limit:  number) {
        return await Planta.find({
            relations: ['necHidrica', 'sensor', 'rotina'],
            order: { id: 'DESC' }, 
            take: limit, 
        });
    }

    async create(data: any) {
        const planta = Planta.create({
            ...data,
            necHidrica: { id: data.necHidrica },
            rotina: { id: data.rotina },
            sensor: { id: data.sensor },
        });

        return await planta.save();
    }

    async update(id: number, data: any) {
        return await Planta.update(id, {
            ...data,
            necHidrica: { id: data.necHidrica },
            rotina: { id: data.rotina },
            sensor: { id: data.sensor },
        });
    }

    async remove(id: number) {
        await Planta.delete(id);
    }
}
