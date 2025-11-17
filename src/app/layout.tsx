'use client';

import { Outfit } from 'next/font/google';
import './globals.css';
import { Provider } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import { SidebarProvider } from '@/context/SidebarContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { RoleProvider } from '@/context/RoleContext';
import { configureStore } from '@reduxjs/toolkit';
import { PersistGate } from 'redux-persist/integration/react';
import rootReducer from '@/redux/reducer';
import storage from 'redux-persist/lib/storage';
import { CustomAlertContextProvider } from '@/context/CustomAlertContext';

const outfit = Outfit({
  subsets: ['latin'],
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'filter'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
        ignoredActionPaths: ['meta.arg', 'register', 'rehydrate'],
        ignoredPaths: ['items.dates'],
      },
    }),
});
const persistor = persistStore(store);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.className} dark:bg-gray-900`}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <CustomAlertContextProvider>
              <RoleProvider>
                <ThemeProvider>
                  <SidebarProvider>{children}</SidebarProvider>
                </ThemeProvider>
              </RoleProvider>
            </CustomAlertContextProvider>
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}
