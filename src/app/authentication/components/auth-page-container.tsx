"use client";

import React from "react";

interface AuthPageContainerProps {
  children: React.ReactNode;
}

export function AuthPageContainer({ children }: AuthPageContainerProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4 dark:bg-gray-900">
      {children}
    </div>
  );
}
