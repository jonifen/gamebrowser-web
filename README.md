# GameBrowser Web

This is a web application which is essentially a UI wrapper for my [GameBrowser API](https://github.com/jonifen/gamebrowser).

It was initially part of the API repository, but I've since extracted it into its own repository for better separation.

## Docker steps

```
docker build -t jonifen/gamebrowser-web .
```

```
docker run -d --name gamebrowser-web -p 9001:80 --restart=always jonifen/gamebrowser-web
```