import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { TipoSensor } from 'src/modules/tipoSensor/tipoSensor.entity';

async function seedSensores() {
  const dataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'teste',
    entities: [TipoSensor],
    synchronize: false,
    logging: false,
    namingStrategy: new SnakeNamingStrategy(),
  });

  try {
    await dataSource.initialize();

    const repo = dataSource.getRepository(TipoSensor);

    const tipos = [
        { nome: 'Umidade do Solo', unidade_medida: '%' },
        { nome: 'Chuva', unidade_medida: 'mm' },
    ];

    for (const tipo of tipos) {
      const existe = await repo.findOne({ where: { nome: tipo.nome} });
      if (!existe) {
        await repo.save(repo.create(tipo));
        console.log(`Inserida o tipo de sensor: ${tipo}`);
      } else {
        console.log(`Sensor já existe: ${tipo}`);
      }
    }

    console.log('Seed de tipo de sensores finalizado.');
  } catch (err) {
    console.error('Erro ao rodar seed de sensores:', err);
  } finally {
    if (dataSource.isInitialized) await dataSource.destroy();
  }
}

seedSensores();