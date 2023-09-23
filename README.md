# Sales API

## 🚀 Getting Started

Make sure you have both postgres and redis running locally **(with docker you can setup these databases with ease)**, then copy the _.env.example_ file to _.env_

## ☁️ AWS

This project uses some services provided by AWS, such as SES (Simple Email Service) and S3. You don't need to configure anything related to AWS, as the project already has local support for both email and storage services, however, if you want to use AWS, make sure you have all the necessary environment variables for this purpose.

## ⌨️ Running the project

After adding all environment variables, you can execute the project in dev mode, just run:

```bash
npm install # install all packages
npm run start:dev # execute project in dev mode
```

## 🐳 Docker

The easiest way to execute the project is by using Docker.
With Docker installed and the repo at hand, you just need to execute the following command:

```bash
docker-compose up
```

## 📝 License

This project is licensed under the MIT license. See the [LICENSE](./LICENSE.md) file for more details.
