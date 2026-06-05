import { ApolloError, useMutation, useQuery } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";

import { FetchBoardDocument } from "@/commons/graphql/graphql";
import {
  LIKE_BOARD,
  DISLIKE_BOARD,
} from "@/components/boards-detail/detail/queries";
import { Modal } from "antd";
export default function useBoardDetail() {
  const params = useParams();
  const router = useRouter();
  const [like_board] = useMutation(LIKE_BOARD);
  const [dislike_board] = useMutation(DISLIKE_BOARD);
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

  const handleLike = async () => {
    try {
      await like_board({
        variables: {
          boardId: String(params.boardId),
        },
        optimisticResponse: {
          likeBoard: (data?.fetchBoard.likeCount ?? 0) + 1,
        },
        update: (cache, { data }) => {
          cache.modify({
            // 일부 데이터만 수정할 경우 writeQuery 보다 modify가 효과적
            id: cache.identify({
              __typename: "Board",
              _id: String(params.boardId),
            }),
            // __typename, _id 값으로 수정될 객체를 찾음
            fields: {
              likeCount() {
                return data?.likeBoard;
              },
            },
            // 해당 필드에서 likeCount 를 찾아 수정함
          });
        },
      });
    } catch (error) {
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

  const handleDislike = async () => {
    try {
      await dislike_board({
        variables: {
          boardId: String(params.boardId),
        },
        optimisticResponse: {
          dislikeBoard: (data?.fetchBoard.dislikeCount ?? 0) + 1,
        },
        update: (cache, { data }) => {
          cache.modify({
            id: cache.identify({
              __typename: "Board",
              _id: String(params.boardId),
            }),
            fields: {
              dislikeCount() {
                return data?.dislikeBoard;
              },
            },
          });
        },
      });
    } catch (error) {
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
  };
}
