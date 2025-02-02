export enum UserRoles {
  ADMIN = 'ADMIN',
  USER = 'USER',
  MANAGER = 'MANAGER',
}

export interface UserDTO {
  username: string;
  password: string;
  email?: string;
  roles?: UserRoles;
}
