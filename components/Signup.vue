<template>
    <div class="signup-container">
        <div class="header"> 
            <UIcon 
                name="icon-park-outline:return" 
                class="returnIcon" 
                @click="$emit('close-modal-signup')"
            />
        </div>
        
        <form class="signup-form">
            <div class="inputs">
                <p>Sign Up</p>
                <input type="text" placeholder="Last Name">
                <input type="text" placeholder="First Name">
                <input type="email" placeholder="Email">
                <input type="email" placeholder="Email bis">
                <input type="password" placeholder="Password">
                <input type="password" placeholder="Confirm Password">
                <input type="tel" placeholder="Phone Number">
                <input type="tel" placeholder="Phone Number bis">
            </div>
            <div class="buttons">
                <button>Sign Up</button>
                <button>Sign In</button>
            </div>
        </form>
    </div>
</template>

<style scoped>
.signup-container {
    height: 100%;
    width: 100%;
    overflow-y: auto;
    position: relative;
}

.header {
    position: sticky;
    top: 0;
    background-color: rgba(69, 71, 75, 0.9); 
    padding: 15px 0;
    z-index: 20;
}

.returnIcon {
    width: 50px;
    height: 40px;
    margin-left: 20px;
    cursor: pointer;
}

.signup-form {
    padding: 0 0 20px 0;
    min-height: 100%;
}

.signup-container::-webkit-scrollbar {
    display: none;
}

.signup-container {
    -ms-overflow-style: none;
    scrollbar-width: none;
}

.inputs {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    height: 850px;
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

.buttons button {
    font-family: Noto Serif;
    font-size: 22px;
    width: 195px;
    height: 50px;
    background-color: #0D5649;
    border-radius: 5px;
    margin-right: 30px;
    color: #D8D27D;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
}

p {
    font-family: Antic Didone;
    font-size: 50px;
    text-align: center;
}

::placeholder {
    color: black;
    font-family: Noto Serif;
    font-weight: 300;
    font-size: 26px;   
}
</style>