import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, MapPin, User } from "lucide-react"
import { DashboardLayout } from "../dashboard-layout"

export function DriverPage() {
  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Водители</h1>
        <div className="flex items-center gap-4">
          <div className="bg-primary/10 text-primary p-2 rounded-md flex items-center gap-2">
            <User className="h-5 w-5" />
            <span className="font-medium">24 активных водителя</span>
          </div>
        </div>
      </div>

      <div className="grid gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Обзор водителей</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="border rounded-md p-4">
                <div className="text-sm text-muted-foreground mb-2">В пути</div>
                <div className="text-2xl font-bold">18</div>
              </div>
              <div className="border rounded-md p-4">
                <div className="text-sm text-muted-foreground mb-2">Доступные</div>
                <div className="text-2xl font-bold">6</div>
              </div>
              <div className="border rounded-md p-4">
                <div className="text-sm text-muted-foreground mb-2">Выходной</div>
                <div className="text-2xl font-bold">2</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-xl font-semibold mb-4">Список водителей</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { name: "Иванов Иван", status: "active", hours: "6ч 30м", location: "Москва - Тверь" },
          { name: "Петров Петр", status: "active", hours: "4ч 15м", location: "Санкт-Петербург - Выборг" },
          { name: "Сидоров Алексей", status: "active", hours: "7ч 45м", location: "Екатеринбург - Челябинск" },
          { name: "Смирнов Дмитрий", status: "available", hours: "0ч 0м", location: "Москва" },
          { name: "Кузнецов Сергей", status: "active", hours: "2ч 20м", location: "Казань - Нижний Новгород" },
          { name: "Морозов Александр", status: "off", hours: "0ч 0м", location: "Ростов-на-Дону" },
        ].map((driver, i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="font-medium">{driver.name}</div>
                  <div className="flex items-center gap-4 mt-1">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="h-3.5 w-3.5 mr-1" />
                      {driver.hours}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5 mr-1" />
                      {driver.location}
                    </div>
                  </div>
                </div>
                <div>
                  <span className={`text-xs px-2 py-1 rounded-full
                    ${driver.status === "active" ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400" :
                      driver.status === "available" ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400" :
                      "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"}`}>
                    {driver.status === "active" ? "В пути" :
                     driver.status === "available" ? "Доступен" : "Выходной"}
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
