'use client';

import { Users, Clock, CheckCircle, Play, Pause, Edit, Trash2 } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { colorSchemes } from '@/lib/theme';

interface WorkflowCardProps {
  id: string;
  name: string;
  description: string;
  isSequential: boolean;
  requiredApprovals: number;
  timeoutHours: number;
  allowDelegation: boolean;
  status: 'active' | 'inactive';
  steps: WorkflowStep[];
  onToggleStatus?: (workflowId: string, currentStatus: 'active' | 'inactive') => void;
  onEdit?: (workflowId: string) => void;
  onDelete?: (workflowId: string) => void;
}

interface WorkflowStep {
  id: string;
  stepNumber: number;
  stepName: string;
  description: string;
  status: string;
  assignedToId: string;
  isRequired: boolean;
  canDelegate: boolean;
  timeoutHours: number;
}

export default function WorkflowCard({
  id,
  name,
  description,
  isSequential,
  requiredApprovals,
  timeoutHours,
  allowDelegation,
  status,
  steps,
  onToggleStatus,
  onEdit,
  onDelete
}: WorkflowCardProps) {
  const { colorScheme, isDark } = useTheme();
  const colors = colorSchemes[colorScheme];
  return (
    <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg border p-6`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{name}</h3>
          <p className={`mt-1 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{description}</p>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            status === 'active' 
              ? 'bg-green-100 text-green-800' 
              : `${isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-800'}`
          }`}>
            {status === 'active' ? 'Active' : 'Inactive'}
          </span>
          {onToggleStatus && (
            <button
              onClick={() => onToggleStatus(id, status)}
              className={`p-2 rounded ${
                status === 'active' 
                  ? 'text-orange-600 hover:bg-orange-50' 
                  : 'text-green-600 hover:bg-green-50'
              }`}
            >
              {status === 'active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
          )}
          {onEdit && (
            <button 
              onClick={() => onEdit(id)}
              className={`p-2 ${colors.accent} hover:${isDark ? 'bg-gray-700' : 'bg-blue-50'} rounded`}
            >
              <Edit className="w-4 h-4" />
            </button>
          )}
          {onDelete && (
            <button 
              onClick={() => onDelete(id)}
              className="p-2 text-red-600 hover:bg-red-50 rounded"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-4 text-sm">
        <div className="flex items-center space-x-2">
          <Users className="w-4 h-4 text-gray-400" />
          <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>{requiredApprovals} approval{requiredApprovals !== 1 ? 's' : ''}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4 text-gray-400" />
          <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>{timeoutHours}h timeout</span>
        </div>
        <div className="flex items-center space-x-2">
          <CheckCircle className="w-4 h-4 text-gray-400" />
          <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>{isSequential ? 'Sequential' : 'Parallel'}</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`w-2 h-2 rounded-full ${
            allowDelegation ? 'bg-green-400' : 'bg-gray-400'
          }`}></span>
          <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>Delegation {allowDelegation ? 'Allowed' : 'Not Allowed'}</span>
        </div>
      </div>

      <div>
        <h4 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'} mb-3`}>Approval Steps</h4>
        <div className="space-y-3">
          {steps.map((step) => (
            <div key={step.id} className={`flex items-center justify-between p-3 ${isDark ? 'bg-gray-700' : 'bg-gray-50'} rounded`}>
              <div className="flex items-center space-x-3">
                <div className={`w-6 h-6 ${colors.secondary.split(' ')[0]} ${colors.accent} rounded-full flex items-center justify-center text-xs font-medium`}>
                  {step.stepNumber}
                </div>
                <div>
                  <div className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{step.stepName}</div>
                  <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{step.description}</div>
                </div>
              </div>
              <div className={`flex items-center space-x-4 text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                <span>{step.timeoutHours}h timeout</span>
                {step.isRequired && (
                  <span className={`${colors.secondary.split(' ')[0]} ${colors.accent} px-2 py-1 rounded text-xs`}>Required</span>
                )}
                {step.canDelegate && (
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Delegatable</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
