import Link from "next/link";

import { Layout } from "@/components/Layout";
import styles from "@/styles/Home.module.css";

export default function HomePage() {
  return (
    <Layout>
      <div className={styles.landing}>
        <h1>Welcome To Dev Events</h1>
        <p className="fs-5">Find the hottest developer events nearby!</p>
      </div>
    </Layout>
  );
}
