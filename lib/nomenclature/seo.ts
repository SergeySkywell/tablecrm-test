import type { ProductFormValues } from "./schema";

export function generateSeoFromName(values: Pick<ProductFormValues, "name" | "description_short">) {
  const name = values.name.trim();

  const keywords = name
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .split(/\s+/)
    .filter(Boolean);

  const seo_title = name.length > 60 ? name.slice(0, 57) + "..." : name;
  const seo_description = (
    values.description_short?.trim() ||
    `Купить ${name}. Цена, характеристики, доставка, отзывы.`
  ).slice(0, 160);

  const seo_keywords = Array.from(new Set(["купить", ...keywords])).slice(0, 12);

  return { seo_title, seo_description, seo_keywords };
}