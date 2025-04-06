import Link from "next/link";

export default function Navbar() {
    return (
      <nav style={{ padding: "1rem", backgroundColor: "#f0f0f0" }}>
        <ul style={{ display: "flex", gap: "1rem", listStyle: "none" }}>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/profile">Profile</Link></li>
        </ul>
      </nav>
    );
  }