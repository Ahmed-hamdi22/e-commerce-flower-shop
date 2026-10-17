declare type Cart = {
  user: string;
  cartItems: {
    product: {
      _id: string;
      title: string;
      price: number;
      priceAfterDiscount: number;
      discount?: number;
      imgCover: string;
    };
    quantity: number;
    _id: string;
  }[];
  quantity: number;
  totalPrice: number;
  totalPriceAfterDiscount: number;
  discount: number;
  __v: number;
} & DatabaseFields;

type Product = {
  _id?: string;
  title?: string;
  slug?: string;
  description?: string;
  imgCover?: string;
  images?: string[];
  price?: number;
  quantity?: number;
  category?: string;
  occasion?: string;
  createdAt?: string;
  updatedAt?: string;
  sold?: number;
  discount?: number;
  rateAvg?: number;
  rateCount?: number;
  id?: string;
};

type Order = {
  _id: string;
  user: string;
  orderItems: {
    product: Product;
    price: number;
    quantity: number;
    _id: string;
  }[];
  totalPrice: number;
  paymentType: string;
  isPaid: boolean;
  isDelivered: boolean;
  state: string;
  createdAt: string;
  updatedAt: string;
  orderNumber: string;
  shippingAddress?: {
    street: string;
    city: string;
    phone: string;
    lat: string;
    long: string;
  };
  paidAt?: string;
  __v: number;
} & DatabaseFields;

// payment form
declare type ShippingAddress = {
  street: string;
  phone: string;
  city: string;
  lat?: string;
  long?: string;
};

declare type FormValues = {
  name: string;
  number: string;
  expiry: string;
  ccv: string;
};
