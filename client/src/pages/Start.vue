<template>
  <div>
    <h2 class="text-center my-3">Witaj {{ firstName }}!</h2>
    <p>
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit quis eos
      est dicta libero nemo, itaque blanditiis magni, pariatur, velit iste optio
      animi cumque. Sequi aspernatur repellendus non sapiente consequatur! Lorem
      ipsum dolor sit, amet consectetur adipisicing elit. Impedit quis eos est
      dicta libero nemo, itaque blanditiis magni, pariatur, velit iste optio
      animi cumque. Sequi aspernatur repellendus non sapiente consequatur! Lorem
      ipsum dolor sit, amet consectetur adipisicing elit. Impedit quis eos est
      dicta libero nemo, itaque blanditiis magni, pariatur, velit iste optio
      animi cumque. Sequi aspernatur repellendus non sapiente consequatur! Lorem
      ipsum dolor sit, amet consectetur adipisicing elit. Impedit quis eos est
      dicta libero nemo, itaque blanditiis magni, pariatur, velit iste optio
      animi cumque. Sequi aspernatur repellendus non sapiente consequatur! Lorem
      ipsum dolor sit, amet consectetur adipisicing elit. Impedit quis eos est
      dicta libero nemo, itaque blanditiis magni, pariatur, velit iste optio
      animi cumque. Sequi aspernatur repellendus non sapiente consequatur!
    </p>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState("auth", ["firstName", "lastName"]),
  },
};
</script>

<style>
</style>
