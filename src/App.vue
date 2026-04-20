<script setup lang="ts">
import AppTopNav from '@/components/AppTopNav.vue'
</script>

<template>
  <div class="min-h-screen bg-slate-50">
    <AppTopNav />
    <router-view />
  </div>
</template>
