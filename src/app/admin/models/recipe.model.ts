// export interface Donut {
//   id?: string;
//   name: string;
//   icon: string;
//   price: number;
//   description: string;
//   promo?: 'new' | 'limited';
// }

export interface Recipe {
  id?: string;
  name: string;
  ingredients: string[];
  category: string;
  img?: string;
  page?: number;
  url?: string;
}
