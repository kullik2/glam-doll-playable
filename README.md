# Glam Doll: Day Out! 💖✨
**A Kid-Friendly HTML5 Game Built for YouTube Playables & Mobile WebViews**

---

## 🌟 Game Overview
**"Glam Doll: Day Out!"** is a lightweight, responsive daily routine and dress-up simulator inspired by classic Barbie-style games. Designed specifically for kids aged 4–9, it uses visual iconography and drag/tap interactions to guide players through 4 fun stages without relying on dense text.

### The 4 Interactive Stages:
1. **🍳 Kitchen Cooking Chef (5 Gourmet Kid Dishes):**
   * 🎂 **Celebration Cake:** Stack vanilla and strawberry cake sponge tiers on a glamorous pedestal, coat in glossy pink frosting, light the birthday candles, and decorate with strawberries, cherries, and candy stars!
   * 🧁 **Heart Cupcake:** Pour batter into heart baking mold, bake in the pastel oven with realistic heat glow and timer ding (`playDing()`), swirl creamy frosting, and top with cherries and chocolate chips.
   * 🧆 **Sizzling Meatballs:** Drop savory meatballs into a sizzling skillet, stir to brown, pour rich Italian marinara sauce with bubbling audio, and garnish with fresh basil leaves, parmesan cheese, and garlic bread.
   * 🍕 **Pizza & 🍝 Pasta Feast:** Spread rich tomato sauce and mozzarella on heart-shaped dough, stone-bake to bubbly perfection, twirl spaghetti pasta, and add pepperoni, mushrooms, olives, and basil.
   * 🍟 **French Fries & 🍗 Chicken Nuggets:** Drop fries and chicken nuggets into the bubbly golden fryer with crunchy sizzle sound (`playCrunch()`), serve in a glam diner basket, season with sparkle salt, and squirt dipping sauces (Ketchup, Honey Dip, BBQ).
   * 🍽️ **Grand Feast Meal Tray:** An interactive tray tracking all 5 completed dishes. Kids can prepare any dish they like or cook all 5 before proceeding to Spa Time!
2. **💄 Glam Spa & Vanity:** Clean the doll's face with a magic sponge, then apply glitter eyeshadow, soft cheek blush, and sparkling lipsticks.
3. **👗 Fashion Dress-Up Studio:** Mix and match chic hairstyles (Ponytails, Princess Buns, Pink Waves), dresses (Sparkle Ballgown, Star Casual, Disco Romper), shoes, and accessories (Diamond Tiara, Heart Shades, Pink Bow).
4. **📸 Photo Booth & Celebration:** Choose a glamorous background (Disco, Castle, Garden, Galaxy), place fun stickers (Hearts, Stars, Butterflies), and trigger a camera flash snapshot with confetti fanfare!

---

## 🚀 YouTube Playables Compliance & Technical Features

* **⚡ Ultra-Lightweight & Fast:** 100% pure HTML5, CSS3, and Vanilla JavaScript. **Zero external CDN dependencies, image files, or frameworks.** Total payload is `< 100 KB` uncompressed.
* **📱 9:16 Responsive Portrait Layout:** Built mobile-first for YouTube mobile apps, scaling dynamically without stretching or letterbox artifacts.
* **🎵 Procedural Audio Engine:** All sound effects (pops, harp glissando sparkles, cooking sizzles, camera shutter, and cheerful ambient BGM) are synthesized directly in real time via the **Web Audio API**. Includes a toggleable mute button.
* **🛡️ Safe for Kids (COPPA Compliant):** No third-party tracking, no external links, and fully intuitive visual controls.
* **⏸️ Tab Lifecycle Management:** Listens to `document.visibilitychange` to automatically pause procedural audio and animations when the player navigates away from the tab or feed.

---

## 🕹️ How to Run & Preview Locally

You can test the game directly in any browser.

### Option 1: Python HTTP Server
Run the following in terminal:
```bash
cd /Users/kranthikumarkulli/.gemini/antigravity/scratch/glam-doll-playable
python3 -m http.server 8080
```
Then open `http://localhost:8080` in your browser (or use DevTools Device Mode set to iPhone/Android).

### Option 2: Direct File Open
Simply open `index.html` directly in Google Chrome, Safari, or Edge.
