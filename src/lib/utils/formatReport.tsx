import { ReportDataType } from "@/types/types";
import { categoryIcons } from "./CategolieIcons";

export const transformDataReportWithIcons = (incomein: ReportDataType[]) => {
  return incomein?.reduce(
    (acc, item) => {
      let categoryGroup = acc.find((group) => group.category === item.category);

      if (!categoryGroup) {
        const iconData =
          categoryIcons[item.category as keyof typeof categoryIcons];

        categoryGroup = {
          category: item.category,
          amount: 0,
          subcategories: [],
          icon: iconData.icon,
          iconBg: iconData.iconBg,
        };
        acc.push(categoryGroup);
      }

      categoryGroup.amount += parseFloat(item.amount);

      let subcategory = categoryGroup.subcategories.find(
        (sub) => sub.name === item.subcategories
      );

      subcategory = {
        name: item.subcategories,
        amount: Number(item.amount),
        CreatedAt: item.createdAt,
      };
      categoryGroup.subcategories.push(subcategory);

      return acc;
    },
    [] as Array<{
      category: string;
      amount: number;
      subcategories: Array<{
        name: string;
        amount: number;
        CreatedAt: string | Date;
      }>;
      icon: unknown;
      iconBg: string;
    }>
  );
};
