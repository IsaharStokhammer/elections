export interface User {
  _id?: any;
  userName: string;
  password: string;
  hasVoted: boolean;
  votedFor: any;
  isAdmin: boolean;
}

export interface Candidate {
  name: string;
  image: string;
  votes: number;
}

export type Status = "idle" | "pending" | "fulfilled" | "rejected";
