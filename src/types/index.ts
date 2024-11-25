export interface Destination {
  id: string;
  name: string;
  description: string;
  image: string;
  rating: number;
  price: number;
  location: string;
}

export interface Review {
  id: string;
  author: string;
  content: string;
  rating: number;
  date: string;
}

export interface FormValidation {
  isValid: boolean;
  message: string;
}