<script lang="ts">
  // import Login from "../Login.svelte";
  import SingIn from "../SingIn.svelte";

  let showSignUp: boolean = false;

  function showLoginForm() {
    showSignUp = !showSignUp;
  }
</script>

<button id="singIn" type="button" on:click={showLoginForm}>Sing In</button>

<SingIn show={showSignUp}/>

<style>
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
