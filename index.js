const express = require('express');
const mineflayer = require('mineflayer');

const app = express();
app.get('/', (req, res) => res.send('Bot dziala!'));
app.listen(process.env.PORT || 8000, () => console.log('Serwer HTTP gotowy'));

function createBot() {
  const bot = mineflayer.createBot({
    host: 'sigmyzosiedla.mchosting.pl', // np. s1.mchosting.pl (bez portu!)
    port: 25565,              // WPISZ PORT PO DWUKROPKU (same cyfry)
    username: 'BotAFK',       // Nick bota na serwerze
    version: '1.21.11'         // WPISZ WERSJE MINECRAFTA (np. 1.20.4)
  });

  bot.on('spawn', () => {
    console.log('Bot dolaczyl na serwer!');
    setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 500);
    }, 30000);
  });

  bot.on('end', () => {
      bot.on('kicked', (reason) => console.log('Wyrzucono za:', reason));
    console.log('Rozlaczono. Ponowne laczenie za 10 sekund...');
    setTimeout(createBot, 10000);
  });

  bot.on('error', err => console.log('Blad bota:', err));
}

createBot();
