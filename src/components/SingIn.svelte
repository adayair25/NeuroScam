<script>
  import { fade } from "svelte/transition";
  /*import { onMount } from "svelte";
  import { navigate } from "svelte-routing";
  import { auth } from "./stores/auth";

  onMount(() => {
    auth.subscribe((value) => {
      if (value) {
        navigate("/");
      }
    });
  });*/

  let showForm = false;

  function toggleFrom() {
    showForm = !showForm;
  }
</script>

{#if showForm}
  <div class="form" transition:fade={{ delay: 250, duration: 300 }}>
    <form action="">
      <input type="text" required placeholder="Email" />
      <input type="password" required placeholder="Password" />
      <button type="submit"> Sing In </button>
    </form>
  </div>
{/if}

<button id="singIn" type="button" on:click={toggleFrom}>Sing In</button>

<style>
  .form {
    display: block;
    border-radius: 15px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #3d3d3d;
    padding: 20px;
    z-index: 1000;
  }

  #singIn {
    background-color: #f6f6f6;
    border: none;
    border-radius: 15px;
    cursor: pointer;
    font-weight: 600;
    padding: 10px 15px;
    font-family: system-ui, sans-serif;
  }
</style>
