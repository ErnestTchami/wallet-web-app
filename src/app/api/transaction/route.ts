import { NextRequest } from "next/server";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { options } from "@/auth";
import { eq, inArray, sql } from "drizzle-orm";
import { account, db, transaction, user } from "@/db/schema";

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

    // Fetch user's accounts
    const usersAccount = await db
      .select({
        userName: user.userName,
        accountId: account.id,
        name: account.name,
        balance: account.balance,
        createdAt: account.createdAt,
      })
      .from(user)
      .where(eq(user.email, session.user?.email as string))
      .leftJoin(account, eq(account.userId, user.id));

    if (!usersAccount || usersAccount.length === 0) {
      return NextResponse.json(
        { message: "No accounts found for the user" },
        { status: 404 }
      );
    }

    // Extract account IDs from usersAccount
    const accountIds = usersAccount
      .map((acc) => acc.accountId)
      .filter((id): id is string => id !== null);

    if (accountIds.length === 0) {
      return NextResponse.json(
        { message: "No valid account IDs found" },
        { status: 404 }
      );
    }

    const userTransactions = await db
      .select()
      .from(transaction)
      .where(inArray(transaction.accountId, accountIds));

    return NextResponse.json(
      {
        message: "User accounts and transactions retrieved successfully",
        transactions: userTransactions,
      },
      { status: 200 }
    );
  } catch (error) {
    const err = error as Error;
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

export const POST = async (req: NextRequest) => {
  try {
    const {
      type: Typecome,
      account: accountId,
      amount,
      category,
      subcategories,

      note,
    } = await req.json();

    const session = await getServerSession(options);

    if (!session) {
      return NextResponse.json(
        { message: "No active session found" },
        { status: 401 }
      );
    }
    const usersAccount = await db
      .select()
      .from(user)
      .where(eq(user.email, session.user?.email as string));

    if (Typecome === "Income") {
      await db
        .update(account)
        .set({
          balance: sql`${account.balance} + ${amount}::numeric`,
        })
        .where(eq(account.id, accountId))
        .returning();
      const types =
        Typecome === "Income" ? "2" : Typecome === "Expense" ? "1" : "3";
      if (usersAccount.length === 0) return;
      await db.insert(transaction).values({
        userId: usersAccount[0]?.id as string,
        accountId: accountId as string,
        amount: amount as string,
        categoryId: category as string,
        description: note as string,
        type: types,
        subcategoryId: subcategories as string,
      });

      return NextResponse.json(
        {
          message: " transactions added successfully",
        },
        { status: 200 }
      );
    } else {
      await db
        .update(account)
        .set({
          balance: sql`${account.balance} - ${amount}::numeric`,
        })
        .where(eq(account.id, accountId))
        .returning();
      const types =
        Typecome === "Income" ? "2" : Typecome === "Expense" ? "1" : "3";

      await db.insert(transaction).values({
        accountId: accountId,
        amount: amount as string,
        userId: usersAccount[0].id as string,
        categoryId: category as string,
        description: note as string,
        type: types,
        subcategoryId: subcategories,
      });
      return NextResponse.json(
        {
          message: " transactions added successfully",
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.log(error);
  }
};
