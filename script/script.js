const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLesson(json.data)); //promise of response
};

const displayLesson = (lessons) => {
  // 1. get the container & empty
  const levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML = "";
  //2. get into every lessons
  for (let lesson of lessons) {
    //3. create element
    console.log(lesson);
    //4. append into container
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
   <button href="" class="btn btn-outline btn-primary"
                ><i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}
              </button>
  `;
    levelContainer.append(btnDiv);
  }
};
loadLessons();
