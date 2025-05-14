import { ThemeToggle } from "@/components/theme-toggle"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import {
	AlertTriangle,
	Bell,
	Box,
	CheckCircle,
	ChevronDown,
	ChevronRight,
	Clock,
	Cloud,
	FileCheck,
	Fuel,
	Home,
	LogOut,
	Menu,
	Navigation,
	Settings,
	Truck,
	User,
	Users,
	Warehouse,
	Wrench
} from "lucide-react"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

const mainNavItem = { icon: Home, label: "Главная", href: "/dashboard" }

const navigationGroups = [
	{
		name: "Транспорт",
		icon: Truck,
		items: [
			{ icon: Truck, label: "Автопарк", href: "/dashboard/vehicle" },
			{ icon: Users, label: "Водители", href: "/dashboard/driver" },
			{ icon: Fuel, label: "Топливо", href: "/dashboard/fuel" }
		]
	},
	{
		name: "Логистика",
		icon: Warehouse,
		items: [
			{ icon: Box, label: "Грузы", href: "/dashboard/cargo" },
			{ icon: Navigation, label: "Маршруты", href: "/dashboard/routing" },
			{ icon: Cloud, label: "Погода", href: "/dashboard/weather" }
		]
	},
	{
		name: "Управление",
		icon: Settings,
		items: [
			{ icon: FileCheck, label: "Соответствие", href: "/dashboard/compliance" }
		]
	}
]

export function DashboardLayout({ children }: { children: React.ReactNode }) {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
	const location = useLocation()

	return (
		<div className="min-h-screen bg-background">
			<Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
				<SheetTrigger asChild>
					<Button
						variant="ghost"
						size="icon"
						className="md:hidden fixed top-4 left-4 z-50"
					>
						<Menu className="h-5 w-5" />
					</Button>
				</SheetTrigger>
				<SheetContent side="left" className="w-64 p-0">
					<DashboardSidebar currentPath={location.pathname} onNavigation={() => setIsMobileMenuOpen(false)} />
				</SheetContent>
			</Sheet>

			<div className="hidden md:flex fixed inset-y-0 w-64 border-r">
				<DashboardSidebar currentPath={location.pathname} />
			</div>

			{/* Main Content */}
			<div className="md:ml-64 p-8">
				<div className="max-w-7xl mx-auto">
					<div className="flex justify-end items-center gap-2 mb-6">
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="ghost" className="relative h-9 w-9 rounded-full">
									<Avatar className="h-8 w-8">
										<AvatarImage src="/avatars/01.png" alt="User" />
										<AvatarFallback>АД</AvatarFallback>
									</Avatar>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end" className="w-56">
								<DropdownMenuLabel>Мой аккаунт</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuGroup>
									<DropdownMenuItem>
										<User className="mr-2 h-4 w-4" />
										<span>Профиль</span>
									</DropdownMenuItem>
									<DropdownMenuItem>
										<Settings className="mr-2 h-4 w-4" />
										<span>Настройки</span>
									</DropdownMenuItem>
								</DropdownMenuGroup>
								<DropdownMenuSeparator />
								<DropdownMenuItem className="text-red-600 dark:text-red-400">
									<LogOut className="mr-2 h-4 w-4" />
									<span>Выйти</span>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>

						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="ghost" size="icon" className="relative rounded-full hover:bg-muted">
									<Bell className="h-5 w-5" />
									<span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end" className="w-80">
								<DropdownMenuLabel className="flex items-center gap-2 px-3 py-2">
									<Bell className="h-4 w-4" />
									<span>Уведомления</span>
								</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<div className="max-h-80 overflow-auto">
									{[
										{
											icon: <Wrench className="h-4 w-4" />,
											title: "Требуется техобслуживание",
											description: "Автомобиль А123БВ требует планового ТО",
											time: "2 часа назад",
											color: "text-yellow-600"
										},
										{
											icon: <AlertTriangle className="h-4 w-4" />,
											title: "Низкий уровень топлива",
											description: "В автомобиле В456ГД заканчивается топливо",
											time: "3 часа назад",
											color: "text-red-600"
										},
										{
											icon: <CheckCircle className="h-4 w-4" />,
											title: "ТО завершено",
											description: "Плановое ТО автомобиля Е789ЖЗ выполнено",
											time: "5 часов назад",
											color: "text-green-600"
										}
									].map((item, i) => (
										<DropdownMenuItem
											key={i}
											className="flex flex-col items-start gap-2 p-3 cursor-pointer hover:bg-muted/50 transition-colors"
										>
											<div className="flex items-center gap-2 w-full">
												<span className={item.color}>{item.icon}</span>
												<div className="font-medium">{item.title}</div>
											</div>
											<div className="text-sm text-muted-foreground pl-6">{item.description}</div>
											<div className="text-xs text-muted-foreground pl-6 flex items-center gap-1">
												<Clock className="h-3 w-3" />
												{item.time}
											</div>
										</DropdownMenuItem>
									))}
								</div>
								<DropdownMenuSeparator />
								<DropdownMenuItem className="p-2 text-center text-sm text-muted-foreground hover:text-primary">
									Показать все уведомления
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>

						<Separator orientation="vertical" className="mx-2 h-4" />

						<ThemeToggle />
					</div>
					{children}
				</div>
			</div>
		</div>
	)
}

function DashboardSidebar({
	currentPath,
	onNavigation
}: {
	currentPath: string
	onNavigation?: () => void
}) {
	const navigate = useNavigate()
	const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({})

	// Update expanded groups when path changes
	useEffect(() => {
		const newExpandedGroups: Record<string, boolean> = {}
		navigationGroups.forEach(group => {
			if (group.items.some(item => item.href === currentPath)) {
				newExpandedGroups[group.name] = true
			} else {
				newExpandedGroups[group.name] = expandedGroups[group.name] || false
			}
		})
		setExpandedGroups(newExpandedGroups)
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentPath])

	const toggleGroup = (groupName: string) => {
		setExpandedGroups(prev => ({
			...prev,
			[groupName]: !prev[groupName]
		}))
	}

	const handleNavigation = (href: string) => {
		navigate(href)
		if (onNavigation) onNavigation()
	}

	return (
		<div className="flex flex-col h-full w-full bg-background">
			<div className="flex items-center gap-2 p-6 border-b">
				<span className="font-semibold text-lg">Панель управления</span>
			</div>

			<nav className="flex-1 p-4 overflow-y-auto">
				<div className="space-y-4">
					{/* Main navigation item */}
					<Button
						variant="ghost"
						className={cn(
							"w-full justify-start gap-3 h-9",
							currentPath === mainNavItem.href && "bg-primary/10 text-primary"
						)}
						onClick={() => handleNavigation(mainNavItem.href)}
					>
						<mainNavItem.icon className="h-4 w-4" />
						{mainNavItem.label}
					</Button>

					{/* Separator after main item */}
					<div className="border-t" />

					{/* Groups */}
					{navigationGroups.map((group) => (
						<div key={group.name}>
							<button
								className="flex items-center justify-between w-full px-2 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
								onClick={() => toggleGroup(group.name)}
							>
								<div className="flex items-center">
									<group.icon className="h-4 w-4 mr-2" />
									{group.name}
								</div>
								{expandedGroups[group.name] ?
									<ChevronDown className="h-4 w-4" /> :
									<ChevronRight className="h-4 w-4" />
								}
							</button>

							{expandedGroups[group.name] && (
								<div className="mt-1 ml-2 space-y-1">
									{group.items.map((item) => (
										<Button
											key={item.href}
											variant="ghost"
											className={cn(
												"w-full justify-start gap-3 h-9 pl-6",
												currentPath === item.href && "bg-primary/10 text-primary"
											)}
											onClick={() => handleNavigation(item.href)}
										>
											<item.icon className="h-4 w-4" />
											{item.label}
										</Button>
									))}
								</div>
							)}
						</div>
					))}
				</div>
			</nav>

			<div className="mt-auto p-4 border-t">
				<div className="flex items-center gap-2">
					<Button
						variant="outline"
						className="flex-1 justify-start gap-4"
						onClick={() => navigate("/dashboard/profile")}
					>
						<User className="h-4 w-4" />
						Профиль
					</Button>
					<Button
						variant="ghost"
						size="icon"
						className="shrink-0"
						onClick={() => navigate("/dashboard/settings")}
					>
						<Settings className="h-4 w-4" />
					</Button>
				</div>
			</div>
		</div>
	)
}
