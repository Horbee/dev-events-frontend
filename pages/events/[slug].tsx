import { useRouter } from "next/router";

export default function MyEvent() {
  const router = useRouter();

  return (
    <div>
      <h3>My Event</h3>
      {router.query.slugy}
    </div>
  );
}
