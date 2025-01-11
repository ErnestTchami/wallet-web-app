import { v4 as uuidv4 } from "uuid";
import {
  pgTable,
  timestamp,
  uuid,
  varchar,
  date,
  numeric,
} from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: uuid("id").default(uuidv4()).primaryKey().notNull(),
  userName: varchar("userName"),
  firstName: varchar("firstName").notNull(),
  lastName: varchar("lastName").notNull(),
  imageUrl: varchar("imageUrl"),
  email: varchar("email").notNull(),
  phone: varchar("phone"),
  gender: varchar("gender"),
  dateOfBirth: date("dateOfBirth"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export const account = pgTable("account", {
  id: uuid("id").default(uuidv4()).primaryKey().notNull(),
  userId: uuid("userId")
    .notNull()
    .references(() => user.id),
  name: varchar("name").notNull(),
  balance: numeric("balance").default("0").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export const transaction = pgTable("transaction", {
  id: uuid("id").default(uuidv4()).primaryKey().notNull(),
  userId: uuid("userId")
    .notNull()
    .references(() => user.id),
  accountId: uuid("accountId")
    .notNull()
    .references(() => account.id),
  categoryId: uuid("categoryId")
    .notNull()
    .references(() => category.id),
  subcategoryId: uuid("subcategoryId").references(() => subcategory.id),
  amount: numeric("amount").notNull(),
  type: varchar("type").notNull(),
  date: date("date").defaultNow().notNull(),
  description: varchar("description"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export const category = pgTable("category", {
  id: uuid("id").default(uuidv4()).primaryKey().notNull(),
  userId: uuid("userId")
    .notNull()
    .references(() => user.id),
  name: varchar("name").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export const subcategory = pgTable("subcategory", {
  id: uuid("id").default(uuidv4()).primaryKey().notNull(),
  categoryId: uuid("categoryId")
    .notNull()
    .references(() => category.id),
  name: varchar("name").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export const budget = pgTable("budget", {
  id: uuid("id").default(uuidv4()).primaryKey().notNull(),
  userId: uuid("userId")
    .notNull()
    .references(() => user.id),
  categoryId: uuid("categoryId")
    .notNull()
    .references(() => category.id),
  limitAmount: numeric("limitAmount").notNull(),
  currentAmount: numeric("currentAmount").default("0").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});
