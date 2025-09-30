export interface DeliveryOption {
  name: string;
  time: string;
  price: string | number;
  isFree?: boolean;
  image?: string;
}

export interface Restaurant {
  name: string;
  nameAr?: string;
  rating: number;
  distance: string;
  tags: string[];
  image: string;
  deliveryOptions: DeliveryOption[];
  isClosed?: boolean;
}