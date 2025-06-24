// 📁 src/modules/admin/user/entities/admin.entity.ts

import { Role } from "@prisma/client";

export class AdminEntity {
  id!: string;
  username!: string;
  email!: string;
  role!: Role;
  avatar?: string | null;
  createdAt!: Date;

  constructor(partial: Partial<AdminEntity>) {
    Object.assign(this, partial);
  }
}
