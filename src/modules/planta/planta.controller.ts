import { Body, Controller, Get, Post, Render, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";

interface Planta {
  nome: string;
  frequencia: string;
  dias: string[];
  qtd_agua: string;
  horarios: string[];
  sensor: string;
}

@Controller('/planta')
export class PlantaController {

    // Array para armazenar plantas na memória
    private plantas: Planta[] = [];

    // Página inicial de listagem
    @Get()
    @Render('planta/listagem')
    consulta() {
        return { plantas: this.plantas };
    }

    // Pesquisa por nome
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

        return { plantas: plantasFiltradas };
    }

    // Formulário de cadastro
    @Get('/novo')
    @Render('planta/formulario-cadastro')
    formularioCadastro() {
        return {};
    }

    // Salvar nova planta
    @Post('/novo/salvar')
    formularioCadastroSalvar(@Body() dadosForm: any, @Req() req: Request, @Res() res: Response) {

        // Garantir que 'dias' seja sempre um array
        if (!Array.isArray(dadosForm.dias)) {
            dadosForm.dias = [dadosForm.dias];
        }

        // Adicionar a planta ao array
        this.plantas.push({
            nome: dadosForm.nome,
            frequencia: dadosForm.frequencia,
            dias: dadosForm.dias,
            qtd_agua: dadosForm.qtd_agua,
            horarios: dadosForm.horarios,
            sensor: dadosForm.sensor
        });

        console.log("Planta cadastrada:", dadosForm);

        // Mensagem de sucesso
        req.addFlash('success', 'Planta cadastrada com sucesso!');

        return res.redirect('/planta');
    }
}
