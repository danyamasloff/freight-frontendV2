import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, Clock, Map } from "lucide-react"
import { DashboardLayout } from "../dashboard-layout"

export function RoutingPage() {
  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Маршруты</h1>
        <div className="flex items-center gap-4">
          <div className="bg-primary/10 text-primary p-2 rounded-md flex items-center gap-2">
            <Map className="h-5 w-5" />
            <span className="font-medium">12 активных маршрутов</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Карта маршрутов</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] rounded-md bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                <div className="text-muted-foreground flex flex-col items-center">
                  <Map className="h-12 w-12 mb-2" />
                  <span>Интерактивная карта</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Оповещения</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { type: "warning", message: "Пробка на МКАД, 78км", time: "15 мин назад" },
                  { type: "info", message: "Обновлен маршрут МСК-СПБ", time: "45 мин назад" },
                  { type: "warning", message: "Плохие погодные условия, М7", time: "2 часа назад" },
                  { type: "error", message: "ДТП на М4, объезд", time: "3 часа назад" },
                ].map((alert, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 border rounded-md">
                    <div className={`p-2 rounded-full
                        ${alert.type === "warning" ? "bg-amber-100 text-amber-600 dark:bg-amber-900 dark:text-amber-400" :
                          alert.type === "info" ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400" :
                          "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400"}`}>
                      <AlertTriangle className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{alert.message}</div>
                      <div className="text-sm text-muted-foreground">{alert.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4">Активные маршруты</h2>
      <div className="grid gap-4">
        {[
          { route: "Москва - Санкт-Петербург", driver: "Иванов И.", departure: "25.05.2023 08:00", arrival: "25.05.2023 18:00", status: "Без опозданий", progress: 35 },
          { route: "Екатеринбург - Челябинск", driver: "Сидоров А.", departure: "25.05.2023 09:30", arrival: "25.05.2023 12:30", status: "Без опозданий", progress: 60 },
          { route: "Казань - Нижний Новгород", driver: "Кузнецов С.", departure: "25.05.2023 07:15", arrival: "25.05.2023 12:45", status: "Задержка 15 мин", progress: 45 },
          { route: "Санкт-Петербург - Выборг", driver: "Петров П.", departure: "25.05.2023 10:00", arrival: "25.05.2023 12:30", status: "Без опозданий", progress: 25 },
        ].map((route, i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div>
                  <div className="text-sm text-muted-foreground">Маршрут</div>
                  <div className="font-medium">{route.route}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Водитель</div>
                  <div className="font-medium">{route.driver}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Выезд</div>
                  <div className="font-medium">{route.departure}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Прибытие</div>
                  <div className="font-medium">{route.arrival}</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${route.progress}%` }}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className={route.status.includes("Задержка") ? "text-amber-500" : "text-green-500"}>
                    {route.status}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  )
}
