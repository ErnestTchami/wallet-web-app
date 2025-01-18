import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";
import { options } from "@/auth";
import { eq } from "drizzle-orm";
import { account, db, user } from "@/db/schema";

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
            name: account.name,
            balance: account.balance,
            createdAt: account.createdAt,
          })
          .from(user)
          .where(eq(user.email, session.user?.email as string))
          .leftJoin(account, eq(account.userId, user.id))
      : null;

    return NextResponse.json(
      { message: "UserAccouunt retrieved successfully", usersAccount },
      { status: 200 }
    );
  } catch (error) {
    const err = error as Error;
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

export const POST = async (req: NextRequest) => {
  try {
    const { name, initialAmount } = await req.json();
    const session = await getServerSession(options);

    if (!session) {
      return NextResponse.json(
        { message: "No active session found" },
        { status: 401 }
      );
    }
    const users = await db
      .select()
      .from(user)
      .where(eq(user.email, session.user?.email as string));

    const AddAccount = await db.insert(account).values({
      name: name,
      userId: users[0].id,
      balance: initialAmount,
    });

    return NextResponse.json(
      {
        message: " transactions added successfully",
        account: AddAccount,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
  }
};
