export interface Reflexao {
    id?: string; // Opcional: Para armazenar o ID do documento do Firestore
    categoria: 'Vida' | 'Amor' | 'Família' | 'Trabalho';
    data?: Date; 
    texto: string;
  }