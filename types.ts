
export interface Destination {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  link: string;
  featured?: boolean;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  groundingLinks?: { title: string; uri: string }[];
}

export enum AppSection {
  HOME = 'home',
  CONCIERGE = 'concierge',
  COLLECTION = 'collection'
}
