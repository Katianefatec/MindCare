import { Reflexao } from '../models/Reflexao';

export abstract class ReflexaoBase {
  protected reflexao: Reflexao;

  constructor(categoria: 'Vida' | 'Amor' | 'Família' | 'Trabalho', texto: string) {
    this.reflexao = {
      categoria,
      data: new Date(),
      texto,
    };
  }

  obterReflexao(): Reflexao {
    return this.reflexao;
  }
}