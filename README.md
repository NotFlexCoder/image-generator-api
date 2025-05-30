# 🖼️ Image Generator API

A simple Express.js API that acts as a proxy to the [`flex-image-generator`](https://flex-image-generator.vercel.app) service, allowing you to dynamically fetch AI-generated images using a prompt, user ID, and token.

Perfect for use in bots, web apps, and automation tools that rely on externally hosted image generation services.

---

## 🚀 Features

- 🧠 Sends AI image prompts to an external image generation API.
- 📡 Accepts `prompt`, `id`, and `token` via query parameters.
- ⚙️ Lightweight and minimalistic Express server.
- 🔄 Returns JSON data containing image response.
- 💥 Includes error handling for missing or failed requests.

---

## 🛠️ Requirements

- Node.js v14 or higher
- `express`
- `node-fetch` (v2 or ESM-compatible version)

---

## 📦 Installation

```bash
git clone https://github.com/your-username/flex-image-proxy.git
cd flex-image-proxy
npm install
```

---

## ▶️ Usage

### 1. **Start the Server**

```bash
node index.js
```

> This starts the API server at `http://localhost:3000`.

---

### 2. **Make a GET Request**

URL format:

```
http://localhost:3000/?prompt=YOUR_PROMPT&id=YOUR_ID&token=YOUR_TOKEN
```

#### Example:

```
http://localhost:3000/?prompt=A%20cat%20riding%20a%20bike&id=12345&token=abcde12345
```

The server will forward this request to:

```
https://flex-image-generator.vercel.app/?prompt=A%20cat%20riding%20a%20bike&id=12345&token=abcde12345
```

And return the resulting JSON.

---

## ❌ Error Handling

- Missing parameters:
  ```json
  {
    "error": "Missing prompt, id or token"
  }
  ```

- Server failure or external fetch error:
  ```json
  {
    "error": "Failed to fetch image data"
  }
  ```

---

## 🧩 Code Overview

```js
import express from 'express'
import fetch from 'node-fetch'

const app = express()

app.get('/', async (req, res) => {
  const { prompt, id, token } = req.query
  if (!prompt || !id || !token) {
    return res.status(400).json({ error: 'Missing prompt, id or token' })
  }

  const url = \`https://flex-image-generator.vercel.app/?prompt=\${encodeURIComponent(prompt)}&id=\${encodeURIComponent(id)}&token=\${encodeURIComponent(token)}\`
  
  try {
    const response = await fetch(url)
    const data = await response.json()
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch image data' })
  }
})

app.listen(3000)
```

---

## 📝 License

This project is licensed under the License – see the [LICENSE](https://github.com/NotFlexCoder/NotFlexCoder/blob/main/LICENSE) file for details.
