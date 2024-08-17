<script>
  import { fade } from "svelte/transition";
  import api from "../lib/api";
  import { onMount } from 'svelte'
  
    /*onMount(async () => {
      const res = await api.get("/users/");
      console.log(res.data);
    });*/

  export function logout() {
    localStorage.removeItem('jwt');
    isAuthenticated.set(false);
    window.location.href = '/';
}

  let username = "".trim();
  let email = "".trim();
  let password = "".trim();
  let confirm_password = "".trim();

  const handleSubmit = async () => {
    if (password !== confirm_password) {
      alert("Passwords do not match");
      return;
    }
    try {
      const data = {
        username,
        email,
        password,
      };
      await api.post("/users/", data);
      const tokens = await api.post(
        "/login/",
        { username, password },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log(tokens.data);
      localStorage.setItem("token", tokens.data.access);
      toggleFrom();
    } catch (error) {
      alert(
        `Error: User already exists ${(error.code, error.response.status)}`
      );
      console.log(error.code, error.response.status);
    }
  };

  let showForm = false;

  function toggleFrom() {
    showForm = !showForm;
  }
</script>

{#if showForm}
  <div class="form" transition:fade={{ delay: 150, duration: 150 }}></div>
    <h2>Sing in</h2>
    <form on:submit|preventDefault={handleSubmit}>
      <div class="form_inputs">
        <label for="username"> Name </label>
        <input
          bind:value={username}
          required
          autocomplete="on"
          type="text"
          id="username"
          placeholder="name"
        />
        <label for="email"> Email </label>
        <input
          bind:value={email}
          required
          autocomplete="on"
          type="email"
          id="email"
          placeholder="email"
        />

        <label for="password"> Password </label>
        <input
          bind:value={password}
          required
          type="password"
          id="password"
          placeholder="password"
        />

        <label for="confirm_password"> Confirm Password </label>
        <input
          bind:value={confirm_password}
          required
          type="password"
          id="confirm_password"
          placeholder="password"
        />
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
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #171717;
    padding: 3rem 1.5rem;
    z-index: 1000;
  }

  .form_inputs {
    display: grid;
    gap: 1.5rem;
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
