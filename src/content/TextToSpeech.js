const ttsClient = new TextToSpeechClient();
const { TextToSpeechClient } = require('@google-cloud/text-to-speech');

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