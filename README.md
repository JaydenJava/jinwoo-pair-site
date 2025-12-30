JINWOO-XMD 🤖

![JINWOO-XMD Banner](https://files.catbox.moe/x1onpj.jpg)

<div align="center">

[![Node.js Version](https://img.shields.io/badge/node-%3E%3D16.0.0-green)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/express-4.x-blue)](https://expressjs.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/JaydenJava/JINWOO-XMD/pulls)
[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template?template=https%3A%2F%2Fgithub.com%2FJaydenJava%2FJINWOO-XMD)

**A sophisticated WhatsApp bot pairing system with secure authentication**

*Now optimized for Railway deployment with simplified session storage*

</div>

## ✨ Features

### 🔐 **Dual Authentication Methods**
- **QR Code Scanner** - 30-second expiry with live countdown
- **Pairing Code Generator** - Secure alphanumeric codes
- **Local session storage** - No external dependencies required

### 🎨 **Modern UI/UX**
- Cyberpunk-inspired interface with neon aesthetics
- Fully responsive design for all devices
- Real-time status updates and progress indicators
- Animated particle effects and smooth transitions

### 🔒 **Security Features**
- Temporary session storage with auto-cleanup
- Secure credential handling
- Automatic session termination after pairing
- No persistent data storage
- Simplified mega.js with no external credentials

### ⚡ **Technical Capabilities**
- Built on Baileys WhatsApp API
- Express.js backend with RESTful endpoints
- Railway-optimized deployment
- Environment-based configuration

## 🚀 Quick Deployment

### **Option 1: Railway.app (Recommended - One-Click)**
[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template?template=https%3A%2F%2Fgithub.com%2FJaydenJava%2FJINWOO-XMD)

**One-click setup:**
1. Click the "Deploy on Railway" button above
2. Authorize with GitHub
3. Railway will automatically:
   - Clone your repository
   - Install dependencies
   - Configure the environment
   - Deploy the application
4. Your app will be live in 2-3 minutes!

### **Option 2: Manual Railway Setup**
```bash
# 1. Fork this repository
# 2. Install Railway CLI
npm i -g @railway/cli

# 3. Login to Railway
railway login

# 4. Create a new project
railway init

# 5. Link to your repository
railway link

# 6. Deploy
railway up
```

### **Option 3: Manual Setup (Local)**
```bash
# Clone the repository
git clone https://github.com/JaydenJava/JINWOO-XMD.git
cd JINWOO-XMD

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Start the server
npm start

# The app will be available at http://localhost:3000
```

## 📁 Project Structure

```
JINWOO-XMD/
├── 📄 index.js              # Main Express server
├── 📄 gen-id.js             # ID generation utility
├── 📄 pair.js               # Pairing code endpoint
├── 📄 qr.js                 # QR generation endpoint
├── 📄 mega.js               # Simplified session ID generator
├── 📄 package.json          # Dependencies and scripts
├── 📄 railway.toml          # Railway deployment configuration
├── 📄 .env.example          # Environment template
├── 📄 README.md             # This documentation
├── 📁 public/               # Static assets
│   ├── 🎨 main.html         # Main portal page
│   ├── 🔑 pair.html         # Pairing code interface
│   └── 📱 qr.html           # QR scanner interface
└── 📁 temp/                 # Temporary session storage (auto-created)
```

## 🔧 Configuration

### Environment Variables (For Railway Dashboard)
In your Railway project dashboard, go to **Settings → Variables** and add:

| Variable | Value | Required | Description |
|----------|-------|----------|-------------|
| `PORT` | `3000` | ✅ | Server port |
| `NODE_ENV` | `production` | ✅ | Environment |
| `SESSION_SECRET` | `[random_string]` | ✅ | Session encryption |

**Note:** The simplified version requires **NO external credentials** - everything works with local session storage!

### Railway-Specific Features
- **Auto HTTPS**: Railway provides SSL certificates automatically
- **Health Checks**: App includes `/health` endpoint for monitoring
- **Auto-restart**: Configured to restart on failure
- **Logging**: Access logs via Railway dashboard
- **Custom Domain**: Add your own domain in Railway settings

## 🌐 Usage Guide

### **Accessing the Portal**
1. Navigate to your Railway URL (e.g., `https://jinwoo-xmd.up.railway.app`)
2. Choose between QR or Pairing Code methods
3. Follow on-screen instructions

### **QR Code Method**
```
1. Click "QR Code Scanner"
2. Open WhatsApp → Settings → Linked Devices
3. Tap "Link a Device" and scan the QR code
4. Wait for automatic connection (30 seconds max)
5. Session ID will be sent to your WhatsApp
```

### **Pairing Code Method**
```
1. Click "Pairing Code"
2. Enter WhatsApp number with country code
3. Click "Generate" button
4. Use the generated code in WhatsApp Web
5. Session ID will be sent to your WhatsApp
```

## 🔧 API Endpoints

| Endpoint | Method | Description | Response |
|----------|--------|-------------|----------|
| `/` | GET | Main portal interface | HTML page |
| `/qr` | GET | QR code scanner page | HTML page |
| `/pair` | GET | Pairing code generator | HTML page |
| `/server` | GET | Generate QR code image | Image/SVG |
| `/code?number=XXXX` | GET | Generate pairing code | JSON: `{code: "XXXX"}` |
| `/health` | GET | Health check for Railway | JSON status |
| `/cleanup` | GET | Clean temp directory (debug) | JSON response |

## ⚙️ Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `@whiskeysockets/baileys` | ^6.7.17 | WhatsApp Web API |
| `express` | ^4.18.1 | Web framework |
| `qrcode` | ^1.5.3 | QR generation |
| `pino` | ^8.1.0 | Logging |
| `compression` | ^1.7.4 | Response compression |
| `helmet` | ^7.0.0 | Security headers |
| `morgan` | ^1.10.0 | HTTP request logging |

## 📱 Preview

<div align="center">
  
  *Main Portal Interface*
</div>

## 🛡️ Security Notes

✅ **Security Improvements in Railway Version:**
- **No hardcoded credentials** in codebase
- **Local session storage** only
- **Auto-cleanup** of temporary files
- **Environment variables** for configuration
- **HTTPS enforced** by Railway

⚠️ **Important Security Considerations:**
1. **Temporary Files**: All session files are automatically deleted after use
2. **Numbers**: Update contact numbers in HTML files if needed
3. **Environment**: Railway provides secure environment variable storage
4. **HTTPS**: Railway automatically provides HTTPS

## 🐛 Troubleshooting

### **Railway-Specific Issues**

| Issue | Solution |
|-------|----------|
| **Build Fails** | Check Railway logs, ensure Node.js version >=16 |
| **App Crashes** | Check `/health` endpoint, verify environment variables |
| **QR Not Working** | Ensure temp directory permissions, check Railway logs |
| **Port Issues** | Railway sets PORT automatically, don't override |
| **Memory Limit** | Railway has memory limits, monitor in dashboard |

### **Logs & Debugging**
```bash
# View Railway logs
railway logs

# Check deployment status
railway status

# Open Railway dashboard
railway open

# View environment variables
railway variables list
```

### **Local Testing**
```bash
# Test before deploying
npm test

# Check for vulnerabilities
npm audit

# Fix automatically (if available)
npm audit fix
```

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 Jayden Java

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

### **Development Guidelines**
- Follow existing code style
- Add comments for complex logic
- Update documentation as needed
- Test changes thoroughly before PR

## 👨‍💻 Developer

**Jayden Java** - Full Stack Developer

- GitHub: [@JaydenJava](https://github.com/JaydenJava)
- WhatsApp Channel: [Join Here](https://whatsapp.com/channel/0029Vb6FtUCIiRoldfIYio19)
- Project Repository: [JINWOO-XMD](https://github.com/JaydenJava/JINWOO-XMD)

## 🌟 Support

- ⭐ **Star this repository** if you found it helpful
- 🐛 **Report issues** on [GitHub Issues](https://github.com/JaydenJava/JINWOO-XMD/issues)
- 💬 **Join** our [WhatsApp Channel](https://whatsapp.com/channel/0029Vb6FtUCIiRoldfIYio19) for updates
- 🔧 **Contribute** by submitting pull requests
- 📢 **Share** with others who might find it useful

## 📞 Need Help?

- **Documentation**: Check this README first
- **Issues**: Use GitHub Issues for bug reports
- **Railway Support**: Check [Railway Docs](https://docs.railway.app/)
- **Customization**: Fork and modify for your needs

---

<div align="center">

### **🚀 Ready to Deploy?** [Click Here to Deploy on Railway](https://railway.app/new/template?template=https%3A%2F%2Fgithub.com%2FJaydenJava%2FJINWOO-XMD)


**Made with ❤️ by Jayden Java**

*Disclaimer: This project is for educational purposes. Use responsibly and in compliance with WhatsApp's Terms of Service.*

</div>
