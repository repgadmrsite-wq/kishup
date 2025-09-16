<?php
// index.php — Heyoola Kiosk (PHP + JS + CSS + PWA)
?><!doctype html>
<html lang="fa" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>هیولا | ساخت آنلاین ساندویچ سرد</title>
  <meta name="theme-color" content="#0ee3a8">
  <link rel="manifest" href="assets/manifest.webmanifest">
  <link rel="stylesheet" href="assets/app.css">
  <link rel="icon" type="image/webp" href="img/logo-sullivan.webp">
  <link rel="preload" href="https://hayola.hornspeed.com/img/naghola.webp" as="image">
  <link rel="preload" href="http://hayola.hornspeed.com/img/tweety.webp" as="image">
</head>
<body>
  <div id="theme-bg-effects"></div>
  <div id="theme-char-image"></div>
  <div id="theme-fg-effects"></div>
  <div id="app" class="app-root"></div>

  <!-- Audio feedback -->
  <audio id="ding" preload="auto">
    <source src="assets/sounds/ding.mp3" type="audio/mpeg">
  </audio>
  <audio id="success" preload="auto">
    <source src="assets/sounds/success.mp3" type="audio/mpeg">
  </audio>
  <!-- NOTE: Please provide the sound file for the dragon theme -->
  <audio id="dragon-sound" preload="auto">
    <source src="assets/sounds/fire-whoosh.mp3" type="audio/mpeg">
  </audio>
  <!-- NOTE: Please provide the sound file for the mario theme -->
  <audio id="mario-sound" preload="auto">
    <source src="assets/sounds/coin.mp3" type="audio/mpeg">
  </audio>
  <!-- NOTE: Please provide the sound file for the mario jump effect -->
  <audio id="mario-jump-sound" preload="auto">
    <source src="assets/sounds/mario-jump.mp3" type="audio/mpeg">
  </audio>
  <audio id="special-sound" preload="auto">
    <source src="assets/sounds/special.mp3" type="audio/mpeg">
  </audio>
  <audio id="hulk-sound" preload="auto">
    <source src="assets/sounds/hulk.mp3" type="audio/mpeg">
  </audio>
  <audio id="hulk-smash-sound" preload="auto">
    <source src="assets/sounds/smash-hulk.mp3" type="audio/mpeg">
  </audio>
  <audio id="naghola-sound" preload="auto">
    <source src="https://hayola.hornspeed.com/assets/sounds/naghola.mp3" type="audio/mpeg">
  </audio>
  <audio id="naghola-welcome-sound" preload="auto">
    <source src="https://hayola.hornspeed.com/assets/sounds/naghola-welcome.mp3" type="audio/mpeg">
  </audio>
  <audio id="tweety-sound" preload="auto">
    <source src="https://hayola.hornspeed.com/assets/sounds/tweety-sound.mp3" type="audio/mpeg">
  </audio>
  <audio id="tweety-welcome-sound" preload="auto">
    <source src="https://hayola.hornspeed.com/assets/sounds/tweety-welcome.mp3" type="audio/mpeg">
  </audio>
  <audio id="pat-mat-sound" preload="auto">
    <source src="https://hayola.hornspeed.com/assets/sounds/pat-mat.mp3" type="audio/mpeg">
  </audio>
  <audio id="angry-welcome-sound" preload="auto">
    <source src="https://hayola.hornspeed.com/assets/sounds/angry-welcome.mp3" type="audio/mpeg">
  </audio>
  <audio id="angry-launch-sound" preload="auto">
    <source src="https://hayola.hornspeed.com/assets/sounds/angry-sound.wav" type="audio/wav">
  </audio>

  <script src="assets/app.js" defer></script>
</body>
</html>
