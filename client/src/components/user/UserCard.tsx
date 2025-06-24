import { User } from "@/types/user";

export default function UserCard({ user }: { user: User }) {
  return (
    <div className="border p-4 rounded-md">
      <h4 className="font-bold">{user.username}</h4>
      <p className="text-sm text-gray-500">{user.email}</p>
    </div>
  );
}
