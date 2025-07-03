import { User } from "@/types/user";

interface Props {
  user: User;
}

export default function UserCard({ user }: Props) {
  return (
    <div className="border rounded-xl p-4 text-center shadow-sm hover:shadow-md transition">
      <div className="w-16 h-16 mx-auto bg-gray-300 rounded-full mb-3" />
      <h3 className="text-lg font-bold">{user.username}</h3>
      <p className="text-gray-500">{user.bio}</p>
    </div>
  );
}
