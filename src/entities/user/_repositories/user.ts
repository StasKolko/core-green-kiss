import { db } from "@/shared/lib/db";
import { UserEntity, UserId } from "../_domain/types";
import { users } from "@/../db/schema";

export class UserRepository {
  async getUserById(userId: UserId): Promise<UserEntity | null> {
    const user = await db.query.users.findFirst({
      where: (table, funcs) => funcs.eq(table.id, userId),
    });

    if (!user) return null;

    return user;
  }

  async createUser(user: UserEntity) {
    return await db
      .insert(users)
      .values(user)
      .returning()
      .then((res) => res[0] ?? null);
  }
}

export const userRepository = new UserRepository();
