// ecosystem.config.js
module.exports = {
  apps: [
    {
      name: "vms-backend",
      cwd: "/var/www/vms-app/backend",
      script: "npm",
      args: "start",
      env: {
        NODE_ENV: "production",
        PORT: 4001
      }
    }
  ]
}
