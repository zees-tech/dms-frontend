'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/contexts/ThemeContext';
import { User, Calendar, CheckCircle, XCircle, Eye, Edit } from 'lucide-react';
import { Request } from '@/apiComponent/graphql/generated/graphql';
import { ProcessRequest, ChangeRequested, ResubmitRequestWithFile } from '@/apiComponent/graphql/request';
import { localClient } from '@/utils/client';
import DocumentPreview from './DocumentPreview';
import RequestActionModal from './RequestActionModal';
import ResubmitRequestModal from './ResubmitRequestModal';
import { smartDownloadFile } from '@/apiComponent/rest/fileDownload';
import { getRolePrefix } from '@/utils/role-route';
import { useAuth } from '@/contexts/AuthContext';
import { useLoading } from '@/contexts/LoadingContext';

interface RequestDetailViewProps {
  request: Request;
  onRequestProcessed?: () => void;
}

export default function RequestDetailView({
  request,
  onRequestProcessed
}: RequestDetailViewProps) {
  const { isDark } = useTheme();
  const router = useRouter();
  const { user } = useAuth();
  const { showLoading, hideLoading } = useLoading();
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [isResubmitModalOpen, setIsResubmitModalOpen] = useState(false);
  const [currentAction, setCurrentAction] = useState<'approve' | 'reject' | 'request-change' | 'cancel' | null>(null);



  const handleOpenActionModal = (action: 'approve' | 'reject' | 'request-change' | 'cancel') => {
    setCurrentAction(action);
    setIsActionModalOpen(true);
  };

  const handleOpenResubmitModal = () => {
    setIsResubmitModalOpen(true);
  };

  const handleCloseActionModal = () => {
    if (!isProcessing) {
      setIsActionModalOpen(false);
      setCurrentAction(null);
    }
  };

  const handleCloseResubmitModal = () => {
    if (!isProcessing) {
      setIsResubmitModalOpen(false);
    }
  };

  const handleSubmitAction = async (comment: string) => {
    if (isProcessing || !currentAction) return;

    setIsProcessing(true);
    showLoading(`${currentAction === 'approve' ? 'Approving' : currentAction === 'reject' ? 'Rejecting' : currentAction === 'request-change' ? 'Requesting changes for' : 'Canceling'} request...`);

    try {
      let data, error;

      if ((currentAction === 'reject' || currentAction === 'request-change') && comment.trim() === '') {
        alert('Please provide a reason for rejection.');
        setIsProcessing(false);
        return;
      }

      if (currentAction === 'request-change') {
        const result = await ChangeRequested(
          request.id,
          comment || null,
          comment || null
        );
        data = result.data;
        error = result.error;
      } else {
        const result = await ProcessRequest(
          request.id,
          currentAction,
          comment || null,
          currentAction === 'reject' ? comment || null : null
        );
        data = result.data;
        error = result.error;
      }

      if (error) {
        alert(`Failed to ${currentAction} request. Please try again.`);
        return;
      }

      if (data?.processRequest) {
        onRequestProcessed?.();
        handleCloseActionModal();
        // Redirect to requests page after successful processing
        router.push(`${getRolePrefix(user?.role ?? '')}/requests/sets`);
      }
    } catch (error) {
      alert(`An error occurred while ${currentAction}ing the request.`);
    } finally {
      setIsProcessing(false);
      hideLoading();
    }
  };

  const handleResubmitRequest = async (file: File, comment: string) => {
    if (isProcessing) return;

    setIsProcessing(true);
    showLoading('Uploading file and resubmitting request...');

    try {
      // Step 1: Upload the file using FormData
      const formData = new FormData();
      formData.append('files', file);
      formData.append('requestId', request.id);

      const uploadResponse = await localClient.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (!uploadResponse.data || (uploadResponse.data as any).failedFiles?.length > 0) {
        throw new Error('File upload failed');
      }

      // Step 2: Resubmit the request with comment
      const { data, error } = await ResubmitRequestWithFile(
        request.id,
        file,
        comment
      );

      if (error) {
        alert('Failed to resubmit request. Please try again.');
        return;
      }

      if (data?.processRequest) {
        onRequestProcessed?.();
        handleCloseResubmitModal();
        alert('Request resubmitted successfully!');
        // Redirect to requests page after successful resubmission
        router.push(`${getRolePrefix(user?.role ?? '')}/requests/sets`);
      }
    } catch (error) {
      alert('An error occurred while resubmitting the request.');
    } finally {
      setIsProcessing(false);
      hideLoading();
    }
  };

  const handlePreviewDocument = () => {
    if (request.file) {
      setIsPreviewOpen(true);
    }
  };

  const handleDownloadDocument = async (fileId?: string, fileName?: string) => {
    const downloadFileId = fileId || request.file?.id;
    const downloadFileName = fileName || request.file?.name;

    if (downloadFileId && downloadFileName) {
      try {
        await smartDownloadFile(downloadFileId, downloadFileName);
      } catch (error) {
        alert('Failed to download document. Please try again.');
      }
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Content */}
      <div className="lg:col-span-2 space-y-6">
        {/* Request Information */}
        <div className={`rounded-lg border p-6 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <h2 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Request Information</h2>
          {
            request.file && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Document</label>
                  <p className={`mt-1 font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{request.file.name}</p>
                  <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{request.file.pathName}</p>
                </div>
                <div>
                  <label className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>File Type</label>
                  <p className={`mt-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>{request.file.mimeType}</p>
                </div>
                <div>
                  <label className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>File Size</label>
                  <p className={`mt-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>{(request.file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
                {request.file.expiry && (
                  <div>
                    <label className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Expiry Date</label>
                    <p className={`mt-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>{new Date(request.file.expiry).toLocaleDateString()}</p>
                  </div>
                )}
              </div>
            )
          }
          {
            request.user && (
              <div className={`rounded-lg border p-6 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <h2 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>New User</h2>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <div className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{request.user.name}</div>
                    <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{request.user.email}</div>
                    <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Role: {request.user.role?.name.toUpperCase()}</div>
                    <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Department: {request.user.department?.name.toUpperCase()}</div>
                    <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>User ID: {request.user.id}</div>
                  </div>
                </div>
              </div>
            )
          }
          <div className="mt-4">
            <label className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Request Description</label>
            <p className={`mt-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>{request.description}</p>
          </div>
        </div>

        {/* Progress */}
        {/* {request.status !== 'DRAFT' && (
          <div className={`rounded-lg border p-6 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <h2 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Progress</h2>
            <div className="space-y-4">
              <div>
                <div className={`flex justify-between text-sm mb-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  <span>Overall Progress</span>
                  <span>Step {request.currentStep} of {request.totalSteps}</span>
                </div>
                <div className={`w-full rounded-full h-3 ${isDark ? 'bg-gray-600' : 'bg-gray-200'}`}>
                  <div
                    className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${getProgressPercentage(request.currentStep, request.totalSteps)}%` }}
                  ></div>
                </div>
              </div>

              <div className="space-y-3">
                {request.steps.map((step) => (
                  <div key={step.id} className="flex items-start space-x-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium ${step.status === 'approved' ? 'bg-green-500' :
                      step.status === 'rejected' ? 'bg-red-500' :
                        step.status === 'pending' ? 'bg-yellow-500' : 'bg-gray-400'
                      }`}>
                      {step.stepNumber}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{step.stepName}</h3>
                          <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Assigned to: {step.assignedToName}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${step.status === 'approved' ? 'bg-green-100 text-green-800' :
                          step.status === 'rejected' ? 'bg-red-100 text-red-800' :
                            step.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                          {step.status.charAt(0).toUpperCase() + step.status.slice(1)}
                        </span>
                      </div>
                      {step.comments && (
                        <div className={`mt-2 p-3 rounded ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                          <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{step.comments}</p>
                        </div>
                      )}
                      <div className={`mt-2 text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        {step.startedAt && `Started: ${new Date(step.startedAt).toLocaleString()}`}
                        {step.completedAt && ` • Completed: ${new Date(step.completedAt).toLocaleString()}`}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )} */}
      </div>

      {/* Sidebar */}
      <div className="space-y-6">

        {/* Workflow Information */}
        {/* <div className={`rounded-lg border p-6 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <h2 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Workflow</h2>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <FileText className="w-4 h-4 text-gray-400" />
              <div>
                <div className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>Workflow</div>
                <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{request.workflowName}</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Clock className="w-4 h-4 text-gray-400" />
              <div>
                <div className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>Steps</div>
                <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{request.totalSteps} steps</div>
              </div>
            </div>
          </div>
        </div> */}

        {/* Timeline */}
        <div className={`rounded-lg border p-6 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <h2 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Timeline</h2>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Calendar className="w-4 h-4 text-gray-400" />
              <div>
                <div className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>Submitted</div>
                <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {new Date(request.submittedAt).toLocaleString()}
                </div>
              </div>
            </div>
            {request.completedAt && (
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-4 h-4 text-gray-400" />
                <div>
                  <div className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>Completed</div>
                  <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    {new Date(request.completedAt).toLocaleString()}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className={`rounded-lg border p-6 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <h2 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Actions</h2>
          <div className="space-y-3">
            {request.status !== 'COMPLETED' && request.status !== 'APPROVED' && request.status !== 'REJECTED' && request.status !== 'CHANGES_REQUESTED' && (
              <div className="flex gap-2">
                <button
                  onClick={() => handleOpenActionModal('approve')}
                  disabled={isProcessing}
                  className={`flex-1 px-3 py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors ${isProcessing ? 'bg-green-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
                    } text-white text-sm`}
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Approve Request</span>
                </button>
                {(request.file && <button
                  onClick={() => handleOpenActionModal('request-change')}
                  disabled={isProcessing}
                  className={`flex-1 px-3 py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors ${isProcessing ? 'bg-yellow-400 cursor-not-allowed' : 'bg-yellow-600 hover:bg-yellow-700'
                    } text-white text-sm`}
                >
                  <Edit className="w-4 h-4" />
                  <span>Request Change</span>
                </button>)}
                <button
                  onClick={() => handleOpenActionModal('reject')}
                  disabled={isProcessing}
                  className={`flex-1 px-3 py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors ${isProcessing ? 'bg-red-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'
                    } text-white text-sm`}
                >
                  <XCircle className="w-4 h-4" />
                  <span>Reject Request</span>
                </button>
              </div>
            )}
            {request.status === 'CHANGES_REQUESTED' && (
              <div className="flex gap-2">
                <button
                  onClick={handleOpenResubmitModal}
                  disabled={isProcessing}
                  className={`flex-1 px-3 py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors ${isProcessing ? 'bg-green-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
                    } text-white text-sm`}
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Re-Submit Request</span>
                </button>
                <button
                  onClick={() => handleOpenActionModal('cancel')}
                  disabled={isProcessing}
                  className={`flex-1 px-3 py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors ${isProcessing ? 'bg-yellow-400 cursor-not-allowed' : 'bg-yellow-600 hover:bg-yellow-700'
                    } text-white text-sm`}
                >
                  <Edit className="w-4 h-4" />
                  <span>Cancel Request</span>
                </button>
              </div>
            )}
            {request.file && (
              <button
                onClick={handlePreviewDocument}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 hover:bg-blue-700 transition-colors"
              >
                <Eye className="w-4 h-4" />
                <span>Preview Document</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Document Preview Modal */}
      {request.file && (
        <DocumentPreview
          file={{
            id: request.file.id,
            name: request.file.name,
            mimeType: request.file.mimeType,
            size: request.file.size,
            contentUrl: (request.file.contentUrl && request.file.contentUrl.trim() !== '') ? request.file.contentUrl : undefined,
            description: request.file.description || undefined
          }}
          isOpen={isPreviewOpen}
          onClose={() => setIsPreviewOpen(false)}
          onDownload={handleDownloadDocument}
        />
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

      {/* Resubmit Request Modal */}
      <ResubmitRequestModal
        isOpen={isResubmitModalOpen}
        onClose={handleCloseResubmitModal}
        onSubmit={handleResubmitRequest}
        isLoading={isProcessing}
        currentFileName={request.file?.name}
        currentFile={request.file ? {
          id: request.file.id,
          name: request.file.name,
          mimeType: request.file.mimeType,
          size: request.file.size,
          contentUrl: (request.file.contentUrl && request.file.contentUrl.trim() !== '') ? request.file.contentUrl : undefined,
          description: request.file.description || undefined
        } : undefined}
        onDownload={handleDownloadDocument}
      />
    </div>
  );
}
