'use client';

import { Users, CheckCircle, ArrowRight, Power, Trash2 } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

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
  onToggleStatus: (workflowId: string, currentStatus: string) => void;
  onDelete: (workflowId: string) => void;
}

interface WorkflowStep {
  id: string;
  stepNumber: number;
  stepName: string;
  description: string;
  status: string;
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
  onDelete
}: WorkflowCardProps) {
  const { isDark } = useTheme();

  return (
    <div className={`group relative overflow-hidden ${isDark
      ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700'
      : 'bg-gradient-to-br from-white to-gray-50 border-gray-200'
      } rounded-2xl border shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}>

      {/* Status indicator bar */}
      <div className={`h-1 w-full ${status === 'active'
        ? 'bg-gradient-to-r from-emerald-400 to-teal-500'
        : 'bg-gray-300'
        }`} />

      <div className="p-4">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-1`}>
              {name}
            </h3>
            <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} text-sm leading-relaxed`}>
              {description}
            </p>
          </div>
          <div className="flex items-center space-x-2 ml-4">
            <div className={`px-3 py-1 rounded-full text-xs font-semibold ${status === 'active'
              ? 'bg-emerald-100 text-emerald-700 shadow-sm'
              : `${isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`
              }`}>
              {status === 'active' ? '● Active' : '○ Inactive'}
            </div>
            <button
              onClick={() => onToggleStatus(id, status)}
              className={`p-2 rounded-lg transition-colors ${
                status === 'active' 
                  ? 'bg-yellow-100 text-yellow-600 hover:bg-yellow-200' 
                  : 'bg-green-100 text-green-600 hover:bg-green-200'
              }`}
              title={status === 'active' ? 'Deactivate' : 'Activate'}
            >
              <Power className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(id)}
              className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
              title="Delete workflow"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700/50' : 'bg-blue-50'} border ${isDark ? 'border-gray-600' : 'border-blue-100'}`}>
            <div className="flex items-center space-x-2">
              <div className={`p-1.5 rounded-md ${isDark ? 'bg-blue-500/20' : 'bg-blue-100'}`}>
                <Users className="w-4 h-4 text-blue-500" />
              </div>
              <div>
                <div className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {requiredApprovals}
                </div>
                <div className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  Approvals
                </div>
              </div>
            </div>
          </div>

          <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700/50' : 'bg-green-50'} border ${isDark ? 'border-gray-600' : 'border-green-100'}`}>
            <div className="flex items-center space-x-2">
              <div className={`p-1.5 rounded-md ${isDark ? 'bg-green-500/20' : 'bg-green-100'}`}>
                <CheckCircle className="w-4 h-4 text-green-500" />
              </div>
              <div>
                <div className={`text-sm font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {isSequential ? 'Sequential' : 'Parallel'}
                </div>
                <div className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  Process
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Steps */}
        <div>
          <h4 className={`text-base font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-3`}>
            Workflow Steps
          </h4>
          <div className="space-y-2">
            {steps.filter(step => step.status !== 'completed').map((step, index) => (
              <div key={step.id} className={`group/step relative p-3 rounded-lg ${isDark ? 'bg-gray-700/30 hover:bg-gray-700/50' : 'bg-gray-50 hover:bg-gray-100'
                } transition-colors duration-200`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step.status === 'pending'
                      ? 'bg-yellow-500 text-white'
                      : isDark
                        ? 'bg-gray-600 text-gray-300'
                        : 'bg-gray-300 text-gray-600'
                      }`}>
                      {step.stepNumber}
                    </div>
                    <div>
                      <div className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {step.stepName}
                      </div>
                      <div className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                        {step.description}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${step.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-gray-100 text-gray-600'
                      }`}>
                      {step.status}
                    </span>
                    {index < steps.filter(s => s.status !== 'completed').length - 1 && isSequential && (
                      <ArrowRight className={`w-3 h-3 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
