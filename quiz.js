const correctAnswers = {
  q1: "Go to the attendance office and get a slip of paper",
  q2: "Go to the main office and get a white lanyard",
  q3: "Check the daily substitute list, and then go to the PAC",
  q4: "You can't!",
  q5: "Show up to a meeting in the beginning of the year",
  q6: "Complete all the summer assignments",
  q7: "Talk to your counselor or another trusted adult",
  q8: "Fill out all necessary forms available on Genesis and make sure you are cleared.",
  q9: "In any of the gyms, cafeteria, atrium, in any of the hallways, and sometimes outside",
  q10: "In the media center which is in the atrium",
  q11: "8:20-2:58"
};

const feedbackText = {
  q1: "When you need to leave school early, you first put your early dismissal on Genesis, go to the attendance office a few hours before leaving and get a slip of paper to show to your teacher. When you need to leave, show the slip of paper to your teacher, and then you're good to leave!",
  q2: "If you leave your lanyard at home, just go to the main office and get a temporary white one! Make sure to return the lanyard at the end of the day.",
  q3: "The daily substitute list is updated every day. At Ridge High School, if your teacher is absent and there's no substitute assigned, you'll go to the PAC (Performing Arts Center). This is called Central Sub, and you will sit there with other students whose teachers are also absent. The link to the substitute list is on the Preparation Tab!",
  q4: "In order to promote positive mental health, getting students focuses, and taking away the underlying anxiety of constantly checking genesis, Genesis' gradebook is locked from 8:20-2:58 (start of school - end).",
  q5: "At the beginning of each year clubs will hold meetings for new people to join. Many will post on social media or post fliers around school so look out for them. You can also check this list with all the current RHS clubs. You can find the list of clubs on the Preparation Tab!",
  q6: "You can find the list of summer assignments for honors and enriched classes on the Preparation tab on the website. Make sure you complete these before school begins.",
  q7: "If you ever need help during school, you can always email your counselor about meeting them to talk about it. Also, you can talk to a trusted adult in your life, such as a teacher or guardian. There are many people at Ridge who are willing to assist you.",
  q8: "In order to join sports, you have to first fill out all the necessary forms found on Parent Genesis, including Impact Testing, and medical forms. Make sure you are cleared with a green check next to the sport on Genesis. After that, you should show up to the interest meeting, and later the tryouts.",
  q9: "You can eat lunch anywhere in the school, including the two gyms, hallways, atrium, and classrooms WITH permission. Additionally, if the weather is nice, you can eat lunch outside.",
  q10: "If you need to study or be in a quiet place to focus, you can go into the media center. The media center is open before school (at 8), during both halves of lunch, and after school. Make sure you do not bring food in there because it is not allowed.",
  q11: "You need to be in class by 8:20, when the bell rings. School then ends at 2:58."
};

const quizForm = document.getElementById('quizForm');
const feedbackDiv = document.getElementById('feedback');

quizForm.addEventListener('submit', function(event) {
  event.preventDefault();
  let score = 0;
  const total = Object.keys(correctAnswers).length;

  document.querySelectorAll('.feedback-line').forEach(line => line.innerHTML = '');

  for (let q in correctAnswers) {
    const selectedInput = quizForm.elements[q];
    let selected = null;
    if (selectedInput) {
      if (selectedInput.length === undefined) {
        selected = selectedInput.checked ? selectedInput.value : null;
      } else {
        for (const input of selectedInput) {
          if (input.checked) {
            selected = input.value;
            break;
          }
        }
      }
    };
    const correct = correctAnswers[q];
    const explanation = feedbackText[q];
    const feedbackEl = document.querySelector(`.question[data-question="${q}"] .feedback-line`);
    console.log(feedbackEl);
    if (selected === correct) {
      score++;
      feedbackEl.innerHTML = `<span class="correct"> Correct</span><br><small>${explanation}</small>`;
    } else {
      feedbackEl.innerHTML = `<span class="incorrect"> Incorrect</span><br><small>${explanation}</small>`;
    }
  }

  feedbackDiv.innerHTML = score === total
    ? `<span class="correct">Perfect! You got all ${total} correct </span>`
    : `<span class="incorrect">You got ${score} out of ${total} correct.</span>`;
});