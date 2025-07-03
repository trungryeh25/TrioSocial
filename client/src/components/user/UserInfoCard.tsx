import { User } from "../../../types/user";

interface Props {
  user: User;
}

export default function UserInfoCard({ user }: Props) {
  return (
    <div className="border rounded-xl p-4 shadow-sm">
      <h4 className="text-lg font-bold">{user.username}</h4>
      <p className="text-gray-600 mt-1">{user.email}</p>
      <p className="text-sm text-gray-500 mt-2">{user.bio}</p>
    </div>
  );
}
