'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useToast } from '@/hooks/useToast';
import { Plus, Search, Filter, Download, FileText } from 'lucide-react';
import Link from 'next/link';
import RequestCard from '@/components/request/RequestCard';
import { GetPendingRequests } from '@/apiComponent/graphql/request';
import { Request } from '@/apiComponent/graphql/generated/graphql';

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

export default function RequestSetsPage() {
  const [requests, setRequests] = useState<PartialRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const { user } = useAuth();
  const { pushToast } = useToast();
  const { isDark } = useTheme();
  const [skip, setSkip] = useState(0);
  const [take, setTake] = useState(10);
  const [hasMore, setHsMore] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  const loadRequests = useCallback(async () => {
    try {

      const { data, error } = await GetPendingRequests(skip, take);
      if (error) throw error;

      const mockRequests: Request[] = [];

      setHsMore(data?.pendingRequests?.pageInfo?.hasNextPage || false);
      setTotalCount(data?.pendingRequests?.totalCount || 0);


      setRequests(data?.pendingRequests?.items || mockRequests);
    } catch (error) {
      pushToast({ message: 'Failed to load requests', type: 'error' });
      console.error('Error loading requests:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadRequests();
  }, [loadRequests]);


  const filteredRequests = requests.filter(request => {
    const matchesSearch =
      request.file?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.description?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || request.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

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

  const getProgressPercentage = (currentStep: number, totalSteps: number) => {
    return Math.round((currentStep / totalSteps) * 100);
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
          <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Requests</h1>
          <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>Manage pending requests created</p>
        </div>
      </div>

      {/* Requests Grid */}
      <div className="grid gap-6">
        {filteredRequests.map((request) => (
          <RequestCard
            key={request.id}
            id={request.id}
            fileName={request.file?.name}
            filePath={request.file?.pathName}
            targetUserName={request.user?.name}
            targetUserEmail={request.user?.email}
            requesterName={user?.name || 'Current User'}
            requesterEmail={user?.email || 'user@example.com'}
            status={request.status}
            description={request.description || ''}
            submittedAt={request.submittedAt}
            type="outgoing"
            currentStep={0}
            totalSteps={0}
          />
        ))}
      </div>

      {filteredRequests.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className={`text-lg font-medium ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>No requests found</h3>
        </div>
      )}
    </div>
  );
}
