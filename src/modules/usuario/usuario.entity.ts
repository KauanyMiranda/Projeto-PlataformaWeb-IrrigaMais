import { BaseEntity, Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('usuario')
export class Usuario extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({ unique: true })
    email: string

    @Column()
    senha: string
}