<template>
  <div>
    <div class="controls">
      <label>
        Video ID:
        <input type="text" v-model="temp.video_id" />
      </label><br />
      <label>
        Loop:
        <input type="number" v-model.number="temp.loop" />
      </label><br />
      <button @click="applyConfig">Apply</button>
      <button @click="playCurrentVideo">Play</button>
      <button @click="stopCurrentVideo">Stop</button>
      <button @click="pauseCurrentVideo">Pause</button>
    </div>
    <YoutubeVue
      ref="youtube"
      :videoid="play.video_id"
      :loop="play.loop"
      :width="480"
      :height="320"
      :modestbranding="1"
      :controls="1"
      @ended="handleVideoEnd"
      @paused="handleVideoPause"
      @played="handleVideoPlay"
    />
  </div>
</template>

<script>
import YoutubeVue from '@/components/YoutubeVue.vue'; // Ensure to import your YoutubeVue component

export default {
  name: 'YoutubePlayer',

  data() {
    return {
      temp: { video_id: '3P1CnWI62Ik', loop: 1 },
      play: { video_id: '3P1CnWI62Ik', loop: 1 },
    };
  },

  components: {
    YoutubeVue,
  },

  methods: {
    applyConfig() {
      this.play = { ...this.temp };
    },

    playCurrentVideo() {
      this.$refs.youtube.player.playVideo();
    },

    stopCurrentVideo() {
      this.$refs.youtube.player.stopVideo();
    },

    pauseCurrentVideo() {
      this.$refs.youtube.player.pauseVideo();
    },

    handleVideoEnd() {
      console.log('## OnEnded');
      this.$refs.youtube.player.playVideo();
    },

    handleVideoPause() {
      console.log('## OnPaused');
    },

    handleVideoPlay() {
      console.log('## OnPlayed');
    },
  },
};
</script>

<style scoped>
.controls {
  margin-bottom: 16px;
}

label {
  display: block;
  margin-bottom: 8px;
}

button {
  margin-right: 8px;
}
</style>
