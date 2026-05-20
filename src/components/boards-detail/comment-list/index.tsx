import useBoardCommentList from "@/components/boards-detail/comment-list/hook";

import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import BoardCommentItem from "@/components/boards-detail/comment-list-item";
import BoardCommentWrite from "@/components/boards-detail/comment-write";

export default function BoardCommentList() {
  const { data, fetchMore } = useBoardCommentList();
  // InfiniteScroll에 "더 불러올 댓글이 남아있는지" 알려주는 상태입니다.
  const [hasMore, setHasMore] = useState(true);

  const onNext = async () => {
    if (data === undefined) return;

    // fetchMore는 처음 useQuery로 가져온 댓글 목록에 이어서 다음 페이지를 요청합니다.
    await fetchMore({
      variables: {
        // 현재 화면에 쌓인 댓글 개수로 다음 페이지 번호를 계산합니다.
        page: Math.ceil(data?.fetchBoardComments?.length / 10 + 1),
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        // 추가 요청 결과가 없으면 기존 댓글 목록을 그대로 유지합니다.
        if (fetchMoreResult === undefined) {
          return {
            fetchBoardComments: [...prev.fetchBoardComments],
          };
        }
        if (fetchMoreResult.fetchBoardComments.length < 10) setHasMore(false);

        // 기존 댓글(prev) 뒤에 새로 받아온 댓글(fetchMoreResult)을 이어 붙입니다.
        return {
          fetchBoardComments: [
            ...prev.fetchBoardComments,
            ...fetchMoreResult.fetchBoardComments,
          ],
        };
      },
    });
  };
  return (
    <>
      <div className="mt-6 pt-6 border-t">
        {data?.fetchBoardComments?.length === 0 && (
          <p className="text-center">댓글이 없습니다.</p>
        )}
        <div id="comment-box" className="h-[500px] overflow-auto">
          <InfiniteScroll
            dataLength={data?.fetchBoardComments?.length ?? 0}
            next={onNext}
            hasMore={hasMore}
            loader={
              data?.fetchBoardComments?.length !== 0 && <h4>Loading...</h4>
            }
            endMessage={<p className="text-center">All items loaded.</p>}
            scrollableTarget="comment-box"
          >
            {data?.fetchBoardComments.map((el) => {
              return <BoardCommentItem key={`${el._id}`} el={el} />;
            })}
          </InfiniteScroll>
        </div>
      </div>
    </>
  );
}
