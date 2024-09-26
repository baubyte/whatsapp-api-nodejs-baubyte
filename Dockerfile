

FROM node:20-alpine

LABEL name="Whatsapp Api Nodejs"

ENV APP_ENV=development \
    APP_BASE_DIR=/home/node/app

ARG uid
ARG PORT=3333
USER root
RUN apk add git  --no-cache git

RUN mkdir -p ${APP_BASE_DIR}/node_modules && \
    chown -R node:node ${APP_BASE_DIR}

USER node
WORKDIR ${APP_BASE_DIR}

EXPOSE ${PORT}
CMD ["npm", "start"]