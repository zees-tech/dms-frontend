'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useToast } from '@/hooks/useToast';
import { FileText, User, Calendar, Clock, CheckCircle, XCircle, Eye } from 'lucide-react';
import Link from 'next/link';
import { GetPendingRequests } from '@/apiComponent/graphql/request';
import { Request, RequestStatus } from '@/apiComponent/graphql/generated/graphql';
import RequestActionModal from '@/components/request/RequestActionModal';
import { ProcessRequest } from '@/apiComponent/graphql/request';

// Define a type for the partial request data that matches what the GraphQL query returns
type PartialRequest = Pick<Request,
    'id' | 'fileId' | 'userId' | 'status' | 'description' | 'expiryDate' | 'submittedAt' | 'completedAt'
> & {
    file?: {
        pathName: string;
        name: string;
        parentId?: string | null;
        contentUrl: string;
        description?: string | null;
        size: number;
        mimeType: string;
        expiry?: string | null;
        id: string;
    } | null;
    user?: {
        id: string;
        name: string;
        email: string;
        roleId: string;
        departmentId?: string | null;
        managerId?: string | null;
    } | null;
};

export default function RequestGetsPage() {
    const [requests, setRequests] = useState<PartialRequest[]>([]);
    const [loading, setLoading] = useState(true);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isActionModalOpen, setIsActionModalOpen] = useState(false);
    const [currentAction, setCurrentAction] = useState<'approve' | 'reject' | null>(null);
    const [selectedRequestId, setSelectedRequestId] = useState<string | null>(null);

    const { user } = useAuth();
    const { pushToast } = useToast();
    const { isDark } = useTheme();
    const [skip] = useState(0);
    const [take] = useState(10);

    const loadRequests = useCallback(async () => {
        try {
            // Filter for incoming requests (where current user is the target)
            const { data, error } = await GetPendingRequests(skip, take, {
                userId: { eq: user?.id }
            });
            if (error) throw error;

            setRequests(data?.pendingRequests?.items || []);
        } catch (error) {
            pushToast({ message: 'Failed to load requests', type: 'error' });
            console.error('Error loading requests:', error);
        } finally {
            setLoading(false);
        }
    }, [skip, take, user?.id, pushToast]);

    useEffect(() => {
        loadRequests();
    }, [loadRequests]);

    const getStatusIcon = (status: RequestStatus) => {
        switch (status) {
            case RequestStatus.PendingReview:
                return <Clock className="w-4 h-4 text-yellow-600" />;
            case RequestStatus.Approved:
            case RequestStatus.Completed:
                return <CheckCircle className="w-4 h-4 text-green-600" />;
            case RequestStatus.Rejected:
                return <XCircle className="w-4 h-4 text-red-600" />;
            case RequestStatus.Expired:
                return <Clock className="w-4 h-4 text-gray-600" />;
            case RequestStatus.InReview:
                return <Clock className="w-4 h-4 text-blue-600" />;
            case RequestStatus.Draft:
                return <Clock className="w-4 h-4 text-gray-600" />;
            default:
                return <Clock className="w-4 h-4 text-gray-600" />;
        }
    };

    const getStatusColor = (status: RequestStatus) => {
        switch (status) {
            case RequestStatus.PendingReview:
                return 'bg-yellow-100 text-yellow-800';
            case RequestStatus.Approved:
            case RequestStatus.Completed:
                return 'bg-green-100 text-green-800';
            case RequestStatus.Rejected:
                return 'bg-red-100 text-red-800';
            case RequestStatus.Expired:
                return 'bg-gray-100 text-gray-800';
            case RequestStatus.InReview:
                return 'bg-blue-100 text-blue-800';
            case RequestStatus.Draft:
                return 'bg-gray-100 text-gray-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusText = (status: RequestStatus) => {
        switch (status) {
            case RequestStatus.PendingReview:
                return 'Pending Review';
            case RequestStatus.Approved:
                return 'Approved';
            case RequestStatus.Rejected:
                return 'Rejected';
            case RequestStatus.Expired:
                return 'Expired';
            case RequestStatus.Draft:
                return 'Draft';
            case RequestStatus.InReview:
                return 'In Review';
            case RequestStatus.Completed:
                return 'Completed';
            case RequestStatus.Processing:
                return 'Processing';
            case RequestStatus.Processed:
                return 'Processed';
            case RequestStatus.ChangesRequested:
                return 'Changes Requested';
            case RequestStatus.Archived:
                return 'Archived';
            default:
                return status;
        }
    };

    const handleOpenActionModal = (action: 'approve' | 'reject', requestId: string) => {
        setCurrentAction(action);
        setSelectedRequestId(requestId);
        setIsActionModalOpen(true);
    };

    const handleCloseActionModal = () => {
        if (!isProcessing) {
            setIsActionModalOpen(false);
            setCurrentAction(null);
            setSelectedRequestId(null);
        }
    };

    const handleSubmitAction = async (comment: string) => {
        if (isProcessing || !currentAction || !selectedRequestId) return;

        setIsProcessing(true);

        try {
            const { data, error } = await ProcessRequest(
                selectedRequestId,
                currentAction,
                comment || null,
                currentAction === 'reject' ? comment || null : null
            );

            if (error) {
                console.error(`Failed to ${currentAction} request:`, error);
                pushToast({ message: `Failed to ${currentAction} request. Please try again.`, type: 'error' });
                return;
            }

            if (data?.processRequest) {
                pushToast({ message: `Request ${currentAction}d successfully`, type: 'success' });
                loadRequests();
                handleCloseActionModal();
            }
        } catch (error) {
            console.error(`Error ${currentAction}ing request:`, error);
            pushToast({ message: `An error occurred while ${currentAction}ing the request.`, type: 'error' });
        } finally {
            setIsProcessing(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-64">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                    <p className={`mt-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Loading requests...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Incoming Requests</h1>
                    <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>Manage requests sent to you</p>
                </div>
            </div>

            {/* Requests Table */}
            <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg border overflow-hidden`}>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className={isDark ? 'bg-gray-700' : 'bg-gray-50'}>
                            <tr>
                                <th className={`px-6 py-3 text-left text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                                    File
                                </th>
                                <th className={`px-6 py-3 text-left text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                                    Requester
                                </th>
                                <th className={`px-6 py-3 text-left text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                                    Status
                                </th>
                                <th className={`px-6 py-3 text-left text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                                    Description
                                </th>
                                <th className={`px-6 py-3 text-left text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                                    Submitted
                                </th>
                                <th className={`sticky right-0 px-6 py-3 text-left text-xs font-medium ${isDark ? 'text-gray-300 bg-gray-700' : 'text-gray-500 bg-gray-50'} uppercase tracking-wider border-l ${isDark ? 'border-gray-600' : 'border-gray-200'}`}>
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className={`${isDark ? 'bg-gray-800' : 'bg-white'} divide-y ${isDark ? 'divide-gray-700' : 'divide-gray-200'}`}>
                            {requests.map((request) => (
                                <tr key={request.id} className={`group hover:${isDark ? 'bg-gray-700' : 'bg-gray-50'} transition-colors`}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <FileText className="w-5 h-5 text-gray-400 mr-3" />
                                            <div>
                                                <div className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                                    {request.file?.name || 'Unknown File'}
                                                </div>
                                                <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
                                                    {request.file?.pathName}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <User className="w-4 h-4 text-gray-400 mr-2" />
                                            <div>
                                                <div className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                                    {request.user?.name || 'Unknown User'}
                                                </div>
                                                <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
                                                    {request.user?.email}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            {getStatusIcon(request.status)}
                                            <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                                                {getStatusText(request.status)}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-900'} max-w-xs truncate`}>
                                            {request.description || 'No description'}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                                            <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
                                                {new Date(request.submittedAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </td>
                                    <td className={`sticky right-0 px-6 py-4 whitespace-nowrap text-sm font-medium ${isDark ? 'bg-gray-800 group-hover:bg-gray-700' : 'bg-white group-hover:bg-gray-50'} border-l ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                                        <div className="flex items-center space-x-3">
                                            <Link
                                                href={`/adm/requests/gets/${request.id}`}
                                                className="text-blue-600 hover:text-blue-900 flex items-center"
                                            >
                                                <Eye className="w-4 h-4 mr-1" />
                                                View
                                            </Link>
                                            {request.status === RequestStatus.PendingReview && (
                                                <>
                                                    <button
                                                        onClick={() => handleOpenActionModal('approve', request.id)}
                                                        disabled={isProcessing}
                                                        className={`${isProcessing ? 'text-green-400 cursor-not-allowed' : 'text-green-600 hover:text-green-900'}`}
                                                    >
                                                        Approve
                                                    </button>
                                                    <button
                                                        onClick={() => handleOpenActionModal('reject', request.id)}
                                                        disabled={isProcessing}
                                                        className={`${isProcessing ? 'text-red-400 cursor-not-allowed' : 'text-red-600 hover:text-red-900'}`}
                                                    >
                                                        Reject
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {requests.length === 0 && (
                <div className="text-center py-12">
                    <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className={`text-lg font-medium ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>No incoming requests found</h3>
                </div>
            )}

            {/* Request Action Modal */}
            {currentAction && (
                <RequestActionModal
                    isOpen={isActionModalOpen}
                    onClose={handleCloseActionModal}
                    onSubmit={handleSubmitAction}
                    action={currentAction}
                    isLoading={isProcessing}
                />
            )}
        </div>
    );
}