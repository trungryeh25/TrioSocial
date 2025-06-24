export default function Avatar({ src }: { src?: string }) {
  return src ? (
    <img src={src} alt="avatar" className="w-16 h-16 rounded-full" />
  ) : (
    <div className="w-16 h-16 rounded-full bg-gray-300" />
  );
}
