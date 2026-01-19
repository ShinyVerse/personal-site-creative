"use client";

import Link from "next/link";
import Image from "next/image";
import { tv } from "tailwind-variants";
import { NavItem } from "./NavBarDecider";
import { usePathname } from "next/navigation";

const navbarStyles = tv({
  slots: {
    container: "w-full bg-white border-b border-gray-200",
    nav: "flex items-center justify-between px-6 py-4 max-w-[1800px] mx-auto",
    logoContainer: "flex items-center gap-3",
    logo: "flex items-center",
    navList: "flex items-center gap-8 list-none mx-20",
    navLink: "text-black font-normal text-base hover:text-brand-pink transition-opacity relative pb-1 text-xl",
    connectButton: "bg-brand-yellow text-black font-normal text-base px-4 py-2 rounded-lg hover:opacity-90 transition-opacity",
  },
  variants: {
    active: {
      true: {
        navLink: "after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-1 after:bg-brand-pink",
      },
      false: {
        navLink: "",
      },
    },
  },
});

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
          <Link href="/home" className={styles.logo()}>
            <div className="relative w-[60px] h-[60px]">
              <Image
                  src="/logo.png"
                  alt="website logo of a pink heart with a purple leaf in the background"
                  fill
                  priority
                />
            </div>
          </Link>

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
