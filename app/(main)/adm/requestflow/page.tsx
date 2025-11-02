'use client';

import { useState, useEffect } from 'react';
import { GetRequestFlow } from '@/apiComponent/graphql/request';
import { GetRequestFlowQuery } from '@/apiComponent/graphql/generated/graphql';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useToast } from '@/hooks/useToast';
import { Plus, Users } from 'lucide-react';
import WorkflowCard from '@/components/requestflow/WorkflowCard';
import { colorSchemes } from '@/lib/theme';

interface Workflow {
  id: string;
  name: string;
  description: string;
  isSequential: boolean;
  requiredApprovals: number;
  timeoutHours?: number | null;
  allowDelegation: boolean;
  steps: WorkflowStep[];
  isActive: boolean;
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

export default function RequestFlowPage() {
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { isDark, colorScheme } = useTheme();
  const { pushToast } = useToast();

  // Get theme-aware color classes
  const getThemeColors = () => {
    const scheme = colorSchemes[colorScheme];
    return {
      primary: scheme.primary,
      textPrimary: isDark ? 'text-white' : 'text-gray-900',
      textSecondary: isDark ? 'text-gray-400' : 'text-gray-600',
      textMuted: isDark ? 'text-gray-500' : 'text-gray-400',
      bgColor: isDark ? 'bg-gray-900' : 'bg-gray-50',
    };
  };

  const themeColors = getThemeColors();

  useEffect(() => {
    loadWorkflows();
  }, []);

  const loadWorkflows = async () => {
    try {
      const { data, error } = await GetRequestFlow();
      if (error) throw error;
      
      // Transform API response to match our interface
      const workflows = data?.workflows?.map((workflow: GetRequestFlowQuery['workflows'][number]) => ({
        id: workflow.id,
        name: workflow.name,
        description: workflow.description || '',
        isSequential: workflow.isSequential,
        requiredApprovals: workflow.requiredApprovals,
        timeoutHours: workflow.timeoutHours,
        allowDelegation: workflow.allowDelegation,
        steps: (workflow.steps || []).map(step => ({
          id: step.id,
          stepNumber: step.stepNumber,
          stepName: step.stepName,
          description: step.description || '',
          status: step.status || '',
          assignedToId: step.assignedToId,
          isRequired: step.isRequired,
          canDelegate: step.canDelegate,
          timeoutHours: step.timeoutHours || 0
        })),
        isActive: true // Default to active since the API doesn't provide this field
      })) || [];
      
      setWorkflows(workflows);
    } catch (error) {
      pushToast({ message: 'Failed to load workflows', type: 'error' });
      console.error('Error loading workflows:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleWorkflowStatus = async (workflowId: string, currentIsActive: boolean) => {
    try {
      // TODO: Implement API call to toggle workflow status
      const newIsActive = !currentIsActive;
      setWorkflows(prev => prev.map(w => 
        w.id === workflowId ? { ...w, isActive: newIsActive } : w
      ));
      pushToast({ message: `Workflow ${newIsActive ? 'activated' : 'deactivated'}`, type: 'success' });
    } catch (error) {
      pushToast({ message: 'Failed to update workflow status', type: 'error' });
    }
  };

  const deleteWorkflow = async (workflowId: string) => {
    if (!confirm('Are you sure you want to delete this workflow?')) return;
    
    try {
      // TODO: Implement API call to delete workflow
      setWorkflows(prev => prev.filter(w => w.id !== workflowId));
      pushToast({ message: 'Workflow deleted successfully', type: 'success' });
    } catch (error) {
      pushToast({ message: 'Failed to delete workflow', type: 'error' });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center">
          <div className={`animate-spin rounded-full h-8 w-8 border-b-2 ${colorSchemes[colorScheme].accent} mx-auto`}></div>
          <p className={`mt-2 ${themeColors.textSecondary}`}>Loading workflows...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className={`text-2xl font-bold ${themeColors.textPrimary}`}>Request Flows</h1>
          <p className={themeColors.textSecondary}>Request workflows and processes</p>
        </div>
        {/* <button className={`${themeColors.primary} text-white px-4 py-2 rounded-lg flex items-center space-x-2`}>
          <Plus className="w-4 h-4" />
          <span>New Workflow</span>
        </button> */}
      </div>

      <div className="grid gap-6">
        {workflows.map((workflow) => (
          <WorkflowCard
            key={workflow.id}
            id={workflow.id}
            name={workflow.name}
            description={workflow.description}
            isSequential={workflow.isSequential}
            requiredApprovals={workflow.requiredApprovals}
            timeoutHours={workflow.timeoutHours || 0}
            allowDelegation={workflow.allowDelegation}
            status={workflow.isActive ? 'active' : 'inactive'}
            steps={workflow.steps}
            onToggleStatus={(workflowId, currentStatus) => toggleWorkflowStatus(workflowId, currentStatus === 'active')}
            onDelete={deleteWorkflow}
          />
        ))}
      </div>

      {workflows.length === 0 && (
        <div className="text-center py-12">
          <Users className={`w-12 h-12 ${themeColors.textMuted} mx-auto mb-4`} />
          <h3 className={`text-lg font-medium ${themeColors.textPrimary} mb-2`}>No workflows</h3>
          <p className={`${themeColors.textSecondary} mb-4`}>Get started by creating your first approval workflow.</p>
          <button className={`${themeColors.primary} text-white px-4 py-2 rounded-lg`}>
            Create Workflow
          </button>
        </div>
      )}
    </div>
  );
}
