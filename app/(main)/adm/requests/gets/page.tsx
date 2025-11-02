'use client';

import { useState, useEffect } from 'react';
import { GetPendingRequests } from '@/apiComponent/graphql/request';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/useToast';
import { Search, Filter, Download } from 'lucide-react';
import RequestCard from '@/components/request/RequestCard';

interface Request {
  id: string;
  fileId: string;
  file: {
    pathName: string;
    name: string;
    parentId: string;
    contentUrl: string;
    description: string;
    size: number;
    mimeType: string;
    expiry: string;
    id: string;
  };
  user: {
    id: string;
    name: string;
    email: string;
    roleId: string;
    departmentId: string;
    managerId: string;
  };
  userId: string;
  status: 'pending' | 'approved' | 'rejected' | 'expired';
  description: string;
  expiryDate: string;
  submittedAt: string;
  completedAt: string | null;
}

export default function RequestGetsPage() {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const { user } = useAuth();
  const { pushToast } = useToast();

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    try {
      const { data, error } = await GetPendingRequests(0, 50);
      if (error) throw error;
      
      // Mock data for demonstration - replace with actual API response
      const mockRequests: Request[] = [
        {
          id: '1',
          fileId: 'file-1',
          file: {
            pathName: '/documents/quarterly-report.pdf',
            name: 'Quarterly Report Q3 2024',
            parentId: 'folder-1',
            contentUrl: 'https://example.com/file1',
            description: 'Quarterly financial report',
            size: 2048576,
            mimeType: 'application/pdf',
            expiry: '2024-12-31',
            id: 'file-1'
          },
          user: {
            id: 'user-1',
            name: 'John Smith',
            email: 'john.smith@company.com',
            roleId: 'user',
            departmentId: 'dept-1',
            managerId: 'manager-1'
          },
          userId: 'user-1',
          status: 'pending',
          description: 'Request for access to quarterly financial report',
          expiryDate: '2024-12-15',
          submittedAt: '2024-11-01T10:00:00Z',
          completedAt: null
        },
        {
          id: '2',
          fileId: 'file-2',
          file: {
            pathName: '/documents/budget-proposal.xlsx',
            name: 'Budget Proposal 2025',
            parentId: 'folder-2',
            contentUrl: 'https://example.com/file2',
            description: 'Annual budget proposal',
            size: 1048576,
            mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            expiry: '2025-01-31',
            id: 'file-2'
          },
          user: {
            id: 'user-2',
            name: 'Sarah Johnson',
            email: 'sarah.johnson@company.com',
            roleId: 'user',
            departmentId: 'dept-2',
            managerId: 'manager-2'
          },
          userId: 'user-2',
          status: 'approved',
          description: 'Access request for budget planning',
          expiryDate: '2024-12-20',
          submittedAt: '2024-10-28T14:30:00Z',
          completedAt: '2024-10-29T09:15:00Z'
        },
        {
          id: '3',
          fileId: 'file-3',
          file: {
            pathName: '/documents/confidential/employee-data.csv',
            name: 'Employee Data',
            parentId: 'folder-3',
            contentUrl: 'https://example.com/file3',
            description: 'Confidential employee information',
            size: 524288,
            mimeType: 'text/csv',
            expiry: '2024-12-31',
            id: 'file-3'
          },
          user: {
            id: 'user-3',
            name: 'Mike Wilson',
            email: 'mike.wilson@company.com',
            roleId: 'user',
            departmentId: 'dept-3',
            managerId: 'manager-3'
          },
          userId: 'user-3',
          status: 'rejected',
          description: 'Request for HR data access',
          expiryDate: '2024-11-30',
          submittedAt: '2024-10-25T16:45:00Z',
          completedAt: '2024-10-26T11:20:00Z'
        }
      ];
      
      setRequests(mockRequests);
    } catch (error) {
      pushToast({ message: 'Failed to load requests', type: 'error' });
      console.error('Error loading requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredRequests = requests.filter(request => {
    const matchesSearch = 
      request.file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });


  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading requests...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Incoming Requests</h1>
          <p className="text-gray-600">Manage and review access requests</p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search requests..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
                <option value="expired">Expired</option>
              </select>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>
        </div>
      </div>

      {/* Requests Grid */}
      <div className="grid gap-6">
        {filteredRequests.map((request) => (
          <RequestCard
            key={request.id}
            id={request.id}
            fileName={request.file.name}
            filePath={request.file.pathName}
            requesterName={request.user.name}
            requesterEmail={request.user.email}
            status={request.status}
            description={request.description}
            submittedAt={request.submittedAt}
            type="incoming"
          />
        ))}
      </div>

      {filteredRequests.length === 0 && (
        <div className="text-center py-12">
          <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No requests found</h3>
          <p className="text-gray-600">
            {searchTerm || statusFilter !== 'all' 
              ? 'Try adjusting your search or filters' 
              : 'No incoming requests at the moment'
            }
          </p>
        </div>
      )}
    </div>
  );
}
