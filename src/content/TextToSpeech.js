const fs = require('fs');
const { project_id, client_email, private_key } = JSON.parse(fs.readFileSync('google.json'));
const dotenv = require('dotenv');
require('dotenv').config();
const { TextToSpeechClient } = require('@google-cloud/text-to-speech');

const ttsClient = new TextToSpeechClient({
  projectId: project_id,
  credentials: {
    client_email: client_email,
    private_key: private_key,
  },
});

// Tạo class TextToSpeechHandler
class TextToSpeechHandler {
  constructor(message, text) {
    this.message = message;
    this.text = text;
  }

  async speak() {
    try {
      const request = {
        input: { text: this.text },
        voice: { languageCode: 'vi-VN', ssmlGender: 'FEMALE' },
        audioConfig: { audioEncoding: 'OGG_OPUS' },
      };
      const [response] = await ttsClient.synthesizeSpeech(request);
      const attachment = new Discord.MessageAttachment(response.audioContent);
      this.message.channel.send(attachment);
    } catch (err) {
      console.error('ERROR:', err);
    }
  }
}

module.exports = TextToSpeechHandler;