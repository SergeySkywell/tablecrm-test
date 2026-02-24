import { Button } from "../ui/button";
import { Input } from "../ui/input";

export function Header() {
  return (
    <div className="border-b bg-background">
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center gap-3">
        <div className="text-sm font-semibold">Номенклатура</div>

        <div className="ml-auto flex items-center gap-3 w-full max-w-md">
          <Input placeholder="Search..." />
          <Button variant="secondary">Быстро создать</Button>
        </div>
      </div>
    </div>
  );
}
