"use client";

import * as React from "react";
import { UseFormReturn } from "react-hook-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import type { ProductFormValues } from "@/lib/nomenclature/schema";

export function KeywordsField({
  form,
  name,
  label,
}: {
  form: UseFormReturn<ProductFormValues>;
  name: "seo_keywords";
  label: string;
}) {
  const [draft, setDraft] = React.useState("");
  const keywords = form.watch(name) ?? [];

  function add() {
    const v = draft.trim();
    if (!v) return;
    if (keywords.includes(v)) return;
    form.setValue(name, [...keywords, v], { shouldValidate: true });
    setDraft("");
  }

  function remove(v: string) {
    form.setValue(
      name,
      keywords.filter((k) => k !== v),
      { shouldValidate: true }
    );
  }

  return (
    <FormField
      control={form.control}
      name={name}
      render={() => (
        <FormItem>
          <FormLabel>{label}</FormLabel>

          <div className="flex gap-2">
            <Input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder='Например: "куртка", "зима"'
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  add();
                }
              }}
            />
            <Button type="button" variant="secondary" onClick={add}>
              Добавить
            </Button>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {keywords.map((k) => (
              <Badge key={k} variant="secondary" className="gap-2">
                {k}
                <button
                  type="button"
                  className="opacity-70 hover:opacity-100"
                  onClick={() => remove(k)}
                >
                  ×
                </button>
              </Badge>
            ))}
          </div>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}