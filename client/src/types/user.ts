export type User = {
  id: string;
  username: string;
  email: string;
  role: "USER" | "ADMIN";
  avatar?: string;
  createdAt: string;
};
