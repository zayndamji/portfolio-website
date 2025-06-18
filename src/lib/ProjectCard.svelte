<script>
  export let project;
</script>

<div
  class="box has-text-white"
  style="
    background-image: url('{project.backgroundImage}');
    background-size: cover;
    background-position: center;
    padding: 3.5rem;
    border-radius: 2.5rem;
  "
>
  <h1 class="title is-5 has-text-white">{project.title}</h1>
  <div class="content is-size-6">
    <p>{@html project.details}</p>
  </div>
  <div class="buttons mt-3 is-justify-content-center is-flex is-flex-wrap-wrap">
    {#each project.buttons as button}
      <a
        class="button is-light is-outlined is-rounded m-1"
        href={button.href}
        target="_blank"
        rel="noopener noreferrer"
        disabled={button.disabled}
      >
        <span>{button.text}</span>
      </a>
    {/each}
  </div>
</div>
