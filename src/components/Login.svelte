<script lang="ts">
  import { fade } from "svelte/transition";
  import api from "../lib/api.mjs";

  interface LoginResponse {
    access: string;
  }

  let username: string = "".trim();
  let password: number | string = "".trim();
  let confirm_password: string | number = "".trim();

  const login = async () => {
    if (password !== confirm_password) {
      alert("Passwords do not match");
      return;
    }
    try {
      const token = await api.post<LoginResponse>(
        "/login/",
        { username, password },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(token.data);
      localStorage.setItem("token", token.data.access);
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
      alert("Error: Invalid credentials");
      window.location.reload();
    }
  };
</script>

<div transition:fade={{ delay: 100, duration: 100 }} class="form-box">
  <form class="form" on:submit|preventDefault={login}>
    <span class="title">Login</span>
    <span class="subtitle">Login in to your account</span>
    <div class="form-container">
      <input
        minlength="3"
        required
        type="text"
        class="input"
        placeholder="Full Name"
        bind:value={username}
      />
      <input
        minlength="8"
        required
        type="password"
        class="input"
        placeholder="Password"
        bind:value={password}
      />
      <input
        minlength="8"
        required
        type="password"
        class="input"
        placeholder="Confirm Password"
        bind:value={confirm_password}
      />
    </div>
    <button type="submit">Sign up</button>
  </form>
  <div class="form-section"></div>
</div>

<style>
  .form-box {
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
</style>
