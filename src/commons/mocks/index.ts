import { setupServer } from "msw/node";
import { apis } from "./apis";

// apis.ts에 모아둔 handler들을 사용해 테스트용 mock server를 만든다.
// 실제로 서버를 켜고 끄는 시점은 jest.setup.ts에서 관리한다.
export const server = setupServer(...apis);
