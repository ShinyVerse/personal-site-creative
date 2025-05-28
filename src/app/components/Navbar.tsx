import Link from "next/link";

export default function Navbar() {
  return (
    <nav>
      <ul
        style={{ display: "flex", gap: "1rem", listStyle: "none", padding: 0 }}
      >
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/artwork">Artwork</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="/career">Career Portfolio</Link>
        </li>
      </ul>
    </nav>
  );
}
