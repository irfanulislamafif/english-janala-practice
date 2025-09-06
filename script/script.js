const createElements = (arr) => {
  const htmlElements = arr.map((el) => `<span class="btn">${el}</span>`);
  return htmlElements.join(" ");
};

const synonyms = ["hello", "hi", "how"];
createElements(synonyms);

const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLesson(json.data)); //promise of response
};
const manageSpinner = (status) => {
  if (status == true) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("word-container").classList.add("hidden");
  } else {
    document.getElementById("word-container").classList.remove("hidden");
    document.getElementById("spinner").classList.add("hidden");
  }
};
const removeActive = () => {
  const lessonButtons = document.querySelectorAll(".lesson-btn");
  lessonButtons.forEach((btn) => btn.classList.remove("active"));
};

const loadLevelWord = (id) => {
  manageSpinner(true);
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActive();
      const clickBtn = document.getElementById(`lesson-btn-${id}`);
      clickBtn.classList.add("active");
      displayLevelWord(data.data);
    });
};

/**
 * 
 * {
    "word": "Benevolent",
    "meaning": "দয়ালু",
    "pronunciation": "বিনেভোলেন্ট",
    "level": 6,
    "sentence": "The benevolent man donated to charity.",
    "points": 4,
    "partsOfSpeech": "adjective",
    "synonyms": [
        "kind",
        "generous",
        "compassionate"
    ],
    "id": 112
} 
 */

const loadWordDetail = async (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  const res = await fetch(url);
  const details = await res.json();
  displayWordDetails(details.data);
};
const displayWordDetails = (word) => {
  console.log(word);
  const detailsBox = document.getElementById("details-container");
  detailsBox.innerHTML = `<div class="">
            <h2 class="text-2xl font-bold">
              ${word.word} ( <i class="fa-solid fa-microphone-lines"></i>
              <span class="font-bangla">:${word.pronunciation}</span>)
            </h2>
          </div>
          <div class="">
            <h2 class="font-bold">Meaning</h2>
            <p class="font-bangla">${word.meaning}</p>
          </div>
          <div class="">
            <h2 class="font-bold">Example</h2>
            <p>${word.sentence}</p>
          </div>
          <div class="">
            <h2 class="font-bold">Synonyms</h2>
           <div class="">${createElements(word.synonyms)}</div>
          </div>`;
  document.getElementById("word_modal").showModal();
};

const displayLevelWord = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";
  if (words.length == 0) {
    wordContainer.innerHTML = `
      <div
        class="text-center col-span-full rounded py-10 space-y-6">
        <img src="./assets/alert-error.png" class="mx-auto"/>
        <p class="text-xl font-medium text-gray-400 font-bangla">
         এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
        </p>
        <p class="font-bold text-4xl  font-bangla">নেক্সট Lesson এ যান</p>
      </div>`;
      manageSpinner(false)
    return;
  }
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
  <h2 class="font-bold text-2xl">${
    word.word ? word.word : "শব্দ পাওয়া যায়নি"
  }</h2>
  <p class="font-semibold">Meaning / Pronunciation</p>
  <div class="font-bangla text-2xl font-medium">"${
    word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"
  } / ${
      word.pronunciation ? word.pronunciation : "pronunciation পাওয়া যায়নি"
    }"</div>
  <div class="flex justify-between items-center">
    <button onclick="loadWordDetail(${
      word.id
    })" class="btn bg-[#1a91ff1a] hover:bg-[#1f62a098]"><i class="fa-solid fa-circle-info"></i></button>
    <button class="btn bg-[#1a91ff1a] hover:bg-[#1f62a098]"><i class="fa-solid fa-volume-high"></i></button>
  </div>
</div>`;

    wordContainer.append(card);
  });
  manageSpinner(false);
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
   <button  id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" href="" class="btn btn-outline btn-primary lesson-btn"
                ><i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}
              </button>
  `;
    levelContainer.append(btnDiv);
  }
};
loadLessons();
