import { useState, useEffect } from "react";
export default function useOpenApiComponent() {
  const [dogs, setDogs] = useState<string[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const getImages = 10;
  const getDogs = async () => {
    const data = await fetch(
      `https://dog.ceo/api/breed/hound/images/random/${getImages}`,
    );
    const result = await data.json();
    setDogs(result.message);
  };
  const onNext = async () => {
    const data = await fetch(
      `https://dog.ceo/api/breed/hound/images/random/${getImages}`,
    );
    const result = await data.json();
    setDogs((prev) => [...prev, ...result.message]);
    if (dogs?.length >= 100) setHasMore(false);
  };
  useEffect(() => {
    getDogs();
  }, []);
  return { dogs, onNext, hasMore };
}
