import React from 'react';
import { SidebarProvider } from './sidebar';
import { AuthProvider } from './auth';

const AppProvider = ({ children }) => (
  <AuthProvider>
    <SidebarProvider>{children}</SidebarProvider>
  </AuthProvider>
);

export default AppProvider;
