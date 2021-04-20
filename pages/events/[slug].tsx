import { useRouter } from "next/router";

import { Layout } from "../../components/Layout";

export default function MyEvent() {
  const router = useRouter();

  return (
    <Layout>
      <h3>My Event</h3>
      {router.query.slug}
    </Layout>
  );
}
