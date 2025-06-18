const roles = ["Programmer", "Developer", "Designer", "Singer"];
const textElement = document.getElementById("typewriter-text");
const cursor = document.querySelector(".cursor");

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
  const current = roles[roleIndex];
  if (isDeleting) {
    textElement.textContent = current.substring(0, charIndex--);
  } else {
    textElement.textContent = current.substring(0, charIndex++);
  }

  if (!isDeleting && charIndex === current.length+1) {
    isDeleting = true;
    setTimeout(type, 1000); // pause before deleting
  } else if (isDeleting && charIndex === -1) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    setTimeout(type, 200);
  } else {
    setTimeout(type, isDeleting ? 25 : 100);
  }

  // debugging typing
  // console.log({ content: textElement.textContent, isDeleting, charIndex, current, currentLength: current.length, roleIndex })
}

type();