import { relations } from "drizzle-orm";
import {
  user,
  account,
  transaction,
  category,
  subcategory,
  budget,
} from "./schema";

// User Relations
export const UserRelations = relations(user, ({ many }) => ({
  accounts: many(account),
  transactions: many(transaction),
  categories: many(category),
  budgets: many(budget),
}));

// Account Relations
export const AccountRelations = relations(account, ({ one, many }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
  transactions: many(transaction),
}));

// Transaction Relations
export const TransactionRelations = relations(transaction, ({ one }) => ({
  user: one(user, {
    fields: [transaction.userId],
    references: [user.id],
  }),
  account: one(account, {
    fields: [transaction.accountId],
    references: [account.id],
  }),
  category: one(category, {
    fields: [transaction.categoryId],
    references: [category.id],
  }),
  subcategory: one(subcategory, {
    fields: [transaction.subcategoryId],
    references: [subcategory.id],
  }),
}));

// Category Relations
export const CategoryRelations = relations(category, ({ one, many }) => ({
  user: one(user, {
    fields: [category.userId],
    references: [user.id],
  }),
  subcategories: many(subcategory),
  transactions: many(transaction),
  budget: one(budget, {
    fields: [category.id],
    references: [budget.categoryId],
  }),
}));

// Subcategory Relations
export const SubcategoryRelations = relations(subcategory, ({ one, many }) => ({
  category: one(category, {
    fields: [subcategory.categoryId],
    references: [category.id],
  }),
  transactions: many(transaction),
}));

// Budget Relations
export const BudgetRelations = relations(budget, ({ one }) => ({
  user: one(user, {
    fields: [budget.userId],
    references: [user.id],
  }),
  category: one(category, {
    fields: [budget.categoryId],
    references: [category.id],
  }),
}));
