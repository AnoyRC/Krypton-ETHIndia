import { AddGuardianWalletDialog } from '@/components/dialogs/AddGuardianWalletDialog';
export const metadata = {
  title: 'Krypton | Wallet',
  description: '2FA Smart Contract Wallet',
};

export default function LoginLayout({ children }) {
  return (
    <>
      <AddGuardianWalletDialog />
      {children}
    </>
  );
}
