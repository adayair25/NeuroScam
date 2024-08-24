<script lang="ts">
  import { blur } from "svelte/transition";
  import api from "../lib/api.mjs";
  import { onMount } from "svelte";
  import { expoIn } from "svelte/easing";

  let isAuthenticated:boolean;

  onMount(() => {
    if (localStorage.getItem("token")) {
      isAuthenticated = true;
    }
  });

  let username: string = "".trim();
  let email: string = "".trim();
  let password: string | number = "".trim();
  let confirm_password: string | number = "".trim();

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
      window.location.reload();
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      if (typeof (error as any).response === "object") {
        console.log((error as any).code, (error as any).response.status);
      } else {
        console.log("Error does not have a response object.");
      }
      alert("Error: User already exists");
      window.location.reload();
    }
  };
</script>

<div
  class="form-box"
  transition:blur={{ delay: 0, duration: 200, amount: "2rem", easing: expoIn }}
>
  <form class="form" on:submit|preventDefault={handleSubmit}>
    <span class="title">Sign up</span>
    <span class="subtitle">Create a free account</span>
    <div class="form-container">
      <input
        required
        minlength="3"
        type="text"
        class="input"
        placeholder="Name"
        bind:value={username}
      />
      <input
        required
        minlength="8"
        type="email"
        class="input"
        placeholder="Email"
        bind:value={email}
      />
      <input
        required
        minlength="8"
        type="password"
        class="input"
        placeholder="Password"
        bind:value={password}
      />
      <input
        required
        minlength="8"
        type="password"
        class="input"
        placeholder="Confirm Password"
        bind:value={confirm_password}
      />
    </div>
    <button type="submit">Sign up</button>
  </form>
  <div class="form-section">
    <p>Have an account? <a href="/">Log in</a></p>
  </div>
</div>

<button id="singIn" type="button" on:click={console.log}>Sing In</button>

<style>
  .form-box {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 9999;
    max-width: 300px;
    background: #f1f7fe;
    overflow: hidden;
    border-radius: 16px;
    color: #010101;
  }

  .form {
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 32px 24px 24px;
    gap: 16px;
    text-align: center;
  }

  /*Form text*/
  .title {
    font-weight: bold;
    font-size: 1.6rem;
  }

  .subtitle {
    font-size: 1rem;
    color: #666;
  }

  /*Inputs box*/
  .form-container {
    overflow: hidden;
    border-radius: 8px;
    background-color: #fff;
    margin: 1rem 0 0.5rem;
    width: 100%;
  }

  .input {
    background: none;
    border: 0;
    outline: 0;
    height: 40px;
    width: 100%;
    border-bottom: 1px solid #eee;
    font-size: 0.9rem;
    padding: 8px 15px;
  }

  .form-section {
    padding: 16px;
    font-size: 0.85rem;
    background-color: #e0ecfb;
    box-shadow: rgb(0 0 0 / 8%) 0 -1px;
  }

  .form-section a {
    font-weight: bold;
    color: #0066ff;
    transition: color 0.3s ease;
  }

  .form-section a:hover {
    color: #005ce6;
    text-decoration: underline;
  }

  /*Button*/
  .form button {
    background-color: #0066ff;
    color: #fff;
    border: 0;
    border-radius: 24px;
    padding: 10px 16px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .form button:hover {
    background-color: #005ce6;
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

  @media (max-width: 720px) {
    .form {
      width: 90%;
    }
  }
</style>
