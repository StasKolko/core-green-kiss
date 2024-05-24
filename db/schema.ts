import {
  pgTable,
  varchar,
  text,
  integer,
  primaryKey,
  timestamp,
  pgEnum,
  uniqueIndex,
  AnyPgColumn,
} from "drizzle-orm/pg-core";
import type { AdapterAccount } from "@auth/core/adapters";

export const UserRole = pgEnum("role", ["ADMIN", "USER", "MANAGER"]);

export const users = pgTable(
  "user",
  {
    id: varchar("id", { length: 40 }).primaryKey().notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    role: UserRole("role").default("USER").notNull(),
    name: varchar("name", { length: 255 }),
    emailVerified: timestamp("emailVerified", { mode: "date" }),
    image: text("image"),
  },
  (table) => {
    return {
      emailIndex: uniqueIndex("emailIndex").on(table.email),
    };
  },
);

export const accounts = pgTable(
  "account",
  {
    userId: varchar("userId", { length: 40 })
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  }),
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").notNull().primaryKey(),
  userId: varchar("userId", { length: 40 })
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  }),
);

export const categories = pgTable("category", {
  id: varchar("id", { length: 40 }).primaryKey().notNull(),
  url: varchar("url", { length: 40 }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description").notNull(),
  image: text("image"),
  parentId: varchar("parent_id", { length: 40 }),
  createdBy: varchar("createdBy", { length: 40 }).references(() => users.id),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedBy: varchar("updatedBy", { length: 40 }).references(() => users.id),
  updatedAt: timestamp("updatedAt", { mode: "date" }),
});

export const products = pgTable("product", {
  id: varchar("id", { length: 40 }).primaryKey().notNull(),
  url: varchar("url", { length: 40 }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description").notNull(),
  image: text("image"),
});

export const bannerTable = pgTable("banner", {
  id: varchar("id", { length: 40 }).primaryKey().notNull(),
  description: text("description").notNull(),
  image: text("image"),
  url: text("url"),
  createdBy: varchar("created_by", { length: 40 }).references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedBy: varchar("updated_by", { length: 40 }).references(() => users.id),
  updatedAt: timestamp("updated_at", { mode: "date" }),
});

export const mediaType = pgEnum("media_type", ["image", "video"]);

export const media = pgTable("media", {
  id: varchar("id", { length: 40 }).primaryKey().notNull(),
  type: mediaType("type").notNull(),
  url: text("url").notNull(),
  createdAt: varchar("created_at"),
});
