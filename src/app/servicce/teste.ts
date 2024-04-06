import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TransacoesMockService {

  constructor() { }

  generateMockData(): Observable<any> {
    const transacoes = [];
    for (let i = 0; i < 100; i++) {
      const data_trn = `2023-${this.randomInt(1, 12).toString().padStart(2, '0')}-${this.randomInt(1, 31).toString().padStart(2, '0')}`;
      const hora = `${this.randomInt(0, 23).toString().padStart(2, '0')}:${this.randomInt(0, 59).toString().padStart(2, '0')}`;
      const cod_psp = this.randomInt(100, 999).toString();
      const descricao = `PS P${cod_psp}`;
      const percentual_aprovacao = this.randomInt(50, 100).toString();
      const quantidade_transacao = this.randomInt(500, 2000).toString();

      const transacao = {
        data_trn,
        hora,
        info_desempenho: {
          cod_psp,
          descricao,
          percentual_aprovacao,
          quantidade_transacao
        }
      };
      transacoes.push(transacao);
    }
    return of({ transacoes }).pipe(
      catchError(error => {
        console.error('Error generating mock data:', error);
        return of(null);
      })
    );
  }

  private randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
