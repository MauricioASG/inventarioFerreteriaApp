//Products.ts se encuentra en app/screens/model
/* eslint-disable prettier/prettier */
export interface Product{
  id: number;
  nombre: string;
  precio: number;
  minStock: number;
  currentStock: number;
  maxStock: number;
}
