import { account, db } from "@/db/schema";
import { user } from "@/db/schema";
interface UserInterface {
  id: string;
  name?: string | null;
  image?: string | null;
  email?: string | null;
}
export const NewUserCreationApi = async (userData: UserInterface) => {
  //   await db.transaction(async (trx) => {
  // Insert user
  const CreatedUser = await db
    .insert(user)
    .values({
      userName: userData.name || "",
      firstName: userData.name?.split(" ")[0] || "",
      lastName: userData.name?.split(" ").slice(1).join(" ") || "",
      email:
        userData.email === undefined
          ? `${userData.id}@provider.com`
          : userData.email || "",
      imageUrl: userData.image || "",
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    .returning();

  await db.insert(account).values({
    userId: CreatedUser[0].id,
    name: "Cash",
    balance: "0",
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  //   });

  return;
};
