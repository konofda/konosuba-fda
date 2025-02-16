# Konosuba FD/Archive

[![Netlify Status](https://api.netlify.com/api/v1/badges/3b019f98-183b-4906-937e-3457ee3b2f68/deploy-status)](https://app.netlify.com/sites/konosuba-fda/deploys)

Welcome to the **Konosuba: Fantastic Days / Archive**! This is an unofficial fan project dedicated to preserving and showcasing the art assets from the mobile game [Konosuba: Fantastic Days](https://konosubafd.jp).

## 🌟 What is this project?

This archive is a collection of assets from the game, including:

- 🎴 Member Cards - Character cards from the game
- 👥 Member Characters - Gallery of characters
- 🖼️ Story Backgrounds & Stills - Background images and stills from the story
- 🎬 Videos - Cutscenes and promotional videos
- 🎵 Music & Songs - Game soundtrack 
- 🕹️ Live2D Models - Interactive character models (work in progress)
- 🦴 Spine Animations - Character animations used in battles
- 🧩 Misc Items & Icons - Various item icons and images

All assets are organized and easily accessible, allowing you to explore the world of Konosuba: Fantastic Days.

## 🤔 What to expect

- Browse and search for specific assets
- High-resolution images and audio files
- Regular updates as new assets are added to the game
- Works well on desktop and mobile

This project is in mostly in english with a mix of english and japanese assets.

## 💪 How you can help

This project is maintained by Konosuba fans. You can contribute in the following ways:

### Generally
- 🐛 Reporting bugs
- 💬 Suggesting improvements
- 🎨 Fill in missing assets, by contributing to or forking [HaiKonofanDesu](https://github.com/HaiKonofanDesu)'s [asset repositories](https://github.com/HaiKonofanDesu?tab=repositories)
- 📝 Fill in missing data, by contributing to or forking [Assasans](https://github.com/Assasans)'s [offline server repo](https://github.com/Assasans/axel)
- 💻 Adding views and content

### Specifically
- [ ] We're missing full member card art for these guys: ![screenshot](docs/Screenshot%202025-02-13%20134720.png)
- [ ] Live2D implementation is wip, I'm having a hard time getting the Cubism Web SDK to work on the web. Ideally we'd avoid additional dependencies like PixiJS, but it's not the end of the world.
- [ ] Some Story Backgrounds and Stills have full art, but are missing icon assets.
- [ ] Some Stories are missing screenplay style scripts.

### Nice to haves
- If you could track down youtube clip(s) of each story, maybe we can add those to a page.
- Compiling a detailed step-by-step for each story would be even nicer, then we can evenually build a live story viewer. Things like:
  - Character X shows; Character X says: "Hello";
  - Character X hides;
  - Background change to: XXXX;
  - Characters Y and Z show; Character Y emotes: happy; Character Y says: "Yay!";
  - Character Z emotes: sad; Character Z says: "Boo!"; Sound: "boo";
  - Story Still: XXXX; Effect: camera-shake;
  - *etc. etc. you get the idea*
- It would probably be lovely to have a timeline of changes over the games' livespans. Like: 
  - Update x.x.x 
    - Characts X added; 
    - Member cards XA, YB, ZC, added; 
    - Limited gacha details; 
    - etc. etc. 
  
  Just to track how the game evolved over time.

When contributing data, you can open an issue right here. Any relatively structured format works: spreadsheets, yaml/json, even just text with bullet points.

## Sources
   - [Konosuba FD Fandom Wiki](https://konofan.fandom.com): Global fandom wiki with a lot of information about the game.
   - [Konosuba FD Fandom Wiki (jp)](https://konosuba.gorillawiki.jp/): Japanese fandom wiki
   - [Konosuba FD Youtube Channel](https://www.youtube.com/@konosubafd): Official Youtube channel with promotional clips, trailers, songs, etc.
   - [Konosuba FD Youtube Channel (kr)](https://www.youtube.com/@Konosuba_KR): Korean Youtube channel ([alt link](https://www.youtube.com/watch?v=fupF3bfuUJc))
   - [HaiKonofanDesu/konofan-assets-jp-sortet](https://github.com/HaiKonofanDesu/konofan-assets-jp-sortet): Game textures and spine models
   - [HaiKonofanDesu/konofan-live2d](https://github.com/HaiKonofanDesu/konofan-live2d): Live2D models
   - [HaiKonofanDesu/konofan-audio](https://github.com/HaiKonofanDesu/konofan-audio): BGM and sound files
   - [HaiKonofanDesu/konofan-videos](https://github.com/HaiKonofanDesu/konofan-videos): Video content
   - [HaiKonofanDesu/konofan-story](https://github.com/HaiKonofanDesu/konofan-story): Story scripts
   - [Assasans/axel](https://github.com/Assasans/axel): Structured game data and offline server

## 🛠️ Technical details

This project is built using:

- ⚛️ [React](https://react.dev/) - JavaScript library for building user interfaces
- 🍃 [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- 🚀 [Vite](https://vitejs.dev/) - Fast build tool and development server
- 🌐 [Netlify](https://www.netlify.com/) - Platform for automating web projects

---

Thank you for your interest in the Konosuba FD/A! THrough this project we hope you enjoy continuing to explore the world of Konosuba and the awesome work on Fantastic days beyond their EOS. 

Feel free to reach out with any questions or feedback.

*Disclaimer: This is an unofficial fan project. All assets belong to their respective owners.*
