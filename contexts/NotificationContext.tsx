'use client';

import { createContext, useContext, useState, ReactNode, useCallback, useEffect, useRef } from 'react';
import { GetNotifications, MarkNotificationAsRead, MarkAllNotificationsAsRead, DeleteNotification } from '@/apiComponent/graphql/notification';

export interface Notification {
    id: string;
    title: string;
    message: string;
    type: 'info' | 'success' | 'warning' | 'error';
    timestamp: Date;
    read: boolean;
    action?: {
        label: string;
        onClick: () => void;
    };
    // API fields
    originalType?: string; // Store original API type (e.g., "ApprovalRequired")
    relatedEntityId?: string | null;
    relatedEntityType?: string | null;
    status?: string;
    priority?: string;
    actionUrl?: string | null;
    expiresAt?: string | null;
    metadata?: string | null;
    for?: string;
}

interface ApiNotification {
    id: string;
    title?: string;
    message?: string;
    type: string;
    createdAt?: string;
    readAt?: string;
    status: string;
    priority?: string;
    relatedEntityId?: string | null;
    relatedEntityType?: string | null;
    actionUrl?: string | null;
    expiresAt?: string | null;
    metadata?: string | null;
    for?: string;
}

interface NotificationContextType {
    notifications: Notification[];
    unreadCount: number;
    hasNextPage: boolean;
    isLoading: boolean;
    addNotification: (notification: Notification) => void;
    fetchNotifications: (skip?: number, take?: number) => Promise<void>;
    loadMore: () => Promise<void>;
    markAsRead: (id: string) => Promise<void>;
    markAllAsRead: () => Promise<void>;
    removeNotification: (id: string) => Promise<void>;
    clearAll: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: ReactNode }) {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [currentSkip, setCurrentSkip] = useState(0);
    const take = 10;
    const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const notificationsRef = useRef(notifications);

    // Keep the ref updated with current notifications
    useEffect(() => {
        notificationsRef.current = notifications;
    }, [notifications]);

    const unreadCount = notifications.filter(n => !n.read).length;

    const mapApiNotificationToUI = (apiNotif: ApiNotification): Notification => {
        // Map API notification type to UI type
        let uiType: 'info' | 'success' | 'warning' | 'error' = 'info';
        if (apiNotif.type === 'ApprovalRequired') {
            uiType = 'warning';
        } else if (apiNotif.type === 'error') {
            uiType = 'error';
        } else if (apiNotif.type === 'success') {
            uiType = 'success';
        }

        // Use createdAt or current date for timestamp
        // const timestamp = apiNotif.readAt 
        //     ? new Date(apiNotif.readAt) 
        //     : (apiNotif.createdAt ? new Date(apiNotif.createdAt) : new Date());

        return {
            id: apiNotif.id,
            title: apiNotif.title || '',
            message: apiNotif.message || '',
            type: uiType,
            timestamp: apiNotif.createdAt ? new Date(apiNotif.createdAt) : new Date(),
            read: apiNotif.status === 'READ' || !!apiNotif.readAt,
            originalType: apiNotif.type, // Store original API type
            relatedEntityId: apiNotif.relatedEntityId,
            relatedEntityType: apiNotif.relatedEntityType,
            status: apiNotif.status,
            priority: apiNotif.priority,
            actionUrl: apiNotif.actionUrl,
            expiresAt: apiNotif.expiresAt,
            metadata: apiNotif.metadata,
            for: apiNotif.for || '',
        };
    };

    const fetchNotifications = useCallback(async (skip: number = 0, takeCount: number = take, latest: boolean = false) => {
        setIsLoading(true);
        try {
            // Get the latest timestamp from existing notifications for filtering
            const currentNotifications = notificationsRef.current;
            const latestTimestamp = currentNotifications.length > 0
                ? new Date(Math.max(...currentNotifications.map(n => n.timestamp.getTime()))).toISOString()
                : undefined;

            const filter = latest && latestTimestamp
                ? { createdAt: { gt: latestTimestamp } }
                : null;

            const { data, error } = await GetNotifications(skip, takeCount, filter, undefined);
            if (error) {
                console.error('Error fetching notifications:', error);
                return;
            }
            if (data && data.myNotifications) {
                const apiNotifications = data.myNotifications.items || [];
                const mappedNotifications = apiNotifications.map(mapApiNotificationToUI);

                if (skip === 0 && !latest) {
                    // First load - replace all notifications
                    setNotifications(mappedNotifications);
                } else {
                    // Load more - append only new notifications that don't already exist
                    setNotifications(prev => {
                        const existingIds = new Set(prev.map(n => n.id));
                        const newNotifications = mappedNotifications.filter(n => !existingIds.has(n.id));
                        return [...newNotifications, ...prev];
                    });
                }

                setHasNextPage(data.myNotifications.pageInfo.hasNextPage || false);
                setCurrentSkip(skip + mappedNotifications.length);
            }
        } catch (err) {
            console.error('Error fetching notifications:', err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const loadMore = useCallback(async () => {
        if (!hasNextPage || isLoading) return;
        await fetchNotifications(currentSkip, take);
    }, [hasNextPage, isLoading, currentSkip, fetchNotifications]);

    const addNotification = (notification: Notification) => {
        const newNotification: Notification = {
            ...notification,
            // id: Math.random().toString(36).substr(2, 9),
        };

        setNotifications(prev => [newNotification, ...prev]);
    };

    const markAsRead = async (id: string) => {
        try {
            await MarkNotificationAsRead(id);
            setNotifications(prev =>
                prev.map(n => n.id === id ? { ...n, read: true } : n)
            );
        } catch (err) {
            console.error('Error marking notification as read:', err);
        }
    };

    const markAllAsRead = async () => {
        try {
            await MarkAllNotificationsAsRead();
            setNotifications(prev => prev.map(n => ({ ...n, read: true })));
        } catch (err) {
            console.error('Error marking all notifications as read:', err);
        }
    };

    const removeNotification = async (id: string) => {
        try {
            await DeleteNotification(id);
            setNotifications(prev => prev.filter(n => n.id !== id));
        } catch (err) {
            console.error('Error deleting notification:', err);
            // Still remove from UI even if API call fails
            setNotifications(prev => prev.filter(n => n.id !== id));
        }
    };

    const clearAll = () => {
        setNotifications([]);
        setHasNextPage(false);
        setCurrentSkip(0);
    };

    // Start polling for notifications
    const startPolling = useCallback(() => {
        // Clear any existing interval
        if (pollingIntervalRef.current) {
            clearInterval(pollingIntervalRef.current);
        }

        // Fetch notifications immediately
        fetchNotifications(0, 10);

        // Set up interval for polling every 30 seconds
        pollingIntervalRef.current = setInterval(() => {
            fetchNotifications(0, 10, true); // Fetch only latest notifications
        }, 30000); // 30 seconds
    }, [fetchNotifications]);

    // Stop polling for notifications
    const stopPolling = useCallback(() => {
        if (pollingIntervalRef.current) {
            clearInterval(pollingIntervalRef.current);
            pollingIntervalRef.current = null;
        }
    }, []);

    // Start polling when component mounts and stop when unmounts
    useEffect(() => {
        startPolling();

        return () => {
            stopPolling();
        };
    }, [startPolling, stopPolling]);

    return (
        <NotificationContext.Provider value={{
            notifications,
            unreadCount,
            hasNextPage,
            isLoading,
            addNotification,
            fetchNotifications,
            loadMore,
            markAsRead,
            markAllAsRead,
            removeNotification,
            clearAll,
        }}>
            {children}
        </NotificationContext.Provider>
    );
}

export function useNotifications() {
    const context = useContext(NotificationContext);
    if (context === undefined) {
        throw new Error('useNotifications must be used within a NotificationProvider');
    }
    return context;
}
