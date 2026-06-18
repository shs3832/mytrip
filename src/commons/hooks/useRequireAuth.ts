import { useRouter } from "next/navigation";
import { useAccessTokenStore } from "../stores/accessToken";
import { useLoadStore } from "../stores/load-store";
import { useEffect } from "react";

export default function useRequireAuth() {
  const router = useRouter();
  const { accessToken } = useAccessTokenStore();
  const { isLoaded } = useLoadStore();

  const isLoggedIn = Boolean(accessToken);

  useEffect(() => {
    if (isLoaded && !isLoggedIn) {
      router.replace("/mytrip/login");
    }
  }, [isLoaded, isLoggedIn, router]);
  return {
    isLoaded,
    isLoggedIn,
    canRender: isLoggedIn && isLoaded,
  };
}
