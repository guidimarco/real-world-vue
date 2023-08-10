<script setup>
import { inject } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const gStore = inject('GStore')

const register = () => {
    // Chiamata API
    // If SUCCESS redirect to EventDetails

    gStore.flashMessage = `You are successfully registered for ${event.title}`

    setTimeout(() => {
        gStore.flashMessage = ''
    }, 3000)

    /**
     * router.replace non salva la pagina nella storia di navigazione
     * router.go(-1) va una pagina indietro nella navigazione
     * 
     */ 
    router.push({ // Non è necessario specificare l'id in quanto siamo in una rotta "sorella"
        name: 'event-details'
    })
}
</script>

<template>
    <div>
        <p>Register for events here</p>
        <button @click="register">Register Me</button>
    </div>
</template>