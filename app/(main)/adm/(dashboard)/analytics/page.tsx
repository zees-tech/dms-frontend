import DashboardLayout from '@/components/layout/DashboardLayout';
import { Eye, User, BarChart3, Clock } from 'lucide-react';

export default function AnalyticsPage() {
    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Analytics
                    </h1>
                    <div className="flex space-x-2">
                        <select className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                            <option>Last 7 days</option>
                            <option>Last 30 days</option>
                            <option>Last 90 days</option>
                        </select>
                    </div>
                </div>

                {/* Analytics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Page Views</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">45,678</p>
                            </div>
                            <Eye className="w-8 h-8 text-blue-500" />
                        </div>
                        <div className="mt-4">
                            <div className="flex items-center">
                                <span className="text-green-600 text-sm">↗ 12%</span>
                                <span className="text-gray-500 text-sm ml-2">vs last period</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Unique Visitors</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">12,345</p>
                            </div>
                            <User className="w-8 h-8 text-green-500" />
                        </div>
                        <div className="mt-4">
                            <div className="flex items-center">
                                <span className="text-green-600 text-sm">↗ 8%</span>
                                <span className="text-gray-500 text-sm ml-2">vs last period</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Bounce Rate</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">34.5%</p>
                            </div>
                            <BarChart3 className="w-8 h-8 text-orange-500" />
                        </div>
                        <div className="mt-4">
                            <div className="flex items-center">
                                <span className="text-red-600 text-sm">↗ 2%</span>
                                <span className="text-gray-500 text-sm ml-2">vs last period</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg. Session</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">2m 34s</p>
                            </div>
                            <Clock className="w-8 h-8 text-purple-500" />
                        </div>
                        <div className="mt-4">
                            <div className="flex items-center">
                                <span className="text-green-600 text-sm">↗ 15%</span>
                                <span className="text-gray-500 text-sm ml-2">vs last period</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                            Traffic Overview
                        </h3>
                        <div className="h-64 flex items-center justify-center text-gray-500 dark:text-gray-400">
                            [Chart Placeholder - Integrate with your preferred charting library]
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                            Top Pages
                        </h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600 dark:text-gray-400">/dashboard</span>
                                <span className="text-sm font-medium text-gray-900 dark:text-white">12,345 views</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600 dark:text-gray-400">/users</span>
                                <span className="text-sm font-medium text-gray-900 dark:text-white">8,901 views</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600 dark:text-gray-400">/analytics</span>
                                <span className="text-sm font-medium text-gray-900 dark:text-white">5,678 views</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600 dark:text-gray-400">/settings</span>
                                <span className="text-sm font-medium text-gray-900 dark:text-white">3,456 views</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}