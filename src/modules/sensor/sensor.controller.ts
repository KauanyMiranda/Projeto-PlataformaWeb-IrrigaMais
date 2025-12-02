import { Body, Controller, Delete, Get, Param, Post, Put, Req, Res, Render, Query } from '@nestjs/common';
import { Request, Response } from 'express';
import { validate } from 'src/common/validator/generic.validator';
import { SensorService } from './sensor.service';
import { TipoSensorService } from '../tipoSensor/tipoSensor.service';
import { SensorDto } from './sensor.dto';

@Controller('/sensor')
export class SensorController {
  constructor(
    private readonly sensorService: SensorService,
    private readonly tipoSensorService: TipoSensorService,
  ) {}

  @Get("/listagem")
  @Render("sensor/listagem")
  async consulta() {
    const sensor = await this.sensorService.getAll();

    return { listaSensores: sensor};
  }

  @Get("/listagem")
  @Render("sensor/listagem")
  async buscaId(@Query("nome") nome: string) {
    let sensores;

    if (nome && nome.trim() !== "") {
      sensores = await this.sensorService.buscarPorNome(nome);
    } else {
      sensores = await this.sensorService.getAll();
    }

    return { sensores, search: nome };
  }

  @Get("/novo")
  @Render("sensor/formulario-cadastro")
  async formularioCadastro() {
    const tipoSensores = await this.tipoSensorService.getAll();

    return { tipoSensores };
  }

  @Post("/novo/salvar")
  async formularioCadastroSalvar(
    @Body() dadosForm: any,
    @Req() req: Request,
    @Res() res: Response,
  ) {

    dadosForm.status = dadosForm.status === 'true';
    dadosForm.tipoSensor = Number(dadosForm.tipoSensor);

    const resultado = await validate(SensorDto, dadosForm);

    if (resultado.isError) {
      req.addFlash("error", resultado.getErrors);

      return res.redirect("/sensor/novo");
    } else {
      await this.sensorService.create(dadosForm);

      return res.redirect("/sensor/listagem")
    }
  }

  @Get("/:id/exclusao")
  @Render("sensor/formulario-exclusao")
  async formularioExclusao(
    @Param("id") id: number,
    @Req() req: Request,
    @Res() res: Response, 
  ) {
    const sensor = await this.sensorService.findOne(id);

    if (sensor == null) {
      req.addFlash("error", "O sensor solicitado não foi encontrado!")

      return res.redirect("/sensor/listagem");

    }

    return { sensor };
  }

  @Delete("/:id/exclusao")
  async excluir(
    @Param("id") id: number,
    @Req() req: Request,
    @Res() res: Response,
  ) {

    const sensor = await this.sensorService.findOne(id);

    if (sensor == null) {
      req.addFlash("error", "O sensor solicitado não foi encontrado");
    } else {
      req.addFlash(
        "success",
        `Sensor: ${sensor.nome} excluido com sucesso!`
      );
      await this.sensorService.remove(id);
    }

    return res.redirect("/sensor/listagem");
  }

  @Get("/:id/atualizacao")
  @Render("sensor/formulario-atualizacao")
  async formularioAtualizacao(
    @Param("id") id: number,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    
    const sensor = await this.sensorService.findOne(id);

    if (sensor == null) {
      req.addFlash("error", "O sensor solicitado não foi encontrado!");
      
      return res.redirect("/sensor/listagem");

    }

    const tipoSensores = await this.tipoSensorService.getAll();

    return { sensor, tipoSensores};

  }

  @Put("/:id/atualizacao-salvar")
  async atualizacaoSalvar(
    @Param("id") id: number,
    @Body() dados: any,
    @Req() req: Request,
    @Res() res: Response,
  ) {

    dados.status = dados.status === 'true';
    dados.tipoSensor = Number(dados.tipoSensor);

    const sensor = await this.sensorService.findOne(id);

    if (sensor == null) {
      req.addFlash("error", "O sensor solicitado não foi encontrado!");

      return res.redirect("/sensor/listagem");
    }

    const resultado = await validate(SensorDto, dados);

    if (resultado.isError) {
      req.addFlash("error", resultado.getErrors);
      req.setOld(dados);

      return res.redirect(`/sensor/${id}/atualizacao`);
    } else {
      await this.sensorService.update(id, dados);

      req.addFlash("sucess", "Sensor atualizado com sucessor!");

      return res.redirect("/sensor/listagem");
    }
  }
}
