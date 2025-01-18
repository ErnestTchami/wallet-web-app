import { NextResponse } from "next/server";
import { db } from "@/db";
import { category, subcategory } from "@/db/schema";

export async function GET() {
  try {
    const rawData = await db.select().from(category);
    const subcategories = await db.select().from(subcategory);

    const categoriesWithSubcategories = rawData.map((cat) => {
      return {
        ...cat,
        subcategories: subcategories
          .filter((subcat) => subcat.categoryId === cat.id)
          .map((subcat) => ({
            id: subcat.id,
            name: subcat.name,
            createdAt: subcat.createdAt,
            updatedAt: subcat.updatedAt,
            categoryId: subcat.categoryId,
          })),
      };
    });
    return NextResponse.json(
      {
        message: "Categories with subcategories retrieved successfully",
        data: categoriesWithSubcategories,
      },
      { status: 200 }
    );
  } catch (error) {
    const err = error as Error;
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
