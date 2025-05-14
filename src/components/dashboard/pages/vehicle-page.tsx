import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, Clock, MapPin, Truck } from "lucide-react"
import { DashboardLayout } from "../dashboard-layout"

export function VehiclePage() {
  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Транспорт</h1>
        <div className="flex items-center gap-4">
          <div className="bg-primary/10 text-primary p-2 rounded-md flex items-center gap-2">
            <Truck className="h-5 w-5" />
            <span className="font-medium">32 единицы транспорта</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">В пути</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <div className="text-muted-foreground text-sm">
              56% от общего количества
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Доступные</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">11</div>
            <div className="text-muted-foreground text-sm">
              34% от общего количества
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">На обслуживании</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <div className="text-muted-foreground text-sm">
              9% от общего количества
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Состояние автопарка</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] flex items-center justify-center border rounded-md">
              <div className="text-muted-foreground">
                График состояния автопарка
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-xl font-semibold mb-4">Список транспорта</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { id: "А123БВ", type: "КАМАЗ 5490", driver: "Иванов И.", status: "active", location: "Москва - Тверь", lastService: "12.05.2023" },
          { id: "В456ГД", type: "Scania R500", driver: "Петров П.", status: "active", location: "Санкт-Петербург - Выборг", lastService: "05.05.2023" },
          { id: "Е789ЖЗ", type: "Volvo FH16", driver: "Сидоров А.", status: "active", location: "Екатеринбург - Челябинск", lastService: "15.05.2023" },
          { id: "И123КЛ", type: "DAF XF", driver: "Кузнецов С.", status: "active", location: "Казань - Нижний Новгород", lastService: "08.05.2023" },
          { id: "М456НО", type: "MAN TGX", driver: "", status: "available", location: "Москва", lastService: "10.05.2023" },
          { id: "П789РС", type: "Mercedes Actros", driver: "", status: "maintenance", location: "Сервисный центр", lastService: "22.05.2023" },
        ].map((vehicle, i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <CardTitle className="flex justify-between items-center">
                <span>{vehicle.id}</span>
                <span className={`text-xs px-2 py-1 rounded-full
                  ${vehicle.status === "active" ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400" :
                    vehicle.status === "available" ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400" :
                    "bg-amber-100 text-amber-600 dark:bg-amber-900 dark:text-amber-400"}`}>
                  {vehicle.status === "active" ? "В пути" :
                   vehicle.status === "available" ? "Доступен" : "На обслуживании"}
                </span>
              </CardTitle>
              <div className="text-sm text-muted-foreground">{vehicle.type}</div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{vehicle.location}</span>
                </div>
                {vehicle.driver && (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-xs text-primary">В</span>
                    </div>
                    <span>{vehicle.driver}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    Последнее ТО: {vehicle.lastService}
                  </span>
                </div>
                {i === 5 && (
                  <div className="flex items-center gap-2 text-amber-500">
                    <AlertCircle className="h-4 w-4" />
                    <span className="text-sm">Замена фильтров и масла</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  )
}
