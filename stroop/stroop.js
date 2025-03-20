// Array of words to choose from (in lowercase)
let words = ['Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Orange', 'Pink','black'];

// Array of colors (using hex codes)
let colors = ['#FF0000', '#0000FF', '#00CC00', '#000000', '#a83291', '#ffd700', '#ff69B4', '#ee5F1F'
];

// Get DOM elements
const paragraphs = document.querySelectorAll('p');
const randomizeBtn = document.getElementById('randomizeBtn');

// Function to get random item from array
const getRandomItem = (array) => {
    return array[Math.floor(Math.random() * array.length)];
};

// Function to randomize words and colors
let removedWord = []
let removedColor = []
console.log(words.concat(removedWord))

const randomize = () => {
    paragraphs.forEach(paragraph => {
        let content = '';
        
        
        for(let i = 0; i < 11; i++) {
            const word = getRandomItem(words);
            const color = getRandomItem(colors);

            console.log(colors)
            words = words.concat(removedWord);
            colors = colors.concat(removedColor);
            console.log(colors, 2)

            console.log(removedColor)
            removedColor = colors.splice(colors.indexOf(color), 1);
            removedWord = words.splice(words.indexOf(word), 1);
            console.log(removedColor, 2)
            if (i === 10){
                content += `<span style="color: ${color}">${word}</span>`;
            } else{
                content += `<span style="color: ${color}">${word}<br><br></span>`;
            }
        }
        
        // Set the paragraph content
        paragraph.innerHTML = content;
    });
};

// Add click event listener to button
randomizeBtn.addEventListener('click', randomize);

// Initial randomization
randomize();

