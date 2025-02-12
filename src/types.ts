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
}
export interface ICategory {
  id: number;
  title: string;
}
