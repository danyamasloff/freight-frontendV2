import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, Cloud, CloudRain, Sun, Wind } from "lucide-react"
import { DashboardLayout } from "../dashboard-layout"

export function WeatherPage() {
  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Погода</h1>
        <div className="flex items-center gap-4">
          <div className="bg-primary/10 text-primary p-2 rounded-md flex items-center gap-2">
            <Cloud className="h-5 w-5" />
            <span className="font-medium">Прогноз на маршрутах</span>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center">
              <h3 className="font-medium text-lg">Москва</h3>
              <div className="mt-3 mb-2">
                <Sun className="h-12 w-12 text-amber-500" />
              </div>
              <p className="text-3xl font-bold">+22°C</p>
              <p className="text-sm text-muted-foreground mt-1">Ясно, без осадков</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center">
              <h3 className="font-medium text-lg">Санкт-Петербург</h3>
              <div className="mt-3 mb-2">
                <Cloud className="h-12 w-12 text-slate-500" />
              </div>
              <p className="text-3xl font-bold">+18°C</p>
              <p className="text-sm text-muted-foreground mt-1">Облачно</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center">
              <h3 className="font-medium text-lg">Екатеринбург</h3>
              <div className="mt-3 mb-2">
                <CloudRain className="h-12 w-12 text-blue-500" />
              </div>
              <p className="text-3xl font-bold">+15°C</p>
              <p className="text-sm text-muted-foreground mt-1">Дождь</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center">
              <h3 className="font-medium text-lg">Казань</h3>
              <div className="mt-3 mb-2">
                <Wind className="h-12 w-12 text-slate-500" />
              </div>
              <p className="text-3xl font-bold">+20°C</p>
              <p className="text-sm text-muted-foreground mt-1">Ветрено</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-xl font-semibold mb-4">Прогноз по маршрутам</h2>
      <div className="grid gap-4">
        {[
          {
            route: "Москва - Санкт-Петербург",
            conditions: [
              { city: "Тверь", temp: "+19°C", icon: Cloud, status: "normal" },
              { city: "Великий Новгород", temp: "+17°C", icon: CloudRain, status: "warning" }
            ],
            alert: "Осторожно! Дождь на участке Тверь - Великий Новгород, видимость ограничена."
          },
          {
            route: "Екатеринбург - Челябинск",
            conditions: [
              { city: "Екатеринбург", temp: "+15°C", icon: CloudRain, status: "normal" },
              { city: "Челябинск", temp: "+16°C", icon: Cloud, status: "normal" }
            ],
            alert: ""
          },
          {
            route: "Казань - Нижний Новгород",
            conditions: [
              { city: "Казань", temp: "+20°C", icon: Wind, status: "warning" },
              { city: "Чебоксары", temp: "+18°C", icon: Wind, status: "warning" },
              { city: "Нижний Новгород", temp: "+17°C", icon: Cloud, status: "normal" }
            ],
            alert: "Внимание! Сильный боковой ветер на трассе М7, рекомендуется снизить скорость."
          },
        ].map((forecast, i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <CardTitle>{forecast.route}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-4">
                {forecast.conditions.map((condition, j) => {
                  const Icon = condition.icon
                  return (
                    <div
                      key={j}
                      className={`border rounded-md p-3 flex flex-col items-center
                        ${condition.status === "warning" ? "border-amber-300 dark:border-amber-700" : ""}
                      `}
                    >
                      <div className="text-sm font-medium">{condition.city}</div>
                      <Icon className={`h-8 w-8 my-2 ${
                        condition.icon === Sun ? "text-amber-500" :
                        condition.icon === CloudRain ? "text-blue-500" :
                        "text-slate-500"
                      }`} />
                      <div>{condition.temp}</div>
                    </div>
                  )
                })}
              </div>
              {forecast.alert && (
                <div className="mt-4 flex items-start gap-2 p-3 bg-amber-50 dark:bg-amber-950 text-amber-800 dark:text-amber-300 rounded-md">
                  <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5" />
                  <p>{forecast.alert}</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  )
}
