const displaySynonyms = (arr) => {
    const display = arr.map((el) => `<span class="btn">${el}</span>`);
    return display.join(" ");
}

const loadAllLesson = () => {
    const url = "https://openapi.programming-hero.com/api/levels/all";
    fetch(url)
    .then(res => res.json())
    .then(data => {
        displayAllLesson(data.data);
    })
}

const removeActive = () => {
    const activeLesson = document.querySelectorAll(".active-btn");
    activeLesson.forEach((btn) => btn.classList.remove("active"));
}

// Load Word Details
const loadWordDetails = async (id) =>{
    const url =`https://openapi.programming-hero.com/api/word/${id}`;

    const res = await fetch(url);
    const wordDetails = await res.json();
    displayWordDetails(wordDetails.data);
    
}

//Spinner
const manageSpinner = (status) => {
    if(status == true){
        document.getElementById('spinner').classList.remove("hidden");
        document.getElementById('word-container').classList.add("hidden");
    }
    else{
        document.getElementById('word-container').classList.remove("hidden");
        document.getElementById('spinner').classList.add("hidden");
    }
}

const displayWordDetails = (word) => {
    console.log(word);
    const modalContainer = document.getElementById('modal-container');
    modalContainer.innerHTML = `
    <div class="space-y-3">
                    <div>
                        <h3 class="font-semibold text-[36px]"> ${word.word} (<span><i
                                    class="fa-solid fa-microphone-lines"></i></span>:${word.meaning})</h3>
                    </div>

                    <div>
                        <h1 class="font-semibold text-[24px]">Meaning</h1>
                        <p class="bangla-font font-medium text-[24px]">${word.meaning}</p>
                    </div>

                    <div>
                        <h1 class="font-semibold text-[24px]">Example</h1>
                        <p class="bangla-font font-medium text-[24px]">${word.sentence}</p>
                    </div>

                    <div>
                        <h1 class="bangla-font font-semibold text-[24px]">সমার্থক শব্দ গুলো</h1>
                        <div class="flex items-center gap-2">
                            ${displaySynonyms(word.synonyms)}
                        </div>
                    </div>

                </div>
     `;
    document.getElementById('show_modal').showModal();
}

const loadAllWord = (id) => {
    manageSpinner(true);
    url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
    .then(res => res.json())
    .then(data => {
        removeActive();
        const checkBtn = document.getElementById(`lesson-btn-${id}`);
        checkBtn.classList.add("active");
        displayAllWord(data.data);
        console.log(data.data);
    });
    
}

const displayAllWord = (words) => {
    const wordContainer = document.getElementById('word-container');
    wordContainer.innerHTML = "";

    if(words.length === 0){
        wordContainer.innerHTML = `
        <div class="bangla-font text-center col-span-full space-y-5">
                 <img class="mx-auto" src="./assets/alert-error.png">
                <h1 class="font-[300] text-[13px]">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</h1>
                <p class="font-medium text-[30px] mt-2">নেক্সট Lesson এ যান</p>
            </div>
        `;
        manageSpinner(false);
        return;
    }

    words.forEach(word => {
        const displayWord = document.createElement('div');
        displayWord.innerHTML = `
        <div class="bg-white space-y-3 text-center rounded-[10px] py-[30px] h-full">
                <h1 class="mt-[56px] inter-font font-bold text-[32px]">${word.word ? word.word : "word পাওয়া যায়নি"}</h1>
                <p class="inter-font font-medium text-[20px]">Meaning /Pronounciation</p>
                <p class="bangla-font font-semibold text-[32px]">"${word.meaning ? word.meaning : "meaning পাওয়া যায়নি"} / ${word.pronunciation ? word.pronunciation : "pronunciation পাওয়া যায়নি"}"</p>
                <div class="mt-[56px] flex justify-between items-center mb-[56px] mx-[56px]">
                    <div onclick="loadWordDetails(${word.id})" class="w-[56px] p-3 bg-[#1A91FF20] rounded-[10px]">
                        <i class="fa-solid fa-circle-info"></i>
                    </div>
                    <div class="w-[56px] p-3 bg-[#1A91FF20] rounded-[10px]">
                        <i class="fa-solid fa-volume-high"></i>
                    </div>
                </div>
            </div>
        `;
        wordContainer.appendChild(displayWord);
    });
    manageSpinner(false);
}

const displayAllLesson = (lessons) => {
    const lessonContainer = document.getElementById('lesson-container');

    lessons.forEach(lesson =>{
        const lessonButton = document.createElement('div');
        lessonButton.innerHTML = `
        <button id="lesson-btn-${lesson.level_no}" onclick="loadAllWord(${lesson.level_no})"
        class="active-btn btn text-[#422AD5] border border-[#422AD5]">
        <i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}
        </button>
        `;

        lessonContainer.appendChild(lessonButton);
    });
}
loadAllLesson();

// Search
document.getElementById("button-search").addEventListener('click', () => {
    const textSearch = document.getElementById("text-search");
    const textSearchValue = textSearch.value.trim().toLowerCase();
    console.log(textSearchValue)
    
    const url = "https://openapi.programming-hero.com/api/words/all";

    fetch(url)
    .then(res => res.json())
    .then(data => {
        const allWords = data.data;
        console.log(allWords);
        const filterWords = allWords.filter((word) =>{
            return word.word.toLowerCase().includes(textSearchValue);
        });
        displayAllWord(filterWords);
    });
    
});
