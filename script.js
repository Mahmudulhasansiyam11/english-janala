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

const loadAllWord = (id) => {
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
    }

    words.forEach(word => {
        const displayWord = document.createElement('div');
        displayWord.innerHTML = `
        <div class="bg-white space-y-3 text-center rounded-[10px] py-[30px] h-full">
                <h1 class="mt-[56px] inter-font font-bold text-[32px]">${word.word ? word.word : "word পাওয়া যায়নি"}</h1>
                <p class="inter-font font-medium text-[20px]">Meaning /Pronounciation</p>
                <p class="bangla-font font-semibold text-[32px]">"${word.meaning ? word.meaning : "meaning পাওয়া যায়নি"} / ${word.pronunciation ? word.pronunciation : "pronunciation পাওয়া যায়নি"}"</p>
                <div class="mt-[56px] flex justify-between items-center mb-[56px] mx-[56px]">
                    <div class="w-[56px] p-3 bg-[#1A91FF20] rounded-[10px]">
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