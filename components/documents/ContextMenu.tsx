'use client';

import { useEffect, useRef } from 'react';
import { LucideIcon } from 'lucide-react';

interface ContextMenuProps {
    isOpen: boolean;
    position: { x: number; y: number };
    onClose: () => void;
    items: {
        label: string;
        icon: LucideIcon;
        onClick: () => void;
        disabled?: boolean;
        danger?: boolean;
    }[];
}

export default function ContextMenu({ isOpen, position, onClose, items }: ContextMenuProps) {
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('keydown', handleEscape);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div
            ref={menuRef}
            className="fixed z-50 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-2 min-w-[160px]"
            style={{
                left: position.x,
                top: position.y,
            }}
        >
            {items.map((item, index) => (
                <button
                    key={index}
                    onClick={() => {
                        if (!item.disabled) {
                            item.onClick();
                            onClose();
                        }
                    }}
                    disabled={item.disabled}
                    className={`w-full flex items-center gap-3 px-4 py-2 text-sm text-left transition-colors ${item.disabled
                        ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
                        : item.danger
                            ? 'text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                >
                    <item.icon className="w-4 h-4" />
                    <span>{item.label}</span>
                </button>
            ))}
        </div>
    );
}