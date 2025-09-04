const loadAllLesson = () => {
    const url = "https://openapi.programming-hero.com/api/levels/all";
    fetch(url)
    .then(res => res.json())
    .then(data => {
        displayAllLesson(data.data);
    })
}

const loadAllWord = (id) => {
    url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
    .then(res => res.json())
    .then(data => {
        displayAllWord(data.data);
        console.log(data.data);
    });
}

const displayAllWord = (words) => {
    const wordContainer = document.getElementById('word-container');
    wordContainer.innerHTML = "";

    words.forEach(word => {
        const displayWord = document.createElement('div');
        displayWord.innerHTML = `
        <div class="bg-white space-y-3 text-center rounded-[10px] py-[30px]">
                <h1 class="mt-[56px] inter-font font-bold text-[32px]">${word.word}</h1>
                <p class="inter-font font-medium text-[20px]">Meaning /Pronounciation</p>
                <p class="bangla-font font-semibold text-[32px]">"${word.meaning} / ${word.pronunciation}"</p>
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
        <button onclick="loadAllWord(${lesson.level_no})" class="btn text-[#422AD5] border border-[#422AD5]"><i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}</button>
        `;

        lessonContainer.appendChild(lessonButton);
    });
}
loadAllLesson();