module.exports = {
  apps: [
    {
      name: "questora-web",
      script: "./.output/server/index.mjs",
      autorestart: true,
      time: true,
      watch: ".",
       env: {
        HOST: "0.0.0.0",
        PORT: 3000,
        NODE_ENV: "development"
      },
      env: {
        HOST: "0.0.0.0",
        PORT: 3000,
        NODE_ENV: "staging"
      },
      env_production: {
        HOST: "127.0.0.1",
        PORT: 3000,
        NODE_ENV: "production",
      },
    },
  ],
};
