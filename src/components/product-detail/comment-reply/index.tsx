import { EnterOutlined, UserOutlined } from "@ant-design/icons";
import { gql, useQuery } from "@apollo/client";
const FETCH_TRAVEL_PRODUCT_QUESTION_ANSWER = gql`
  query fetchTravelproductQuestionAnswers(
    $page: Int
    $travelproductQuestionId: ID!
  ) {
    fetchTravelproductQuestionAnswers(
      page: $page
      travelproductQuestionId: $travelproductQuestionId
    ) {
      _id
      contents
      travelproductQuestion {
        _id
      }
      createdAt
      updatedAt
      user {
        _id
        name
        email
      }
    }
  }
`;

export default function ProductDetailQuestionReplyComponent({
  id,
}: {
  id: string;
  setIsEditQuestion?: React.Dispatch<React.SetStateAction<boolean>>;
  isEdit?: boolean;
}) {
  const { data: reply } = useQuery(FETCH_TRAVEL_PRODUCT_QUESTION_ANSWER, {
    variables: {
      travelproductQuestionId: id,
    },
  });
  console.log(reply);
  if (reply?.fetchTravelproductQuestionAnswers?.length === 0) return;
  return (
    <>
      {reply?.fetchTravelproductQuestionAnswers?.map((el, index) => {
        return (
          <div className="pl-5 mt-4">
            <div className="flex items-start gap-4">
              <EnterOutlined className="scale-x-[-1] text-sm self-start mt-1" />
              <div className="w-full">
                <div className="comment-header flex items-center">
                  <div className="profile-info flex items-center ">
                    <span className="block w-full h-full rounded-[50%]">
                      <UserOutlined />
                    </span>
                    <span className="text-sm text-gray-700 ml-1 shrink-0">
                      asdasd
                    </span>
                  </div>
                  <div className="comment-btns ml-auto flex items-center gap-2">
                    <button>수정</button>
                    <button>삭제</button>
                  </div>
                </div>
                <div className="comment-body text-base mt-2 text-gray-800">
                  asdasd
                </div>
                <p className="comment-date text-xs mt-2 text-gray-700">
                  2026.01.01
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
