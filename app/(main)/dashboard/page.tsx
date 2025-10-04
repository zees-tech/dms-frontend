import DashboardLayout from '@/components/layout/DashboardLayout';
import { useTheme } from '@/contexts/ThemeContext';

export default function DashboardPage() {
    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Dashboard
                    </h1>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                        Welcome back! Here&#39;s what&#39;s happening.
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Users</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">1,234</p>
                            </div>
                            <div className="text-3xl">👥</div>
                        </div>
                        <p className="text-xs text-green-600 dark:text-green-400 mt-2">+12% from last month</p>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Revenue</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">$12,345</p>
                            </div>
                            <div className="text-3xl">💰</div>
                        </div>
                        <p className="text-xs text-green-600 dark:text-green-400 mt-2">+8% from last month</p>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Orders</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">567</p>
                            </div>
                            <div className="text-3xl">📦</div>
                        </div>
                        <p className="text-xs text-red-600 dark:text-red-400 mt-2">-3% from last month</p>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Growth</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">23%</p>
                            </div>
                            <div className="text-3xl">📈</div>
                        </div>
                        <p className="text-xs text-green-600 dark:text-green-400 mt-2">+5% from last month</p>
                    </div>
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                            Recent Activity
                        </h3>
                        <div className="space-y-4">
                            <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                <span className="text-sm text-gray-600 dark:text-gray-400">New user registered</span>
                                <span className="text-xs text-gray-500 dark:text-gray-500 ml-auto">2 min ago</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <span className="text-sm text-gray-600 dark:text-gray-400">Order completed</span>
                                <span className="text-xs text-gray-500 dark:text-gray-500 ml-auto">5 min ago</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                                <span className="text-sm text-gray-600 dark:text-gray-400">Payment pending</span>
                                <span className="text-xs text-gray-500 dark:text-gray-500 ml-auto">10 min ago</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                            Quick Actions
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            <button className="p-4 text-left rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700">
                                <div className="text-2xl mb-2">➕</div>
                                <div className="text-sm font-medium text-gray-900 dark:text-white">Add User</div>
                            </button>
                            <button className="p-4 text-left rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700">
                                <div className="text-2xl mb-2">📊</div>
                                <div className="text-sm font-medium text-gray-900 dark:text-white">View Reports</div>
                            </button>
                            <button className="p-4 text-left rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700">
                                <div className="text-2xl mb-2">⚙️</div>
                                <div className="text-sm font-medium text-gray-900 dark:text-white">Settings</div>
                            </button>
                            <button className="p-4 text-left rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700">
                                <div className="text-2xl mb-2">💬</div>
                                <div className="text-sm font-medium text-gray-900 dark:text-white">Support</div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}