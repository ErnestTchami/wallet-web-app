import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { options } from "@/auth";
import { and, eq, not, desc } from "drizzle-orm";
import { account, category, db, transaction, user } from "@/db/schema";
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

    const totIncome = await db
      .select()
      .from(transaction)
      .where(
        and(
          eq(transaction.userId, usersAccount[0].userId),
          eq(transaction.type, "2")
        )
      );

    const totalTransaction = await db
      .select({
        count: count(),
      })
      .from(transaction)
      .where(and(eq(transaction.userId, usersAccount[0].userId)));

    const totEpenses = await db
      .select()
      .from(transaction)
      .where(
        and(
          eq(transaction.userId, usersAccount[0].userId),
          not(eq(transaction.type, "2"))
        )
      );

    //Lats Record

    const LatestTransaction = await db
      .select({
        id: transaction.id,
        note: transaction.description,
        amount: transaction.amount,
        categoryName: category.name,
        CreatedAt: transaction.createdAt,
        type: transaction.type,
      })
      .from(transaction)
      .where(and(eq(transaction.userId, usersAccount[0].userId)))
      .leftJoin(category, eq(transaction.categoryId, category.id))
      .orderBy(desc(transaction.createdAt))
      .limit(10);

    // Total amount sold in this period
    const TotalexpencesAmount =
      totEpenses?.reduce((accumulator, currentAccount) => {
        return accumulator + parseFloat(currentAccount.amount || "0");
      }, 0) || 0;

    // Total income
    const TotalIncome =
      totIncome?.reduce((accumulator, currentAccount) => {
        return accumulator + parseFloat(currentAccount.amount || "0");
      }, 0) || 0;

    const Response = {
      AccountsCount: usersAccount?.length,
      category: categories[0].count,
      TotalTransaction: totalTransaction[0].count,
      TotalAmount: totalAmount,
      TotalexpencesAmount,
      TotalIncome,
      LatestTransaction,
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
