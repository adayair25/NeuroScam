<script>
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

  function togglePopover() {
    showForm = !showForm;
  }
</script>

<div class:show={showForm} class="form">
  <form action="">
    <input type="text" required placeholder="Email" />
    <input type="password" required placeholder="Password" />
    <button type="submit"> Sing In </button>
  </form>
</div>
<button id="singIn" type="button" on:click={togglePopover}>Sing In</button>

<style>
  .form {
    display: none;
    border-radius: 15px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #a8a29e;
    padding: 20px;
    z-index: 1000;
  }

  .form {
    &.show {
      display: block;
    }
  }

  #singIn {
    border: none;
    border-radius: 15px;
    cursor: pointer;
    font-weight: 600;
    padding: 12px 15px;
    font-family: system-ui, sans-serif;
  }
</style>
