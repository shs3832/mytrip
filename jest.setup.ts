import { beforeAll, afterAll, afterEach } from "@jest/globals";
import { server } from "@/commons/mocks";

// 테스트 전체가 시작되기 전에 MSW mock server를 켠다.
// 이후 테스트에서 발생하는 GraphQL 요청은 실제 백엔드가 아니라 mocks/apis.ts에서 처리된다.
beforeAll(() => server.listen());

// 테스트 전체가 끝나면 mock server를 종료한다.
afterAll(() => server.close());

// 테스트마다 server.use(...)로 덮어쓴 handler를 기본 상태로 되돌린다.
// 성공/실패 시나리오가 서로 섞이지 않게 하는 안전장치다.
afterEach(() => server.resetHandlers());
