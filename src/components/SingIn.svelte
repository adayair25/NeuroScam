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
  <div class="form" transition:fade={{ delay: 150, duration: 150 }}>
    <h2>Sing in</h2>
    <form>
      <div class="form_inputs">

        <label for="from_label_email">
          <input type="email" id="from_label_email" class="form_input" placeholder=" " />
          <span class="form_label">Intro your email</span>
        </label>
        
        <label for="from_label">
          <input type="password" id="from_label_password" class="form_input" placeholder=" " />
          <span class="form_label">Intro your password</span>
        </label>

      </div>

      <button class="form_submit" type="submit">Sing In</button>
    </form>
  </div>
{/if}

<button id="singIn" type="button" on:click={toggleFrom}>Sing In</button>

<style>
  .form {
    display: block;
    width: min(350px, 90%);
    border-radius: 15px;
    position: fixed;
    color: #0a0a0a;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #d4d4d4;
    padding: 3rem 1.5rem;
    z-index: 1000;
  }

  .form_inputs {
    display: grid;
    gap: 1.5rem;
  }

  .form_label {
    width: 100%;
    display: grid;
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
