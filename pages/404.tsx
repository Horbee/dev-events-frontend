import Link from "next/link";
import { FaFrown, FaTerminal } from "react-icons/fa";

import { Layout } from "@/components/Layout";
import styles from "@/styles/404.module.css";

const NotFound = () => {
  return (
    <Layout>
      <div className="d-flex justify-content-center align-items-center vh-60">
        <FaFrown className={styles.frown} />
        <div className={styles.explanation}>
          <h1 className={styles.notfound}>
            <FaTerminal />
            <strong> 404</strong>
          </h1>
          <p className="display-6">Your page is not found</p>
          <p className="lead">
            Sorry, the page you are looking for does not exists, or it may have
            been removed.
          </p>
          <Link href="/">Back to Homepage</Link>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
