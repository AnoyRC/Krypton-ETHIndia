import DashboardHolder from "@/components/layout/main/dashboard/DashboardHolder";
import Navbar from "@/components/layout/main/dashboard/Navbar";

export const metadata = {
  title: "Krypton",
  description: "2FA Smart Contract Wallet",
};

export default function LandingLayout({ children }) {
  return (
    <div className="w-full h-screen flex flex-col">
      <Navbar />
      <DashboardHolder>{children}</DashboardHolder>
    </div>
  );
}
