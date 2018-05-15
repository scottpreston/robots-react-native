import ReactNativeSound from 'react-native-sound';

export default class TextToSpeech {
    constructor() {
        ReactNativeSound.setCategory('Playback', true); // true = mixWithOthers
        this.awsPolly = new AwsPolly();
    }

    tts(text) {
        this.awsPolly.createSound(text, (data,error) => {
            if (!error) {
                this.playURL(data.s3Url);
            }
        });
    }

    test() {
        this.playURL('https://someserver/hithere.mp3')
    }

    playURL(url) {
        var sound = new ReactNativeSound(url, '', (error) => {
            if (error) {
                console.warn('failed to load the sound', error);
            } else {
                sound.play((success) => {
                    if (success) {
                        console.log('successfully finished playing');
                    } else {
                        console.warn('playback failed due to audio decoding errors');
                        callback({
                            result: "error"
                        });
                    }
                    sound.release();
                });
            }
        });
    }
}