const button = document.getElementById('button');
const audioElement = document.getElementById('audio');


// Passing Joke to VoiceRSS API
function tellMe(joke) {
  // VoiceRSS Speech Parameters
  VoiceRSS.speech({
    key: 'ce829b516dbc416cbd56b604063f7ca4',
    src: joke,
    hl: 'en-us',
    v: 'Linda',
    r: 0,
    c: 'mp3',
    f: '44khz_16bit_stereo',
    ssml: false
  });
}

// Disable/Enable Button
function toggleButton() {
  button.disabled = !button.disabled
}

// Get Jokes from Joke API
async function getJokes() {
  let joke = ''
  const apiUrl = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit'

  try {
    const response = await fetch(apiUrl)
    const data = await response.json()
    // console.log(data)
    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`
    } else {
      joke = data.joke
    }
    //Text-to-speech
    tellMe(joke)
    //Disable Button
    toggleButton()
  } catch (error) {
    //Catch Errors Here
    console.log('whoops', error)
  }
}

// Event Listeners
button.addEventListener('click', getJokes)
audioElement.addEventListener('ended', toggleButton)