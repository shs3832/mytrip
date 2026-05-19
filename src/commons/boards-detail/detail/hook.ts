import { useQuery } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";

import { FetchBoardDocument } from "@/commons/graphql/graphql";

export default function useBoardDetail() {
  const params = useParams();
  const router = useRouter();
  const { data } = useQuery(FetchBoardDocument, {
    variables: {
      boardId: String(params.boardId),
    },
  });

  const handleBackToList = () => {
    router.push("../boards/new");
  };

  const handleEditPage = () => {
    router.push(`../boards/${params.boardId}/edit`);
  };

  const getYoutubeID = (value: string) => {
    try {
      const parsedUrl = new URL(value);

      // https://www.youtube.com/watch?v=abc123
      if (parsedUrl.hostname.includes("youtube.com")) {
        if (parsedUrl.pathname === "/watch") {
          return parsedUrl.searchParams.get("v");
        }

        // https://www.youtube.com/embed/abc123
        // https://www.youtube.com/shorts/abc123
        const paths = parsedUrl.pathname.split("/");
        return paths[2] || null;
      }

      // https://youtu.be/abc123
      if (parsedUrl.hostname === "youtu.be") {
        return parsedUrl.pathname.slice(1);
      }

      return null;
    } catch {
      return null;
    }
  };

  return {
    data,
    handleBackToList,
    handleEditPage,
    getYoutubeID,
  };
}
