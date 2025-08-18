declare type Product = {
  _id?: string;
  id?: string;
  title: string;
  description?: string;
  slug?: string;
  imgCover: string;
  images?: string[];
  price: number;
  priceAfterDiscount?: number;
  quantity: number;
  category?: string;
  occasion?: string;
  discount?: number;
  sold?: number;
  rating?: number;
  rateAvg?: number;
  createdAt?: string;
  updatedAt?: string;
  priceAfterDiscount?: number; // خليها موجودة هنا
} & DatabaseFields;

declare type ProductSuccess = {
  message: "success";
  metadata: Metadata;
  products: Product[];
};

declare type ProductError = {
  message: "success";
  metadata: Metadata;
  products: [];
};

declare type ProductResponse = ProductSuccess | ProductError;
