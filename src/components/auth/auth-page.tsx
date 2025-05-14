import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { Eye, EyeOff, Loader2, Lock, LogIn, Mail, Truck, User, UserPlus } from "lucide-react"
import { useState } from "react"

export function AuthPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [activeTab, setActiveTab] = useState("login")
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = (isLogin: boolean) => {
    const newErrors: Record<string, string> = {}

    if (!formData.email) {
      newErrors.email = "Необходимо указать email"
    }

    if (!formData.password) {
      newErrors.password = "Необходимо указать пароль"
    } else if (!isLogin && formData.password.length < 6) {
      newErrors.password = "Пароль должен содержать не менее 6 символов"
    }

    if (!isLogin) {
      if (!formData.username.trim()) {
        newErrors.username = "Необходимо указать имя пользователя"
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Пароли не совпадают"
      }
    }

    return newErrors
  }

  const handleSubmit = async (e: React.FormEvent, isLogin: boolean) => {
    e.preventDefault()

    const formErrors = validateForm(isLogin)
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors)
      return
    }

    setIsLoading(true)
    // Имитация API запроса
    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }))
    }
  }

  return (
    <div className="min-h-screen flex bg-background">
      <div className="hidden lg:flex lg:w-1/2 bg-primary relative">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20" />
        <div className="relative z-10 w-full max-w-xl mx-auto flex flex-col h-full p-12">
          <div className="flex items-center space-x-3 text-primary-foreground">
            <Truck className="h-12 w-12" />
            <h1 className="text-3xl font-bold">АПАСУГП</h1>
          </div>

          <div className="flex-1 flex flex-col justify-center">
            <h2 className="text-4xl font-bold text-primary-foreground mb-6">
              Аналитическая подсистема АСУ грузовых перевозок
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-12">
              Современная система управления грузоперевозками, аналитика и мониторинг в режиме реального времени.
            </p>

            <div className="grid grid-cols-3 gap-6">
              <Card className="bg-background/10 border-none text-primary-foreground">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold mb-2">2500+</div>
                  <p className="text-sm text-primary-foreground/70">Автомобилей в системе</p>
                </CardContent>
              </Card>
              <Card className="bg-background/10 border-none text-primary-foreground">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold mb-2">35+</div>
                  <p className="text-sm text-primary-foreground/70">Регионов обслуживания</p>
                </CardContent>
              </Card>
              <Card className="bg-background/10 border-none text-primary-foreground">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold mb-2">98%</div>
                  <p className="text-sm text-primary-foreground/70">Точность отслеживания</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8">
        <Card className="w-full max-w-[440px] border-none shadow-xl">
          <CardHeader className="space-y-2 text-center">
            <div className="flex justify-center mb-2 lg:hidden">
              <Truck className="h-12 w-12 text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold">
              {activeTab === "login" ? "Вход в систему" : "Создать аккаунт"}
            </CardTitle>
            <CardDescription className="text-base">
              {activeTab === "login"
                ? "Введите учетные данные для входа в систему"
                : "Введите свои данные для создания аккаунта"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full" onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="login" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <LogIn className="w-4 h-4 mr-2" />
                  Вход
                </TabsTrigger>
                <TabsTrigger value="register" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Регистрация
                </TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="mt-0">
                <form onSubmit={(e) => handleSubmit(e, true)} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">Электронная почта</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={cn(
                          "h-12 pl-10",
                          errors.email && "border-destructive"
                        )}
                        placeholder="Введите вашу электронную почту"
                      />
                    </div>
                    {errors.email && (
                      <p className="text-sm text-destructive">{errors.email}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Пароль</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={handleChange}
                        className={cn(
                          "h-12 pl-10 pr-10",
                          errors.password && "border-destructive"
                        )}
                        placeholder="Введите ваш пароль"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-12 w-12 text-muted-foreground hover:text-foreground"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    {errors.password && (
                      <p className="text-sm text-destructive">{errors.password}</p>
                    )}
                  </div>

                  <Button
                    variant="link"
                    className="p-0 h-auto font-normal"
                    onClick={(e) => e.preventDefault()}
                  >
                    Забыли пароль?
                  </Button>

                  <Button
                    type="submit"
                    className="w-full h-12 text-base font-medium"
                    disabled={isLoading}
                  >
                    {isLoading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                    Войти в систему
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="register" className="mt-0">
                <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="username">Имя</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className={cn(
                          "h-12 pl-10",
                          errors.username && "border-destructive"
                        )}
                        placeholder="Иван Иванов"
                      />
                    </div>
                    {errors.username && (
                      <p className="text-sm text-destructive">{errors.username}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-email">Электронная почта</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="register-email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={cn(
                          "h-12 pl-10",
                          errors.email && "border-destructive"
                        )}
                        placeholder="Введите вашу электронную почту"
                      />
                    </div>
                    {errors.email && (
                      <p className="text-sm text-destructive">{errors.email}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-password">Пароль</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="register-password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={handleChange}
                        className={cn(
                          "h-12 pl-10 pr-10",
                          errors.password && "border-destructive"
                        )}
                        placeholder="Введите ваш пароль"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-12 w-12 text-muted-foreground hover:text-foreground"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    {errors.password && (
                      <p className="text-sm text-destructive">{errors.password}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Подтвердите пароль</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showPassword ? "text" : "password"}
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className={cn(
                          "h-12 pl-10",
                          errors.confirmPassword && "border-destructive"
                        )}
                        placeholder="Повторите введенный пароль"
                      />
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-sm text-destructive">{errors.confirmPassword}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 text-base font-medium"
                    disabled={isLoading}
                  >
                    {isLoading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                    Создать аккаунт
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
