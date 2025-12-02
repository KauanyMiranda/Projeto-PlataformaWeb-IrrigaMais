import { Injectable } from '@nestjs/common';
import { Rotina } from './rotina.entity';

@Injectable()
export class RotinaService {
    async getAll() {
        const rotinas = await Rotina.find();

        return rotinas;
    }

    async findOne(id: number) {
        const rotina = await Rotina.findOne({
            where: { id: id },
        });

        return rotina;
    }    

    async create(data: any) {
        const rotina = Rotina.create({
            ...data,
        });

        return await rotina.save();
    }    

    async update(id: number, data: any) {
        return await Rotina.update(id, {
            ...data,
        });
    }

    async remove(id: number) {
        await Rotina.delete(id);
    }
}
