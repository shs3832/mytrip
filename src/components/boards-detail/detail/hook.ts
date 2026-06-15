import { ApolloError, useMutation } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";

import {
  LIKE_BOARD,
  DISLIKE_BOARD,
} from "@/components/boards-detail/detail/queries";
import { Modal } from "antd";
import { FetchBoardQuery } from "@/commons/graphql/graphql";
import { useState } from "react";
export default function useBoardDetail({ data }: { data: FetchBoardQuery }) {
  const params = useParams();
  const router = useRouter();
  const [like_board] = useMutation(LIKE_BOARD);
  const [dislike_board] = useMutation(DISLIKE_BOARD);

  const handleBackToList = () => {
    router.push("/mytrip/boards");
  };

  const handleEditPage = () => {
    router.push(`/mytrip/boards/${params.boardId}/edit`);
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
  const youtubeId = getYoutubeID(data?.fetchBoard.youtubeUrl ?? "");

  const [likeCount, setLikeCount] = useState(data?.fetchBoard?.likeCount ?? 0);

  const handleLike = async () => {
    const prevLikeCount = likeCount;
    setLikeCount((prev) => prev + 1);
    try {
      const result = await like_board({
        variables: {
          boardId: String(params.boardId),
        },
      });

      const nextLikeCount = result.data?.likeBoard;

      if (typeof nextLikeCount === "number") {
        setLikeCount(nextLikeCount);
      }
    } catch (error) {
      setLikeCount(prevLikeCount);
      if (error instanceof ApolloError) {
        Modal.error({
          content:
            error.graphQLErrors[0]?.message ??
            "좋아요 처리에 실패했습니다. 잠시 후 다시시도해주세요.",
        });
        return;
      }
    }
  };

  const [disLikeCount, setDisLikeCount] = useState(
    data?.fetchBoard?.dislikeCount ?? 0,
  );

  const handleDislike = async () => {
    const prevDisLikeCount = disLikeCount;
    setDisLikeCount((prev) => prev + 1);
    try {
      const result = await dislike_board({
        variables: {
          boardId: String(params.boardId),
        },
      });
      const nextDislikeCount = result.data?.dislikeBoard;

      if (typeof nextDislikeCount === "number") {
        setDisLikeCount(nextDislikeCount);
      }
    } catch (error) {
      setDisLikeCount(prevDisLikeCount);
      if (error instanceof ApolloError) {
        Modal.error({
          content:
            error.graphQLErrors[0]?.message ??
            "싫어요 처리에 실패했습니다. 잠시 후 다시시도해주세요.",
        });
        return;
      }
    }
  };

  return {
    data,
    handleBackToList,
    handleEditPage,
    getYoutubeID,
    handleLike,
    handleDislike,
    likeCount,
    disLikeCount,
    youtubeId,
  };
}
