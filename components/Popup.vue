<template>
  <div>
    <div class="pop-up" :class="{ show: showPopup }">
      <div class="content">
        <p>
          This project has been created by using the
          <a href="https://restcountries.com/">Rest Countries API</a> . Which is
          an open-source rest API. <br />
        </p>
      </div>
      <div class="pop-up__icon">
        <v-btn @click="closePopup" small depressed fab>
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showPopup: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    closePopup() {
      this.$emit("closePopup");
    },
  },
};
</script>

<style lang="scss">
.pop-up {
  width: min(95%, 350px);
  padding: 30px;
  padding-bottom: 20px;
  background: #05c46b;
  position: absolute;
  top: 20%;
  left: 0;
  border-radius: 8px;
  transition: transform 0.8s ease-in-out;
  transform: translateX(-100%);
  &.show {
    transform: translateX(5%);
  }
  .content {
    padding: 4px;
    p {
      font-size: 16px;
      line-height: 1.6;
      font-weight: 500;
      a {
        color: inherit;
        font-weight: 600;
      }
    }
  }

  &__icon {
    position: absolute;
    top: 6px;
    right: 6px;
  }
}
</style>
