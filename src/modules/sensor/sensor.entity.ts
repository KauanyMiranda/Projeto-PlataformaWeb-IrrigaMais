import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, BaseEntity, OneToMany } from 'typeorm';
import { TipoSensor } from '../tipoSensor/tipoSensor.entity';

@Entity('sensor')
export class Sensor extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  localizacao: string;

  @Column({ default: true })
  status: boolean; 

  @ManyToOne(() => TipoSensor)
  @JoinColumn({
    name: "id_tipo_sensor_fk",
    referencedColumnName: "id"
  })
  tipoSensor: TipoSensor;
}
