# LIFF Experimenting

Try at: [line://app/1632266434-nNxB6Vv7](line://app/1632266434-nNxB6Vv7)

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
