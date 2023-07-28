<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const register = () => {
    // Chiamata API
    // If SUCCESS redirect to EventDetails

    // router.replace non salva la pagina nella storia di navigazione
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