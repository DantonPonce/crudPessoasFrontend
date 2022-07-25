import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Pessoa } from '../../models/Pessoa';
import { PessoasService } from '../../services/pessoas.service';

@Component({
  selector: 'app-formulario-pessoa',
  templateUrl: './formulario-pessoa.component.html',
  styleUrls: ['./formulario-pessoa.component.scss'],
})
export class FormularioPessoaComponent implements OnInit {
  public formulario: any;
  public tituloFormulario: string = '';
  public id!: number;

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private _pessoasService: PessoasService,
    private _snackBar: MatSnackBar,
    private _router: Router,
    private _activatedRouter: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this._activatedRouter.snapshot.params['id'];
    this.formulario = new FormGroup({
      nome: new FormControl(null),
      sobrenome: new FormControl(null),
      idade: new FormControl(null),
      profissao: new FormControl(null),
    });

    this.iniciaFormulario();
  }

  iniciaFormulario(): void {


    if (this._router.url.includes('editar-pessoa')) {
      this._pessoasService.pegarPessoaPeloId(this.id).subscribe((res) => {
        this.tituloFormulario = `Atualizar ${res.nome} ${res.sobrenome}`
        this.formulario = new FormGroup({
          pessoaId: new FormControl(res.pessoaId),
          nome: new FormControl(res.nome),
          sobrenome: new FormControl(res.sobrenome),
          idade: new FormControl(res.idade),
          profissao: new FormControl(res.profissao),
        });
      });
    }else{
      this.tituloFormulario = 'Cadastrar nova pessoa'
    }
  }

  enviarFormulario(): void {
    const pessoa: Pessoa = this.formulario.value;

    if (this._router.url.includes('cadastrar-pessoa')) {
      this._pessoasService.salvarPessoa(pessoa).subscribe((res) => {
        this._snackBar.open('Pessoa Cadastrada com sucesso', 'x', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
        this._router.navigate(['home']);
      });
    } else if (this._router.url.includes('editar-pessoa')) {
      this._pessoasService.atualizarPessoa(pessoa).subscribe((res) => {
        this._snackBar.open('Pessoa Atualizada com sucesso', 'x', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
        this._router.navigate(['home']);
      });
    }
  }

  voltar() {
    this._router.navigate(['home']);
  }
}
