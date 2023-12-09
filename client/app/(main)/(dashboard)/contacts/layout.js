import AddContactsModal from '@/components/modal/AddContactsModal';
export const metadata = {
  title: 'Krypton | Contacts',
  description: '2FA Smart Contract Wallet',
};

export default function LandingLayout({ children }) {
  return (
    <>
      <AddContactsModal />
      {children}
    </>
  );
}
