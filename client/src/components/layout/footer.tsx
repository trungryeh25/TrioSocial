// src/components/layout/Footer.tsx
export default function Footer() {
  return (
    <footer className="bg-gray-100 text-center text-sm flex flex-col min-h-screen py-4 border-t mt-6">
      TrioVie Social Media © {new Date().getFullYear()}
    </footer>
  );
}
