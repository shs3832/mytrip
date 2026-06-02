import { Input, Button } from "antd";
import { useProductCommentWrite } from "./hook";
import { useEffect } from "react";
const { TextArea } = Input;

export default function ProductDetailQuestionWriteComponent({
  isEdit,
  setIsEditQuestion,
  question,
}: {
  isEdit?: boolean;
  setIsEditQuestion?: React.Dispatch<React.SetStateAction<boolean>>;
  question?: {
    _id: string;
    contents: string;
    createdAt: string;
    user: { name: string };
  };
}) {
  const {
    handleQuestionSubmit,
    handleUpdateQuestion,
    questionText,
    setQuestionText,
  } = useProductCommentWrite();

  useEffect(() => {
    if (isEdit && question) {
      setQuestionText(question.contents);
    } else {
      setQuestionText("");
    }
  }, [isEdit, question, setQuestionText]);

  return (
    <>
      <div className="flex flex-col gap-4">
        <TextArea
          placeholder="문의 내용을 입력해주세요."
          rows={4}
          className="w-full h-24 border border-gray-300 rounded-lg p-2"
          id="question"
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
        />
        <div className="flex gap-2 mt-2 items-center justify-end">
          {isEdit && (
            <Button
              type="default"
              color="default"
              variant="outlined"
              size="large"
              className="ml-auto"
              onClick={() => {
                setIsEditQuestion?.(false);
              }}
            >
              취소
            </Button>
          )}
          <Button
            type="primary"
            size="large"
            onClick={
              isEdit
                ? () => {
                    if (question) {
                      handleUpdateQuestion(question._id, questionText);
                      setIsEditQuestion?.(false);
                    }
                  }
                : () => handleQuestionSubmit(questionText)
            }
          >
            {isEdit ? "문의수정" : "문의하기"}
          </Button>
        </div>
      </div>
    </>
  );
}
