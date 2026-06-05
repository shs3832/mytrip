import { useMutation } from "@apollo/client";
import {
  CREATE_TRAVEL_PRODUCT_QUESTION,
  FETCH_TRAVEL_PRODUCT_QUESTIONS,
  UPDATE_TRAVEL_PRODUCT_QUESTION,
} from "@/components/product-detail/queries";
import { useState } from "react";
import { useParams } from "next/navigation";
import { Modal } from "antd";

export function useProductCommentWrite() {
  const params = useParams();

  const [createTravelproductQuestion] = useMutation(
    CREATE_TRAVEL_PRODUCT_QUESTION,
  );
  const [updateTravelproductQuestion] = useMutation(
    UPDATE_TRAVEL_PRODUCT_QUESTION,
  );

  const [questionText, setQuestionText] = useState("");
  // setQuestion(isEdit ? question.contents : "");

  const handleQuestionSubmit = async (contents: string) => {
    // 문의하기 버튼 클릭 시 실행되는 함수

    if (contents.trim() === "") {
      // 질문 내용이 비어있는 경우, 제출하지 않고 함수 종료
      return;
    }

    try {
      await createTravelproductQuestion({
        variables: {
          createTravelproductQuestionInput: {
            contents: contents,
          },
          travelproductId: String(params.productId),
        },

        update: (cache, { data }) => {
          // cache는 Apollo 캐시, data는 mutation 응답 데이터이다.
          const newQuestion = data?.createTravelproductQuestion;
          // 방금 실행한 mutation 응답에서 새로 생성된 문의 데이터를 꺼낸다.
          if (!newQuestion) {
            return;
          }
          // 새 문의 데이터가 없으면 캐시를 수정하지 않는다.
          cache.modify({
            // Apollo 캐시에 저장된 특정 필드를 직접 수정한다.
            fields: {
              fetchTravelproductQuestions(prev = []) {
                // 기존 문의 목록(prev)의 앞에 새 문의를 추가한다.
                return [newQuestion, ...prev];
              },
            },
          });
        },
        // refetchQueries: [
        //   {
        //     query: FETCH_TRAVEL_PRODUCT_QUESTIONS,
        //     variables: {
        //       travelproductId: String(params.productId),
        //       page: 1,
        //     },
        //   },
        // ],
      });
      Modal.success({
        content: "문의가 등록되었습니다.",
      });
      setQuestionText("");
    } catch (error) {
      console.error("문의 등록 실패:", error);
    }
  };

  const handleUpdateQuestion = async (id: string, updatedContent: string) => {
    try {
      await updateTravelproductQuestion({
        variables: {
          travelproductQuestionId: id,
          updateTravelproductQuestionInput: {
            contents: updatedContent,
          },
        },
        refetchQueries: [
          {
            query: FETCH_TRAVEL_PRODUCT_QUESTIONS,
            variables: {
              travelproductId: String(params.productId),
              page: 1,
            },
          },
        ],
      });
      Modal.success({
        content: "문의가 수정되었습니다.",
      });
      // 문의 목록을 다시 불러오거나 상태를 업데이트하여 UI를 갱신할 수 있습니다.
    } catch (error) {
      console.error("문의 수정 실패:", error);
    }
  };
  return {
    handleQuestionSubmit,
    handleUpdateQuestion,
    questionText,
    setQuestionText,
  };
}
