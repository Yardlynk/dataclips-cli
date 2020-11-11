# dataclips-cli

A tool for managing [Heroku Dataclips](https://devcenter.heroku.com/articles/dataclips) programmatically.

Dataclips are a great tool for BI and data analysis tasks on top of Heroku
Postgres, but are limited by their web-only interface. With `dataclips-cli` you
can easily manage these queries as flat files instead, enabling dataclips
updates as part of a CI workflow, tracking revision history, etc.

## Usage

Requires [deno](https://deno.land/) and the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli);

First, create a dataclip via [the web
interface](https://data.heroku.com/dataclips). It will have a URL similar to
`https://data.heroku.com/dataclips/vgntjcbwfakfsxhdmrmzmliwftts`. 

`vgntjcbwfakfsxhdmrmzmliwftts` is the "slug" of the dataclip. 

Now create a file for your query with the following format:

```sql
-- clip_slug: vgntjcbwfakfsxhdmrmzmliwftts
-- title: A Test Dataclip

select count(*) from pg_user;
```

Then run the tool any time you want to make updates: 

```
$ deno run --allow-read --allow-env --allow-net src/index.ts test.sql
```

## Disclaimers

This tool was created by emulating Heroku's browser APIs. It's not officially
supported or endorsed by Heroku, and may break at any time. Community
participation in keeping it running is strongly encouraged.

## License

MIT