<script setup>
import { ref, onMounted, watchEffect, computed } from 'vue';
import EventService from '@/services/EventService.js';
import EventCard from '@/components/EventCard.vue';

const props = defineProps({
  page: {
    required: false
  }
})

const events = ref(null)
const totalEvents = ref(0)

const hasNextPage = computed(() => {
  var totalPages = Math.ceil(totalEvents.value / 2)
  return props.page < totalPages
})

onMounted(() => {
  // A differenza di watch non è necessario specificare quale dipendenza controllare
  // tutte le dipendenze reattive sono controllate, ed ad ogni cambiamento viene 
  // eseguito il codice
  watchEffect(() => {
    // Annullo gli eventi così l'utente si accorge che è stata fatta una chiamata API
    events.value = null
    EventService.getEvents(2, props.page).then((response) => {
      events.value = response.data
      totalEvents.value = response.headers['x-total-count']
    }).catch((error) => {
      console.log(error)
    })
  })
})
</script>

<template>
  <h1>Events for goods</h1>
  <div class="events">
    <EventCard v-for="event in events" :key="event.id" :event="event" />

    <div class="pagination">
      <router-link id="page-prev" :to="{ name: 'event-list', query: { page: page-1 } }" rel="prev" v-if="page!= 1">Prev page</router-link>
      <router-link id="page-next" :to="{ name: 'event-list', query: { page: page+1 } }" rel="next" v-if="hasNextPage">Next page</router-link>
    </div>
  </div>
</template>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pagination {
  display: flex;
  width: 290px;
}
.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}

#page-prev {
  text-align: left;
}

#page-next {
  text-align: right;
}
</style>