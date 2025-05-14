import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, BarChart3, Box, CircleDollarSign, Clock, Fuel, MapPin, MoreHorizontal, RefreshCw, ShieldCheck, Truck, User } from "lucide-react"
import { Button } from "../ui/button"
import { Separator } from "../ui/separator"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"
import { DashboardLayout } from "./dashboard-layout"

export function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Обзор системы</h1>

        <div className="flex items-center">
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="inline-flex items-center space-x-2">
                <span className="text-sm font-medium">Данные актуальны</span>
                <Clock className="h-5 w-5 text-muted-foreground" />
              </span>
            </TooltipTrigger>
            <TooltipContent side="top">
              <span className="text-sm">Последнее обновление: сегодня, 10:35</span>
            </TooltipContent>
          </Tooltip>

          <Separator orientation="vertical" className="mx-2 h-4" />

          <Button variant="ghost" size="icon" className="h-9 w-9">
            <RefreshCw className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Транспортные средства
            </CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32</div>
            <div className="flex justify-between items-center mt-2 space-x-2">
              <p className="text-xs text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/40 px-2 py-1 rounded-md">
                18 в пути
              </p>
              <p className="text-xs text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/40 px-2 py-1 rounded-md">
                11 доступны
              </p>
              <p className="text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/40 px-2 py-1 rounded-md">
                3 на ТО
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Водители
            </CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">27</div>
            <div className="flex justify-between items-center mt-2 space-x-2">
              <p className="text-xs text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/40 px-2 py-1 rounded-md">
                18 на маршруте
              </p>
              <p className="text-xs text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/40 px-2 py-1 rounded-md">
                9 свободны
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Текущие перевозки
            </CardTitle>
            <Box className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">14</div>
            <div className="flex justify-between items-center mt-2">
              <p className="text-xs text-muted-foreground">
                Общий вес: 243т
              </p>
              <p className="text-xs text-green-600 dark:text-green-400">
                95% по графику
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Расход топлива
            </CardTitle>
            <Fuel className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,245 л</div>
            <p className="text-xs text-amber-600 dark:text-amber-400">
              +12% к среднему
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-3 mt-8">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Активные маршруты</CardTitle>
            <CardDescription>18 транспортных средств в пути</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] bg-slate-50 dark:bg-slate-900 rounded-lg flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <MapPin className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>Карта маршрутов</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Требуют внимания</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3 rounded-lg border p-3">
                <div className="h-8 w-8 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center">
                  <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    ТО для 3 автомобилей
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Плановое обслуживание
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-lg border p-3">
                <div className="h-8 w-8 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center">
                  <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Задержка доставки №43562
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Москва - Казань
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-lg border p-3">
                <div className="h-8 w-8 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center">
                  <Fuel className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Высокий расход топлива
                  </p>
                  <p className="text-xs text-muted-foreground">
                    5 транспортных средств
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 mt-8">
        <Card>
          <CardHeader className="flex justify-between">
            <div>
              <CardTitle>Финансовый обзор</CardTitle>
              <CardDescription>Последние 30 дней</CardDescription>
            </div>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <CircleDollarSign className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Доходы</span>
                </div>
                <span className="text-xl font-bold">₽3,245,500</span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Fuel className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Расходы на топливо</span>
                </div>
                <span className="text-lg font-medium">₽724,350</span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Техобслуживание</span>
                </div>
                <span className="text-lg font-medium">₽328,670</span>
              </div>

              <div className="h-[1px] bg-border my-2"></div>

              <div className="flex justify-between items-center text-green-600 dark:text-green-400">
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  <span className="font-medium">Чистая прибыль</span>
                </div>
                <span className="text-xl font-bold">₽2,192,480</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Прогноз расписания</CardTitle>
            <CardDescription>Ближайшие отправления и прибытия</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { id: "А123БВ", direction: "departure", time: "11:30", route: "Москва → Санкт-Петербург", driver: "Иванов И." },
                { id: "В456ГД", direction: "arrival", time: "12:15", route: "Екатеринбург → Москва", driver: "Петров П." },
                { id: "Е789ЖЗ", direction: "departure", time: "13:00", route: "Москва → Нижний Новгород", driver: "Сидоров А." },
                { id: "И123КЛ", direction: "arrival", time: "14:45", route: "Казань → Москва", driver: "Кузнецов С." }
              ].map((schedule, i) => (
                <div key={i} className="flex items-center gap-4 rounded-lg border p-3">
				<div className="h-8 w-8 flex items-center justify-center ml-2 mr-4">
					<span
						className={`text-sm font-bold ${
						schedule.direction === "departure"
							? "text-blue-600 dark:text-blue-400"
							: "text-green-600 dark:text-green-400"
						}`}
					>
						{schedule.time}
					</span>
				</div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">
                        {schedule.route}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {schedule.id}
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Водитель: {schedule.driver}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
