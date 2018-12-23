# LIFF Experimenting

Try at: [line://app/1632266434-nNxB6Vv7](line://app/1632266434-nNxB6Vv7)

# TODO

- [ ] Hide optional fields by default.
- [ ] Visually group firles that need to be together e.g. fields for action and column.
- [ ] Add clone fields button.

# Deployment

## Docker

1. Build an image.

```
docker build -t <image_name> .
```

2. Run the built image.

```
docker run -p <your_port>:80 -d <image_name>
```

Now, go to `localhost:<your_port>` on your favorite browser.

## Heroku

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/nawawishkid/liff-experimenting)
