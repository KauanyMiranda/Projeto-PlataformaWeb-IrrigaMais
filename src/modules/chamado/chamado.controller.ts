import { Body, Controller, Get, Render, Post, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";

@Controller('/chamado')
export class ChamadoController {

    @Get()
    @Render('chamado/listagem')
    consulta() {
        return {}
    }

    @Get('/novo')
    @Render('chamado/formulario-cadastro')
    formularioCadastro() {
        return {}
    }

    @Post('/novo/salvar')
    formularioCadastroSalvar(@Body() dadosForm: any, @Req() req: Request, @Res() res: Response) {
        
        console.log(dadosForm)
        req.addFlash('success', 'Chamado adicionado com sucesso!')

        return res.redirect('/chamado')
    }

}