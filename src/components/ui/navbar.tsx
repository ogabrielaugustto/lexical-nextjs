import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  return (
    <nav className="h-14 border-b border-zinc-200 px-5 py-2 bg-white dark:bg-stone-900 dark:border-zinc-700">
      <div className="container h-full flex items-center justify-between">
        <div className="text-black dark:text-white">Lexical in Nextjs</div>
        <div className="flex items-center">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
