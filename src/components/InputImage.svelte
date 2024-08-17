<script>
  import api from "../lib/api";
  import { fade } from 'svelte/transition';

  let loading = false;
  let showImage = false;
  let refIMG;
  let selectedImage;

  const handleImage = (e) => {
    selectedImage = e.target.files[0];
    return console.log(selectedImage);
  };

  const submitImage = async () => {
    if (!selectedImage) {
      alert("Please select an image");
      return;
    }
    try {
      loading = true;
      const formData = new FormData();
      formData.append("file", selectedImage);

      const res = await api.post("/model/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      });

      showImage = true;
      loading = false;

      const base64Image = await res.data.annotated_image;
      const imageUrl = `data:image/png;base64,${base64Image}`;

      const imgElement = document.querySelector("#img");
      imgElement.src = imageUrl;
      refIMG.focus();
    } catch (error) {
      console.log(error.response.status);
      
      alert("Error: Sing in please");
      window.location.reload();
      
    }
  };
</script>

<label for="file" class="custum-file-upload">
  <div class="icon">
    <img src="/image.svg" alt="image_svg" />
  </div>
  <div class="text">
    <span>Click to upload image</span>
  </div>
  <input
    id="file"
    type="file"
    accept="image/png, image/jpeg"
    on:change={handleImage}
  />
</label>
<button type="button" on:click={submitImage}>analyze image</button>

{#if loading}
  <div class="loader">
    <span class="loader-text">loading</span>
    <span class="load"></span>
  </div>
{:else if showImage}
  <picture transition:fade={{ delay: 100, duration: 100 }}>
    <img
      id="img"
      alt="image"
      width="310"
      height="310"
      aria-hidden="true"
      bind:this={refIMG}
      tabindex="0"
    />
  </picture>
{/if}

<h1>Powered by <span class="CEUNO">CEUNO</span></h1>

<style>
  img {
    border-radius: 1rem;
  }

  h1 {
    font-size: 3rem;
    color: #fafafa;
    text-align: center;
    margin-top: 2rem;

    & .CEUNO {
      color: #007acc;
    }
  }
  .custum-file-upload {
    height: 200px;
    width: 350px;
    display: inline-block;
    flex-direction: column;
    align-items: space-between;
    gap: 20px;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    background-color: #171717;
    padding: 1.5rem;
    border-radius: 10px;
  }

  .custum-file-upload .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 1rem;
  }

  .custum-file-upload .icon img {
    height: 80px;
  }

  .custum-file-upload .text {
    padding-top: 1rem;
    text-align: center;
  }

  .custum-file-upload .text span {
    font-weight: 400;
    color: #d6d3d1;
  }

  .custum-file-upload input {
    display: none;
  }

  .custum-file-upload {
    -webkit-animation: scustum-file-upload 3s
      cubic-bezier(0.25, 0.46, 0.5, 0.7 0.94) infinite alternate;
    animation: custum-file-upload 2s cubic-bezier(0.25, 0.46, 0.45, 0.94)
      infinite alternate;
  }

  /**
 * ----------------------------------------
 * animation shadow-drop-center
 * ----------------------------------------
 */

  @keyframes custum-file-upload {
    0% {
      -webkit-box-shadow: 0 0 0 0 #737373;
      box-shadow: 0 0 0 0 #737373;
    }
    50% {
      -webkit-box-shadow: 0 0 20px 0px #737373;
      box-shadow: 0 0 20px 0px #737373;
    }
    100% {
      -webkit-box-shadow: 0 0 20px 0px #737373;
      box-shadow: 0 0 20px 0px #737373;
    }
  }

  @keyframes custum-file-upload {
    0% {
      -webkit-box-shadow: 0 0 0 0 #737373;
      box-shadow: 0 0 0 0 #737373;
    }
    50% {
      -webkit-box-shadow: 0 0 20px 0px #737373;
      box-shadow: 0 0 20px 0px #737373;
    }
    100% {
      -webkit-box-shadow: 0 0 20px 0px #737373;
      box-shadow: 0 0 20px 0px #737373;
    }
  }

  
  /* button */
  button {
    --color: #007acc;
    display: inline-block;
    width: 9em;
    height: 2.6em;
    line-height: 2.5em;
    margin: 25px;
    position: relative;
    cursor: pointer;
    overflow: hidden;
    border: 1px solid #27272a;
    transition: color 0.5s;
    z-index: 1;
    font-size: 16px;
    border-radius: 10px;
    font-weight: bold;
    color: #0a0a0a;
    font-family: system-ui, sans-serif;
  }
  
  button:before {
    content: "";
    position: absolute;
    z-index: -1;
    background: var(--color);
    height: 150px;
    width: 200px;
    border-radius: 50%;
  }
  
  button:hover {
    color: #fafafa;
    border: 2px solid var(--color);
  }
  
  button:before {
    top: 100%;
    left: 100%;
    transition: all 0.3s;
  }
  
  button:hover:before {
    top: -30px;
    left: -30px;
  }
  
  /* loader */
  .loader {
    width: 80px;
    height: 50px;
    position: relative;
  }
  
  .loader-text {
    position: absolute;
    top: 0;
    padding: 0;
    margin: 0;
    color: #fafafa;
    animation: text_713 2.5s ease both infinite;
    font-size: 0.8rem;
    letter-spacing: 1px;
    font-family: system-ui, sans-serif;
  }
  
  .load {
    background-color: #007acc;
    border-radius: 50px;
    display: block;
    height: 16px;
    width: 16px;
    bottom: 0;
    position: absolute;
    transform: translateX(64px);
    animation: loading_713 2.5s ease both infinite;
  }
  
  .load::before {
    position: absolute;
    content: "";
    width: 100%;
    height: 100%;
    background-color: #d1c2ff;
    border-radius: inherit;
    animation: loading2_713 2.5s ease both infinite;
  }
  
  @keyframes text_713 {
    0% {
      letter-spacing: 1px;
      transform: translateX(0px);
    }
    
    40% {
      letter-spacing: 2px;
      transform: translateX(26px);
    }
    
    80% {
      letter-spacing: 1px;
      transform: translateX(32px);
    }
    
    90% {
      letter-spacing: 2px;
      transform: translateX(0px);
    }
    
    100% {
      letter-spacing: 1px;
      transform: translateX(0px);
    }
  }
  
  @keyframes loading_713 {
    0% {
      width: 16px;
      transform: translateX(0px);
    }
    
    40% {
      width: 100%;
      transform: translateX(0px);
    }
    
    80% {
      width: 16px;
      transform: translateX(64px);
    }
    
    90% {
      width: 100%;
      transform: translateX(0px);
    }
    
    100% {
      width: 16px;
      transform: translateX(0px);
    }
  }
  
  @keyframes loading2_713 {
    0% {
      transform: translateX(0px);
      width: 16px;
    }
    
    40% {
      transform: translateX(0%);
      width: 80%;
    }
    
    80% {
      width: 100%;
      transform: translateX(0px);
    }
    
    90% {
      width: 80%;
      transform: translateX(15px);
    }
    
    100% {
      transform: translateX(0px);
      width: 16px;
    }
  }
  @media (max-width: 720px) {
    .custum-file-upload {
      width: 80%;
    }
  }
</style>
