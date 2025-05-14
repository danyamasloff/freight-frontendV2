import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Box } from "lucide-react"
import { DashboardLayout } from "../dashboard-layout"

export function CargoPage() {
  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Грузы</h1>
        <div className="flex items-center gap-4">
          <div className="bg-primary/10 text-primary p-2 rounded-md flex items-center gap-2">
            <Box className="h-5 w-5" />
            <span className="font-medium">38 активных грузов</span>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <CardTitle className="flex justify-between">
                <span>Груз #{1000 + i}</span>
                <span className="text-sm px-2 py-1 bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 rounded-md">
                  В пути
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Маршрут</div>
                  <div className="font-medium">Москва → Санкт-Петербург</div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Водитель</div>
                    <div className="font-medium">Иванов И.</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Вес</div>
                    <div className="font-medium">{2 + i}т</div>
                  </div>
                </div>
                <div className="h-1 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${30 + i * 10}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  )
}
