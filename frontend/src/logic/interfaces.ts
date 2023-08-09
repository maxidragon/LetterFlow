export interface Converstation {
  id: number;
  sendAt: Date;
  from: User;
  to: User;
}

export interface User {
  id: number;
  username: string;
  country: Country;
  gender: "FEMALE" | "MALE" | "OTHER";
}

export interface Country {
  id: number;
  name: string;
  code: string;
}

export interface Letter {
  id: number;
  content: string;
  sendAt: string;
  deliveredAt: string;
  from: User;
  to: User;
}

export interface Language {
  id: number;
  name: string;
}

export interface UserLanguage {
  id: number;
  name: string;
  level: "BASIC" | "INTERMEDIATE" | "FLUENT" | "NATIVE";
}

export interface Hobby {
  id: number;
  name: string;
}

export interface Settings {
  id: number;
  username: string;
  email: string;
  description: string;
  appearInSearch: boolean;
  birthDate: Date;
  showBirthDate: "AGE" | "FULL" | "NONE";
  country: Country;
}

export interface Profile {
  id: number;
  username: string;
  description: string;
  birthDate: Date;
  showBirthDate: "AGE" | "FULL" | "NONE";
  country: Country;
  gender: "FEMALE" | "MALE" | "OTHER";
  replyTime?: number;
  timezone: string;
  starred: boolean;
  sendLetters: number;
  receivedLetters: number;
  hobbies: Hobby[];
  languages: UserLanguage[];
}
