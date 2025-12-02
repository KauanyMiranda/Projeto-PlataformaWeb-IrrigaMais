import { Controller, Get, Post, Put, Delete, Param, Body, Req, Res, Render } from '@nestjs/common';
import { Request, Response } from 'express';
import { validate } from 'src/common/validator/generic.validator';
import { RotinaService } from './rotina.service';
import { RotinaDto } from './rotina.dto';



@Controller('/rotina')
export class RotinaController {
  constructor(private readonly rotinaService: RotinaService) {}

    @Get("/listagem")
    @Render('rotina/listagem')
    async consulta() {
        const rotinas = await this.rotinaService.getAll();

        return { rotinas: rotinas };
    }


  @Get('/novo')
  @Render('rotina/formulario-cadastro')
  formularioCadastro() {
    return {
      rotina: { nome: '', frequencia: '', dias: [], horarios: [], tipo_execucao: '' },
      frequencias: [1, 2, 3, 4],
      diasSemana: ["segunda","terca","quarta","quinta","sexta","sabado","domingo"]
    };
  }

  @Post('/novo/salvar')
    async formularioCadastroSalvar(
        @Body() dadosForm: any,
        @Req() req: Request,
        @Res() res: Response,
    ) {   

        const resultado = await validate(RotinaDto, dadosForm);

        if (resultado.isError) {
            req.addFlash('error', resultado.getErrors);

            return res.redirect('/rotina/novo');
        } else {

            await this.rotinaService.create({
            nome: dadosForm.nome,
            frequencia: dadosForm.frequencia,
            dias: Array.isArray(dadosForm.dias) ? dadosForm.dias : [dadosForm.dias],
            horarios: Array.isArray(dadosForm.horarios) ? dadosForm.horarios : [dadosForm.horarios],
            tipo_execucao: dadosForm.tipo_execucao
            });

            req.addFlash('success', 'Rotina adicionada com sucesso!');

            return res.redirect('/rotina/listagem');
        }
    }

    @Get('/:id/exclusao')
    @Render('rotina/formulario-exclusao')
    async formularioExclusao(
        @Param('id') id: number,
        @Req() req: Request,
        @Res() res: Response,
    ) {
        const rotina = await this.rotinaService.findOne(id);

        if (rotina == null) {
            req.addFlash('error', 'A rotina selecionada não foi encontrada!');

            return res.redirect('/rotina');
        }

        return { rotina };
    }

    @Delete('/:id/exclusao')
    async excluir(
        @Param('id') id: number,
        @Req() req: Request,
        @Res() res: Response,
    ) {
        const rotina = await this.rotinaService.findOne(id);

        if (rotina == null) {
            req.addFlash('error', 'A rotina solicitada não foi encontrada!');
        } else {
            req.addFlash(
                'success',
                `Rotina: ${rotina.nome} excluída com sucesso!`,
            );
            await this.rotinaService.remove(id);
        }

        return res.redirect('/rotina/listagem');
    }

    @Get('/:id/atualizacao')
    @Render('rotina/formulario-cadastro')
    async formularioAtualizacao(
        @Param('id') id: number,
        @Req() req: Request,
        @Res() res: Response,
    ) {
        const rotina = await this.rotinaService.findOne(id);

        if (rotina == null) {
            req.addFlash('error', 'A rotina solicitada não foi encontrada!');

            return res.redirect('/rotina/listagem');
        }

        return {
            rotina,
            frequencias: [1, 2, 3, 4],
            diasSemana: ["segunda","terca","quarta","quinta","sexta","sabado","domingo"]
        };
    }

    @Put('/:id/atualizacao-salvar')
    async atualizacaoSalvar(
        @Param('id') id: number,
        @Body() dados: any,
        @Req() req: Request,
        @Res() res: Response,
    ) {
        const rotina = await this.rotinaService.findOne(id);

        if (rotina == null) {
            req.addFlash('error', 'A rotina solicitada não foi encontrada!');
            return res.redirect('/rotina/listagem');
        }

        const resultado = await validate(RotinaDto, dados);

        if (resultado.isError) {
            req.addFlash('error', resultado.getErrors);
            req.setOld(dados);

            return res.redirect(`/rotina/${id}/atualizacao`);
        } else {

            await this.rotinaService.update(id, {
            nome: dados.nome,
            frequencia: dados.frequencia,
            dias: Array.isArray(dados.dias) ? dados.dias : [dados.dias],
            horarios: Array.isArray(dados.horarios) ? dados.horarios : [dados.horarios],
            tipo_execucao: dados.tipo_execucao
            });

            req.addFlash('success', 'Rotina atualizada com sucesso!');

            return res.redirect('/rotina/listagem');
        }
    }
}
