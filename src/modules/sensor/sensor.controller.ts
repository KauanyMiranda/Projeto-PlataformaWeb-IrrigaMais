import { Body, Controller, Delete, Get, Param, Post, Put, Req, Res, Render } from '@nestjs/common';
import { Request, Response } from 'express';
import { validate } from 'src/common/validator/generic.validator';
import { SensorService } from './sensor.service';
import { TipoSensorService } from './tipoSensor.service';
import { SensorDto } from './sensor.dto';

@Controller('/sensor')
export class SensorController {
  constructor(
    private readonly sensorService: SensorService,
    private readonly tipoSensorService: TipoSensorService
  ) {}

  @Get('/listagem')
  @Render('sensor/listagem')
  async listagem() {
    const sensores = await this.sensorService.listar();
    return { sensores };
  }

  @Get('/novo')
  @Render('sensor/formulario-cadastro')
  async formularioCadastro() {
    const tiposSensores = await this.tipoSensorService.getAll();
    return { sensor: {}, tiposSensores };
  }

  @Post('/novo/salvar')
  async cadastroSalvar(@Body() dadosForm: any, @Req() req: Request, @Res() res: Response) {
    const resultado = await validate(SensorDto, {
      nome: dadosForm.nome,
      localizacao: dadosForm.localizacao,
      status: dadosForm.status === 'true',
      tipoSensorId: Number(dadosForm.tipo_sensor_id),
    });

    if (resultado.isError) {
      req.addFlash('error', resultado.getErrors);
      req.setOld(dadosForm);
      return res.redirect('/sensor/novo');
    }

    await this.sensorService.criar({
      nome: dadosForm.nome,
      localizacao: dadosForm.localizacao,
      status: dadosForm.status === 'true',
      tipoSensorId: Number(dadosForm.tipo_sensor_id),
    });

    req.addFlash('success', 'Sensor cadastrado com sucesso!');
    return res.redirect('/sensor/listagem');
  }

  @Get('/:id/atualizacao')
  @Render('sensor/formulario-atualizacao')
  async formularioAtualizacao(
    @Param('id') id: number,
    @Req() req: Request,
    @Res() res: Response
  ) {
    const sensor = await this.sensorService.buscarPorId(id);

    if (!sensor) {
      req.addFlash('error', 'Sensor não encontrado!');
      return res.redirect('/sensor/listagem');
    }

    const tiposSensores = await this.tipoSensorService.getAll();

    return { sensor, tiposSensores };
  }

  @Put('/:id/atualizacao-salvar')
  async atualizacaoSalvar(
    @Param('id') id: number,
    @Body() dados: any,
    @Req() req: Request,
    @Res() res: Response
  ) {
    const sensor = await this.sensorService.buscarPorId(id);

    if (!sensor) {
      req.addFlash('error', 'Sensor não encontrado!');
      return res.redirect('/sensor/listagem');
    }

    dados.tipoSensorId = Number(dados.tipoSensorId);
    dados.status = dados.status === 'true';

    const resultado = await validate(SensorDto, dados);

    if (resultado.isError) {
      req.addFlash('error', resultado.getErrors);
      req.setOld(dados);
      return res.redirect(`/sensor/${id}/atualizacao`);
    }

    await this.sensorService.atualizar(id, {
      nome: dados.nome,
      localizacao: dados.localizacao,
      tipoSensorId: dados.tipoSensorId,
      status: dados.status,
    });

    req.addFlash('success', 'Sensor atualizado com sucesso!');
    return res.redirect('/sensor/listagem');
  }

  @Get('/:id/exclusao')
  @Render('sensor/formulario-exclusao')
  async formularioExclusao(@Param('id') id: number, @Req() req: Request, @Res() res: Response) {
    const sensor = await this.sensorService.buscarPorId(id);

    if (!sensor) {
      req.addFlash('error', 'Sensor não encontrado!');
      return res.redirect('/sensor/listagem');
    }

    return { sensor };
  }

  @Delete('/:id/exclusao')
  async excluir(@Param('id') id: number, @Req() req: Request, @Res() res: Response) {
    const sensor = await this.sensorService.buscarPorId(id);

    if (!sensor) {
      req.addFlash('error', 'Sensor não encontrado!');
    } else {
      await this.sensorService.excluir(id);
      req.addFlash('success', `Sensor ${sensor.nome} excluído com sucesso!`);
    }

    return res.redirect('/sensor/listagem');
  }
}
