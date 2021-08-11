export interface IListing {
  id?: string;
  created_by: string;
  title: string;
  description: string;
  sku: string;
  created_at: string;
  image_file_names?: string[];
  images?: string[];
  stock?: number;
  a_price: number;
  f_price: number;
  a_sales?: number;
  f_sales?: number;
  on_amazon: boolean;
  on_flipkart: boolean;
}

export interface IOrder {
  listing_id: string;
  customer_email: string;
  shipping_to_pincode: string;
  qty: number;
  payable_amount: number;
  payment_done: boolean;
  delivery_done: boolean;
  created_at: string;
  platform?: 'amazon' | 'flipkart';
}

export interface IReview {
  id: string;
  content: string;
  rating: number;
  created_by?: string;
  platform: 'amazon' | 'flipkart';
}
