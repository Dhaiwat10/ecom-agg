export interface IListing {
  id: string;
  created_by: string;
  title: string;
  description: string;
  price: number;
  sales: number;
  sku: string;
  created_at: string;
  image_file_names?: string[];
  images?: string[];
  stock?: number;
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
}

export interface IReview {
  id: string;
  content: string;
  rating: number;
}