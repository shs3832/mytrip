import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  // Next.js 설정(next.config, path alias, CSS 처리 등)을 Jest에서도 읽게 한다.
  dir: "./",
});

// Add any custom config to be passed to Jest
// msw 적용전
// const config: Config = {
//   coverageProvider: "v8",
//   testEnvironment: "jsdom",
//   // Add more setup options before each test is run
//   // setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
// };

// msw 적용후
const config: Config = {
  coverageProvider: "v8",
  // MSW v2 테스트에서 필요한 fetch/Request 계열 Web API를 jsdom보다 안정적으로 제공한다.
  testEnvironment: "jest-fixed-jsdom",

  // 각 테스트 파일 실행 전에 MSW 서버를 켜는 setup 파일을 먼저 실행한다.
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],

  // 패키지 export 조건 때문에 테스트 환경에서 모듈 해석이 꼬일 때를 줄이기 위한 옵션이다.
  testEnvironmentOptions: {
    customExportConditions: [""],
  },
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);
