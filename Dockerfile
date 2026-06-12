# Node.js가 설치된 공식 이미지를 기반으로 컨테이너를 만든다.
# Next.js 14는 Node 20 이상에서도 동작하지만, 현재 의존성 중 Node 22를 요구하는 패키지가 있어 22를 사용한다.
FROM node:22

# 컨테이너 안에서 앞으로 명령어를 실행할 작업 폴더를 지정한다.
WORKDIR /my-trip

# package 파일만 먼저 복사하면, 소스 코드가 바뀌어도 의존성 설치 캐시를 재사용할 수 있다.
COPY package.json package-lock.json ./

# 이 프로젝트는 package.json에서 file:src/dataconnect-generated 로컬 패키지를 참조한다.
# 따라서 npm ci를 실행하기 전에 해당 폴더도 먼저 복사해야 한다.
COPY src/dataconnect-generated ./src/dataconnect-generated

# package-lock.json 기준으로 의존성을 정확히 설치한다.
# npm install보다 배포/CI 환경에서 재현성이 좋다.
RUN npm ci

# 의존성 설치가 끝난 뒤 실제 앱 소스 전체를 복사한다.
# .dockerignore에 적힌 파일과 폴더는 이 단계에서 제외된다.
COPY . .

# Next.js 프로덕션 빌드 결과물을 .next 폴더에 만든다.
RUN npm run build

# 컨테이너가 실행될 때 Next.js 프로덕션 서버를 시작한다.
# 기본적으로 next start는 3000번 포트를 사용한다.
CMD ["npm", "run", "start"]
