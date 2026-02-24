export interface UserRole {
  name: string;
  slug: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
}

export interface AuthData {
  token: string;
  user: User;
}
