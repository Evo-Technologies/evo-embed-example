# Evo Embed Example

A working example of how to embed Evo AI dashboards into a third-party application using iframe authentication.

## How It Works

1. A customer logs into **your app** (this example uses a simple email cookie)
2. Your backend calls the Evo AI embed auth API with your API key and the customer's email
3. The API returns a short-lived JWT token and a list of available pages
4. The `embed.js` snippet creates an iframe and handles token refresh automatically

```
Your App                          Evo AI Platform
--------                          ---------------
Customer logs in
        |
        v
embed.js calls /api/embed-token
        |
        v
Your backend adds X-API-Key  -->  POST /api/auth/embed
                                  Validates key, finds user
                              <-- Returns { token, embed: { pages } }
        |
        v
embed.js creates iframe      -->  /embed/dashboard?token=xxx
                                  Renders authenticated content
```

## Quick Start

```bash
# 1. Install
npm install

# 2. Configure
cp .env.example .env
# Edit .env with your API key and platform URL

# 3. Run
npm run dev
# Open http://localhost:3001
```

## Configuration

Create a `.env` file from the example:

```env
# Your Unkey API key (from the Evo AI Reseller dashboard)
RESELLER_API_KEY=unkey_xxx

# URL of the Evo AI Reseller platform
NEXT_PUBLIC_EVO_HOST=http://localhost:3000
```

## Project Structure

```
src/
  app/
    page.tsx                    # Dashboard with embedded panel
    login/page.tsx              # Demo login page
    api/
      embed-token/route.ts     # Token proxy (hides API key from browser)
      login/route.ts            # Sets user_email cookie
      logout/route.ts           # Clears user_email cookie
  components/
    embedded-panel.tsx          # Loads embed.js and initializes iframe
    dashboard-stats.tsx         # Example custom content
    logout-button.tsx           # Sign out button
  middleware.ts                 # Redirects to /login if no session
```

## Key Concepts

### Token Proxy

Your API key must **never** reach the browser. The token proxy endpoint (`/api/embed-token`) keeps it server-side:

```typescript
// Your backend adds the API key and forwards to the platform
const response = await fetch(`${EVO_HOST}/api/auth/embed`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': process.env.RESELLER_API_KEY,
  },
  body: JSON.stringify({ user_email: email }),
})
```

### Using embed.js

The `embed.js` snippet (served from the Evo platform) handles iframe creation, token exchange, and automatic refresh:

```html
<script src="https://your-evo-host.com/embed.js"></script>
<script>
  Evo.embed({
    el: '#evo-container',           // Container element or selector
    tokenEndpoint: '/api/embed-token', // Your token proxy
    user: 'customer@example.com',   // Customer's email
    page: 'dashboard',             // Optional: which page to show
    hideNav: false,                // Optional: hide sidebar navigation
    height: '700px',               // Optional: iframe height
    agentId: 'uuid',               // Optional: for multi-agent users
  })
</script>
```

The snippet returns a control object:

```javascript
const panel = Evo.embed({ ... })

panel.navigate('voice')  // Switch to a different page
panel.destroy()          // Remove the iframe and clean up
```

### Token Refresh

Tokens expire after 5 minutes. The `embed.js` snippet handles this automatically:

1. The iframe sends a `postMessage` to the parent window before the token expires
2. `embed.js` calls your `tokenEndpoint` for a fresh token
3. The new token is sent back to the iframe via `postMessage`
4. The session continues without interruption

No code needed on your side.

### Available Pages

Pages depend on the customer's industry template. The embed auth response includes the list:

```json
{
  "token": "eyJ...",
  "embed": {
    "template": "general",
    "template_name": "General",
    "pages": [
      { "id": "dashboard", "path": "/embed/dashboard", "label": "Calls" },
      { "id": "voice", "path": "/embed/voice", "label": "Voice" },
      { "id": "business", "path": "/embed/business", "label": "Business" }
    ]
  }
}
```

Use this to build navigation in your app, or let the embedded sidebar handle it.

### Multi-Agent Support

If a customer has multiple agents, pass the `agentId` option to select which one:

```javascript
Evo.embed({
  el: '#container',
  tokenEndpoint: '/api/embed-token',
  user: 'customer@example.com',
  agentId: 'agent-uuid-here',
})
```

You can discover agent IDs via the reseller API: `GET /api/reseller/users/{user_id}` returns an `agents` array.

## Manual Integration (without embed.js)

If you prefer full control over the iframe, you can implement the flow yourself:

```typescript
// 1. Fetch a token from your proxy
const res = await fetch('/api/embed-token', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: 'customer@example.com' }),
})
const { token } = await res.json()

// 2. Create the iframe
const iframe = document.createElement('iframe')
iframe.src = `https://your-evo-host.com/embed/dashboard?token=${token}&hideNav=true`
iframe.style.width = '100%'
iframe.style.height = '700px'
iframe.style.border = 'none'
document.getElementById('container').appendChild(iframe)

// 3. Handle token refresh (listen for postMessage from iframe)
window.addEventListener('message', (event) => {
  if (event.data?.type !== 'evo:token-refresh') return

  fetch('/api/embed-token', { method: 'POST', ... })
    .then(res => res.json())
    .then(data => {
      iframe.contentWindow.postMessage(
        { type: 'evo:token', token: data.token },
        new URL(iframe.src).origin
      )
    })
})
```

## URL Parameters

The embed iframe accepts these query parameters:

| Parameter | Required | Description |
|-----------|----------|-------------|
| `token`   | Yes      | JWT from `/api/auth/embed` |
| `hideNav` | No       | Set to `true` to hide the sidebar navigation |
| `hideLogo`| No       | Set to `true` to hide the reseller logo in the sidebar |

## Troubleshooting

**"Failed to load embed.js"**: Check that the Evo platform is running at the URL in `NEXT_PUBLIC_EVO_HOST`.

**"RESELLER_API_KEY not configured"**: Copy `.env.example` to `.env` and add your Unkey API key.

**CORS errors in console**: Add your domain (e.g., `http://localhost:3001`) to the reseller's `allowed_origins` in the Evo admin panel.

**Blank iframe**: Open DevTools Network tab. Check the `/api/auth/embed` response for errors. Verify the token is valid.

**"Reseller not found for this API key"**: The API key doesn't match any reseller. Check it was created in the Evo dashboard and hasn't been revoked.

**Token expired (session ends after 5 min)**: If using embed.js, refresh is automatic. If building manually, implement the postMessage listener described above.
