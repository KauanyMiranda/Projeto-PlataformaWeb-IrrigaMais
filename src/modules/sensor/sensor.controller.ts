import { Body, Controller, Get, Render, Post, Req, Res, Query } from "@nestjs/common";
import { Request, Response } from "express";

interface Sensor {
    nome: string;
    tipo: string;
    modelo?: string;
    fabricante?: string;
    localizacao?: string;
    status: string;
}

@Controller('/sensor')
export class SensorController {
    private sensores: Sensor[] = []; 
    @Get()
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
        return {};
    }

    @Post('/novo/salvar')
    formularioCadastroSalvar(@Body() dadosForm: any, @Req() req: Request, @Res() res: Response) {
        this.sensores.push({
            nome: dadosForm.nome,
            tipo: dadosForm.tipo,
            modelo: dadosForm.modelo || '',
            fabricante: dadosForm.fabricante || '',
            localizacao: dadosForm.localizacao || '',
            status: dadosForm.status
        });

        req.addFlash('success', 'Sensor cadastrado com sucesso!');
        return res.redirect('/sensor');
    }
}
