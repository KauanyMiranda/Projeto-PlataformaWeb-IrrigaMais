import { Injectable, Inject } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class EspService {
  constructor(
    @Inject('DATA_SOURCE') private readonly dataSource: DataSource,
  ) {}

  async salvarLeitura(body: any) {
    const queryRunner = this.dataSource.createQueryRunner();

    try {
      await queryRunner.connect();

      // Dados recebidos do ESP
      const valor = body.valor;            // umidade ou outro valor
      const fkSensor = body.fk_Sensor_id;  // ID do sensor que enviou

      await queryRunner.query(
        `INSERT INTO leitura_sensor (dt_leitura, valor, fk_Sensor_id)
         VALUES (NOW(), ?, ?)`,
        [valor, fkSensor],
      );

      console.log("Leitura salva no banco:", valor);

      return { message: 'Leitura salva com sucesso!' };

    } catch (error) {
      console.error("Erro ao salvar leitura:", error);
      throw error;

    } finally {
      await queryRunner.release();
    }
  }
}
