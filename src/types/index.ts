export interface Comment {
  body: string;
  user: {
    login: string;
    avatar_url: string;
  };
  created_at: string;
}

export interface Issue {
  user: {
    login: string;
  };
  created_at: string;
  title: string;
  state: State;
  number: number;
  comments: number;
}

export type State = 'open' | 'closed';
