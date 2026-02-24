import type { ProductParsedValues } from "./schema";

function dropEmpty<T extends Record<string, any>>(obj: T) {
  const out: Record<string, any> = {};
  for (const [k, v] of Object.entries(obj)) {
    const isEmptyString = typeof v === "string" && v.trim() === "";
    const isEmptyArray = Array.isArray(v) && v.length === 0;
    const isUndefined = typeof v === "undefined";
    const isNull = v === null;
    if (isUndefined || isNull || isEmptyString || isEmptyArray) continue;
    out[k] = v;
  }
  return out as Partial<T>;
}

export function mapFormToApiPayload(values: ProductParsedValues) {
  const item = dropEmpty({
    name: values.name,
    type: values.type,
    description_short: values.description_short,
    description_long: values.description_long,
    code: values.code,
    unit: values.unit,
    category: values.category,
    cashback_type: values.cashback_type,
    seo_title: values.seo_title,
    seo_description: values.seo_description,
    seo_keywords: values.seo_keywords,
    global_category_id: values.global_category_id,
    marketplace_price: values.marketplace_price,
    chatting_percent: values.chatting_percent,
    address: values.address,
    latitude: values.latitude,
    longitude: values.longitude,
  });

  return [item];
}
