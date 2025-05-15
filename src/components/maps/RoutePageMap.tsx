import RouteMap from './RouteMap';
import {DashboardLayout} from "@/components/dashboard/dashboard-layout.tsx";

export function RoutePageMap() {
    return (
        <DashboardLayout>
            <div className="flex flex-col">
                <h1 className="text-3xl font-bold mb-8">Маршрутная карта</h1>
                <div className="h-[calc(100vh-200px)] w-full border rounded-lg overflow-hidden">
                    <RouteMap/>
                </div>
            </div>
        </DashboardLayout>
    );
}