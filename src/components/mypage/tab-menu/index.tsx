import { IMypagePointsComponents } from "@/components/mypage/types";

export function MyPointsTabMenuComponents({
  menus,
  activeIndex,
  handleClickShow,
}: Pick<IMypagePointsComponents, "menus" | "activeIndex" | "handleClickShow">) {
  return (
    <div className="mt-8 mb-4">
      {menus.map((item, index) => {
        return (
          <button
            key={index}
            className={`py-2 px-3 ${item.label !== 0 && "ml-4"} ${activeIndex === index && "bg-black text-white rounded-lg font-bold"}`}
            onClick={() => {
              handleClickShow(index);
            }}
          >
            {item.value}
          </button>
        );
      })}
    </div>
  );
}
