"use client";

import Link from "next/link";
import { tv } from "tailwind-variants";
import { NavItem } from "./NavBarDecider";
import { usePathname } from "next/navigation";

const navbarStyles = tv({
  slots: {
    container: "w-full bg-white border-b border-gray-200 ",
    nav: "flex items-center justify-between px-6 py-4 max-w-7xl mx-auto",
    logoContainer: "flex items-center gap-3",
    logo: "flex items-center",
    separator: "h-8 w-px bg-gray-300",
    navList: "flex items-center gap-8 list-none",
    navLink: "text-black font-normal text-base hover:opacity-80 transition-opacity relative pb-1 ",
    connectButton: "bg-[#FFC857] text-black font-normal text-base px-4 py-2 rounded-lg hover:opacity-90 transition-opacity",
  },
  variants: {
    active: {
      true: {
        navLink: "after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#d52a7a]",
      },
      false: {
        navLink: "",
      },
    },
  },
});

// Logo component - purple wavy shape with pink heart
const Logo = () => (
  <div className="relative w-10 h-10">
    {/* Purple wavy/blob shape */}
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute"
    >
      <path
        d="M25 8C28 6 32 8 34 12C36 16 35 20 33 24C31 28 28 30 25 32C22 34 18 35 15 34C12 33 10 30 9 27C8 24 7 21 8 18C9 15 11 12 14 10C17 8 20 7 23 8C24 8 24.5 8 25 8Z"
        fill="#3f5ab9"
      />
    </svg>
    {/* Pink heart outline - positioned to partially overlap */}
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute top-1 left-1"
    >
      <path
        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        stroke="#d52a7a"
        strokeWidth="1.5"
        fill="none"
      />
    </svg>
  </div>
);

export default function Navbar({
  navItems,
}: {
  navItems: NavItem[];
}) {
  const pathname = usePathname();
  const styles = navbarStyles();

  return (
    <nav className={styles.container()}>
      <div className={styles.nav()}>
        <div className={styles.logoContainer()}>
          <Link href="/" className={styles.logo()}>
            <Logo />
          </Link>
          <div className={styles.separator()} />
        </div>
        <ul className={styles.navList()}>
          {navItems.map(({ name, href, isButton }) => {
            const isActive = pathname === href;
            if (isButton) {
              return (
                <li key={href}>
                  <Link href={href} className={styles.connectButton()}>
                    {name}
                  </Link>
                </li>
              );
            }
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={styles.navLink({ active: isActive })}
                >
                  {name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
