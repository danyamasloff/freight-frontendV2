import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Fuel, TrendingDown, TrendingUp } from "lucide-react"
import { DashboardLayout } from "../dashboard-layout"

export function FuelPage() {
  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Топливо</h1>
        <div className="flex items-center gap-4">
          <div className="bg-primary/10 text-primary p-2 rounded-md flex items-center gap-2">
            <Fuel className="h-5 w-5" />
            <span className="font-medium">56.2 ₽/л средняя цена</span>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Потреблено за месяц</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,450 л</div>
            <div className="flex items-center text-green-500 text-sm mt-1">
              <TrendingDown className="h-4 w-4 mr-1" />
              <span>4.2% меньше</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Расходы за месяц</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">698,490 ₽</div>
            <div className="flex items-center text-red-500 text-sm mt-1">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>2.8% больше</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Средний расход</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28.4 л/100км</div>
            <div className="flex items-center text-green-500 text-sm mt-1">
              <TrendingDown className="h-4 w-4 mr-1" />
              <span>1.5% меньше</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Запланировано на заправку</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4,200 л</div>
            <div className="text-muted-foreground text-sm mt-1">
              На следующие 7 дней
            </div>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-xl font-semibold mb-4">История заправок</h2>
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4 font-medium">Дата</th>
                  <th className="text-left p-4 font-medium">Водитель</th>
                  <th className="text-left p-4 font-medium">Транспорт</th>
                  <th className="text-left p-4 font-medium">АЗС</th>
                  <th className="text-left p-4 font-medium">Объем</th>
                  <th className="text-left p-4 font-medium">Цена/л</th>
                  <th className="text-left p-4 font-medium">Сумма</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { date: "25.05.2023", driver: "Иванов И.", vehicle: "А123БВ", station: "Газпром", volume: "180л", price: "56.30₽", total: "10,134.00₽" },
                  { date: "24.05.2023", driver: "Петров П.", vehicle: "В456ГД", station: "Лукойл", volume: "220л", price: "55.80₽", total: "12,276.00₽" },
                  { date: "24.05.2023", driver: "Сидоров А.", vehicle: "Е789ЖЗ", station: "Роснефть", volume: "190л", price: "55.20₽", total: "10,488.00₽" },
                  { date: "23.05.2023", driver: "Кузнецов С.", vehicle: "И123КЛ", station: "Газпром", volume: "210л", price: "56.30₽", total: "11,823.00₽" },
                  { date: "22.05.2023", driver: "Иванов И.", vehicle: "А123БВ", station: "Татнефть", volume: "175л", price: "55.40₽", total: "9,695.00₽" },
                ].map((item, i) => (
                  <tr key={i} className="border-b last:border-0 hover:bg-muted/50">
                    <td className="p-4">{item.date}</td>
                    <td className="p-4">{item.driver}</td>
                    <td className="p-4">{item.vehicle}</td>
                    <td className="p-4">{item.station}</td>
                    <td className="p-4">{item.volume}</td>
                    <td className="p-4">{item.price}</td>
                    <td className="p-4">{item.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  )
}
