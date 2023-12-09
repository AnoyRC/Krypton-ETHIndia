import OnBoardContainer from '@/components/layout/onBoard/OnboardContainer';

export const metadata = {
  title: 'Krypton | Login',
  description: '2FA Smart Contract Wallet',
};

export default function OnBoardLayout({ children }) {
  return (
    <>
      <OnBoardContainer>{children}</OnBoardContainer>
    </>
  );
}
