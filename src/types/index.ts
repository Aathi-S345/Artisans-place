// This is now the single source of truth for the Product type
export interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  stock: number;
  status: 'Active' | 'Draft' | 'Sold Out';
  description: string;
}