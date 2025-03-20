// Store DOM elements
const elements = {
  randomizeBtn: document.getElementById('randomizeBtn'),
  paragraphs: document.querySelectorAll('.between'),
  wordInput: document.getElementById('word-input'),
  submitBtn: document.getElementById('submit'),
  disableColorBtn: document.getElementById('disable-color'),
  clearWordsBtn: document.getElementById('clear-word-list')
};
let words = [];
localStorage.setItem("words", JSON.stringify(words))


elements.clearWordsBtn.addEventListener("click", () => {
  let retrWords = JSON.parse(localStorage.getItem("words"))
  retrWords = [];
  localStorage.setItem("words", JSON.stringify(retrWords))
})
const addNewWords = () => {
  const newWords = elements.wordInput.value.toUpperCase()
  const regex = /[^a-zA-Z\s]/g
  if (regex.test(newWords)){
    alert("No special characters in words")
    return null;
  }
  let retrWords = JSON.parse(localStorage.getItem("words"))
  retrWords = newWords.split(" ").concat(retrWords)
  localStorage.setItem("words", JSON.stringify(retrWords));
  elements.wordInput.value = ""
}
elements.submitBtn.addEventListener("click", addNewWords);

let isColorDisabled = false;
const disableColor = () => {
  isColorDisabled = !isColorDisabled;
}
elements.disableColorBtn.addEventListener("click", disableColor);
// Configuration options
const config = {
  lettersPerParagraph: 13,
  colors: [
    '#FF0000', // red
    '#0000FF', // blue
    '#00DC00', // green
  ]
};
let colorsUsing = [...config.colors]
let poppedColor = []
let paragraphPairs = [[elements.paragraphs[0],elements.paragraphs[8]],
[elements.paragraphs[1],elements.paragraphs[7]],
[elements.paragraphs[2],elements.paragraphs[6]],
[elements.paragraphs[3],elements.paragraphs[5]]
];




// Generate a random letter (A-Z)
const getRandomLetter = () => {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
};

// Get random color from our palette
const getRandomColor = () => {
  return colorsUsing[Math.floor(Math.random() * colorsUsing.length)];
};

// Create colored letter span
const createRandomLetter = (pairNum, whichPair) => {
  
  const letter = getRandomLetter();
  return createSpan(pairNum, whichPair, letter);

};
//make sure you pass in either a random letter or a word letter
const createSpan = (pairNum, whichPair, letter) =>{
  if(isColorDisabled){
    paragraphPairs[pairNum][whichPair].innerText += letter
    return
  } else {
  const color = getRandomColor();
  colorsUsing = colorsUsing.concat(poppedColor)
  
  poppedColor = colorsUsing.splice(colorsUsing.indexOf(color), 1);
  
  paragraphPairs[pairNum][whichPair].innerHTML += `<span style="color: ${color}">${letter}</span>`;
  }
}
const randomizeParagraphs = (erm) => {
  for (let i = 0; i < config.lettersPerParagraph; i++){
    const letter = getRandomLetter()
    if(isColorDisabled){
      erm.innerText += letter
    } else{
    const color = getRandomColor()
    erm.innerHTML += `<span style="color: ${color}">${letter}</span>`
    }
  }
}
const clearParagraphs = () => {
    elements.paragraphs.forEach(element => {
    element.innerHTML = "";
  });
}

const randomize = () => {
  let retrWords = JSON.parse(localStorage.getItem("words"))
  console.log(retrWords)
  if (retrWords.length <= 0){
    alert("Input some words");
    return null;
  }
  console.log(retrWords)
  clearParagraphs()
  randomizeParagraphs(elements.paragraphs[4]);
  for (let erm = 0; erm < paragraphPairs.length; erm++){
    let letterCount1 = 0
    let letterCount2 = 0
    let disRightHere = true
    while(letterCount1 < config.lettersPerParagraph) {
      
      if(Math.random() < .4 && letterCount1 < (config.lettersPerParagraph - 3) && disRightHere){
        let pickedWord = retrWords[Math.floor(Math.random() * retrWords.length)]
        for (let index = 0; index < pickedWord.length; index++) {
           createSpan(erm, 0, pickedWord[index])

          index++
          letterCount1++
          if (index < pickedWord.length) { 
            createSpan(erm, 1, pickedWord[index])
            letterCount2++
          } else {
            createRandomLetter(erm, 1);
            letterCount2++
          }
        }
        
        //console.log(letterCount2, "erm2")
        disRightHere = false
        continue
      }
      disRightHere = true
    //maybe have a counter for the letter count of each paragraph to signify how many letters they have in them
      if (letterCount1 < config.lettersPerParagraph){
      createRandomLetter(erm, 0);
      letterCount1++
      //console.log(letterCount1, "i hate")
      //console.log(letterCount2, "i love")
      }
      if (letterCount2 < config.lettersPerParagraph){
      createRandomLetter(erm, 1);
      letterCount2++
      //console.log(letterCount2, "i love")
      }
      
    }
  }
};
elements.randomizeBtn.addEventListener("click", randomize);
randomize();
/*// Initialize arrays
let isWord = Array(13).fill(false);
let word = Array(13).fill('');
const wordArray = [
    'HELLO',
    'WORLD',
    'CODE',
    'PLAY'
];

//let wordArray = Array((elements.paragraphs.length - 1 )/ 2);
let paragraphPairs = [[elements.paragraphs[0],elements.paragraphs[8]],
[elements.paragraphs[1],elements.paragraphs[7]],
[elements.paragraphs[2],elements.paragraphs[6]],
[elements.paragraphs[3],elements.paragraphs[5]]
] //to keep track of the paragraph pair words
let words = ["HI","HELLO","LOVE"]
let erm = 0;

// Set button text

// Generate a random letter (A-Z)
const getRandomLetter = () => {
  
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
};

// Get random color from our palette
const getRandomColor = () => {
  return config.colors[Math.floor(Math.random() * config.colors.length)];
};

// Create colored letter span
const createColoredLetter = () => {
  
  const letter = getRandomLetter();
  
  const color = getRandomColor();
  return `<span style="color: ${color}">${letter}</span>`;
};

// Main randomize function
const randomize = () => {
    // Process paragraphs in pairs
    paragraphPairs.forEach((pair, pairIndex) => {
        const [firstP, secondP] = pair;
        let firstString = '';
        let secondString = '';
        
        // 30% chance to insert a word between pairs
        if (Math.random() < 0.3) {
            const possibleWord = wordArray[Math.floor(Math.random() * wordArray.length)];
            
            // Generate first paragraph
            for (let j = 0; j < 13; j++) {
                const color = getRandomColor();
                if (j < possibleWord.length) {
                    firstString += `<span style="color: ${color}">${possibleWord[j]}</span>`;
                    word[j] = possibleWord[j];
                    isWord[j] = true;
                } else {
                    const randomLetter = String.fromCharCode(Math.floor(Math.random() * 26) + 65);
                    firstString += `<span style="color: ${color}">${randomLetter}</span>`;
                    word[j] = randomLetter;
                    isWord[j] = false;
                }
            }
            
            // Generate matching second paragraph
            for (let j = 0; j < 13; j++) {
                const color = getRandomColor();
                if (j < possibleWord.length) {
                    secondString += `<span style="color: ${color}">${possibleWord[j]}</span>`;
                } else {
                    const randomLetter = String.fromCharCode(Math.floor(Math.random() * 26) + 65);
                    secondString += `<span style="color: ${color}">${randomLetter}</span>`;
                }
            }
        } else {
            // Generate random letters for both paragraphs
            for (let j = 0; j < 13; j++) {
                const color1 = getRandomColor();
                const color2 = getRandomColor();
                const randomLetter1 = String.fromCharCode(Math.floor(Math.random() * 26) + 65);
                const randomLetter2 = String.fromCharCode(Math.floor(Math.random() * 26) + 65);
                
                firstString += `<span style="color: ${color1}">${randomLetter1}</span>`;
                secondString += `<span style="color: ${color2}">${randomLetter2}</span>`;
                word[j] = randomLetter1;
                isWord[j] = false;
            }
        }
        
        firstP.innerHTML = firstString;
        secondP.innerHTML = secondString;
    });

    // Handle the last paragraph if it exists
    if (elements.paragraphs[elements.paragraphs.length - 1] !== paragraphPairs[paragraphPairs.length - 1][1]) {
        const lastP = elements.paragraphs[elements.paragraphs.length - 1];
        let lastString = '';
        
        // Generate random letters for the last paragraph
        for (let j = 0; j < 13; j++) {
            const color = getRandomColor();
            const randomLetter = String.fromCharCode(Math.floor(Math.random() * 26) + 65);
            lastString += `<span style="color: ${color}">${randomLetter}</span>`;
        }
        
        lastP.innerHTML = lastString;
    }
};

// Event listeners
elements.randomizeBtn.addEventListener('click', randomize);

// Initial run
randomize();


/*paragraphPairs.forEach((pair) => {
  let ermerm = true
  for (let i = 0; i < 8; i++){
  if (Math.floor(Math.random() * 3) <= 4) {
  let pickedWord = words[Math.floor(Math.random() * words.length)];
  let firstSpan = pair[0].querySelectorAll('span');
  let secondSpan = pair[1].querySelectorAll('span');
  for(let t = 0; t <= pickedWord.length; t++){
    if (ermerm){
    firstSpan[i].innerText = pickedWord[t];
    ermerm = false
  }else{
    secondSpan[i].innerText = pickedWord[t]
    ermerm = true
    i++
  }

    
  }*/