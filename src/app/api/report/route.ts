import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { options } from "@/auth";
import { and, eq, not, desc } from "drizzle-orm";
import {
  account,
  category,
  db,
  subcategory,
  transaction,
  user,
} from "@/db/schema";
import { count } from "drizzle-orm";

export type AccountTypes =
  | {
      userName: string | null;
      accountId: string | null;
      name: string | null;
      balance: string | null;
      createdAt: Date | null;
    }[]
  | [];

export async function GET() {
  try {
    const session = await getServerSession(options);

    if (!session) {
      return NextResponse.json(
        { message: "No active session found" },
        { status: 401 }
      );
    }
    const usersAccount = session
      ? await db
          .select({
            userName: user.userName,
            accountId: account.id,
            userId: user.id,
            name: account.name,
            balance: account.balance,
            createdAt: account.createdAt,
          })
          .from(user)
          .where(eq(user.email, session.user?.email as string))
          .leftJoin(account, eq(account.userId, user.id))
      : null;
    const categories = await db.select({ count: count() }).from(category);
    const totalAmount =
      usersAccount?.reduce((accumulator, currentAccount) => {
        return accumulator + parseFloat(currentAccount.balance || "0");
      }, 0) || 0;

    if (!usersAccount) {
      return NextResponse.json(
        { message: "No accounts found" },
        { status: 404 }
      );
    }

    const Income = await db
      .select({
        category: category.name,
        amount: transaction.amount,
        subcategories: subcategory.name,
        description: transaction.description,
        createdAt: transaction.createdAt,
        account: account.name,
      })
      .from(transaction)
      .where(
        and(
          eq(transaction.userId, usersAccount[0].userId),
          eq(transaction.type, "2")
        )
      )
      .leftJoin(category, eq(category.id, transaction.categoryId))
      .leftJoin(subcategory, eq(subcategory.id, transaction.subcategoryId))
      .leftJoin(account, eq(account.id, transaction.accountId))
      .orderBy(desc(transaction.createdAt))
      .limit(4);

    const Expenses = await db
      .select({
        category: category.name,
        categoryId: category.id,
        amount: transaction.amount,
        subcategories: subcategory.name,
        description: transaction.description,
        createdAt: transaction.createdAt,
      })
      .from(transaction)
      .where(
        and(
          eq(transaction.userId, usersAccount[0].userId),
          not(eq(transaction.type, "2"))
        )
      )
      .leftJoin(category, eq(category.id, transaction.categoryId))
      .leftJoin(subcategory, eq(subcategory.id, transaction.subcategoryId))
      .orderBy(desc(transaction.createdAt))
      .limit(20);

    // Total amount sold in this period
    const TotalexpencesAmount =
      Expenses?.reduce((accumulator, currentAccount) => {
        return accumulator + parseFloat(currentAccount.amount || "0");
      }, 0) || 0;

    // Total income
    const TotalIncome =
      Income?.reduce((accumulator, currentAccount) => {
        return accumulator + parseFloat(currentAccount.amount || "0");
      }, 0) || 0;

    const Response = {
      AccountsCount: usersAccount?.length,
      category: categories[0].count,
      TotalAmount: totalAmount,
      TotalexpencesAmount,
      TotalIncome,
      Expenses,
      Income,
    };

    return NextResponse.json(
      { message: "UserAccouunt retrieved successfully", Response },
      { status: 200 }
    );
  } catch (error) {
    const err = error as Error;
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
