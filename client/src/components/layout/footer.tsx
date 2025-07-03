// src/components/layout/Footer.tsx
export default function Footer() {
  return (
    <footer className="bg-gray-100 text-center text-sm py-4 border-t mt-6">
      Trio Social © {new Date().getFullYear()} - Community Platform. All rights
      reserved.
    </footer>
  );
}
