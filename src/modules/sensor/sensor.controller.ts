import { Body, Controller, Get, Render, Post, Param, Req, Res, Query } from "@nestjs/common";
import { Request, Response } from "express";

interface Sensor {
    id: number;
    nome: string;
    tipo: string;
    localizacao?: string;
    status: string;
}

@Controller('/sensor')
export class SensorController {
    private sensores: Sensor[] = [];

    // Listagem e pesquisa
    @Get()
    @Get('/listagem')
    @Render('sensor/listagem')
    consulta(@Query('nome') nome?: string) {
        let sensoresFiltrados = this.sensores;

        if (nome) {
            sensoresFiltrados = sensoresFiltrados.filter(sensor =>
                sensor.nome.toLowerCase().includes(nome.toLowerCase())
            );
        }

        return { sensores: sensoresFiltrados };
    }

    @Get('/novo')
    @Render('sensor/formulario-cadastro')
    formularioCadastro() {
        return { sensor: { nome: '', tipo: '', localizacao: '', status: '' } };
    }

    @Post('/novo/salvar')
    formularioCadastroSalvar(@Body() dadosForm: any, @Req() req: Request, @Res() res: Response) {
        const novoId = this.sensores.length > 0 ? this.sensores[this.sensores.length - 1].id + 1 : 1;

        this.sensores.push({
            id: novoId,
            nome: dadosForm.nome,
            tipo: dadosForm.tipo,
            localizacao: dadosForm.localizacao || '',
            status: dadosForm.status
        });

        req.addFlash('success', 'Sensor cadastrado com sucesso!');
        return res.redirect('/sensor');
    }

    @Get('/editar/:id')
    editarFormulario(@Param('id') id: string, @Res() res: Response) {
        const sensor = this.sensores.find(s => s.id === Number(id));

        if (!sensor) {
            return res.render('sensor/formulario-cadastro', {
                sensor: { nome: '', tipo: '', localizacao: '', status: '' },
                error: 'Sensor não encontrado'
            });
        }

        return res.render('sensor/formulario-cadastro', { sensor });
    }

    @Post('/editar/:id')
    editarSalvar(@Param('id') id: string, @Body() dadosForm: any, @Res() res: Response) {
        const index = this.sensores.findIndex(s => s.id === Number(id));
        if (index === -1) return res.redirect('/sensor');

        this.sensores[index] = {
            ...this.sensores[index],
            nome: dadosForm.nome,
            tipo: dadosForm.tipo,
            localizacao: dadosForm.localizacao || '',
            status: dadosForm.status
        };

        return res.redirect('/sensor');
    }

    @Get('/excluir/:id')
    excluir(@Param('id') id: string, @Res() res: Response) {
        this.sensores = this.sensores.filter(s => s.id !== Number(id));
        return res.redirect('/sensor');
    }
}
