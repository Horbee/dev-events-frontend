import Link from "next/link";

import { Layout } from "@/components/Layout";

export default function AboutPage() {
  return (
    <Layout title="About Dev events">
      <h1>About</h1>
      <p>This is an app to find the latest Developer events.</p>
      <p>Version: 1.0.0</p>
      <Link href="/">Home</Link>
    </Layout>
  );
}
