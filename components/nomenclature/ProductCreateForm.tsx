"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  productFormSchema,
  type ProductFormValues,
} from "@/lib/nomenclature/schema";
import { mapFormToApiPayload } from "@/lib/nomenclature/mapper";
import { generateSeoFromName } from "@/lib/nomenclature/seo";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

import { toast } from "sonner";
import { KeywordsField } from "./KeywordsField";

export function ProductCreateForm() {
  const [preview, setPreview] = React.useState<any>(null);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: "",
      type: "product",
      description_short: "",
      description_long: "",
      code: "",
      unit: 116,
      category: 2477,
      cashback_type: "lcard_cashback",
      seo_title: "",
      seo_description: "",
      seo_keywords: [],
      global_category_id: 127,
      marketplace_price: 0,
      chatting_percent: 0,
      address: "",
      latitude: undefined,
      longitude: undefined,
    },
    mode: "onChange",
  });

  React.useEffect(() => {
    const sub = form.watch((values) => {
      const parsed = productFormSchema.safeParse(values);
      setPreview(parsed.success ? mapFormToApiPayload(parsed.data) : null);
    });
    return () => sub.unsubscribe();
  }, [form]);

  function handleGenerateSeo() {
    const name = form.getValues("name");
    const description_short = form.getValues("description_short");

    if (!name.trim()) {
      toast.error("Сначала введите название товара");
      return;
    }

    const seo = generateSeoFromName({ name, description_short });
    form.setValue("seo_title", seo.seo_title, { shouldValidate: true });
    form.setValue("seo_description", seo.seo_description, {
      shouldValidate: true,
    });
    form.setValue("seo_keywords", seo.seo_keywords, { shouldValidate: true });

    toast.success("SEO заполнено");
  }

  async function onSubmit(values: ProductFormValues) {
    const parsed = productFormSchema.safeParse(values);
    if (!parsed.success) {
      toast.error("Проверьте поля формы");
      return;
    }

    const payload = mapFormToApiPayload(parsed.data);

    await toast.promise(
      (async () => {
        const res = await fetch("/api/nomenclature", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const data = await res.json().catch(() => null);

        if (!res.ok) {
          const msg =
            data?.message ||
            data?.data?.message ||
            `Ошибка API (status ${res.status})`;
          throw new Error(msg);
        }

        return data;
      })(),
      {
        loading: "Создаю карточку…",
        success: () => {
          form.reset();
          return "Карточка создана и отправлена в TableCRM";
        },
        error: (e) =>
          e instanceof Error ? e.message : "Не удалось создать карточку",
      },
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      <div className="lg:col-span-8 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Создание карточки</CardTitle>
            <CardDescription>
              Заполните поля и отправьте данные в API TableCRM
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Название *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder='Например: "Куртка зимняя мужская"'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Тип *</FormLabel>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Выберите тип" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="product">Товар</SelectItem>
                            <SelectItem value="service">Услуга</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="code"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Артикул / Код</FormLabel>
                        <FormControl>
                          <Input placeholder="Например: KT-793" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="marketplace_price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Цена *</FormLabel>
                        <FormControl>
                          <Input type="number" min={0} step="1" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="description_short"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Краткое описание</FormLabel>
                      <FormControl>
                        <Textarea
                          rows={3}
                          placeholder="1–2 предложения"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description_long"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Длинное описание</FormLabel>
                      <FormControl>
                        <Textarea
                          rows={6}
                          placeholder="Полное описание"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Separator />

                <div className="grid gap-4 md:grid-cols-3">
                  <FormField
                    control={form.control}
                    name="unit"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Единица измерения (ID) *</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Категория (ID) *</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="global_category_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Глобальная категория (ID)</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Separator />

                <Tabs defaultValue="seo" className="w-full">
                  <div className="flex items-center justify-between gap-3">
                    <TabsList>
                      <TabsTrigger value="seo">SEO</TabsTrigger>
                      <TabsTrigger value="geo">Адрес</TabsTrigger>
                    </TabsList>

                    <Button
                      type="button"
                      variant="secondary"
                      onClick={handleGenerateSeo}
                    >
                      Сгенерировать SEO
                    </Button>
                  </div>

                  <TabsContent value="seo" className="space-y-4">
                    <FormField
                      control={form.control}
                      name="seo_title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>SEO title</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="seo_description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>SEO description</FormLabel>
                          <FormControl>
                            <Textarea rows={3} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <KeywordsField
                      form={form}
                      name="seo_keywords"
                      label="SEO keywords"
                    />
                  </TabsContent>

                  <TabsContent value="geo" className="space-y-4">
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Адрес</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid gap-4 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="latitude"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Широта</FormLabel>
                            <FormControl>
                              <Input type="number" step="0.000001" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="longitude"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Долгота</FormLabel>
                            <FormControl>
                              <Input type="number" step="0.000001" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </TabsContent>
                </Tabs>

                <Separator />

                <div className="flex items-center justify-between gap-3">
                  <FormField
                    control={form.control}
                    name="cashback_type"
                    render={({ field }) => (
                      <FormItem className="flex items-center gap-3">
                        <FormLabel className="m-0">Кэшбек</FormLabel>
                        <FormControl>
                          <Switch
                            checked={field.value === "lcard_cashback"}
                            onCheckedChange={(checked) =>
                              field.onChange(
                                checked ? "lcard_cashback" : "none",
                              )
                            }
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="chatting_percent"
                    render={({ field }) => (
                      <FormItem className="min-w-[180px]">
                        <FormLabel>
                          Процент комиссии за сделку через чат % *
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min={0}
                            max={100}
                            step="1"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex justify-end">
                  <Button type="submit" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting
                      ? "Создаю..."
                      : "Создать карточку"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-4 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Payload preview</CardTitle>
            <CardDescription>То, что уйдёт в API (массив)</CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="max-h-[520px] overflow-auto rounded-md bg-muted p-3 text-xs">
              {JSON.stringify(preview, null, 2)}
            </pre>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
