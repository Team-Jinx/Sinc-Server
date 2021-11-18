FROM node:14-alpine AS BUILD_IMAGE

# 앱 디랙터리 생성
WORKDIR /app

# 앱 의존성 설치
# 가능한 경우(npm@5+) package.json과 package-lock.json을 모두 복사하기 위해
# 와일드카드를 사용
COPY package*.json ./

# RUN npm ci --only=production && npm install typescript
RUN npm ci
ENV NODE_ENV=production

# 앱 소스 추가
COPY . .

RUN npx prisma generate

# test
# RUN npm run test

# build
RUN npm run build

# remove development dependencies
RUN npm prune --production

FROM node:14-alpine

WORKDIR /app

RUN apk add --no-cache tzdata && \
	cp /usr/share/zoneinfo/Asia/Seoul /etc/localtime && \
	echo "Asia/Seoul" > /etc/timezone \
	apk del tzdata

COPY --from=BUILD_IMAGE /app/dist ./dist
COPY --from=BUILD_IMAGE /app/node_modules ./node_modules
COPY --from=BUILD_IMAGE /app/package.json ./
COPY --from=BUILD_IMAGE /app/.env ./
COPY --from=BUILD_IMAGE /app/public ./public
COPY --from=BUILD_IMAGE /app/prisma ./

EXPOSE 3000

CMD [ "node", "dist/src/app" ]
