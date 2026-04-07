export default function ExternalFooter() {
  return (
    <footer
      className="border-t p-4 text-center text-sm text-gray-500"
      suppressHydrationWarning
    >
      © {new Date().getFullYear()} Acharya Pack Scan
    </footer>
  );
}
