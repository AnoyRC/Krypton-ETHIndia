import OnBoardContainer from '@/components/layout/onBoard/OnboardContainer';
import TwoFacterDrawer from '@/components/drawers/TwoFactorDrawer';

export const metadata = {
  title: 'Krypton | Login',
  description: '2FA Smart Contract Wallet',
};

export default function OnBoardLayout({ children }) {
  return (
    <>
      <TwoFacterDrawer />
      <OnBoardContainer>{children}</OnBoardContainer>
    </>
  );
}
