import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('rotinas')
export class Rotina extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  frequencia: string;

  @Column('simple-array')
  dias: string[];

  @Column('simple-array')
  horarios: string[];

  @Column()
  tipo_execucao: string;

}