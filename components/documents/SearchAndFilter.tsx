'use client';

import { useState } from 'react';
import { Search, X, Filter } from 'lucide-react';

interface SearchAndFilterProps {
    onSearch: (query: string) => void;
    onFilter: (filters: {
        fileType?: string;
        dateRange?: string;
        size?: string;
    }) => void;
    totalResults?: number;
}

export default function SearchAndFilter({ onSearch, onFilter, totalResults }: SearchAndFilterProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [filters, setFilters] = useState({
        fileType: '',
        dateRange: '',
        size: '',
    });

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        onSearch(query);
    };

    const handleFilterChange = (key: string, value: string) => {
        const newFilters = { ...filters, [key]: value };
        setFilters(newFilters);
        onFilter(newFilters);
    };

    const clearFilters = () => {
        const clearedFilters = { fileType: '', dateRange: '', size: '' };
        setFilters(clearedFilters);
        onFilter(clearedFilters);
    };

    const hasActiveFilters = Object.values(filters).some(value => value !== '');

    return (
        <div className="space-y-4">
            {/* Search Bar */}
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="w-5 h-5 text-gray-400" />
                </div>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    placeholder="Search files and folders..."
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                {searchQuery && (
                    <button
                        onClick={() => handleSearch('')}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                        <X className="w-5 h-5" />
                    </button>
                )}
            </div>

            {/* Filter Controls */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                        className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${hasActiveFilters || isFilterOpen
                            ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                            }`}
                    >
                        <Filter className="w-4 h-4" />
                        Filters
                        {hasActiveFilters && (
                            <span className="inline-flex items-center justify-center w-5 h-5 text-xs bg-blue-500 text-white rounded-full">
                                {Object.values(filters).filter(v => v !== '').length}
                            </span>
                        )}
                    </button>

                    {hasActiveFilters && (
                        <button
                            onClick={clearFilters}
                            className="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                        >
                            Clear all
                        </button>
                    )}
                </div>

                {totalResults !== undefined && (
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                        {totalResults} result{totalResults !== 1 ? 's' : ''}
                    </div>
                )}
            </div>

            {/* Filter Panel */}
            {isFilterOpen && (
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* File Type Filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                File Type
                            </label>
                            <select
                                value={filters.fileType}
                                onChange={(e) => handleFilterChange('fileType', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="">All types</option>
                                <option value="pdf">PDF Documents</option>
                                <option value="image">Images</option>
                                <option value="document">Documents</option>
                                <option value="spreadsheet">Spreadsheets</option>
                                <option value="video">Videos</option>
                                <option value="audio">Audio</option>
                            </select>
                        </div>

                        {/* Date Range Filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Date Modified
                            </label>
                            <select
                                value={filters.dateRange}
                                onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="">Any time</option>
                                <option value="today">Today</option>
                                <option value="week">This week</option>
                                <option value="month">This month</option>
                                <option value="year">This year</option>
                            </select>
                        </div>

                        {/* Size Filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                File Size
                            </label>
                            <select
                                value={filters.size}
                                onChange={(e) => handleFilterChange('size', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="">Any size</option>
                                <option value="small">Small (&lt; 1MB)</option>
                                <option value="medium">Medium (1-10MB)</option>
                                <option value="large">Large (&gt; 10MB)</option>
                            </select>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}