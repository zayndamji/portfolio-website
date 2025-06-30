let typewriterText = "";
const roles = ["Programmer", "Singer", "Developer", "Designer"];

let roleIndex = 0;
let charIndex = 0;

let isDeleting = false;
let typeTimeout;

function type() {
  const current = roles[roleIndex];
  if (isDeleting) {
    charIndex--;
    typewriterText = current.substring(0, charIndex);
  } else {
    charIndex++;
    typewriterText = current.substring(0, charIndex);
  }

  if (!isDeleting && charIndex === current.length) {
    isDeleting = true;
    typeTimeout = setTimeout(type, 1000);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    typeTimeout = setTimeout(type, 200);
  } else {
    typeTimeout = setTimeout(type, isDeleting ? 25 : 100);
  }

  document.getElementById('typewriter-text').innerHTML = typewriterText || '&nbsp;';
}

type();