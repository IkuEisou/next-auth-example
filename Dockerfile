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
# Local
RUN bash -l -c 'echo export AUTH_SECRET="$(openssl rand -hex 32)" >> .env.local'

# Production
# RUN bash -l -c 'echo export AUTH_SECRET="$(openssl rand -base64 33)" >> .env.prod'
#RUN AUTH_SECRET=="$(openssl rand -base64 33)" npm run build
# ENV NODE_ENV production
# RUN addgroup --system --gid 1001 nodejs
# RUN adduser --system --uid 1001 nextjs
# COPY --from=builder /app/public ./public
# Set the correct permission for prerender cache
# RUN mkdir .next
# RUN chown nextjs:nodejs .next
# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
# COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
# COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

EXPOSE 3000
# Local
ENTRYPOINT [ "npm", "run", "dev" ]

# Production
# USER nextjs
# ENV PORT 3000
# ENTRYPOINT [ "npm", "run", "start-prod" ]
# CMD HOSTNAME="0.0.0.0" node server.js
