import { EventData } from "models/event";
import Image from "next/image";
import { useRouter } from "next/router";

interface EventItemProps {
  evt: EventData;
}

export const EventItem: React.FC<EventItemProps> = ({ evt }) => {
  const router = useRouter();
  const imageSrc = evt.image
    ? evt.image.formats.thumbnail.url
    : "/images/event-default.jpg";

  const openEvent = () => {
    router.push(`/events/${evt.slug}`);
  };

  return (
    <div className="d-flex shadow-sm p-3 mb-2 rounded align-items-center event-card">
      <div className="flex-shrink-0">
        <Image src={imageSrc} width={170} height={100} />
      </div>
      <div className="flex-grow-1 ms-3">
        <p className="m-0">
          {new Date(evt.date).toLocaleDateString("de-DE")} at {evt.time}
        </p>
        <h4>{evt.name}</h4>
      </div>
      <button type="button" className="btn btn-danger" onClick={openEvent}>
        Details
      </button>
    </div>
  );
};
