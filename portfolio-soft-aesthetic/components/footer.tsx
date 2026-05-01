"use client";

export function Footer() {
  return (
    <footer className="px-6 lg:px-[60px] pb-[40px] pt-[20px] flex flex-col sm:flex-row justify-between items-center sm:items-end text-[12px] text-muted-foreground max-w-[1440px] mx-auto w-full gap-4">
      <div>
        &copy; {new Date().getFullYear()} Milan Jani. Built with intent.
      </div>
      <div className="flex gap-[24px]">
        <a href="#" className="hover:text-foreground transition-colors">LinkedIn</a>
        <a href="#" className="hover:text-foreground transition-colors">Dribbble</a>
        <a href="#" className="hover:text-foreground transition-colors">Read.cv</a>
      </div>
    </footer>
  );
}
