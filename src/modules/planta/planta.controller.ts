import { Body, Controller, Get, Post, Res, Param, Req, Render } from "@nestjs/common";
import { Request, Response } from "express";

interface Planta {
  id: number;
  nome: string;
  frequencia: string;
  dias: string[];
  qtd_agua: string;
  horarios: string[];
  sensor: string;
}

@Controller('/planta')
export class PlantaController {

  private plantas: Planta[] = [];

  // Listagem com pesquisa
  @Get('/listagem')
  @Render('planta/listagem')
  listar(@Req() req: Request) {
    const search = req.query.nome?.toString().toLowerCase() || '';
    let plantasFiltradas = this.plantas;

    if (search) {
      plantasFiltradas = this.plantas.filter(p =>
        p.nome.toLowerCase().includes(search)
      );
    }

    return { 
      plantas: plantasFiltradas,
      search // mantém o termo pesquisado no input 
    };
  }

  // Formulário de cadastro
  @Get('/novo')
  formularioCadastro(@Res() res: Response) {
    return res.render('planta/formulario-cadastro', {
      layout: 'main',
      title: 'Cadastro de Planta',
      planta: { nome: '', frequencia: '', dias: [], qtd_agua: '', horarios: [], sensor: '' },
      frequencias: [1, 2, 3, 4],
      diasSemana: ["segunda","terca","quarta","quinta","sexta","sabado","domingo"]
    });
  }

  @Post('/novo/salvar')
  formularioCadastroSalvar(@Body() dadosForm: any, @Req() req: Request, @Res() res: Response) {
    if (!Array.isArray(dadosForm.dias)) dadosForm.dias = [dadosForm.dias];
    if (!Array.isArray(dadosForm.horarios)) dadosForm.horarios = [dadosForm.horarios];

    const novoId = this.plantas.length > 0 ? this.plantas[this.plantas.length - 1].id + 1 : 1;

    const novaPlanta: Planta = {
      id: novoId,
      nome: dadosForm.nome,
      frequencia: dadosForm.frequencia,
      dias: dadosForm.dias,
      qtd_agua: dadosForm.qtd_agua,
      horarios: dadosForm.horarios,
      sensor: dadosForm.sensor
    };

    this.plantas.push(novaPlanta);
    req.addFlash('success', 'Planta cadastrada com sucesso!');
    return res.redirect('/planta/listagem'); // redireciona para a listagem
  }

  // Formulário de edição
  @Get('/editar/:id')
  editarFormulario(@Param('id') id: string, @Res() res: Response) {
    const planta = this.plantas.find(p => p.id === Number(id));

    if (!planta) {
      return res.render('planta/formulario-cadastro', {
        layout: 'main',
        title: 'Editar Planta',
        planta: { dias: [], horarios: [] },
        frequencias: [1,2,3,4],
        diasSemana: ["segunda","terca","quarta","quinta","sexta","sabado","domingo"],
        error: 'Planta não encontrada'
      });
    }

    return res.render('planta/formulario-cadastro', {
      layout: 'main',
      title: 'Editar Planta',
      planta,
      frequencias: [1,2,3,4],
      diasSemana: ["segunda","terca","quarta","quinta","sexta","sabado","domingo"]
    });
  }

  @Post('/editar/:id')
  editarSalvar(@Param('id') id: string, @Body() dadosForm: any, @Res() res: Response) {
    const plantaIndex = this.plantas.findIndex(p => p.id === Number(id));
    if (plantaIndex === -1) return res.redirect('/planta/listagem');

    const dias = Array.isArray(dadosForm.dias) ? dadosForm.dias : [dadosForm.dias];
    const horarios = Array.isArray(dadosForm.horarios) ? dadosForm.horarios : [dadosForm.horarios];

    this.plantas[plantaIndex] = {
      ...this.plantas[plantaIndex],
      nome: dadosForm.nome,
      frequencia: dadosForm.frequencia,
      dias,
      qtd_agua: dadosForm.qtd_agua,
      horarios,
      sensor: dadosForm.sensor
    };

    return res.redirect('/planta/listagem');
  }

  // Excluir
  @Get('/excluir/:id')
  excluir(@Param('id') id: string, @Res() res: Response) {
    this.plantas = this.plantas.filter(p => p.id !== Number(id));
    return res.redirect('/planta/listagem');
  }
}
