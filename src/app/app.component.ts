import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { RelatorioService } from './servicce/relatorio.service';
import { Transacao } from './models/desempenho';
import { DataManipulada } from './models/data_manipulada';
import { Filtros } from './models/filtro';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  transacoes: Array<Transacao> = [];
  displayedColumns: string[] = ['Data', 'Hora']; // Colunas padrão
  pspOptions: any[] = []; // Opções para o multiselect
  selectedPSPs: string[] = []; // PSPs selecionados
  pspColumns: string[] = [];
  totalRecords: number = 0;
  currentPage: number = 1;
  dataManipulada!: DataManipulada;
  listaDePsps: string[] = [];
  constructor(private service: RelatorioService){}
  
  ngOnInit(): void {
    this.carregarTransacoes();  
    this.service.getAll(this.listaDePsps)
      .subscribe(transacoes =>{
        this.transacoes= [...transacoes]
        this.dataManipulada = this.manipularDados(transacoes, this.listaDePsps);

        // this.getPSPOptions(this.transacoes);
        this.pspColumns = this.selectedPSPs;
      });
  }

  carregarTransacoes(): Transacao[] {
    this.service.getAll([])
      .subscribe(transacoes =>this.transacoes = transacoes);
      return this.transacoes;
  }

  getPSPPercentualAprovacao(transacao: Transacao, psp: string): string {
    const pspInfo = transacao.info_desempenho;
    if (pspInfo.descricao === psp) {
      return pspInfo.percentual_aprovacao;
    }
    return '-';
  }
  
  // getPSPOptions(transacoes: Transacao[]): void {
  //   // return this.pspOptions = transacoes.map(t=>{
  //   //   return t.info_desempenho.descricao
  //   // })
  // }

  onPSPSelectionChange(event: { value: string[]; }): void {
    // Atualizar as colunas exibidas conforme os PSPs selecionados
    this.selectedPSPs = event.value;
    this.updateDisplayedColumns();
  }

  // updateDisplayedColumns(): void {
  //   // Adicionar as colunas correspondentes aos PSPs selecionados
  //   this.displayedColumns = ['Data', 'Hora']; // Colunas padrão
  //   this.selectedPSPs.forEach(psp => {
  //     if (!this.displayedColumns.includes(psp) && this.displayedColumns.length < 7) {
  //       this.displayedColumns.push(psp);
  //     }
  //   });
  // }
  onPageChange(): void {
    this.currentPage += 1;
  }

  manipularDados(data: Transacao[], listaDePsps: string[]): DataManipulada {
    const dataManipulada: DataManipulada = {
      headers: {
        data: 'Data',
        hora: 'Hora',
        ...listaDePsps.reduce((acc: { [key: string]: string }, psp: string) => {
          acc[psp] = psp;
          return acc;
        }, {})
      },
      data: []
    };
  
    // Criar um mapa para mapear combinações únicas de data, hora e PSPs
    const map = new Map<string, any>();
  
    // Iterar sobre as transações
    data.forEach(transacao => {
      const pspInfo = transacao.info_desempenho;
      if (pspInfo && listaDePsps.includes(pspInfo.descricao)) {
        const key = transacao.data_trn + '_' + transacao.hora; // Chave única para a combinação de data e hora
  
        // Verificar se já existe um objeto para essa combinação de data e hora no mapa
        if (!map.has(key)) {
          const newRow = {
            Data: transacao.data_trn,
            Hora: transacao.hora,
            ...listaDePsps.reduce((acc: { [key: string]: string }, psp: string) => {
              acc[psp] = '-';
              return acc;
            }, {})
          };
          map.set(key, newRow);
        }
  
        // Preencher o valor do PSP se houver transação para esse PSP na combinação de data e hora
        const newRow = map.get(key);
        newRow[pspInfo.descricao] = pspInfo.percentual_aprovacao;
        map.set(key, newRow);
      }
    });
  
    // Adicionar as linhas do mapa ao array de dados da manipulação
    map.forEach((value) => {
      dataManipulada.data.push(value);
    });
    console.log(dataManipulada);
    
    return dataManipulada;
  }
  filtro!:Filtros;
  receberFiltros(event: Filtros) {
    
    this.listaDePsps = event.pspsSelecionados;
    
    console.log('Lista de PSPs recebida:', this.listaDePsps);
  
    // Atualizar os dados manipulados com base nos filtros recebidos
    this.atualizarDadosManipulados();
  }

  atualizarDadosManipulados() {
    if (this.transacoes.length > 0 && this.listaDePsps.length > 0) {
      // Manipular os dados com base nas transações e na lista de PSPs selecionados
      this.dataManipulada = this.manipularDados(this.transacoes, this.listaDePsps);
  
      // Verificar se o objeto headers está vazio
      if (Object.keys(this.dataManipulada.headers).length === 0) {
        // Se estiver vazio, adicionar as propriedades data e hora
        this.dataManipulada.headers = {
          data: 'Data',
          hora: 'Hora'
        };
      }
  
      // Atualizar as colunas da tabela conforme os PSPs selecionados
      this.updateDisplayedColumns();
    } else {
      // Se não houver transações ou PSPs selecionados, deixar os dados manipulados vazios
      this.dataManipulada.data = [];
  
      // Resetar as colunas da tabela
      this.displayedColumns = ['Data', 'Hora'];
    }
  }
  
  updateDisplayedColumns(): void {
    // Adicionar as colunas correspondentes aos PSPs selecionados
    this.displayedColumns = ['Data', 'Hora']; // Colunas padrão
    this.selectedPSPs.forEach(psp => {
      if (!this.displayedColumns.includes(psp) && this.displayedColumns.length < 7) {
        this.displayedColumns.push(psp);
      }
    });
  
    // Atualizar os nomes das colunas dos PSPs
    this.displayedColumns = this.displayedColumns.map(column => {
      return this.dataManipulada.headers[column] ?? column;
    });
  }
  
  
  
}




