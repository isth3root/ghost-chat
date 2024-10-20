export interface Message {
    _id: string;
    text: string;
}

export interface User {
    username: string;
    messages: Message[];
}

export type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
};