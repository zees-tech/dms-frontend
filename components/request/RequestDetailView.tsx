'use client';

import { useTheme } from '@/contexts/ThemeContext';
import { User, FileText, Calendar, Clock, CheckCircle, XCircle, Download } from 'lucide-react';
import { Request } from '@/apiComponent/graphql/generated/graphql';

// interface Request {
//   id: string;
//   fileId: string;
//   file: {
//     pathName: string;
//     name: string;
//     parentId: string;
//     contentUrl: string;
//     description: string;
//     size: number;
//     mimeType: string;
//     expiry: string;
//     id: string;
//   };
//   targetUser: {
//     id: string;
//     name: string;
//     email: string;
//     roleId: string;
//     departmentId: string;
//     managerId: string;
//   };
//   status: 'draft' | 'submitted' | 'in_review' | 'approved' | 'rejected' | 'completed';
//   description: string;
//   workflowId: string;
//   workflowName: string;
//   submittedAt: string;
//   completedAt: string | null;
//   currentStep: number;
//   totalSteps: number;
//   steps: RequestStep[];
// }

// interface RequestStep {
//   id: string;
//   stepNumber: number;
//   stepName: string;
//   status: 'pending' | 'approved' | 'rejected' | 'expired';
//   assignedToId: string;
//   assignedToName: string;
//   startedAt: string | null;
//   completedAt: string | null;
//   comments: string | null;
// }

interface RequestDetailViewProps {
  request: Request;
  onEdit?: () => void;
  onDownload?: () => void;
  onSubmit?: () => void;
  onCancel?: () => void;
}

export default function RequestDetailView({
  request,
  onEdit,
  onDownload,
  onSubmit,
  onCancel
}: RequestDetailViewProps) {
  const { isDark } = useTheme();

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
                <h2 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Target User</h2>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <div className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{request.user.name}</div>
                    <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{request.user.email}</div>
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
            {request.status !== 'COMPLETED' && (
              <button
                onClick={onSubmit}
                className="w-full bg-green-600 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 hover:bg-green-700"
              >
                <span>Approve Request</span>
              </button>
            )}
            {request.status !== 'COMPLETED' && (
              <button
                onClick={onCancel}
                className="w-full bg-red-600 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 hover:bg-red-700"
              >
                <XCircle className="w-4 h-4" />
                <span>Reject Request</span>
              </button>
            )}
            {request.file && (<button
              onClick={onDownload}
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 hover:bg-blue-700"
            >
              <Download className="w-4 h-4" />
              <span>Download Document</span>
            </button>)}
          </div>
        </div>
      </div>
    </div>
  );
}
