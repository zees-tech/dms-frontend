'use client';

import { useState } from 'react';
import { User, FileText, Calendar, Clock, CheckCircle, XCircle } from 'lucide-react';
import Link from 'next/link';
import { useTheme } from '@/contexts/ThemeContext';
import { colorSchemes } from '@/lib/theme';
import { RequestStatus } from '@/apiComponent/graphql/generated/graphql';
import { ProcessRequest } from '@/apiComponent/graphql/request';
import RequestActionModal from './RequestActionModal';

interface RequestCardProps {
  id: string;
  fileName?: string;
  filePath?: string;
  targetUserName?: string;
  targetUserEmail?: string;
  requesterName: string;
  requesterEmail: string;
  status: RequestStatus
  description: string;
  submittedAt: string;
  type: 'incoming' | 'outgoing';
  onRequestProcessed?: () => void;
}

export default function RequestCard({
  id,
  fileName,
  filePath,
  requesterName,
  requesterEmail,
  status,
  description,
  submittedAt,
  type,
  targetUserName,
  targetUserEmail,
  onRequestProcessed
}: RequestCardProps) {
  const { colorScheme, isDark } = useTheme();
  const colors = colorSchemes[colorScheme];
  const [isProcessing, setIsProcessing] = useState(false);
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [currentAction, setCurrentAction] = useState<'approve' | 'reject' | null>(null);
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
      case 'submitted':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'approved':
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'rejected':
        return <XCircle className="w-4 h-4 text-red-600" />;
      case 'expired':
        return <Clock className="w-4 h-4 text-gray-600" />;
      case 'in_review':
        return <Clock className="w-4 h-4 text-blue-600" />;
      case 'draft':
        return <Clock className="w-4 h-4 text-gray-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
      case 'submitted':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'expired':
        return 'bg-gray-100 text-gray-800';
      case 'in_review':
        return 'bg-blue-100 text-blue-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'approved':
        return 'Approved';
      case 'rejected':
        return 'Rejected';
      case 'expired':
        return 'Expired';
      case 'draft':
        return 'Draft';
      case 'submitted':
        return 'Submitted';
      case 'in_review':
        return 'In Review';
      case 'completed':
        return 'Completed';
      default:
        return status;
    }
  };

  const handleOpenActionModal = (action: 'approve' | 'reject') => {
    setCurrentAction(action);
    setIsActionModalOpen(true);
  };

  const handleCloseActionModal = () => {
    if (!isProcessing) {
      setIsActionModalOpen(false);
      setCurrentAction(null);
    }
  };

  const handleSubmitAction = async (comment: string) => {
    if (isProcessing || !currentAction) return;

    setIsProcessing(true);

    try {
      const { data, error } = await ProcessRequest(
        id,
        currentAction,
        comment || null,
        currentAction === 'reject' ? comment || null : null
      );

      if (error) {
        console.error(`Failed to ${currentAction} request:`, error);
        alert(`Failed to ${currentAction} request. Please try again.`);
        return;
      }

      if (data?.processRequest) {
        onRequestProcessed?.();
        handleCloseActionModal();
      }
    } catch (error) {
      console.error(`Error ${currentAction}ing request:`, error);
      alert(`An error occurred while ${currentAction}ing the request.`);
    } finally {
      setIsProcessing(false);
    }
  };



  const detailUrl = type === 'incoming'
    ? `/adm/requests/gets/${id}`
    : `/adm/requests/sets/${id}`;

  return (
    <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg border p-6 hover:shadow-md transition-shadow`}>
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{fileName}</h3>
              <p className={`mt-1 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{description}</p>
            </div>
            <div className="flex items-center space-x-2">
              {getStatusIcon(status)}
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
                {getStatusText(status)}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-sm">
            <div className="flex items-center space-x-2">
              <User className="w-4 h-4 text-gray-400" />
              <div>
                <div className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {type === 'incoming' ? requesterName : targetUserName}
                </div>
                <div className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                  {type === 'incoming' ? requesterEmail : targetUserEmail}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <FileText className="w-4 h-4 text-gray-400" />
              <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>{filePath}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                {new Date(submittedAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </div>



      {/* Actions */}
      <div className={`flex justify-between items-center mt-4 pt-4 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          Submitted on {new Date(submittedAt).toLocaleDateString()}
        </div>
        <div className="flex items-center space-x-2">
          <Link
            href={detailUrl}
            className={`${colors.accent} hover:${colors.accent.replace('600', '700')} text-sm font-medium`}
          >
            View Details
          </Link>
          {type === 'incoming' && status === 'PENDING_REVIEW' && (
            <>
              <button
                onClick={() => handleOpenActionModal('approve')}
                disabled={isProcessing}
                className={`text-sm font-medium ${isProcessing ? 'text-green-400 cursor-not-allowed' : 'text-green-600 hover:text-green-700'
                  }`}
              >
                Approve
              </button>
              <button
                onClick={() => handleOpenActionModal('reject')}
                disabled={isProcessing}
                className={`text-sm font-medium ${isProcessing ? 'text-red-400 cursor-not-allowed' : 'text-red-600 hover:text-red-700'
                  }`}
              >
                Reject
              </button>
            </>
          )}
          {type === 'outgoing' && status === 'DRAFT' && (
            <button className="text-green-600 hover:text-green-700 text-sm font-medium">
              Submit
            </button>
          )}
        </div>
      </div>

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
