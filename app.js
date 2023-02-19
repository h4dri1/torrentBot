const client = require("./client.js");
const { exec } = require("child_process");
const util = require('util')

const myArgs = process.argv.slice(2);

// Now that everything is set up, start the bot. This will start the sync loop and run until killed.
client.start().then(() => sendMessage(myArgs));

// send a message to the last room we received a message from
async function sendMessage(message) {
  const rooms = await client.getJoinedRooms();
  if (rooms.length === 0) {
    console.log("No rooms to send message to");
    return;
  }
  const lastRoom = rooms[rooms.length - 1];
  await client.sendMessage(lastRoom, {
    msgtype: "m.text",
    body: message,
  });
}
