import { createServerApolloClient } from "@/commons/settings/apollo-server";
import { FETCH_BOARD } from "@/components/boards-detail/detail/queries";
export async function BoardsMetaData(id: string) {
  const client = createServerApolloClient();
  const removeHtmlTags = (html: string): string => {
    return html.replace(/<[^>]*>/g, "");
  };

  const { data } = await client.query({
    query: FETCH_BOARD,
    variables: {
      boardId: id,
    },
  });
  const getImage = data.fetchBoard.images[0] ? data.fetchBoard.images[0] : "";

  return {
    title: data.fetchBoard.title,
    description: removeHtmlTags(data.fetchBoard.contents),
    openGraph: {
      title: data.fetchBoard.title,
      description: removeHtmlTags(data.fetchBoard.contents),
      images: getImage,
    },
  };
}
