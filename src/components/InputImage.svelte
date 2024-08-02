<script>
</script>

<label for="file" class="custum-file-upload">
  <div class="icon">
    <img src="/image.svg" alt="" />
  </div>
  <div class="text">
    <span>Click to upload image</span>
  </div>
  <input id="file" type="file" accept="image/*" />
</label>

<style>
  .custum-file-upload {
    height: 200px;
    width: fit-content;
    display: inline-block;
    flex-direction: column;
    align-items: space-between;
    gap: 20px;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    background-color: #212121;
    padding: 1.5rem;
    border-radius: 10px;
    box-shadow: 0px 48px 35px -48px #e8e8e8;
  }

  .custum-file-upload .icon {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .custum-file-upload .icon img {
    height: 80px;
    fill: #e8e8e8;
  }

  .custum-file-upload .text {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .custum-file-upload .text span {
    font-weight: 400;
    color: #e8e8e8;
  }

  .custum-file-upload input {
    display: none;
  }
</style>
