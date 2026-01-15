// app/providers.tsx
'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Định nghĩa kiểu dữ liệu cho Context
interface AppContextType {
  userId: string;
  plaidAccessToken: string | null;
  setPlaidAccessToken: (token: string | null) => void;
}

// Giá trị mặc định cho Context
const AppContext = createContext<AppContextType | undefined>(undefined);

// HÀM TẠO Provider (quản lý trạng thái)
export function AppProvider({ children }: { children: ReactNode }) {
  // Vì đây là Sandbox, chúng ta dùng một ID giả định cố định
  const [userId] = useState<string>('user-id-for-mock-flowo');
  const [plaidAccessToken, setPlaidAccessToken] = useState<string | null>(null);

  const contextValue: AppContextType = {
    userId,
    plaidAccessToken,
    setPlaidAccessToken,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
}

// Custom hook để sử dụng Context
export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}

