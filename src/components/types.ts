export type BookData = {
  id: number;
  title: string;
  formats?: string[];
  authors: Author[];
  subjects?: string[];
}

type Author = {
  name:string
}