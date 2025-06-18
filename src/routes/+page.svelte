<script>
  import ProjectCard from '$lib/ProjectCard.svelte';
  import TypingAnimation from '$lib/TypingAnimation.svelte';
  import projects from '$lib/data/projects.json';
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700;800&display=swap');
  @import 'https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css';

  body, .navbar {
    background-color: rgb(22, 22, 22);
  }

  .title, .subtitle, .content, a.white-link {
    color: white;
    font-family: 'Open Sans', sans-serif;
  }

  a.white-link:hover {
    color: rgb(105, 150, 255);
  }
</style>

<nav class="navbar is-dark" role="navigation">
  <div class="navbar-brand">
    <a class="navbar-item" href="https://github.com/zayndamji" target="_blank">
      <img src="resources/images/github.png" width="24" height="24" alt="GitHub" />
    </a>
    <a class="navbar-item" href="https://www.youtube.com/@damji" target="_blank">
      <img src="resources/images/youtube.png" width="24" height="24" alt="YouTube" />
    </a>
  </div>
</nav>

<section class="hero is-fullheight-with-navbar has-text-centered">
  <div class="hero-body">
    <div class="container">
      <h1 class="title is-size-1-desktop is-size-2-tablet">Zayn Damji</h1>
      <TypingAnimation />
      <h2 class="subtitle is-size-5-tablet">↓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Explore my work&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;↓</h2>
      <figure class="image is-inline-block" style="width: 160px;">
        <img src="resources/images/coding.png" alt="Coding" />
      </figure>
    </div>
  </div>
</section>

<section class="section projects is-white has-text-centered">
  <div class="container is-narrow">
    <h1 class="title is-size-3-desktop is-size-4-mobile">Projects</h1>
    <br /><br />
    <div class="columns is-multiline is-vcentered">
      {#each projects as project (project.title)}
        <div class="column is-half">
          <ProjectCard {project} />
        </div>
      {/each}
    </div>
  </div>
</section>
