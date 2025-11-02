'use client';

import { useNotifications } from '@/contexts/NotificationContext';

export default function NotificationDemo() {
    const { addNotification } = useNotifications();

    const demoNotifications = [
        {
            message: 'Document "Annual Report" has been shared with you',
            type: 'info' as const,
            action: {
                label: 'View Document',
                onClick: () => console.log('Navigate to document')
            }
        },
        {
            message: 'File upload completed successfully',
            type: 'success' as const
        },
        {
            message: 'Storage is running low (85% used)',
            type: 'warning' as const,
            action: {
                label: 'Manage Storage',
                onClick: () => console.log('Navigate to storage settings')
            }
        },
        {
            message: 'Failed to process document "Project Plan"',
            type: 'error' as const
        }
    ];

    return (
        <div className="p-4 space-y-4">
            <h2 className="text-lg font-semibold">Notification Demo</h2>
            <div className="flex flex-wrap gap-2">
                {demoNotifications.map((notification, index) => (
                    <button
                        key={index}
                        onClick={() => addNotification(notification)}
                        className="px-3 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                    >
                        Add {notification.type} notification
                    </button>
                ))}
            </div>
            <p className="text-sm text-gray-600">
                Click the buttons above to add demo notifications, then click the bell icon in the header to see them.
            </p>
        </div>
    );
}
