import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, CheckCircle, FileCheck } from "lucide-react"
import { DashboardLayout } from "../dashboard-layout"

export function CompliancePage() {
  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Соответствие</h1>
        <div className="flex items-center gap-4">
          <div className="bg-primary/10 text-primary p-2 rounded-md flex items-center gap-2">
            <FileCheck className="h-5 w-5" />
            <span className="font-medium">92% соответствия</span>
          </div>
        </div>
      </div>

      <div className="grid gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Обзор соответствия</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center">
                <div className="text-green-500 mb-2">
                  <CheckCircle className="h-12 w-12" />
                </div>
                <div className="text-2xl font-bold">46</div>
                <div className="text-sm text-muted-foreground">Соответствующие документы</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-amber-500 mb-2">
                  <AlertCircle className="h-12 w-12" />
                </div>
                <div className="text-2xl font-bold">8</div>
                <div className="text-sm text-muted-foreground">Требуют внимания</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-red-500 mb-2">
                  <AlertCircle className="h-12 w-12" strokeWidth={2.5} />
                </div>
                <div className="text-2xl font-bold">2</div>
                <div className="text-sm text-muted-foreground">Критические нарушения</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-xl font-semibold mb-4">Последние обновления</h2>
      <div className="space-y-4">
        {[
          { status: "success", title: "Лицензия обновлена", date: "23.05.2023", type: "Лицензия" },
          { status: "warning", title: "Срок действия страховки заканчивается", date: "15.06.2023", type: "Страховка" },
          { status: "success", title: "Пройден технический осмотр", date: "10.05.2023", type: "Техосмотр" },
          { status: "error", title: "Отсутствуют документы водителя", date: "05.05.2023", type: "Документы" },
          { status: "success", title: "Обновлены разрешения на перевозку", date: "01.05.2023", type: "Разрешения" },
        ].map((item, i) => (
          <Card key={i}>
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-full
                  ${item.status === "success" ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400" :
                    item.status === "warning" ? "bg-amber-100 text-amber-600 dark:bg-amber-900 dark:text-amber-400" :
                    "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400"}`}>
                  <FileCheck className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-medium">{item.title}</div>
                  <div className="text-sm text-muted-foreground">{item.type}</div>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">{item.date}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  )
}
