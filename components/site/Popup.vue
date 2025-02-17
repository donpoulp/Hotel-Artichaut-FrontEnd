<template>
    <div class="modal-overlay" @click="$emit('close-modal')">
        <div class="modal" @click.stop="">
            <template v-if="!showModalSignUp">
                <UIcon 
                    name="material-symbols:cancel-outline" 
                    class="closeIcon" 
                    @click="$emit('close-modal')"
                />
                
                <form>
                    <div class="inputs">
                        <p>Sign In</p>
                        <input type="text" placeholder="Identifier">
                        <input type="password" placeholder="Password">
                    </div>
                    <div class="buttons">
                        <button type="submit">Sign In</button>
                        <p @click="openSignUp">Sign Up</p>
                    </div>
                </form>
            </template>
            
            <template v-else>
                <Signup @close-modal-signup="showModalSignUp = false" />
            </template>
        </div>
    </div>
</template>

<script>
import Signup from './Signup.vue'

export default {
  components: { Signup },
  data() {
    return {
      showModal: false,
      showModalSignUp: false,
    }
  },
  methods: {
    openSignUp() {
      this.showModalSignUp = true;
    }
  }
}
</script>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: flex-end;
    z-index: 10;
}

.closeIcon {
    width: 50px;
    height: 50px;
    position: relative;
    left:20px;
    top:10px;
    cursor: pointer;
}

.modal {
    width: 50%;
    background-color: rgba(69, 71, 75, 0.9);
    height: 790px;
}

p {
    font-family: Antic Didone;
    font-size: 50px;
    text-align: center;
}

.inputs {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    height: 450px;
}

.inputs input {
width: 90%;
text-align: center;
height: 55px;
background-color: #D9D9D9;
color: black;
font-family: Noto Serif;
font-weight: 300;
font-size: 26px;
}

.buttons {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: flex-end;
    height: 200PX;
}

.buttons button, .buttons p {
    font-family: Noto Serif;
    font-size: 22px;
    width: 195px;
    height: 50px;
    background-color: #0D5649;
    border-radius: 5px;
    margin-right: 30px;
    color: #D8D27D;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}

::placeholder {
    color: black;
    font-family: Noto Serif;
    font-weight: 300;
    font-size: 26px;   
}


</style>