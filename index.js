import express from 'express'
import fetch from 'node-fetch'

const app = express()

app.get('/', async (req, res) => {
  const { prompt, id, token } = req.query
  if (!prompt || !id || !token) {
    return res.status(400).json({ error: 'Missing prompt, id or token' })
  }

  const url = `https://flex-image-generator.vercel.app/?prompt=${encodeURIComponent(prompt)}&id=${encodeURIComponent(id)}&token=${encodeURIComponent(token)}`
  
  try {
    const response = await fetch(url)
    const data = await response.json()
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch image data' })
  }
})

app.listen(3000)
