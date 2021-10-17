# TararauBot 🤖
TararauBot is a foul mouthed Telegram Chatbot that was created... on a boring day 🙃. So his main purpose is still uncertain but one thing is for sure - he will make you and your friends laugh a couple times with his mocking persona.

What else can he do? Aside the jokes and jest banters, for now he can assist you and your group of friends in managing your [Rolês](https://www.dicionarioinformal.com.br/rol%C3%AA/) (meetups). I personally find him much more useful when used in groups of friends for this purpose.

**Bonus**: He won't forget (and *will* remind you) of your and your friends' birthdays 🎉

## Installation 🚀
You'll need the following applications in your machine in order to run TararauBot locally:

- NodeJS
- Yarn
- Docker

You will also need a *telegram chatbot api key* that you can get with [BotFather](https://telegram.me/BotFather)

Once you've cloned the project, rename the `.env-example` file to `.env` and fill it with the *telegram chatbot api key*. With that done, you can run the following command to download the dependencies and start the development server:

```
yarn && yarn dev
```

## How to contribute ✋

1. Fork this repository to your account by clicking on Fork

2. Clone your fork to your local git repository:
```
git clone https://github.com/[YOUR_USERNAME]/tararau-bot.git
```

3. Add the original repository to your git remotes:
```
git remote add upstream https://github.com/Ahavaz/tararau-bot.git
```

4. Fetch the original repository changes if there were any:
```
git fetch upstream
```

5. Merge the changes from the original repository into your local:
```
git merge upstream/master
```

6. Stage, commit and push your local changes to your fork:
```
git add .
git commit -m "[YOUR_CHANGES]"
git push origin master
```

7. Go to your fork, check if it's not behind the original repository and then click on Pull request

## Deployment 📦

Create the environment variables `BASE_URL` and `DATABASE_URL` in your Heroku application.

You can use the `Procfile` to deploy on your [Heroku](https://www.heroku.com/nodejs) application and in your Telegram Account to sync with it.

Here's a [tutorial](https://medium.com/matheus-rossi/telegram-bot-com-nodejs-9e107153046b) to set a chatbot with NodeJS.

## New contributor guide ✨

Here are some helpful resources to get you comfortable with open source contribution:

- [Finding ways to contribute to open source on GitHub](https://docs.github.com/en/get-started/exploring-projects-on-github/finding-ways-to-contribute-to-open-source-on-github)
- [Set up Git](https://docs.github.com/en/get-started/quickstart/set-up-git)
- [GitHub flow](https://docs.github.com/en/get-started/quickstart/github-flow)
- [Collaborating with pull requests](https://docs.github.com/en/github/collaborating-with-pull-requests)

### Good First Issues

Help is always welcome and you can start by adding more inputs/outputs to the bot, or even trying to integrate it with APIs provided by third parties 😉

## Built with 🧰

- TypeScript
- Express
- Prisma
- dayjs
- PostgreSQL

## Contributors 👥

<a href = "https://github.com/Tanu-N-Prabhu/Python/graphs/contributors">
  <img src = "https://contrib.rocks/image?repo = Ahavaz/tararau-bot"/>
</a>

### License 📄

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE) file for details
