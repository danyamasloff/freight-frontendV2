import { Button } from "@/components/ui/button"
import { FileQuestion, Home } from "lucide-react"
import { useNavigate } from "react-router-dom"

export function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4 text-center">
      <div className="relative">
        <div className="absolute -inset-1.5 bg-primary/20 blur-lg" />
        <FileQuestion className="relative w-24 h-24 text-primary mx-auto mb-4" />
      </div>

      <h1 className="text-4xl font-bold mt-8 mb-2">404</h1>
      <h2 className="text-2xl font-semibold mb-4">Страница не найдена</h2>
      <p className="text-muted-foreground max-w-[500px] mb-8">
        К сожалению, запрашиваемая страница не существует или была перемещена.
        Проверьте правильность введенного адреса или вернитесь на главную страницу.
      </p>

      <div className="flex gap-4">
        <Button
          variant="outline"
          size="lg"
          onClick={() => navigate(-1)}
          className="gap-2"
        >
          Назад
        </Button>
        <Button
          size="lg"
          onClick={() => navigate("/")}
          className="gap-2"
        >
          <Home className="w-4 h-4" />
          На главную
        </Button>
      </div>
    </div>
  )
}
