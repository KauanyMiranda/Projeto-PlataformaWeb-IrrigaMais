import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Render,
  Req,
  Res,
  Query,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { validate } from 'src/common/validator/generic.validator';

import { PlantaService } from './planta.service';
import { PlantaDto } from './planta.dto';
import { RotinaService } from '../rotina/rotina.service';
import { SensorService } from '../sensor/sensor.service';
import { NecessidadeHidricaService } from './necHidrica.service';

@Controller('/planta')
export class PlantaController {
  constructor(
    private readonly plantaService: PlantaService,
    private readonly rotinaService: RotinaService,
    private readonly sensorService: SensorService,
    private readonly necessidadeService: NecessidadeHidricaService,
  ) {}

  @Get('/listagem')
  @Render('planta/listagem')
  async consulta() {
    const plantas = await this.plantaService.listar();
    return { plantas };
  }

  @Get('/novo')
  @Render('planta/formulario-cadastro')
  async formularioCadastro() {
    const rotinas = await this.rotinaService.getAll();
    const necessidades = await this.necessidadeService.getAll();
    const sensores = await this.sensorService.listar();

    return { rotinas, necessidades, sensores, planta: {} };
  }

  @Post('/novo/salvar')
  async formularioCadastroSalvar(@Body() dadosForm: any, @Req() req: Request, @Res() res: Response) {
    dadosForm.rotina_id = Number(dadosForm.rotina_id);
    dadosForm.necessidade_hidrica_id = Number(dadosForm.necessidade_hidrica_id);
    dadosForm.sensor_id = Number(dadosForm.sensor_id);

    const resultado = await validate(PlantaDto, dadosForm);

    if (resultado.isError) {
      req.addFlash('error', resultado.getErrors);
      req.setOld(dadosForm);
      return res.redirect('/planta/novo');
    }

    await this.plantaService.criar({
      nome: dadosForm.nome,
      rotinaId: dadosForm.rotina_id,
      necessidadeId: dadosForm.necessidade_hidrica_id,
      sensorId: dadosForm.sensor_id,
    });

    req.addFlash('success', 'Planta cadastrada com sucesso!');
    return res.redirect('/planta/listagem');
  }

  @Get('/:id/atualizacao')
  @Render('planta/formulario-atualizacao')
  async formularioAtualizacao(@Param('id') id: number, @Req() req: Request, @Res() res:Response) {
    const planta = await this.plantaService.buscarPorId(id);

    if (!planta) {
      req.addFlash('error', 'Planta não encontrada!');
      return res.redirect('/planta/listagem');
    }

    const rotinas = await this.rotinaService.getAll();
    const necessidades = await this.necessidadeService.getAll();
    const sensores = await this.sensorService.listar();

    return { planta, rotinas, necessidades, sensores };
  }

  @Put('/:id/atualizacao-salvar')
  async atualizacaoSalvar(@Param('id') id: number, @Body() dados: any, @Req() req: Request, @Res() res: Response) {
    const planta = await this.plantaService.buscarPorId(id);

    if (!planta) {
      req.addFlash('error', 'Planta não encontrada!');
      return res.redirect('/planta/listagem');
    }

    dados.rotina_id = Number(dados.rotina_id);
    dados.necessidade_hidrica_id = Number(dados.necessidade_hidrica_id);
    dados.sensor_id = Number(dados.sensor_id);

    const resultado = await validate(PlantaDto, dados);

    if (resultado.isError) {
      req.addFlash('error', resultado.getErrors);
      req.setOld(dados);
      return res.redirect(`/planta/${id}/atualizacao`);
    }

    await this.plantaService.atualizar(id, {
      nome: dados.nome,
      rotinaId: dados.rotina_id,
      necessidadeId: dados.necessidade_hidrica_id,
      sensorId: dados.sensor_id,
    });

    req.addFlash('success', 'Planta atualizada com sucesso!');
    return res.redirect('/planta/listagem');
  }

  @Get('/:id/exclusao')
  @Render('planta/formulario-exclusao')
  async formularioExclusao(@Param('id') id: number, @Req() req: Request, @Res() res:Response) {
    const planta = await this.plantaService.buscarPorId(id);

    if (!planta) {
      req.addFlash('error', 'Planta não encontrada!');
      return res.redirect('/planta/listagem');
    }

    return { planta };
  }

  @Delete('/:id/exclusao')
  async excluir(@Param('id') id: number, @Req() req: Request, @Res() res: Response) {
    const planta = await this.plantaService.buscarPorId(id);

    if (!planta) {
      req.addFlash('error', 'Planta não encontrada!');
    } else {
      await this.plantaService.excluir(id);
      req.addFlash('success', `Planta ${planta.nome} excluída com sucesso!`);
    }

    return res.redirect('/planta/listagem');
  }
}
