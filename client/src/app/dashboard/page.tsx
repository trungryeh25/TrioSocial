// src/app/dashboard/page.tsx

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import UserCard from "@/components/user/UserCard";
import UserActionButtons from "@/components/user/UserActionButtons";
import { User } from "../../../types/user";

const demoUser: User = {
  id: "u1",
  username: "alice",
  email: "alice@example.com",
  bio: "Full-stack developer and coffee lover ☕",
};

export default function DashboardPage() {
  return (
    <>
      <Navbar />

      <main className="container mx-auto px-4 py-8 mt-16">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <UserCard user={demoUser} />
          <div className="flex items-center justify-center">
            <UserActionButtons
              onEdit={() => alert("Edit user")}
              onDelete={() => alert("Delete user")}
            />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
