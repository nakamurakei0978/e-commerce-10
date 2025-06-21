# Deployment Guide for Render

## Environment Variables Required

Make sure to set these environment variables in your Render dashboard:

1. **MONGO_URL** - Your MongoDB connection string
2. **JWT_SECRET** - Secret key for JWT token signing

## Build Configuration

The project is configured to:
- Build command: `npm run build`
- Start command: `npm start`

## Node.js Version

The project requires Node.js 18 or higher.

## Common Issues Fixed

1. ✅ ES6 module support with proper webpack configuration
2. ✅ Correct Procfile pointing to npm start
3. ✅ Environment variable validation
4. ✅ Updated Node.js engine requirement
5. ✅ Proper Babel configuration for ES6+ features

## Deployment Steps

1. Connect your GitHub repository to Render
2. Set the environment variables in Render dashboard
3. Deploy - Render will automatically run the build and start commands
4. Monitor the logs for any issues

## Troubleshooting

If deployment fails:
1. Check that all environment variables are set
2. Verify your MongoDB connection string is correct
3. Check the build logs for any compilation errors
4. Ensure your MongoDB instance is accessible from Render's servers 