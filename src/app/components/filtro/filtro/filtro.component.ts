import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Filtros } from 'src/app/models/filtro';
import { PspList } from 'src/app/models/pspList';
import { RelatorioService } from 'src/app/servicce/relatorio.service';

@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.css']
})
export class FiltroComponent implements OnInit{
  dataInicial: string = '';
  horaInicial: string = '';
  dataFinal: string = '';
  horaFinal: string = '';
  pspsSelecionados: string[] = [];
  form!: FormGroup;
  pspsDisponiveis: string[] = [];
  pspList:PspList[] = []; 
  @Output() filtrosChange = new EventEmitter<Filtros>();

  constructor(private formBuilder: FormBuilder,
    private service:RelatorioService
  ) { }


  ngOnInit(): void {
    this.service.getPsp().subscribe((p:PspList[])=>{
      this.pspList = p;
      this.pspsDisponiveis = this.pspList.map(p=> {return p.nome});
    });
    this.createForm();
  }
  private createForm() {
    this.form = this.formBuilder.group({
      dataInicial: [''],
      horaInicial: [''],
      dataFinal: [''],
      horaFinal: [''],
      pspsSelecionados: [[]]
    });
  }

  emitirFiltros(event: Event) {
    event.preventDefault(); // Evita que o formulário seja enviado
    let filtros:Filtros = {
      dataInicial: this.form.get('dataInicial')?.value,
      horaInicial: this.form.get('horaInicial')?.value,
      dataFinal: this.form.get('dataFinal')?.value,
      horaFinal: this.form.get('horaFinal')?.value,
      pspsSelecionados: this.form.get('pspsSelecionados')?.value as string[]
    };
    this.filtrosChange.emit(filtros);
  }
}
