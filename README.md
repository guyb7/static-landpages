# Static Landpages

Serves static HTML pages for multiple domains.

## Install
* `yarn install`
* create `config/config.env`:
```
NODE_ENV=development
PORT=3550
```

## Service
* `sudo chmod +x ./index.js`
* copy `config/static-landpages.service` to /etc/systemd/system
* `sudo systemctl daemon-reload`

## Deploy
```
cd /var/www/static-landpages
git checkout .
git clean -f -d
git pull
yarn install
chmod +x index.js
sudo systemctl restart static-landpages
```

## Development
```
yarn start
```
On localhost, set the query param `site=:site` to get a specific site.
