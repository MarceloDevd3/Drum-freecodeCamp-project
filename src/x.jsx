import React from 'react';

const sounds = [
  { keyLetter: 'Q', keyCode: 81, id: 'Heater-1', className: 'drum-pad', audio: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3' },
  { keyLetter: 'W', keyCode: 87, id: 'Heater-2', className: 'drum-pad', audio: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3' },
  { keyLetter: 'E', keyCode: 69, id: 'Heater-3', className: 'drum-pad', audio: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3' },
  { keyLetter: 'A', keyCode: 65, id: 'Heater-4', className: 'drum-pad', audio: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3' },
  { keyLetter: 'S', keyCode: 83, id: 'Clap', className: 'drum-pad', audio: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3' },
  { keyLetter: 'D', keyCode: 68, id: 'Open-HH', className: 'drum-pad', audio: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3' },
  { keyLetter: 'Z', keyCode: 90, id: 'Kick-n\'-Hat', className: 'drum-pad', audio: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3' },
  { keyLetter: 'X', keyCode: 88, id: 'Kick', className: 'drum-pad', audio: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3' },
  { keyLetter: 'C', keyCode: 67, id: 'Closed-HH', className: 'drum-pad', audio: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3' }
];

class DrumPad extends React.Component {
  constructor(props) {
    super(props);
    this.playSound = this.playSound.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }

  handleKeyPress = (e) => {
    if (e.keyCode === this.props.keyCode) {
      this.playSound();
    }
  }

  playSound() {
    const audio = document.getElementById(this.props.keyLetter);
    audio.currentTime = 0;
    audio.play();
    this.props.updateDisplay(this.props.id);
  }

  render() {
    return (
      <div id={this.props.id} className={this.props.className} onClick={this.playSound}>
        {this.props.keyLetter}
        <audio id={this.props.keyLetter} className="clip" src={this.props.audio}></audio>
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: "no key press"
    };
    this.updateDisplay = this.updateDisplay.bind(this);
  }

  updateDisplay(displayText) {
    this.setState({ display: displayText });
  }

  render() {
    return (
      <div id="drum-machine">
        <div id="display">{this.state.display}</div>
        <div id="drum-pads">
          {sounds.map(clip => (
            <DrumPad
              key={clip.id}
              id={clip.id}
              keyCode={clip.keyCode}
              keyLetter={clip.keyLetter}
              className={clip.className}
              audio={clip.audio}
              updateDisplay={this.updateDisplay}
            />
          ))}
        </div>
      </div>
    );
  }
}
export default App;
