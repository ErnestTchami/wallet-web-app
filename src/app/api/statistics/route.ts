import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";
import { options } from "@/auth";
import { and, eq, not, desc, gte, lte } from "drizzle-orm";
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

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(options);

    if (!session) {
      return NextResponse.json(
        { message: "No active session found" },
        { status: 401 }
      );
    }

    const url = new URL(req.url);
    const monthParam = url.searchParams.get("date");
    const parsedDate = monthParam ? new Date(monthParam) : new Date();
    const year = parsedDate.getFullYear();
    const month = parsedDate.getMonth();

    const startDate = new Date(year, month, 0);
    const endDate = new Date(year, month + 1, 0);
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(23, 59, 59, 999);

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
        if (
          currentAccount.createdAt &&
          currentAccount.createdAt >= startDate &&
          currentAccount.createdAt <= endDate
        ) {
          return accumulator + parseFloat(currentAccount.balance || "0");
        }
        return accumulator;
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
          eq(transaction.type, "2"),
          gte(transaction.createdAt, startDate),
          lte(transaction.createdAt, endDate)
        )
      );

    const totalTransaction = await db
      .select({
        count: count(),
      })
      .from(transaction)
      .where(
        and(
          eq(transaction.userId, usersAccount[0].userId),
          gte(transaction.createdAt, startDate),
          lte(transaction.createdAt, endDate)
        )
      );

    const totEpenses = await db
      .select()
      .from(transaction)
      .where(
        and(
          eq(transaction.userId, usersAccount[0].userId),
          not(eq(transaction.type, "2")),
          gte(transaction.createdAt, startDate),
          lte(transaction.createdAt, endDate)
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
        account: account.name,
      })
      .from(transaction)
      .where(and(eq(transaction.userId, usersAccount[0].userId)))
      .leftJoin(account, eq(account.id, transaction.accountId))
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
      AccountsCount: usersAccount?.length ?? 0,
      category: categories[0].count ?? 0,
      TotalTransaction: totalTransaction[0].count ?? 0,
      TotalAmount: totalAmount ?? 0,
      TotalexpencesAmount: TotalexpencesAmount ?? 0,
      TotalIncome: TotalIncome ?? 0,
      LatestTransaction: LatestTransaction ?? {},
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
