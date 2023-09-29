console.log("Hello World");

const url = "https://api.dictionaryapi.dev/api/v2/entries/en/"

const result = document.getElementById("result");
const sound = document.getElementById("sound");
const btn = document.getElementById("search-btn");

const speech =  new SpeechSynthesisUtterance();


btn.addEventListener("click", () => {
    let inputWord = document.getElementById("input-word").value;
    // console.log(inputWord);

    fetch (`${url} ${inputWord}`)
    .then((response) => response.json())
    .then((data) => {

        // console.log to see what we are working on
        // console.log(data);
        // console.log(data[0].meanings[0].partOfSpeech);
        // console.log(data[0].phonetic);
        // console.log(data[0].meanings[0].definitions[0].definition);
        // console.log(data[0].meanings[0].definitions[0].example);

        result.innerHTML = `
        <div class="word">
                <h3>${inputWord}</h3>
                <button><i class="fa-solid fa-volume-high"></i></button>
            </div>

            <div class="details">
                <p>${data[0].meanings[0].partOfSpeech}</p>
                <p>/${data[0].phonetic}/</p>
            </div>
                    
            <p class="word-meaning">
                    ${data[0].meanings[0].definitions[0].definition}
            </p>
            <p class="word-example">
                    ${data[0].meanings[0].definitions[0].example }
            </p>
        `
        // to add sound
        
        const utterance = document.querySelector(".fa-volume-high")
        utterance.addEventListener("click", () => {
            speech.text = inputWord
            speechSynthesis.speak(speech)
        })
        

    })
    // to return error message when you type undefined word

    .catch(() => {
            result.innerHTML = `
            <h2 class="error">'No Definitions Found', "Sorry pal, we couldn't 
            find definitions for the word you were looking for."</h2>
            `
        })

});


