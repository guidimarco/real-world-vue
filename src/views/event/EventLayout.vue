<script setup>
import { inject } from 'vue'

const gStore = inject('GStore')
</script>

<template>
    <div v-if="gStore.event">
        <div id="nav">
            <router-link :to="{ name: 'event-details' }">Details</router-link> | 
            <router-link :to="{ name: 'event-register' }">Register</router-link> | 
            <router-link :to="{ name: 'event-edit' }">Edit</router-link>
        </div>

        <router-view :event="gStore.event" />
    </div>
</template>