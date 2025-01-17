<template>
    <div class="modal-overlay" @click="$emit('close-modal')">
        <div class="modal" @click.stop="">
            <div class="close" @click="$emit('close-modal')">
                <UIcon name="material-symbols:cancel-outline" class="closeIcon" />
            </div>
            <p>Sign In</p>
            <form>
                <div class="inputs">
                    <input type="text" placeholder="Identifier">
                    <input type="password" placeholder="Password">
                </div>
                <div class="buttons">
                    <button>Sign In</button>
                    <button>Sign Up</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
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
}

.closeIcon {
    width: 50px;
    height: 50px;
    position: fixed;
    left:51%;
    top:1%;
}

.modal {
    width: 50%;
    background-color: #45474B;
    opacity: 0.9;
    height: 790px;
}

p {
    font-family: Antic Didone;
    font-size: 50px;
    text-align: center;
    margin-top: 50px;
}

.inputs {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 150px;
}

.inputs input {
width: 90%;
text-align: center;
height: 50px;
background-color: D9D9D9;
}



</style>