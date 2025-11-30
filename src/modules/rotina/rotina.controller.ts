import { Controller, Get, Post, Put, Delete, Param, Body, Req, Res, Render } from '@nestjs/common';
import { Request, Response } from 'express';
import { validate } from 'src/common/validator/generic.validator';
import { RotinaService } from './rotina.service';
import { RotinaDto } from './rotina.dto';

@Controller('/rotina')
export class RotinaController {
  constructor(private readonly rotinaService: RotinaService) {}

  @Get('/listagem')
  @Render('rotina/listagem')
  async listar(@Req() req: Request) {
    const search = req.query.nome?.toString().toLowerCase() || '';
    let rotinas = await this.rotinaService.getAll();

    if (search) {
      rotinas = rotinas.filter(r => r.nome.toLowerCase().includes(search));
    }

    return { rotinas, search };
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
  async formularioCadastroSalvar(@Body() dadosForm: any, @Req() req: Request, @Res() res: Response) {
    const resultado = await validate(RotinaDto, dadosForm);

    if (resultado.isError) {
      req.addFlash('error', resultado.getErrors);
      req.setOld(dadosForm);
      return res.redirect('/rotina/novo');
    }

    await this.rotinaService.create({
      nome: dadosForm.nome,
      frequencia: dadosForm.frequencia,
      dias: Array.isArray(dadosForm.dias) ? dadosForm.dias : [dadosForm.dias],
      horarios: Array.isArray(dadosForm.horarios) ? dadosForm.horarios : [dadosForm.horarios],
      tipo_execucao: dadosForm.tipo_execucao
    });

    req.addFlash('success', 'Rotina cadastrada com sucesso!');
    return res.redirect('/rotina/listagem');
  }

  @Get('/:id/atualizacao')
  @Render('rotina/formulario-cadastro')
  async formularioAtualizacao(@Param('id') id: string, @Req() req: Request, @Res() res: Response) {
    const rotina = await this.rotinaService.getById(Number(id));

    if (!rotina) {
      req.addFlash('error', 'Rotina não encontrada!');
      return res.redirect('/rotina/listagem');
    }

    return {
      rotina,
      frequencias: [1, 2, 3, 4],
      diasSemana: ["segunda","terca","quarta","quinta","sexta","sabado","domingo"]
    };
  }

  @Put('/:id/atualizacao-salvar')
  async atualizacaoSalvar(@Param('id') id: string, @Body() dadosForm: any, @Req() req: Request, @Res() res: Response) {
    const rotina = await this.rotinaService.getById(Number(id));

    if (!rotina) {
      req.addFlash('error', 'Rotina não encontrada!');
      return res.redirect('/rotina/listagem');
    }

    const resultado = await validate(RotinaDto, dadosForm);

    if (resultado.isError) {
      req.addFlash('error', resultado.getErrors);
      req.setOld(dadosForm);
      return res.redirect(`/rotina/${id}/atualizacao`);
    }

    await this.rotinaService.update(Number(id), {
      nome: dadosForm.nome,
      frequencia: dadosForm.frequencia,
      dias: Array.isArray(dadosForm.dias) ? dadosForm.dias : [dadosForm.dias],
      horarios: Array.isArray(dadosForm.horarios) ? dadosForm.horarios : [dadosForm.horarios],
      tipo_execucao: dadosForm.tipo_execucao
    });

    req.addFlash('success', 'Rotina atualizada com sucesso!');
    return res.redirect('/rotina/listagem');
  }

  @Get('/:id/exclusao')
  @Render('rotina/formulario-exclusao')
  async formularioExclusao(@Param('id') id: string, @Req() req: Request, @Res() res:Response) {
    const rotina = await this.rotinaService.getById(Number(id));

    if (!rotina) {
      req.addFlash('error', 'Rotina não encontrada!');
      return res.redirect('/rotina/listagem');
    }

    return { rotina };
  }

  @Delete('/:id/exclusao')
async excluir(@Param('id') id: string, @Req() req: Request, @Res() res: Response) {
  const rotina = await this.rotinaService.getById(Number(id));

  if (!rotina) {
    req.addFlash('error', 'Rotina não encontrada!');
  } else {
    try {
      await this.rotinaService.delete(Number(id));
      req.addFlash('success', `Rotina ${rotina.nome} excluída com sucesso!`);
    } catch (error: any) {
      if (error.code === 'ER_ROW_IS_REFERENCED_2') {
        req.addFlash(
          'error',
          `Não é possível excluir a rotina "${rotina.nome}": existem plantas associadas a ela.`
        );
      } else {
        throw error;
      }
    }
  }

  return res.redirect('/rotina/listagem');
}

}
