import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { UsuarioService } from '../usuario/usuario.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly usuarioService: UsuarioService) {}

  /** LOGIN PAGE */
  @Get('/login')
  getLogin(@Req() req: Request, @Res() res: Response) {
    // Se já estiver logado, manda pra home
    if (req.session.user) {
      return res.redirect('/home');
    }

    return res.render('login/login', { layout: false });
  }

  /** LOGIN SUBMIT */
  @Post('/login')
  async login(@Body() body: any, @Req() req: Request, @Res() res: Response) {
    const { email, senha } = body;
    const usuario = await this.usuarioService.findByEmail(email);

    if (!usuario || usuario.senha !== senha) {
      req.addFlash('error', 'Usuário ou senha inválidos!');
      return res.redirect('/auth/login');
    }

    // Garante que a sessão é recriada certinho
    req.session.regenerate((err) => {
      if (err) {
        console.error('Erro ao regenerar sessão:', err);
        req.addFlash('error', 'Erro ao iniciar sessão.');
        return res.redirect('/auth/login');
      }

      req.session.user = {
        id: usuario.id,
        email: usuario.email,
      };

      req.session.save(() => {
        req.addFlash('success', 'Login realizado com sucesso!');
        return res.redirect('/home');
      });
    });
  }

  /** REGISTER PAGE */
  @Get('/register')
  getRegister(@Req() req: Request, @Res() res: Response) {
    if (req.session.user) {
      return res.redirect('/home');
    }

    return res.render('login/register', { layout: false });
  }

  /** REGISTER SUBMIT */
  @Post('/register')
  async doRegister(@Body() body: any, @Req() req: Request, @Res() res: Response) {
    const { email, senha, confsenha } = body;

    if (senha !== confsenha) {
      req.addFlash('error', 'As senhas não coincidem!');
      return res.redirect('/auth/register');
    }

    const exists = await this.usuarioService.findByEmail(email);
    if (exists) {
      req.addFlash('error', 'Email já cadastrado!');
      return res.redirect('/auth/register');
    }

    await this.usuarioService.create({ email, senha });

    req.addFlash('success', 'Usuário cadastrado com sucesso!');
    return res.redirect('/auth/login');
  }

  /** LOGOUT */
  @Get('/logout')
  logout(@Req() req: Request, @Res() res: Response) {
    req.session.destroy(() => {
      res.redirect('/auth/login');
    });
  }
}
