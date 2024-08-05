<script>
</script>

<label for="file" class="custum-file-upload">
  <div class="icon">
    <img 
    src="/image.svg" 
    alt="image_svg" />
  </div>
  <div class="text">
    <span>Click to upload image</span>
  </div>
  <input id="file" type="file" accept="image/*" />
</label>

<style>
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
    /*box-shadow: 0px 48px 35px -48px #a3a3a3;*/
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

  @media (max-width: 720px) {
    .custum-file-upload {
      width: 80%;
    }
  }
</style>
