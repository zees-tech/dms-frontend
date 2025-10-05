"use client";

import { useTheme } from "@/contexts/ThemeContext";
import { colorSchemes } from "@/lib/theme";

export default function Footer() {
  const { colorScheme, isDark } = useTheme();
  const colors = colorSchemes[colorScheme];
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={`border-t ${
        isDark ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"
      }`}
    >
      <div className="px-6 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Left side - Company info */}
          <div className="flex items-center space-x-4">
            <span
              className={`text-sm ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              © {currentYear} Your Company. All rights reserved.
            </span>
          </div>

          {/* Center - Links */}
          <div className="flex items-center space-x-6">
            <a
              href="/privacy"
              className={`text-sm ${colors.accent} hover:underline`}
            >
              Privacy Policy
            </a>
            <a
              href="/terms"
              className={`text-sm ${colors.accent} hover:underline`}
            >
              Terms of Service
            </a>
            <a
              href="/support"
              className={`text-sm ${colors.accent} hover:underline`}
            >
              Support
            </a>
          </div>
        </div>

        {/* Bottom row - Additional info */}
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <span
              className={`text-xs ${
                isDark ? "text-gray-500" : "text-gray-500"
              }`}
            >
              Version 1.0.0 | Last updated: {new Date().toLocaleDateString()}
            </span>
            <div className="flex items-center space-x-4">
              <span
                className={`text-xs ${
                  isDark ? "text-gray-500" : "text-gray-500"
                }`}
              >
                Status: All systems operational
              </span>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
