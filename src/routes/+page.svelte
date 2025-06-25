<script>
  import ProjectCard from '$lib/ProjectCard.svelte';
  import TypingAnimation from '$lib/TypingAnimation.svelte';
  import projects from '$lib/data/projects.json';

  // Get unique tags from all projects
  const allTags = Array.from(
    new Set(projects.flatMap(project => project.tags))
  ).sort();

  let selectedTag = 'All';

  // Reactive filtered list
  $: filteredProjects = selectedTag === 'All'
    ? projects
    : projects.filter(project => project.tags.includes(selectedTag));
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700;800&display=swap');
  @import 'https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css';

  .navbar {
    background-color: rgb(23, 23, 23);
  }

  .title, .subtitle {
    color: white;
    font-family: 'Open Sans', sans-serif;
  }
</style>

<nav class="navbar is-dark is-fixed-bottom">
  <div class="navbar-brand">
    <a class="navbar-item" href="https://github.com/zayndamji" target="_blank">
      <img src="resources/images/github.png" width="24" height="24" alt="GitHub" />
    </a>

    <a class="navbar-item" href="https://www.youtube.com/@damji" target="_blank">
      <img src="resources/images/music.png" width="24" height="24" alt="Music Channel" />
    </a>

    <a class="navbar-item" href="https://www.youtube.com/@11101B_BarcbotsGettingThere" target="_blank">
      <img src="resources/images/robot.png" width="24" height="24" alt="Robotics Channel" />
    </a>
  </div>

  <div class="navbar-menu">
    <div class="navbar-end">
      <div class="content is-size-6 pr-4 is-flex is-justify-content-center is-align-content-center is-flex-wrap-wrap">
        <p>© &nbsp;Zayn Damji</p>
      </div>
    </div>
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

    <!-- Tag filter buttons -->
    <div class="buttons is-centered is-flex">
      <button
        class="button is-rounded m-1"

        class:has-text-white={selectedTag !== 'All'}
        class:has-text-black={selectedTag === 'All'}

        class:is-light={selectedTag === 'All'}
        class:is-dark={selectedTag !== 'All'}

        on:click={() => selectedTag = 'All'}
      >
        All
      </button>
      {#each allTags as tag}
        <button
          class="button is-rounded m-1 has-text-white"

          class:has-text-white={selectedTag !== tag}
          class:has-text-black={selectedTag === tag}

          class:is-light={selectedTag === tag}
          class:is-dark={selectedTag !== tag}

          on:click={() => selectedTag = tag}
        >
          {tag}
        </button>
      {/each}
    </div>

    <!-- Filtered Projects -->
    <div class="columns is-multiline is-vcentered">
      {#each filteredProjects as project (project.title)}
        <div class="column is-half">
          <ProjectCard {project} />
        </div>
      {/each}
    </div>
  </div>
</section>
