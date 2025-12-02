import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { NecHidrica } from 'src/modules/necHidrica/necHidrica.entity';

async function seedPlantas() {
  const dataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'teste',
    entities: [NecHidrica],
    synchronize: false,
    logging: false,
    namingStrategy: new SnakeNamingStrategy(),
  });

  try {
    await dataSource.initialize();

    const repo = dataSource.getRepository(NecHidrica);

    const necessidades = [
      { nome: 'Muito Baixa', qtdLitro: 0.5 },
      { nome: 'Baixa', qtdLitro: 1 },
      { nome: 'Média', qtdLitro: 1.5 },
      { nome: 'Alta', qtdLitro: 2 },
      { nome: 'Muito Alta', qtdLitro: 2.5 },
    ];

    for (const necessidade of necessidades) {
      const existe = await repo.findOne({ where: { nome: necessidade.nome} });
      if (!existe) {
        await repo.save(repo.create(necessidade));
        console.log(`Inserida o tipo de sensor: ${necessidade}`);
      } else {
        console.log(`Sensor já existe: ${necessidade}`);
      }
    }

    console.log('Seed de necessidades hídricas finalizado.');
  } catch (err) {
    console.error('Erro ao rodar seed de necessidaes hídricas:', err);
  } finally {
    if (dataSource.isInitialized) await dataSource.destroy();
  }
}

seedPlantas();