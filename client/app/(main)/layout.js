import TwoFacterDrawer from '@/components/drawers/TwoFactorDrawer';

export const metadata = {
  title: 'Krypton',
  description: '2FA Smart Contract Wallet',
};

export default function LandingLayout({ children }) {
  return (
    <>
      <TwoFacterDrawer />
      <div className="w-full 2xl:px-[18%] px-5 flex flex-col">{children}</div>
    </>
  );
}
