import { Injectable, Inject } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { Planta } from './planta.entity';
import { Rotina } from '../rotina/rotina.entity';
import { NecessidadeHidrica } from './necHidrica.entity';

@Injectable()
export class PlantaService {
  private plantaRepo: Repository<Planta>;
  private rotinaRepo: Repository<Rotina>;
  private necessidadeRepo: Repository<NecessidadeHidrica>;

  constructor(@Inject('DATA_SOURCE') private dataSource: DataSource) {
    this.plantaRepo = this.dataSource.getRepository(Planta);
    this.rotinaRepo = this.dataSource.getRepository(Rotina);
    this.necessidadeRepo = this.dataSource.getRepository(NecessidadeHidrica);
  }

  async listar(): Promise<Planta[]> {
    return this.plantaRepo.find({ relations: ['rotina', 'necessidade_hidrica'] });
  }

  async listarRotinas(): Promise<Rotina[]> {
    return this.rotinaRepo.find();
  }

  async listarNecessidades(): Promise<NecessidadeHidrica[]> {
    return this.necessidadeRepo.find();
  }

  async criar(dados: { nome: string; rotinaId: number; necessidadeId: number }) {
    const rotina = await this.rotinaRepo.findOne({ where: { id: dados.rotinaId } });
    const necessidade = await this.necessidadeRepo.findOne({ where: { id: dados.necessidadeId } });

    if (!rotina || !necessidade) throw new Error('Rotina ou Necessidade hídrica não encontrada');

    const planta = this.plantaRepo.create({
      nome: dados.nome,
      rotina,
      necessidade_hidrica: necessidade,
    });

    return this.plantaRepo.save(planta);
  }

  async buscarPorId(id: number): Promise<Planta | null> {
    return this.plantaRepo.findOne({ 
      where: { id }, 
      relations: ['rotina', 'necessidade_hidrica'] 
    });
  }

  async atualizar(
    id: number,
    dados: { nome: string; rotinaId: number; necessidadeId: number }
  ): Promise<Planta> {
    const rotina = await this.rotinaRepo.findOne({ where: { id: dados.rotinaId } });
    const necessidade = await this.necessidadeRepo.findOne({ where: { id: dados.necessidadeId } });

    if (!rotina || !necessidade) throw new Error('Rotina ou Necessidade hídrica não encontrada');

    await this.plantaRepo.update(id, {
      nome: dados.nome,
      rotina,
      necessidade_hidrica: necessidade,
    });

    return this.buscarPorId(id) as Promise<Planta>;
  }

  async excluir(id: number): Promise<void> {
    await this.plantaRepo.delete(id);
  }
}
