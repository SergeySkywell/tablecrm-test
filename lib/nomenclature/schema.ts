import { z } from "zod";

export const productFormSchema = z.object({
  name: z.string().trim().min(1, "Введите название"),
  type: z.enum(["product", "service"], { required_error: "Выберите тип" }),

  description_short: z.string().trim().optional().default(""),
  description_long: z.string().trim().optional().default(""),

  code: z.string().trim().optional().default(""),

  unit: z.coerce.number().int().positive("unit должен быть числом (ID)"),
  category: z.coerce
    .number()
    .int()
    .positive("category должен быть числом (ID)"),

  cashback_type: z.enum(["lcard_cashback", "none"]).default("lcard_cashback"),

  seo_title: z.string().trim().optional().default(""),
  seo_description: z.string().trim().optional().default(""),
  seo_keywords: z.array(z.string().trim().min(1)).default([]),

  global_category_id: z.coerce.number().int().positive().optional(),

  marketplace_price: z.coerce
    .number()
    .min(0, "Цена не может быть отрицательной"),
  chatting_percent: z.coerce.number().min(0).max(100, "0–100"),

  address: z.string().trim().optional().default(""),
  latitude: z.coerce.number().optional(),
  longitude: z.coerce.number().optional(),
});

export type ProductFormValues = z.infer<typeof productFormSchema>;
