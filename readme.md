# dataclips-cli

A tool for managing [Heroku Dataclips](https://devcenter.heroku.com/articles/dataclips) programmatically.

## Background

Dataclips are a great tool for BI and data analysis tasks on top of Heroku
Postgres, but are limited by their web-only interface. With `dataclips-cli` you
can easily manage these queries as flat files instead, enabling dataclips
updates as part of a CI workflow, tracking revision history, etc.

## Getting Started

Requires [deno](https://deno.land/) and the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli);

First, create a dataclip via [the web
interface](https://data.heroku.com/dataclips). It will have a URL similar to
`https://data.heroku.com/dataclips/vgntjcbwfakfsxhdmrmzmliwftts`.

`vgntjcbwfakfsxhdmrmzmliwftts` is the "slug" of the dataclip.

Create a `.json` file containing slugs of all of the dataclips you wish to delete.

```json
[
    "ebmroiuqsyghwjapxqaavdqpbakb",
    "oeqfmplqbwttrjwfcfvtoaprufta",
    "maqwkisowgexbwuswqfnszmodxrx"
]
```

**Hint** While in the web interface you can copy and paste the following into the browser console to list all slugs on the page. If you have more than one page of dataclips, repeat for each page.

```javascript
let arr = Array.from(document.querySelectorAll("[href^='/dataclips/'")).map(node => {
    return node.getAttribute("href").match(/\/dataclips\/(\w+)/)[1]
})
let set = new Set(arr)
Array.from(set)
```

## Usage

```
# Delete some dataclips
$ deno run --allow-read --allow-env --allow-net index.ts example.json
```

## Authentication

dataclips-cli reads your Heroku API key from `~/.netrc` (where the Heroku CLI
writes it), or uses the environment variable `HEROKU_API_KEY` if available, e.g:

```
$ HEROKU_API_KEY=mykey deno run ... etc
```

## CLI Development / Release Process

Uses [version](https://github.com/dylanpyle/version) for version management
```
$ deno run -A https://deno.land/x/version/index.ts patch
$ git push --follow-tags
```
— will be automatically deployed to https://deno.land/x/dataclips_cli

## Disclaimers

This tool was created by emulating Heroku's browser APIs. It's not officially
supported or endorsed by Heroku, and may break at any time. Community
participation in keeping it running is strongly encouraged.

## License

MIT
