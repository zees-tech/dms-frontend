'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useToast } from '@/hooks/useToast';
import { ArrowLeft, FileText } from 'lucide-react';
import Link from 'next/link';
import RequestDetailView from '@/components/request/RequestDetailView';
import { GetPendingRequests } from '@/apiComponent/graphql/request';
import { Request } from '@/apiComponent/graphql/generated/graphql';

export default function RequestGetDetailPage() {
    const params = useParams();
    const requestId = params.Id as string;
    const [request, setRequest] = useState<Request | null>(null);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const { pushToast } = useToast();
    const { isDark } = useTheme();

    const loadRequest = useCallback(async () => {
        try {
            const { data, error } = await GetPendingRequests(0, 1, { id: { eq: requestId } });
            if (error) throw error;

            if (data?.pendingRequests?.items && data.pendingRequests.items.length > 0) {
                setRequest(data.pendingRequests.items[0] as Request);
                return;
            }

            setRequest(null);
        } catch (error) {
            pushToast({ message: 'Failed to load request details', type: 'error' });
            console.error('Error loading request:', error);
        } finally {
            setLoading(false);
        }
    }, [requestId, pushToast]);

    useEffect(() => {
        loadRequest();
    }, [requestId, loadRequest]);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'draft':
                return 'bg-gray-100 text-gray-800';
            case 'submitted':
                return 'bg-blue-100 text-blue-800';
            case 'in_review':
                return 'bg-yellow-100 text-yellow-800';
            case 'approved':
                return 'bg-green-100 text-green-800';
            case 'rejected':
                return 'bg-red-100 text-red-800';
            case 'completed':
                return 'bg-purple-100 text-purple-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'draft':
                return 'Draft';
            case 'submitted':
                return 'Submitted';
            case 'in_review':
                return 'In Review';
            case 'approved':
                return 'Approved';
            case 'rejected':
                return 'Rejected';
            case 'completed':
                return 'Completed';
            default:
                return status;
        }
    };

    const handleRequestProcessed = () => {
        // Reload the request data after processing
        loadRequest();
        pushToast({ message: 'Request processed successfully', type: 'success' });
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-64">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                    <p className={`mt-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Loading request details...</p>
                </div>
            </div>
        );
    }

    if (!request) {
        return (
            <div className="text-center py-12">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className={`text-lg font-medium ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>Request not found</h3>
                <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>The requested request could not be found.</p>
                <Link
                    href="/adm/requests/gets"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                    Back to Incoming Requests
                </Link>
            </div>
        );
    }

    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                    <Link
                        href="/adm/requests/gets"
                        className={`p-2 rounded-lg hover:${isDark ? 'bg-gray-700' : 'bg-gray-100'} ${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Incoming Request Details</h1>
                        <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>Review and process incoming request</p>
                    </div>
                </div>
                <div className="flex items-center space-x-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(request.status)}`}>
                        {getStatusText(request.status)}
                    </span>
                </div>
            </div>

            <RequestDetailView
                request={request}
                onRequestProcessed={handleRequestProcessed}
            />
        </div>
    );
}