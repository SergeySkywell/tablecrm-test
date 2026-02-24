import { ProductCreateForm } from "@/components/nomenclature/ProductCreateForm";

export default function Page() {
  return (
    <div className="space-y-6">
      <div>
        <div className="text-2xl font-semibold">Создание товара</div>
        <div className="text-sm text-muted-foreground">
          Форма создания карточки товара
        </div>  
      </div>

      <ProductCreateForm />
    </div>
  );
}
