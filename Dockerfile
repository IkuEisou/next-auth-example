FROM node:19

RUN apt-get -qy update && apt-get -qy install build-essential checkinstall zlib1g-dev wget

WORKDIR /usr/local/src
RUN wget https://www.openssl.org/source/openssl-3.1.0.tar.gz && tar -xvzf openssl-3.1.0.tar.gz

WORKDIR /usr/local/src/openssl-3.1.0
RUN ./Configure '-Wl,-rpath,$(LIBRPATH)' && make && make install
# ENV AUTH_SECRET `openssl rand -hex 32`

WORKDIR /usr/local/src
RUN rm -rf openssl-3.1.0 openssl-3.1.0.tar.gz

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
# RUN npm exec openai migrate
COPY . .
RUN bash -l -c 'echo export AUTH_SECRET="$(openssl rand -hex 32)" >> .env.local'
RUN npm run build

EXPOSE 3000

ENTRYPOINT [ "npm", "run", "dev" ]
