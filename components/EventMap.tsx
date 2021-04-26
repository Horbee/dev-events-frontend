import "mapbox-gl/dist/mapbox-gl.css";

import { EventData } from "models/event";
import Image from "next/image";
import { useEffect, useState } from "react";
import Geocode from "react-geocode";
import ReactMapGl, { Marker } from "react-map-gl";

import { GOOGLE_MAP_API_KEY, MAPBOX_API_KEY } from "../config";

interface Viewport {
  latitude: number;
  longitude: number;
  width: string;
  height: string;
  zoom: number;
}

interface EventMapProps {
  evt: EventData;
}

export const EventMap = ({ evt }: EventMapProps) => {
  const [lat, setLat] = useState(40.712772);
  const [lng, setLng] = useState(-73.935242);
  const [loading, setLoading] = useState(true);
  const [viewport, setViewport] = useState<Viewport>({
    latitude: 40.712772,
    longitude: -73.935242,
    width: "100%",
    height: "500px",
    zoom: 12
  });

  useEffect(() => {
    // Get latitude & longitude from address.
    Geocode.fromAddress(evt.address).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        setLat(lat);
        setLng(lng);
        setViewport({ ...viewport, latitude: lat, longitude: lng });
        setLoading(false);
      },
      (error) => {
        console.error(error);
      }
    );
  }, []);

  Geocode.setApiKey(GOOGLE_MAP_API_KEY);

  if (loading) return <></>;

  return (
    <ReactMapGl
      {...viewport}
      mapboxApiAccessToken={MAPBOX_API_KEY}
      onViewportChange={(vp: Viewport) => setViewport(vp)}
    >
      <Marker key={evt.id} latitude={lat} longitude={lng}>
        <Image src="/images/pin.svg" width={30} height={30} />
      </Marker>
    </ReactMapGl>
  );
};
