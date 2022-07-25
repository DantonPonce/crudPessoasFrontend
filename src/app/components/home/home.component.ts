import { FormularioPessoaComponent } from './formulario-pessoa/formulario-pessoa.component';
import { Router, RouterModule } from '@angular/router';
import { PessoasService } from './../services/pessoas.service';
import { Pessoa } from './../models/Pessoa';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public formulario: any;
  public tituloFormulario: string = '';
  public pessoas: Pessoa[] = [];
  public dataSource: Pessoa[] = [];
  public nomeFiltrado: string | undefined;
  public pessoa: Pessoa | undefined= {
    pessoaId: 0,
    nome: '',
    sobrenome: '',
    idade: 0,
    profissao: ''
  };

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  value = 'Clear me';
  constructor(
    private _pessoasService: PessoasService,
    private _router: Router,
    private _snackBar: MatSnackBar
  ) {}

  displayedColumns: string[] = [
    'Nome',
    'Sobrenome',
    'Idade',
    'Profissao',
    'Acoes',
  ];

  ngOnInit(): void {
    this.listarPessoas();
  }

  listarPessoas(): void {
    this._pessoasService.pegarTodos().subscribe((res) => {
      this.dataSource = res;
    });
  }

  cadastrarPessoa(): void {
    this._router.navigate(['cadastrar-pessoa']);
  }

  editarPessoa(idPessoa: number): void {
    this._router.navigate(['editar-pessoa', { id: idPessoa }]);
  }

  excluirPessoa(idPessoa: number): void {
    this._pessoasService.excluirPessoa(idPessoa).subscribe((res) => {
      this._snackBar.open('Pessoa excluida com sucesso', 'x', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });

      this.listarPessoas();
    });
  }

  filtro(element: Event) {
    let str = String((element.target as HTMLTextAreaElement).value)

    if(str.length > 0){
      this.nomeFiltrado = str[0].toUpperCase() + str.substr(1);
    }else{
      this.nomeFiltrado = ''
    }

    this.pessoa = this.dataSource!.find((element) => element.nome === this.nomeFiltrado);

    if(this.nomeFiltrado !== ''){
      this._pessoasService.pegarPessoaPeloId(this.pessoa!.pessoaId).subscribe((res) => {
        this.dataSource = [res]
      })
    }else{
      this.listarPessoas();
    }
    
  }
}
