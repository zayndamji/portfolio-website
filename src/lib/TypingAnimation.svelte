<script>
  import { onMount } from 'svelte';

  let typewriterText = "";
  let cursorVisible = true;
  const roles = ["Programmer", "Developer", "Designer", "Singer"];
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
  }

  onMount(() => {
    type();
    const cursorInterval = setInterval(() => {
      cursorVisible = !cursorVisible;
    }, 500);

    return () => {
      clearTimeout(typeTimeout);
      clearInterval(cursorInterval);
    };
  });
</script>

<style>
  .cursor {
    display: inline-block;
    animation: blink 1s step-start infinite;
  }

  @keyframes blink {
    50% {
      opacity: 0;
    }
  }
</style>

<h2 class="subtitle is-size-4-tablet has-text-white mt-5">
  <span>{typewriterText}</span><span class="cursor has-text-white">{cursorVisible ? '|' : ''}</span>
</h2>
