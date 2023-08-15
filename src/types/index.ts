export interface Ipizza {
  id: string;
  imageUrl: string;
  title: string;
  types: number[];
  sizes: number[];
  price: number;
  category: number;
  rating: number;
  count: number;
}

export interface ICartItem {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  type: string;
  size: number;
  count?: number;
}

export interface IUrl {
  categoryURL: string;
  sortURL: string;
  searchURL: string;
  pageURL: string;
}

export enum SortTypeEnum {
  RATING = 'rating',
  TITLE = 'title',
  PRICE_DESC = 'price',
  PRICE_ASC = '-price',
}
export interface ISort {
  name: string;
  sortProperty: SortTypeEnum;
}
export interface IFilter {
  searchValue: string;
  categoryId: number;
  pageCount: number;
  sort: ISort;
}
