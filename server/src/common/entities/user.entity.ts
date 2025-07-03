export class UserEntity {
  id!: string;
  email!: string;
  username!: string;
  password!: string;
  createdAt!: Date;
  updatedAt!: Date;
  role!: string;
  // bio?: string;
  // avatar?: string;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
