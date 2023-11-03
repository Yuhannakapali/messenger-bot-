# messenger-bot-

This is messenger chat bot which is integrated into facebook pages which replies to user messages.

## Acknowledgements

- [Awesome Readme Templates](https://awesomeopensource.com/project/elangosundar/awesome-README-templates)
- [Awesome README](https://github.com/matiassingers/awesome-readme)
- [How to write a Good readme](https://bulldogjob.com/news/449-how-to-write-a-good-readme-for-your-github-project)

## API Reference

#### triggering the webhook and verified by facebook

```http
  GET /webhook
```

### detects the body and type of actions and response accordingly

```http
  POST /webhook
```

### Appendix

To make a messenger bot for pages, firstly we
need a facebook developer's account.
Create a page and app and link page with app.
we would need page id, access_token, app_id, app_secret and shouldn't shared to others.

## Authors

- [@Yuhannakapali](https://www.github.com/Yuhannakapali)
- [@upeshchalise](https://www.github.com/upeshchalise)

## Contributing

Contributions are always welcome!

## Documentation

[Facebook developers](https://developers.facebook.com),[messenger platform](https://developers.facebook.com/docs/messenger-platform)

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

PORT =

# Page and Application information

PAGE_ID=
APP_ID=
PAGE_ACCESS_TOKEN=

# Your App secret can be found in App Dashboard -> Settings -> Basic

APP_SECRET=

# A random string that is used for the webhook verification request

VERIFY_TOKEN=

# URL where you host this code

# You can use a tunneling service or Heroku ex: https://mystic-wind-83.herokuapp.com

# It must be https, and without trailing slash.

APP_URL=

# URL of your website where the "shop now" is located

# Can be the same as your app domain URL ex: https://www.originalcoastclothing.com/

SHOP_URL=

```

```
