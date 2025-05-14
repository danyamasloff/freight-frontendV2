import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthPage } from "./components/auth/auth-page.tsx";
import { DashboardPage } from "./components/dashboard/dashboard-page.tsx";
import { CargoPage } from "./components/dashboard/pages/cargo-page.tsx";
import { CompliancePage } from "./components/dashboard/pages/compliance-page.tsx";
import { DriverPage } from "./components/dashboard/pages/driver-page.tsx";
import { FuelPage } from "./components/dashboard/pages/fuel-page.tsx";
import { RoutingPage } from "./components/dashboard/pages/routing-page.tsx";
import { VehiclePage } from "./components/dashboard/pages/vehicle-page.tsx";
import { WeatherPage } from "./components/dashboard/pages/weather-page.tsx";
import { NotFound } from "./components/not-found";
import "./index.css";
import { PageMap } from "./components/PageMap.tsx"
import { ThemeProvider } from "./providers/theme-provider.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ThemeProvider defaultTheme="system" storageKey="app-theme">
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<AuthPage />} />
					<Route path="/dashboard" element={<DashboardPage />} />
					<Route path="/dashboard/cargo" element={<CargoPage />} />
					<Route path="/dashboard/compliance" element={<CompliancePage />} />
					<Route path="/dashboard/driver" element={<DriverPage />} />
					<Route path="/dashboard/fuel" element={<FuelPage />} />
					<Route path="/dashboard/routing" element={<RoutingPage />} />
					<Route path="/dashboard/vehicle" element={<VehiclePage />} />
					<Route path="/dashboard/weather" element={<WeatherPage />} />
					<Route path="*" element={<NotFound />} />
					<Route path="/zalupka" element={<PageMap />} />
				</Routes>
			</BrowserRouter>
		</ThemeProvider>
	</StrictMode>
);
