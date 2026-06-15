import useBoardCommentList from "@/components/boards-detail/comment-list/hook";

import InfiniteScroll from "react-infinite-scroll-component";
import BoardCommentItem from "@/components/boards-detail/comment-list-item";

export default function BoardCommentList() {
  const { data, hasMore, onNext } = useBoardCommentList();

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
