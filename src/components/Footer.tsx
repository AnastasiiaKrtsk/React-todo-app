export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 py-6">
      <div className="w-full items-center justify-between gap-2 text-center text-sm text-white/70 md:flex-row">
        <p>© {year} Nebula. Task Manager. All rights reserved.</p>

        <p>Built with ❤️ using React, TypeScript & Tailwind CSS</p>
      </div>
    </footer>
  );
};
