import type { ProductFormValues } from "./schema";

export function mapFormToApiPayload(values: ProductFormValues) {
  return [
    {
      name: values.name,
      type: values.type,
      description_short: values.description_short || "",
      description_long: values.description_long || "",
      code: values.code || "",
      unit: values.unit,
      category: values.category,
      cashback_type: values.cashback_type,
      seo_title: values.seo_title || "",
      seo_description: values.seo_description || "",
      seo_keywords: values.seo_keywords ?? [],
      global_category_id: values.global_category_id ?? undefined,
      marketplace_price: values.marketplace_price,
      chatting_percent: values.chatting_percent,
      address: values.address || "",
      latitude: values.latitude ?? undefined,
      longitude: values.longitude ?? undefined,
    },
  ];
}
