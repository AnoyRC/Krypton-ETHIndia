import { store } from '@/redux/store';
import localFont from 'next/font/local';
import ReduxProvider from '@/provider/ReduxProvider';
import { WagmiProvider } from '@/provider/wagmiProviders';

import './globals.css';

export const metadata = {
  title: 'Krypton',
  description: '2FA Smart Contract Wallet',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="overflow-x-hidden">
        <ReduxProvider store={store}>
          <WagmiProvider>{children}</WagmiProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
