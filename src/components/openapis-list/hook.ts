import { useState, useEffect } from "react";
import { IDogs } from "@/components/openapis-list/types";
export default function useOpenApiComponent() {
  const [dogs, setDogs] = useState<string[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const getImages = 10;
  const getDogs = async () => {
    const data = await fetch(
      `https://dog.ceo/api/breed/hound/images/random/${getImages}`,
    );
    const result: IDogs = await data.json();
    setDogs(result.message);
  };
  const onNext = async () => {
    const data = await fetch(
      `https://dog.ceo/api/breed/hound/images/random/${getImages}`,
    );
    const result: IDogs = await data.json();
    setDogs((prev) => {
      const nextDogs = [...prev, ...result.message];
      if (nextDogs.length >= 100) setHasMore(false);
      return nextDogs;
    });
  };
  useEffect(() => {
    getDogs();
  }, []);
  return { dogs, onNext, hasMore };
}
