const express = require('express');
const mineflayer = require('mineflayer');

const app = express();
app.get('/', (req, res) => res.send('Bot dziala!'));
app.listen(process.env.PORT || 8000, () => console.log('Serwer HTTP gotowy'));

function createBot() {
  const bot = mineflayer.createBot({
    host: 'sigmyzosiedla.mchosting.pl',
    username: 'BotAFK',
    version: '1.21.11',
    auth: 'offline'
  });

  bot.on('spawn', () => {
    console.log('Bot dolaczyl na serwer!');
    setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 500);
    }, 30000);
  });

  bot.on('kicked', (reason) => console.log('Wyrzucono za:', reason));
  bot.on('error', (err) => console.log('Blad bota:', err));

  bot.on('end', () => {
    console.log('Rozlaczono. Ponowne laczenie za 10 sekund...');
    setTimeout(createBot, 10000);
  });
}

createBot();
