import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, BaseEntity } from 'typeorm';
import { NecHidrica } from '../necHidrica/necHidrica.entity';
import { Rotina } from '../rotina/rotina.entity';
import { Sensor } from '../sensor/sensor.entity';


@Entity('plantas')
export class Planta extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @ManyToOne(() => NecHidrica)
  @JoinColumn({
    name: "id_necessidade_hidrica_fk",
    referencedColumnName: "id"
  })
  necHidrica: NecHidrica

  @ManyToOne(() => Rotina)
  @JoinColumn({
    name: "id_rotina_fk",
    referencedColumnName: "id"
  })
  rotina: Rotina;

  @ManyToOne(() => Sensor)
  @JoinColumn({
    name: "id_sensor_fk",
    referencedColumnName: "id"
  })
  sensor: Sensor;
}