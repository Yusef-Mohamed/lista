export interface IBlog {
  id: number;
  title: string;
  description: string;
  image: string;
}

export interface IShop {
  id: number;
  shop_name: string;
  shop_description: string;
  shop_phone: string;
  address: string;
  address_lat: string;
  address_lng: string;
  logo: string;
  background_image: string;
  banner_image: string;
  logo_white: string;
  brand_image: string;
  categories: {
    id: number;
    title: string;
  }[];
  rate: number;
  branches: number;
  qr_code: string;
  created_at: string;
  branch_address: {
    id: number;
    title: string;
    lat: string;
    lng: string;
  }[];
  has_offers: boolean;
  has_discount_product: boolean;
}
export interface ICategory {
  id: number;
  title: string;
  image?: string;
}

export interface IProduct {
  id: number;
  name: string;
  description: string;
  price: string;
  discount_price: string | null;
  is_recommended: "0" | "1";
  show_in_offer: 0 | 1;
  is_hot: 0 | 1;
  image: string;
  categories: ICategory[];
  created_at: string;
}
