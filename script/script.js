const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLesson(json.data)); //promise of response
};
const loadLevelWord = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayLevelWord(data.data));
};

const displayLevelWord = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";

  /**
 * id
: 
141
level
: 
5
meaning
: 
"অসুস্থ বা নিষ্ক্রিয়"
pronunciation
: 
"লিথারজিক"
word
: 
"Lethargic"
 */

  words.forEach((word) => {
    console.log(word);
    const card = document.createElement("div");
    card.innerHTML = `
    <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">
  <h2 class="font-bold text-2xl">${word.word}</h2>
  <p class="font-semibold">Meaning / Pronunciation</p>
  <div class="font-bangla text-2xl font-medium">"${word.meaning} / ${word.pronunciation}"</div>
  <div class="flex justify-between items-center">
    <button class="btn bg-[#1a91ff1a] hover:bg-[#1f62a098]"><i class="fa-solid fa-circle-info"></i></button>
    <button class="btn bg-[#1a91ff1a] hover:bg-[#1f62a098]"><i class="fa-solid fa-volume-high"></i></button>
  </div>
</div>`;

    wordContainer.append(card);
  });
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
   <button onclick="loadLevelWord(${lesson.level_no})" href="" class="btn btn-outline btn-primary"
                ><i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}
              </button>
  `;
    levelContainer.append(btnDiv);
  }
};
loadLessons();
