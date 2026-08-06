const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');

// Tworzenie instancji bota z odpowiednimi uprawnieniami (Intents)
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMembers
    ]
});

// Kolekcja na komendy
client.commands = new Collection();

client.once('ready', () => {
    console.log(`[BOT] Zalogowano pomyślnie jako ${client.user.tag}!`);
    
    // Nowy status bota dotyczący CS2 i komendy pomocy
    client.user.setActivity('!help | BEST player cs2', { type: 0 }); 
});

// Automatyczne wczytywanie modułów/plików z tego samego folderu
const loadModules = () => {
    // Tutaj wpisz nazwy plików z modułami, które chcesz włączyć
    const modules = ['musico.js']; 

    for (const file of modules) {
        try {
            const filePath = path.join(__dirname, file);
            if (fs.existsSync(filePath)) {
                require(filePath)(client);
                console.log(`[MODUŁ] Pomyślnie wczytano moduł: ${file}`);
            }
        } catch (error) {
            console.error(`[BŁĄD] Nie udało się wczytać modułu ${file}:`, error);
        }
    }
};

// Uruchomienie ładowania modułów po wystartowaniu
loadModules();

// Logowanie bota przy użyciu tokena
client.login(process.env.DISCORD_TOKEN);
