Build me a complete single-page portfolio website for the "Full Stack Development" 
skill section. HTML + CSS + JavaScript only. GSAP + ScrollTrigger from CDN. 
One index.html file. Clean, minimal design.

============================
IDENTITY
============================
Name: Muhammad Idrees Raza
Role title on this page: Full Stack Developer
Color theme: White background, primary blue #185FA5 (frontend), dark purple #3C3489 (backend)

============================
HERO SECTION
============================
Read portfolio_concept_prototype.html file for better design clearence
Center the page with:
- "Muhammad Idrees Raza" as main heading (large, bold, #1a1a1a)
- "Full Stack Developer" as subtitle below (medium, muted color)

Below the heading, display 8 mini screen mockups stacked on top of each other 
with slight diagonal offset (each card shifted 5px down and 5px right from the 
one in front). The front card sits at top:0 left:0, the rest stack behind.

Each screen mockup should:
- Float up and down using CSS @keyframes (translateY 0 to -10px, 3s ease-in-out 
  infinite) with staggered animation-delay per card:
  card 1: 0s, card 2: 0.15s, card 3: 0.3s, card 4: 0.45s,
  card 5: 0.6s, card 6: 0.75s, card 7: 0.9s, card 8: 1.05s
- box-shadow: 0 8px 28px rgba(0,0,0,0.13) for depth

Each screen is a 3D CSS flip card:
- Use perspective on parent, transform-style: preserve-3d on card,
  backface-visibility: hidden on both faces

FRONT FACE (blue #185FA5):
- Thin browser chrome bar at top with 3 small circles (red/yellow/green)
- Mock UI below: a nav bar, a hero banner block, a 2-column content grid of 
  colored blocks, a footer bar
- Small label "FRONTEND" in bottom-right corner, tiny, white, uppercase

BACK FACE (dark #3C3489):
- Dark terminal bar at top with 3 circles
- Mock code lines: some dim, some highlighted green or cyan (like console output)
- Show text like: GET /api/projects 200, POST /auth/login, Connected to MongoDB
- Small label "BACKEND" in bottom-right corner, tiny, white, uppercase

On page load, after 1s delay:
- Auto-flip screens one by one (every 400ms) from frontend to backend (front→back)
- After all 8 are flipped, pause 2s then flip them back one by one (back→front)
- Loop this sequence forever
- Stop float animation while a card is mid-flip (add class .flipping, remove float)

============================
SCROLL ANIMATION — STACK TO GRID
============================

When user scrolls down, the 8 stacked floating screens in the hero animate DOWN 
and fly into a 4x2 grid layout in the projects section below.

Use GSAP ScrollTrigger with scrub: 1.5 (smooth, tied to scroll position).

Implementation:
1. Hero stack cards are absolutely positioned inside the stack container
2. Projects section has 8 invisible placeholder divs in a 4x2 CSS grid
3. On ScrollTrigger start, pause the float animation on all cards
4. Use getBoundingClientRect() on each card and its matching placeholder to 
   calculate exact travel distance (deltaX, deltaY)
5. gsap.to() each card to its placeholder position with staggered delays 
   (stagger: 0.08) and scrub: 1.5
6. Cards settle into their grid positions and become the project cards

============================
PROJECTS GRID (8 Full Stack Projects)
============================

After scroll settles, each card is now a hoverable flip card.
Hover → flip to backend face (CSS transition 0.7s cubic-bezier(0.4,0,0.2,1))

FRONT (blue #185FA5):
- "FRONTEND" label (tiny, uppercase, 60% white)
- Project name (bold, white, 15px)
- One-line frontend description
- Tech pill tags (white text, rgba white background, 8px border-radius)

BACK (purple #3C3489):
- "BACKEND" label
- Same project name
- Backend description
- Different tech pills

Projects:

1. PakiShip
   Front: COD & courier management dashboard for Pakistan-based sellers
   Front tags: React, Shopify Polaris, Admin API
   Back: Order sync engine with local courier integrations
   Back tags: Node.js, Express, MongoDB, Leopards API

2. Design Editor
   Front: Product personalizer embedded live in Shopify storefront
   Front tags: React, Fabric.js, Canvas API
   Back: Serverless asset and design metadata management
   Back tags: Vercel Functions, Cloudinary, Metaobjects

3. Driver Management System
   Front: Mobile app for driver onboarding and document upload
   Front tags: React Native, Expo, AsyncStorage
   Back: Admin panel for fleet approval and deployment
   Back tags: Node.js, Express, MongoDB, JWT

4. Event Platform (EVP)
   Front: Ticket discovery, booking, and Stripe checkout
   Front tags: React, Stripe.js, Tailwind
   Back: Multi-organizer payout and event management
   Back tags: Node.js, MongoDB, Stripe Connect

5. Shopify Store Builder
   Front: Custom Shopify theme UI with product filtering
   Front tags: Liquid, JavaScript, CSS, Shopify CLI
   Back: Metafield-driven dynamic content and app integration
   Back tags: Shopify APIs, Webhooks, Metaobjects

6. Auth Boilerplate
   Front: Clean login/signup/reset UI with role-based access
   Front tags: React, React Router, Axios
   Back: Secure token-based auth with refresh flow
   Back tags: Node.js, Express, JWT, bcrypt, MongoDB

7. REST API Toolkit
   Front: API explorer interface for testing endpoints
   Front tags: React, Fetch API
   Back: Modular REST API with rate limiting and logging
   Back tags: Node.js, Express, Morgan, MongoDB

8. Portfolio CMS
   Front: Admin dashboard to manage portfolio projects dynamically
   Front tags: React, TailwindCSS
   Back: Headless CMS with file upload support
   Back tags: Node.js, Express, MongoDB, Multer, Cloudinary

============================
ABOUT SECTION
============================

Clean centered layout:
Name: Muhammad Idrees Raza
Location: Layyah, Punjab, Pakistan
Bio: Full stack developer specializing in building production-ready web and 
mobile applications. Experienced with the Node.js + MongoDB backend ecosystem, 
React and React Native on the frontend, and the Shopify app development platform. 
Currently building PakiShip and working deep in the Shopify ecosystem.

============================
SKILLS SECTION
============================

Animated skill bars that appear on scroll (Intersection Observer or GSAP ScrollTrigger).
Each bar animates width from 0 to the percentage when it enters the viewport.

Frontend:
  React — 85%
  React Native — 80%
  JavaScript — 88%
  HTML & CSS — 90%

Backend:
  Node.js — 85%
  Express.js — 83%
  MongoDB — 80%

Shopify:
  App Development — 78%
  Polaris & Admin API — 75%
  Liquid & Themes — 70%

Tools:
  Git & GitHub — 85%
  GSAP — 70%
  Vercel & Cloudinary — 75%

============================
CONTACT SECTION
============================

Centered minimal layout:
- Heading: "Let's Build Something"
- Email placeholder: hello@muhammadidreesraza.com
- LinkedIn placeholder button
- GitHub placeholder button
Simple hover effects on buttons.

============================
TECH STACK
============================
- Pure HTML, CSS, JavaScript — no React, no build tools
- GSAP 3: https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js
- ScrollTrigger: https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js
- Single index.html with embedded <style> and <script>

============================
DESIGN SYSTEM
============================
- Background: #ffffff
- Body text: #1a1a1a
- Muted text: #666666
- Frontend card: #185FA5
- Backend card: #3C3489
- Font: system-ui, -apple-system, sans-serif
- Card border-radius: 12px
- No heavy gradients — clean and minimal
- html { scroll-behavior: smooth; }

============================
IF SCROLL ANIMATION DOESN'T WORK
============================
Use this fix: After page loads, call getBoundingClientRect() on every .stack-card 
and its matching .grid-placeholder to get exact pixel positions. Store the 
difference as deltaX and deltaY. In the ScrollTrigger onUpdate callback, use 
gsap.set() to manually position each card using transform: translate(x, y) 
interpolated with the scroll progress value (0 to 1). This bypasses any 
coordinate calculation issues.