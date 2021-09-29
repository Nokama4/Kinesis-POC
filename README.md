# Slacklike

## Description 🔎

Small humble app to recreate a few of Slack features 🤓

## Installation

### Fixtures
```
$ yarn dev:fixtures
```

This command will create users, chat and messages

### Update config

Duplicate `config/development.sample.json`, rename it `development.json` and fill it at your convenience

### Clone, install and run

```
$ git clone https://github.com/Nokama4/Slacklike-app.git
$ cd Slacklike-app
$ cd client && yarn && cd .. && yarn && yarn dev
```

## TODO

[More to come](https://github.com/Nokama4/Slacklike-app/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc)

- Chat integration
- Websocket with socket.io in front (React Context) & back
- Private or group chat
- Video conference
