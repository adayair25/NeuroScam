<script>
  import { fade } from "svelte/transition";
  import api from "../lib/api";
  import { onMount } from 'svelte'

  let isAuthenticated = false;
  let showForm = false;
  let showLogin = false;

  onMount(() => {
    if (localStorage.getItem('token')) {
      isAuthenticated = true;
    }
  });

  function logout() {
    localStorage.removeItem('token');
    isAuthenticated = false;
    window.location.href = '/';
}

  let username = "".trim();
  let email = "".trim();
  let password = "".trim();
  let confirm_password = "".trim();


  const login = async () => {
    try {
      const tokens = await api.post(
        "/login/",
        { username, password },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(tokens.data);
      localStorage.setItem("token", tokens.data.access);
      window.location.href = "/";
    } catch (error) {
      console.log(error.code, error.response.status);
      alert("Error: Invalid credentials");
    }
  };

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
      window.location.href = "/";
    } catch (error) {
      alert(
        `Error: User already exists ${(error.code, error.response.status)}`
      );
      console.log(error.code, error.response.status);
    }
  };

  
  function toggleFrom() {
    showLogin = false;
    showForm = !showForm;
  }

  function toggleLogin() {
    toggleFrom();
    showLogin = !showLogin;
  }

  export {showForm}
</script>

{#if showForm}
    <form class="form" transition:fade={{delay: 100, duration: 100 }} on:submit|preventDefault={handleSubmit}>
      <p class="title">Register </p>
      <p class="message">Signup now and get full access to our app. </p>
        <label for="username"> Name 
        <input
         class="input"
          bind:value={username}
          required
          autocomplete="on"
          type="text"
          id="username"
          placeholder=""/>
        </label>
        <label for="email"> Email 
        <input
          class="input"
          bind:value={email}
          required
          autocomplete="on"
          type="email"
          id="email"
          placeholder=""/>
        </label>
        <label for="password"> Password 
        <input
          bind:value={password}
          class="input"
          required
          type="password"
          id="password"
          placeholder=""/>
        </label>
        <label for="confirm_password"> Confirm Password 
        <input
          class="input"
          bind:value={confirm_password}
          required
          type="password"
          id="confirm_password"
          placeholder=""
        />
      </label>
      <button class="submit" type="submit">Sing in</button>
      <p class="signin">Already have an acount ? <button class="btn_sing" type="button" on:click={toggleLogin} >Login</button></p>
    </form>
    {:else}
    {#if showLogin}
    <form class="form" transition:fade={{delay: 100, duration: 100 }} on:submit|preventDefault={login}>
      <p class="title">Login</p>
      <p class="message">Login now and get full access to our app. </p>
        <label for="username"> Name 
        <input
         class="input"
          bind:value={username}
          required
          autocomplete="on"
          type="text"
          id="username"
          placeholder=""/>
        </label>
        <label for="password"> Password 
          <input
            bind:value={password}
            class="input"
            required
            type="password"
            id="password"
            placeholder=""/>
          </label>
          <label for="confirm_password"> Confirm Password 
          <input
            class="input"
            bind:value={confirm_password}
            required
            type="password"
            id="confirm_password"
            placeholder=""
          />
        </label>
        <button class="submit" type="submit">Login</button>
      </form>
    {/if}
{/if}

{#if isAuthenticated}
<button id="singIn" on:click={logout}>Log Out</button>
{:else if !isAuthenticated}
<button id="singIn" type="button" on:click={toggleFrom}>Sing In</button>
{/if}

<style>
  /* From Uiverse.io by ammarsaa */ 
.form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 350px;
  padding: 20px;
  border-radius: 20px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
  background-color: #1a1a1a;
  color: #fff;
  border: 1px solid #333;
}

.title {
  font-size: 28px;
  font-weight: 600;
  letter-spacing: -1px;
  position: relative;
  display: flex;
  align-items: center;
  padding-left: 30px;
  color: #00bfff;
}

.title::before {
  width: 18px;
  height: 18px;
}

.title::after {
  width: 18px;
  height: 18px;
  animation: pulse 1s linear infinite;
}

.title::before,
.title::after {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  border-radius: 50%;
  left: 0px;
  background-color: #00bfff;
}

.message, 
.signin {
  font-size: 14.5px;
  color: rgba(255, 255, 255, 0.7);
}

.signin {
  text-align: center;
}

.btn_sing {
  background-color: transparent;
  border: none;
  color: #00bfff;
  cursor: pointer;
}
.signin a:hover {
  text-decoration: underline royalblue;
}

.signin a {
  color: #00bfff;
}

.form label {
  position: relative;
}

.form label .input {
  background-color: #333;
  color: #fff;
  width: 100%;
  padding: 20px 05px 05px 10px;
  outline: 0;
  border: 1px solid rgba(105, 105, 105, 0.397);
  border-radius: 10px;
}

.form label .input + span {
  color: rgba(255, 255, 255, 0.5);
  position: absolute;
  left: 10px;
  top: 0px;
  font-size: 0.9em;
  cursor: text;
  transition: 0.3s ease;
}

.form label .input:placeholder-shown + span {
  top: 12.5px;
  font-size: 0.9em;
}

.form label .input:focus + span,
.form label .input:valid + span {
  color: #00bfff;
  top: 0px;
  font-size: 0.7em;
  font-weight: 600;
}

.input {
  font-size: medium;
}

.submit {
  border: none;
  outline: none;
  padding: 10px;
  border-radius: 10px;
  color: #fff;
  font-size: 16px;
  transform: .3s ease;
  background-color: #00bfff;
}

.submit:hover {
  background-color: #00bfff96;
}

@keyframes pulse {
  from {
    transform: scale(0.9);
    opacity: 1;
  }

  to {
    transform: scale(1.8);
    opacity: 0;
  }
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
