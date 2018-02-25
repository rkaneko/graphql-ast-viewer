GraphQL AST viewer
===

### Development

- Prerequisistes

```bash
$ docker-compose
docker-compose version 1.17.0
```

- Usage

```bash
# build src with watch mode
$ npm run watch:build

# run development server
$ docker-compose -f tools/docker/docker-compose.yml up --force-recreate web
```
