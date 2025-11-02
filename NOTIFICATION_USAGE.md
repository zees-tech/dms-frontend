# Notification System Usage Guide

## Overview
The notification system provides a user-friendly way to display notifications with a bell icon in the header. It supports different notification types, actions, and integrates with the existing theme system.

## Components

### 1. NotificationBell Component
Located at `components/ui/NotificationBell.tsx`
- Displays a bell icon with unread count badge
- Shows dropdown panel with notifications
- Supports dark/light theme
- Provides actions: mark as read, remove, mark all as read

### 2. NotificationContext
Located at `contexts/NotificationContext.tsx`
- Manages notification state globally
- Provides hooks for adding/removing notifications
- Tracks read/unread status

## Usage

### Adding Notifications
```typescript
import { useNotifications } from '@/contexts/NotificationContext';

function MyComponent() {
    const { addNotification } = useNotifications();

    // Basic notification
    addNotification({
        message: 'Your document has been processed',
        type: 'success'
    });

    // Notification with action
    addNotification({
        message: 'Document shared with you',
        type: 'info',
        action: {
            label: 'View Document',
            onClick: () => navigateToDocument()
        }
    });
}
```

### Notification Types
- `info` - General information (blue)
- `success` - Success messages (green)
- `warning` - Warning messages (yellow)
- `error` - Error messages (red)

### Available Methods
```typescript
const {
    notifications,      // Array of all notifications
    unreadCount,        // Number of unread notifications
    addNotification,    // Add new notification
    markAsRead,         // Mark specific notification as read
    markAllAsRead,      // Mark all notifications as read
    removeNotification, // Remove specific notification
    clearAll           // Clear all notifications
} = useNotifications();
```

## Integration Examples

### File Upload Success
```typescript
const handleUploadSuccess = () => {
    addNotification({
        message: 'File uploaded successfully',
        type: 'success'
    });
};
```

### Document Sharing
```typescript
const handleShareDocument = () => {
    addNotification({
        message: `Document "${documentName}" shared with ${recipientName}`,
        type: 'info',
        action: {
            label: 'View Document',
            onClick: () => openDocument(documentId)
        }
    });
};
```

### Storage Warning
```typescript
const checkStorage = () => {
    if (storageUsage > 80) {
        addNotification({
            message: `Storage is running low (${storageUsage}% used)`,
            type: 'warning',
            action: {
                label: 'Manage Storage',
                onClick: () => navigateToStorageSettings()
            }
        });
    }
};
```

## Styling
The notification system automatically adapts to the current theme (dark/light mode) and uses the blue color scheme from the theme configuration.

## Demo
A demo component is available at `components/demo/NotificationDemo.tsx` for testing the notification functionality.

## Best Practices
1. Use appropriate notification types for different scenarios
2. Include actions when users need to take immediate steps
3. Keep notification messages concise and clear
4. Use success notifications for completed actions
5. Use error notifications for failures that require attention
