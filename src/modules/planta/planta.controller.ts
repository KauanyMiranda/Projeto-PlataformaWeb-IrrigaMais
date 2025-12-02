import { Body, Controller, Delete, Get, Param, Post, Put, Render, Req, Res, Query,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { validate } from 'src/common/validator/generic.validator';

import { PlantaService } from './planta.service';
import { RotinaService } from '../rotina/rotina.service';
import { SensorService } from '../sensor/sensor.service';
import { NecHidricaService } from '../necHidrica/necHidrica.service';
import { PlantaDto } from './planta.dto';

@Controller('/planta')
export class PlantaController {
    constructor(
        private readonly plantaService: PlantaService,
        private readonly rotinaService: RotinaService,
        private readonly sensorService: SensorService,
        private readonly necHidricaService: NecHidricaService,
    ) {}

    @Get('/listagem')
    @Render('planta/listagem')
    async consulta() {
        const plantas = await this.plantaService.getAll();

        return { listaPlantas: plantas };
    }

    @Get('/home')
    @Render('home')
    async home() {
    const ultimasPlantas = await this.plantaService.getUltimas(3); 
    console.log(ultimasPlantas);
    return { ultimasPlantas };
    }


    @Get('/novo')
    @Render('planta/formulario-cadastro')
    async formularioCadastro() {
        const necHidrica = await this.necHidricaService.getAll();
        const sensor = await this.sensorService.getAll();
        const rotina = await this.rotinaService.getAll();

        return { necHidrica, sensor, rotina };
    }

 @Post('/novo/salvar')
    async formularioCadastroSalvar(
        @Body() dadosForm: any,
        @Req() req: Request,
        @Res() res: Response,
    ) {

        const resultado = await validate(PlantaDto, dadosForm);

        if (resultado.isError) {
            req.addFlash('error', resultado.getErrors);

            return res.redirect('/planta/novo');
        } else {
            await this.plantaService.create(dadosForm);

            req.addFlash('success', 'Planta adicionada com sucesso!');

            return res.redirect('/planta/listagem');
        }
    }

    @Get('/:id/exclusao')
    @Render('planta/formulario-exclusao')
    async formularioExclusao(
        @Param('id') id: number,
        @Req() req: Request,
        @Res() res: Response,
    ) {
        const planta = await this.plantaService.findOne(id);

        if (planta == null) {
            req.addFlash('error', 'A planta solicitada não foi encontrada!');

            return res.redirect('/planta');
        }

        return { planta };
    }

    @Delete('/:id/exclusao')
    async excluir(
        @Param('id') id: number,
        @Req() req: Request,
        @Res() res: Response,
    ) {
        const planta = await this.plantaService.findOne(id);

        if (planta == null) {
            req.addFlash('error', 'A planta solicitada não foi encontrada!');
        } else {
            req.addFlash(
                'success',
                `Planta: ${planta.nome} excluída com sucesso!`,
            );
            await this.plantaService.remove(id);
        }

        return res.redirect('/planta/listagem');
    }

    @Get('/:id/atualizacao')
    @Render('planta/formulario-atualizacao')
    async formularioAtualizacao(
        @Param('id') id: number,
        @Req() req: Request,
        @Res() res: Response,
    ) {
        const planta = await this.plantaService.findOne(id);

        if (planta == null) {
            req.addFlash('error', 'A plantaa solicitada não foi encontrada!');

            return res.redirect('/planta/listagem');
        }

        const necHidrica = await this.necHidricaService.getAll();
        const sensor = await this.sensorService.getAll();
        const rotina = await this.rotinaService.getAll();


        return { planta, necHidrica, sensor, rotina};
    }

    @Put('/:id/atualizacao-salvar')
    async atualizacaoSalvar(
        @Param('id') id: number,
        @Body() dados: any,
        @Req() req: Request,
        @Res() res: Response,
    ) {
        const planta = await this.plantaService.findOne(id);

        if (planta == null) {
            req.addFlash('error', 'A planta solicitada não foi encontrada!');
            return res.redirect('/planta/listagem');
        }

        const resultado = await validate(PlantaDto, dados);

        if (resultado.isError) {
            req.addFlash('error', resultado.getErrors);
            req.setOld(dados);

            return res.redirect(`/planta/${id}/atualizacao`);
        } else {
            await this.plantaService.update(id, dados);

            req.addFlash('success', 'Planta atualizada com sucesso!');

            return res.redirect('/planta/listagem');
        }
    }
}
