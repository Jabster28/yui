// Defining and requiring stuff

require('dotenv').config();
const io = require('@pm2/io')
io.init({
  metrics: {
    network: {
      ports: true
    }
  }
})
const Discord = require('discord.js');
const client = new Discord.Client();
const token = process.env.tkn;


// Functions

function generateRandomNumber(max) {
  return Math.floor(Math.random() * max) + 1;
}

function isOk(message) {
  if (message.author.bot) {
    return false
  } else if (message.author.username == "Jabster28") {
    return true
  } else if ((message.channel.name == "bot-commands") || (message.channel.name == "bot-craziness") || (message.channel.name == "testing-1") || (message.channel.name == "testing-2") || (message.channel.name == "bot-hell") || (message.channel.name == "celle")) {
    return true
  } else if ((message.guild.name != "Unaccepted fanclub") || (message.guild.name != "Discord Bot List")) {
    return true
  } else {
    return false
  }
}


// Pre-Login

client.on('ready', () => {
  console.log("Hacking the mainframe with an identity of:");
  console.log(client.user.username);
  console.log("I'm in")
});


// Commands

// !yui
client.on('message', msg => {
  if (isOk(msg)) {
    if (msg.content.toLowerCase() == "!yui") {
      msg.channel.send("You called?");
    }
  }
});

// !roll
client.on('message', msg => {
  if (isOk(msg)) {
    mess = msg.content.toLowerCase().split(" ");
    if (mess[0] == "!roll") {
      if (mess[1]) {
        embed = new Discord.RichEmbed();
        embed.setAuthor("Is rolling a Dice...", msg.author.avatarURL)
        embed.setColor("BLUE")
        embed.addField(("D" + mess[1] + ":"), (generateRandomNumber(mess[1]) + "!"));
        msg.channel.send(embed)
      } else {
        embed = new Discord.RichEmbed();
        embed.setAuthor("Is rolling a Dice...", msg.author.avatarURL)
        embed.setColor("BLUE")
        embed.addField("D6:", (generateRandomNumber(6) + "!"));
        msg.channel.send(embed)
      }
    }
  }
});


// Login

client.login(token);


// PM2 Metrics

io.metric({
  type: 'metric',
  name: 'Accessible Servers',
  value: function() {
    return client.guilds.array().length;
  }
});
io.metric({
  type: 'metric',
  name: 'Status',
  value: function() {
    return "N/A";
    //  return client.user.presence.status;
  }
});
io.metric({
  type: 'metric',
  name: 'Ping',
  value: function() {
    return client.ping;
  }
});
io.metric({
  type: 'metric',
  name: 'Accessible Channels',
  value: function() {
    return client.channels.array().length;
  }
});
io.metric({
  type: 'metric',
  name: 'Cached users',
  value: function() {
    return client.users.array().length;
  }
});
// PM2 Actions
io.action('Logging Test', (cb) => {
  console.log("test pm2 log")
  cb("Test success");
});

io.action('Set Offline', (cb) => {
  client.user.setPresence({
    game: {
      name: 'with discord.js'
    },
    status: 'invisible'
  })
  cb("Celle is now invisible\n");

});
io.action('Set AFK', (cb) => {
  client.user.setPresence({
    game: {
      name: 'with discord.js'
    },
    status: 'idle'
  })
  cb("Celle is now Idle\n");

});
io.action('Set Online', (cb) => {

  ran = generateRandomNumber(5)
  if (ran == 1) {
    client.user.setPresence({
      game: {
        name: 'with discord.js',
        party: {
          size: [2, 2]
        }
      },
      status: 'online'
    })
    cb("Celle is now online\n");

  } else if (ran == 2) {
    client.user.setPresence({
      game: {
        name: 'the kazoo (dooo dooo do do doo)',
        party: {
          size: [2, 2]
        }
      },
      status: 'online'
    })
    cb("Celle is now online\n");

  } else if (ran == 3) {
    client.user.setPresence({
      game: {
        name: 'Deal or no deal',
        party: {
          size: [2, 2]
        }
      },
      status: 'online'
    })
    cb("Celle is now online\n");

  } else if (ran == 4) {
    client.user.setPresence({
      game: {
        name: "a game you can't join",
        party: {
          size: [2, 2]
        }
      },
      status: 'online'
    })
    cb("Celle is now online\n");

  } else if (ran == 5) {
    client.user.setPresence({
      game: {
        name: 'Chess with Zeus',
        party: {
          size: [2, 2]
        }
      },
      status: 'online'
    })
    cb("Celle is now online\n");

  } else {
    io.notify("Error: No matching number. Number was " + ran)
    cb("ERROR, CHECK ISSUES LOG\n");

  }
});
