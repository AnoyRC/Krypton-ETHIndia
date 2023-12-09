import { store } from '@/redux/store';
import localFont from 'next/font/local';
import ReduxProvider from '@/provider/ReduxProvider';
import { WagmiProvider } from '@/provider/wagmiProviders';

import './globals.css';

const fhtotal = localFont({
  src: '../public/fonts/FH-total/FHTotalDisplay-Test-Black.woff2',
  variable: '--font-fhtotal',
});

const uni = localFont({
  src: [
    {
      path: '../public/fonts/uni-neue/UniNeueLight.woff2',
      weight: '200',
    },
    {
      path: '../public/fonts/uni-neue/UniNeueThin.woff2',
      weight: '300',
    },
    {
      path: '../public/fonts/uni-neue/UniNeueRegular.woff2',
      weight: '400',
    },
    {
      path: '../public/fonts/uni-neue/UniNeueBook.woff2',
      weight: '500',
    },
    {
      path: '../public/fonts/uni-neue/UniNeueBold.woff2',
      weight: '700',
    },
    {
      path: '../public/fonts/uni-neue/UniNeueHeavy.woff2',
      weight: '800',
    },
    {
      path: '../public/fonts/uni-neue/UniNeueBlack.woff2',
      weight: '900',
    },
  ],

  variable: '--font-uni',
});

export const metadata = {
  title: 'Krypton',
  description: '2FA Smart Contract Wallet',
};

export default function RootLayout({ children }) {
  return (
    <html className={`${fhtotal.variable} ${uni.variable}`} lang="en">
      <body className="overflow-x-hidden font-uni">
        <ReduxProvider store={store}>
          <WagmiProvider>{children}</WagmiProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
