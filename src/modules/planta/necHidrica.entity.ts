import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity('necessidade_hidrica')
export class NecessidadeHidrica extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column('float', { name: 'qtdLitro' })
  qtdLitro: number;
}
