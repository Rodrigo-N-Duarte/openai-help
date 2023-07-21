<template>
  <div class="not-found-container">
    <h1 class="not-found-title">Ops!</h1>
    <p class="not-found-message">404 Not found</p>
    <router-link to="/" class="not-found-link">Voltar para a página inicial</router-link>
  </div>
</template>

<script>
export default {
  name: 'NotFound'
};
</script>

<style>
.not-found-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-family: Arial, sans-serif;
}

.not-found-title {
  font-size: 4rem;
  margin-bottom: 1rem;
  color: #FF5722;
}

.not-found-message {
  font-size: 1.5rem;
  margin-bottom: 2rem;
}

.not-found-link {
  font-size: 1rem;
  padding: 0.5rem 1rem;
  background-color: #FF5722;
  color: white;
  border-radius: 5px;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.not-found-link:hover {
  background-color: #FF7844;
}
</style>