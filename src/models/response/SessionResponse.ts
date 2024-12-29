export interface SessionResponse {
  _id?: string;
  users: {
    _id: string;
    name: string;
    sname?: string;
    email: string;
  }[];
}
