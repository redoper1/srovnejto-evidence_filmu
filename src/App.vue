<template>
  <div class="container mx-auto py-10">
    <h1 class="text-center pb-2 text-xl">Evidence filmů</h1>
    <nav class="text-center">
      <router-link to="/" class="text-green-600"
        >Zobrazit seznam filmů</router-link
      >
    </nav>
  </div>
  <div class="container mx-auto">
    <Suspense>
      <template #default>
        <router-view />
      </template>
      <template #fallback>
        <span>Načítání...</span>
      </template>
    </Suspense>
  </div>
</template>

<style>
#app {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
</style>
