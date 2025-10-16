'use client';

import React, { useState } from 'react';
import {
    FileText,
    FolderOpen,
    AlertTriangle,
    CheckCircle,
    Clock,
    Archive,
    Search,
    Filter,
    Download,
    Eye,
    MoreVertical,
    Folder,
    File,
    ArrowLeft,
    Home
} from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';

type ColorType = 'blue' | 'red' | 'yellow' | 'green' | 'gray' | 'purple' | 'pink' | 'indigo' | 'teal';
type StatusType = 'active' | 'expired' | 'expiring';

interface Document {
    id: number;
    name: string;
    size: string;
    date: string;
    status: StatusType;
}

interface FolderType {
    id: number;
    name: string;
    count: number;
    size: string;
    color: ColorType;
    documents: Document[];
    parentId?: number;
}

export default function DocumentManagementDashboard() {
    const [searchQuery, setSearchQuery] = useState('');
    const [currentFolder, setCurrentFolder] = useState<FolderType | null>(null);
    const [breadcrumb, setBreadcrumb] = useState<FolderType[]>([]);

    const stats = [
        {
            title: 'Total Documents',
            value: '2,847',
            change: '+156 this month',
            icon: FileText,
            color: 'blue' as ColorType,
            trend: 'up'
        },
        {
            title: 'Expired Documents',
            value: '24',
            change: 'Requires attention',
            icon: AlertTriangle,
            color: 'red' as ColorType,
            trend: 'alert'
        },
        {
            title: 'Expiring Soon',
            value: '67',
            change: 'Next 30 days',
            icon: Clock,
            color: 'yellow' as ColorType,
            trend: 'warning'
        },
        {
            title: 'Active Documents',
            value: '2,756',
            change: '96.8% of total',
            icon: CheckCircle,
            color: 'green' as ColorType,
            trend: 'up'
        },
        {
            title: 'Archived',
            value: '342',
            change: '+12 this month',
            icon: Archive,
            color: 'gray' as ColorType,
            trend: 'neutral'
        },
        {
            title: 'Total Folders',
            value: '48',
            change: '12 categories',
            icon: FolderOpen,
            color: 'purple' as ColorType,
            trend: 'neutral'
        }
    ];

    const folders: FolderType[] = [
        {
            id: 1,
            name: 'Contracts',
            count: 234,
            size: '1.2 GB',
            color: 'blue' as ColorType,
            documents: [
                { id: 1, name: 'Employment_Contract_2024.pdf', size: '2.4 MB', date: '2024-10-05', status: 'active' as StatusType },
                { id: 2, name: 'Vendor_Agreement_ABC.pdf', size: '1.8 MB', date: '2024-09-28', status: 'active' as StatusType },
                { id: 3, name: 'NDA_Template.docx', size: '0.5 MB', date: '2024-10-01', status: 'active' as StatusType },
                { id: 4, name: 'Service_Agreement.pdf', size: '3.2 MB', date: '2024-08-15', status: 'expired' as StatusType }
            ]
        },
        {
            id: 2,
            name: 'Invoices',
            count: 456,
            size: '890 MB',
            color: 'green',
            documents: [
                { id: 5, name: 'Invoice_INV-2024-001.pdf', size: '0.8 MB', date: '2024-10-08', status: 'active' },
                { id: 6, name: 'Invoice_INV-2024-002.pdf', size: '0.9 MB', date: '2024-10-07', status: 'active' },
                { id: 7, name: 'Tax_Invoice_Q3.pdf', size: '1.2 MB', date: '2024-09-30', status: 'active' }
            ]
        },
        {
            id: 3,
            name: 'Legal Documents',
            count: 189,
            size: '2.1 GB',
            color: 'red',
            documents: [
                { id: 8, name: 'Company_Policy_2024.pdf', size: '5.6 MB', date: '2024-01-15', status: 'expiring' },
                { id: 9, name: 'Privacy_Policy.pdf', size: '2.1 MB', date: '2024-03-20', status: 'active' },
                { id: 10, name: 'Terms_of_Service.pdf', size: '1.9 MB', date: '2024-06-10', status: 'active' }
            ]
        },
        {
            id: 4,
            name: 'HR Documents',
            count: 567,
            size: '1.5 GB',
            color: 'purple',
            documents: [
                { id: 11, name: 'Employee_Handbook.pdf', size: '8.2 MB', date: '2024-01-01', status: 'active' },
                { id: 12, name: 'Leave_Application_Form.docx', size: '0.3 MB', date: '2024-10-05', status: 'active' },
                { id: 13, name: 'Performance_Review_Template.xlsx', size: '1.1 MB', date: '2024-09-15', status: 'active' }
            ]
        },
        {
            id: 5,
            name: 'Financial Reports',
            count: 234,
            size: '3.4 GB',
            color: 'yellow',
            documents: [
                { id: 14, name: 'Q3_Financial_Report.pdf', size: '12.5 MB', date: '2024-09-30', status: 'active' },
                { id: 15, name: 'Annual_Budget_2024.xlsx', size: '4.8 MB', date: '2024-01-10', status: 'active' },
                { id: 16, name: 'Expense_Report_Sept.pdf', size: '2.3 MB', date: '2024-09-28', status: 'active' }
            ]
        },
        {
            id: 6,
            name: 'Marketing Materials',
            count: 345,
            size: '5.2 GB',
            color: 'pink',
            documents: [
                { id: 17, name: 'Brand_Guidelines.pdf', size: '25.6 MB', date: '2024-02-15', status: 'active' },
                { id: 18, name: 'Campaign_Proposal.pptx', size: '15.2 MB', date: '2024-10-01', status: 'active' },
                { id: 19, name: 'Social_Media_Calendar.xlsx', size: '0.8 MB', date: '2024-10-08', status: 'active' }
            ]
        },
        {
            id: 7,
            name: 'Technical Documentation',
            count: 423,
            size: '2.8 GB',
            color: 'indigo',
            documents: [
                { id: 20, name: 'API_Documentation.pdf', size: '6.4 MB', date: '2024-09-20', status: 'active' },
                { id: 21, name: 'System_Architecture.pdf', size: '8.9 MB', date: '2024-08-15', status: 'active' },
                { id: 22, name: 'User_Manual_v2.pdf', size: '4.2 MB', date: '2024-10-03', status: 'active' }
            ]
        },
        {
            id: 8,
            name: 'Client Documents',
            count: 289,
            size: '1.9 GB',
            color: 'teal',
            documents: [
                { id: 23, name: 'Client_Proposal_XYZ.pdf', size: '3.5 MB', date: '2024-10-06', status: 'active' },
                { id: 24, name: 'Project_Scope_ABC.docx', size: '1.2 MB', date: '2024-09-25', status: 'active' },
                { id: 25, name: 'Meeting_Minutes_Oct.pdf', size: '0.6 MB', date: '2024-10-09', status: 'active' }
            ]
        }
    ];

    const getColorClasses = (color: ColorType): string => {
        const colors: Record<ColorType, string> = {
            blue: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
            red: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400',
            yellow: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400',
            green: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
            gray: 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400',
            purple: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
            pink: 'bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400',
            indigo: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400',
            teal: 'bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400'
        };
        return colors[color] || colors.gray;
    };

    const getStatusBadge = (status: StatusType): string => {
        const badges: Record<StatusType, string> = {
            active: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
            expired: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
            expiring: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
        };
        return badges[status] || badges.active;
    };

    const filteredFolders = folders.filter(folder =>
        folder.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleFolderClick = (folder: FolderType) => {
        setCurrentFolder(folder);
        setBreadcrumb([...breadcrumb, folder]);
    };

    const handleBackClick = () => {
        if (breadcrumb.length > 0) {
            const newBreadcrumb = breadcrumb.slice(0, -1);
            setBreadcrumb(newBreadcrumb);
            setCurrentFolder(newBreadcrumb.length > 0 ? newBreadcrumb[newBreadcrumb.length - 1] : null);
        }
    };

    const handleHomeClick = () => {
        setCurrentFolder(null);
        setBreadcrumb([]);
    };

    const handleBreadcrumbClick = (index: number) => {
        const newBreadcrumb = breadcrumb.slice(0, index + 1);
        setBreadcrumb(newBreadcrumb);
        setCurrentFolder(newBreadcrumb[newBreadcrumb.length - 1]);
    };

    return (
        <DashboardLayout>
            <div className="mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            Document Management System
                        </h1>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            Manage and organize all your documents in one place
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        {/* Search Input */}
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-64 pl-9 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                            />
                        </div>
                        {/* Upload Button */}
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                            <FileText className="w-4 h-4" />
                            Upload Document
                        </button>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
                        >
                            <div className="flex items-center justify-between mb-3">
                                <div className={`p-2 rounded-lg ${getColorClasses(stat.color)}`}>
                                    <stat.icon className="w-5 h-5" />
                                </div>
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {stat.value}
                                </p>
                                <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mt-1">
                                    {stat.title}
                                </p>
                                <p className={`text-xs mt-2 ${stat.trend === 'up' ? 'text-green-600 dark:text-green-400' :
                                    stat.trend === 'alert' ? 'text-red-600 dark:text-red-400' :
                                        stat.trend === 'warning' ? 'text-yellow-600 dark:text-yellow-400' :
                                            'text-gray-500 dark:text-gray-500'
                                    }`}>
                                    {stat.change}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>



                {/* Document Folders Container */}
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                    {/* Navigation Header */}
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                                {currentFolder ? currentFolder.name : 'Document Folders'}
                            </h2>
                            {currentFolder && (
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={handleBackClick}
                                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                                        title="Go back"
                                    >
                                        <ArrowLeft className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                                    </button>
                                    <button
                                        onClick={handleHomeClick}
                                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                                        title="Go to root"
                                    >
                                        <Home className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Breadcrumb */}
                        {breadcrumb.length > 0 && (
                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                <button
                                    onClick={handleHomeClick}
                                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                >
                                    Home
                                </button>
                                {breadcrumb.map((folder, index) => (
                                    <React.Fragment key={folder.id}>
                                        <span>/</span>
                                        <button
                                            onClick={() => handleBreadcrumbClick(index)}
                                            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                        >
                                            {folder.name}
                                        </button>
                                    </React.Fragment>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Folder Grid or Document List */}
                    {!currentFolder ? (
                        // Show folders when not inside any folder
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {filteredFolders.map((folder) => (
                                <div
                                    key={folder.id}
                                    onClick={() => handleFolderClick(folder)}
                                    className="p-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-500 dark:hover:border-blue-500 cursor-pointer transition-all hover:shadow-md"
                                >
                                    <div className="flex items-start justify-between mb-3">
                                        <div className={`p-2 rounded-lg ${getColorClasses(folder.color)}`}>
                                            <Folder className="w-6 h-6" />
                                        </div>
                                        <button
                                            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <MoreVertical className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                                        {folder.name}
                                    </h3>
                                    <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                                        <span>{folder.count} files</span>
                                        <span>{folder.size}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        // Show documents when inside a folder
                        <div className="space-y-2">
                            {currentFolder.documents.map((doc: Document) => (
                                <div
                                    key={doc.id}
                                    className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                                >
                                    <div className="flex items-center gap-3 flex-1">
                                        <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                                            <File className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium text-gray-900 dark:text-white truncate">
                                                {doc.name}
                                            </p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                {doc.size} • {doc.date}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(doc.status)}`}>
                                            {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                                        </span>
                                        <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors">
                                            <Eye className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                                        </button>
                                        <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors">
                                            <Download className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                            {currentFolder.documents.length === 0 && (
                                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                                    <File className="w-16 h-16 mx-auto mb-2" />
                                    <p className="text-sm">This folder is empty</p>
                                    <p className="text-xs mt-1">No documents found in this folder</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
}