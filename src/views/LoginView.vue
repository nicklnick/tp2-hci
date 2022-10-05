<template>
  <div class="screen">
    <LogIn2/>
  </div>
</template>

<script>

import LogIn2 from "@/components/LogIn Page/LogIn2";
export default {
  name: 'LoginView',
  components: { LogIn2 },
}
</script>

<style scoped>
.screen {
  width: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
  padding-top: 50px;
}
</style>