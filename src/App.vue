<script setup lang="ts">
import AppTopNav from '@/components/AppTopNav.vue'
</script>

<template>
  <div class="min-h-screen bg-slate-50">
    <AppTopNav />
    <main id="main-content" class="min-h-[calc(100vh-56px)]">
      <router-view />
    </main>
  </div>
</template>
