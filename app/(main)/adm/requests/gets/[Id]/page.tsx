'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { ProcessRequest } from '@/apiComponent/graphql/request';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/useToast';
import { ArrowLeft, CheckCircle, XCircle, Clock, User, FileText, Calendar, MessageSquare } from 'lucide-react';
import Link from 'next/link';

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
  steps: RequestStep[];
  comments: Comment[];
}

interface RequestStep {
  id: string;
  stepNumber: number;
  stepName: string;
  status: 'pending' | 'approved' | 'rejected' | 'expired';
  assignedToId: string;
  assignedToName: string;
  startedAt: string | null;
  completedAt: string | null;
  comments: string | null;
}

interface Comment {
  id: string;
  userId: string;
  userName: string;
  content: string;
  createdAt: string;
}

export default function RequestDetailPage() {
  const params = useParams();
  const requestId = params.Id as string;
  const [request, setRequest] = useState<Request | null>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [comment, setComment] = useState('');
  const { user } = useAuth();
  const { pushToast } = useToast();

  useEffect(() => {
    loadRequest();
  }, [requestId]);

  const loadRequest = async () => {
    try {
      // Mock data for demonstration - replace with actual API call
      const mockRequest: Request = {
        id: requestId,
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
        description: 'Request for access to quarterly financial report for budget analysis and planning purposes.',
        expiryDate: '2024-12-15',
        submittedAt: '2024-11-01T10:00:00Z',
        completedAt: null,
        steps: [
          {
            id: 'step-1',
            stepNumber: 1,
            stepName: 'Manager Review',
            status: 'approved',
            assignedToId: 'manager-1',
            assignedToName: 'Jane Doe',
            startedAt: '2024-11-01T11:00:00Z',
            completedAt: '2024-11-01T14:30:00Z',
            comments: 'Approved for budget analysis purposes.'
          },
          {
            id: 'step-2',
            stepNumber: 2,
            stepName: 'Department Head',
            status: 'pending',
            assignedToId: 'dept-head-1',
            assignedToName: 'Robert Johnson',
            startedAt: '2024-11-01T14:30:00Z',
            completedAt: null,
            comments: null
          }
        ],
        comments: [
          {
            id: 'comment-1',
            userId: 'manager-1',
            userName: 'Jane Doe',
            content: 'This request appears to be for legitimate business purposes. The quarterly report contains sensitive financial data but access is justified for budget planning.',
            createdAt: '2024-11-01T14:25:00Z'
          }
        ]
      };
      
      setRequest(mockRequest);
    } catch (error) {
      pushToast({ message: 'Failed to load request details', type: 'error' });
      console.error('Error loading request:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleProcessRequest = async (action: 'approve' | 'reject') => {
    if (!request) return;
    
    setProcessing(true);
    try {
      const { data, error } = await ProcessRequest(request.id, action, comment);
      if (error) throw error;
      
      pushToast({ message: `Request ${action}d successfully`, type: 'success' });
      // Reload request to get updated status
      loadRequest();
      setComment('');
    } catch (error) {
      pushToast({ message: `Failed to ${action} request`, type: 'error' });
    } finally {
      setProcessing(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case 'approved':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'expired':
        return <Clock className="w-5 h-5 text-gray-600" />;
      default:
        return <Clock className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'expired':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading request details...</p>
        </div>
      </div>
    );
  }

  if (!request) {
    return (
      <div className="text-center py-12">
        <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Request not found</h3>
        <p className="text-gray-600 mb-4">The requested request could not be found.</p>
        <Link
          href="/adm/requests/gets"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Back to Requests
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
            className="text-gray-600 hover:text-gray-900 p-2 rounded-lg hover:bg-gray-100"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Request Details</h1>
            <p className="text-gray-600">Review and process access request</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {getStatusIcon(request.status)}
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(request.status)}`}>
            {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Request Information */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Request Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Document</label>
                <p className="mt-1 text-gray-900 font-medium">{request.file.name}</p>
                <p className="text-sm text-gray-600">{request.file.pathName}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">File Type</label>
                <p className="mt-1 text-gray-900">{request.file.mimeType}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">File Size</label>
                <p className="mt-1 text-gray-900">{(request.file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Expiry Date</label>
                <p className="mt-1 text-gray-900">{new Date(request.file.expiry).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="mt-4">
              <label className="text-sm font-medium text-gray-700">Request Description</label>
              <p className="mt-1 text-gray-900">{request.description}</p>
            </div>
          </div>

          {/* Approval Steps */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Approval Steps</h2>
            <div className="space-y-4">
              {request.steps.map((step) => (
                <div key={step.id} className="flex items-start space-x-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium ${
                    step.status === 'approved' ? 'bg-green-500' :
                    step.status === 'rejected' ? 'bg-red-500' :
                    step.status === 'pending' ? 'bg-yellow-500' : 'bg-gray-400'
                  }`}>
                    {step.stepNumber}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900">{step.stepName}</h3>
                        <p className="text-sm text-gray-600">Assigned to: {step.assignedToName}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        step.status === 'approved' ? 'bg-green-100 text-green-800' :
                        step.status === 'rejected' ? 'bg-red-100 text-red-800' :
                        step.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {step.status.charAt(0).toUpperCase() + step.status.slice(1)}
                      </span>
                    </div>
                    {step.comments && (
                      <div className="mt-2 p-3 bg-gray-50 rounded">
                        <p className="text-sm text-gray-700">{step.comments}</p>
                      </div>
                    )}
                    <div className="mt-2 text-xs text-gray-500">
                      {step.startedAt && `Started: ${new Date(step.startedAt).toLocaleString()}`}
                      {step.completedAt && ` • Completed: ${new Date(step.completedAt).toLocaleString()}`}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Comments */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Comments</h2>
            <div className="space-y-4">
              {request.comments.map((comment) => (
                <div key={comment.id} className="flex space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-gray-900">{comment.userName}</span>
                      <span className="text-sm text-gray-500">
                        {new Date(comment.createdAt).toLocaleString()}
                      </span>
                    </div>
                    <p className="mt-1 text-gray-700">{comment.content}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Add Comment */}
            <div className="mt-6">
              <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
                Add Comment
              </label>
              <textarea
                id="comment"
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Add your comments here..."
              />
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Requester Information */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Requester</h2>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="font-medium text-gray-900">{request.user.name}</div>
                <div className="text-sm text-gray-600">{request.user.email}</div>
                <div className="text-sm text-gray-500">User ID: {request.user.id}</div>
              </div>
            </div>
          </div>

          {/* Request Timeline */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Timeline</h2>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Calendar className="w-4 h-4 text-gray-400" />
                <div>
                  <div className="text-sm font-medium text-gray-900">Submitted</div>
                  <div className="text-sm text-gray-600">
                    {new Date(request.submittedAt).toLocaleString()}
                  </div>
                </div>
              </div>
              {request.expiryDate && (
                <div className="flex items-center space-x-3">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">Expires</div>
                    <div className="text-sm text-gray-600">
                      {new Date(request.expiryDate).toLocaleString()}
                    </div>
                  </div>
                </div>
              )}
              {request.completedAt && (
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-4 h-4 text-gray-400" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">Completed</div>
                    <div className="text-sm text-gray-600">
                      {new Date(request.completedAt).toLocaleString()}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          {request.status === 'pending' && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Actions</h2>
              <div className="space-y-3">
                <button
                  onClick={() => handleProcessRequest('approve')}
                  disabled={processing}
                  className="w-full bg-green-600 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 hover:bg-green-700 disabled:opacity-50"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Approve Request</span>
                </button>
                <button
                  onClick={() => handleProcessRequest('reject')}
                  disabled={processing}
                  className="w-full bg-red-600 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 hover:bg-red-700 disabled:opacity-50"
                >
                  <XCircle className="w-4 h-4" />
                  <span>Reject Request</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
