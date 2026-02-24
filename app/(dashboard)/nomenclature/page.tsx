import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-2xl font-semibold">Номенклатура</div>
          <div className="text-sm text-muted-foreground">Товары и услуги</div>
        </div>
        <Button asChild>
          <Link href="/nomenclature/new">+ Добавить</Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Список</CardTitle>
          <CardDescription>
            Здесь можно будет вывести таблицу товаров.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground">
            Таблица с товарами будет отображаться здесь. Пока что это просто заглушка.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
