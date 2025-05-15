"use client";

import React from "react";

export default function Card({ 
  title, 
  subtitle, 
  footer, 
  children, 
  className = "" 
}) {
  return (
    <div
      className={`bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200 ${className}`}
    >
      {(title || subtitle) && (
        <div className="px-6 py-4 border-b border-gray-100">
          {title && (
            <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
          )}
          {subtitle && (
            <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
          )}
        </div>
      )}

      <div className="px-6 py-4">{children}</div>

      {footer && (
        <div className="px-6 py-3 border-t border-gray-100 bg-gray-50 flex justify-end space-x-2">
          {footer}
        </div>
      )}
    </div>
  );
}
