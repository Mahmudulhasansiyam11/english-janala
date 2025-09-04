const loadAllLesson = () =>{
    const url = "https://openapi.programming-hero.com/api/levels/all";
    fetch(url)
    .then(res => res.json())
    .then(data => {
        displayAllLesson(data.data);
    })
}

const displayAllLesson = (lessons) => {
    const lessonContainer = document.getElementById('lesson-container');

    lessons.forEach(lesson =>{
        const lessonButton = document.createElement('div');
        lessonButton.innerHTML = `
        <button class="btn text-[#422AD5] border border-[#422AD5]"><i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}</button>
        `;

        lessonContainer.appendChild(lessonButton);
    });
}
loadAllLesson();