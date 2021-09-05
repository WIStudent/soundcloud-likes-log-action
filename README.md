# Soundcloud Likes Log Action

Collects a list of your soundcloud likes and writes them into a json file.

## Inputs

## `username`

**Required** Your soundcloud user name. If the url to your soundcloud profile is `https://soundcloud.com/wistudent`, your username is `wistudent`.

## `output-path`

Path to where the resulting json should be written. Default: `likes.json`.

## Example usage

The following workflow collects the list of soundcloud likes once a week and commits any changes.

```yml
name: Update Log
on:
  schedule:
    - cron: '0 0 * * 0'

jobs:
  update-log:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: WIStudent/soundcloud-likes-log-action@v1
        with:
          username: wistudent
      - uses: EndBug/add-and-commit@v7
        with:
          add: likes.json
```