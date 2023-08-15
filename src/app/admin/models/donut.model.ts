export interface Donut {
  id?: string;
  name: string;
  icon: string;
  price: number;
  description: string;
  promo?: 'new' | 'limited';
}
