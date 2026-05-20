import InfiniteScroll from "react-infinite-scroll-component";
import useOpenApiComponent from "@/components/openapis-list/hook";

export default function OpenApisComponent() {
  const { dogs, onNext, hasMore } = useOpenApiComponent();
  return (
    <>
      <div id="comment-box" className="h-[500px] overflow-auto">
        <div className="">
          <InfiniteScroll
            dataLength={dogs.length}
            next={onNext}
            hasMore={hasMore}
            loader={
              dogs?.length < 100 && (
                <h4 className="text-center w-full my-10">Loading...</h4>
              )
            }
            endMessage={
              <p className="text-center w-full my-10">All items loaded.</p>
            }
            scrollableTarget="comment-box"
            className="flex items-center flex-wrap w-full gap-4"
          >
            {dogs?.map((el) => {
              return (
                <div key={el}>
                  <span>
                    <img src={el} width={200} height={200} alt="dog" />
                  </span>
                </div>
              );
            })}
          </InfiniteScroll>
        </div>
      </div>
    </>
  );
}
