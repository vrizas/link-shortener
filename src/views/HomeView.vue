<script lang="ts" setup>
  import { ref } from 'vue';
  import bitLyApi from '../api/bitLyApi';

  const originalLink = ref('');
  const link = ref('');
  const isShortened = ref(false);

  const onShorten = async () => {
    try {
      const response = await bitLyApi.shortenUrl(link.value);
      navigator.clipboard.writeText(response.link);
      originalLink.value = response.long_url;
      link.value = response.link;
      isShortened.value = true;
    } catch (error) {
      console.error(error);
      alert('Failed to shorten the link');
    }
  };

  const onCopyLink = () => {
    navigator.clipboard.writeText(link.value);
  };

  const onTryAnotherLink = () => {
    link.value = '';
    originalLink.value = '';
    isShortened.value = false;
  };
</script>


<template>
  <main class="w-full lg:max-w-[600px] m-auto text-center py-4 px-3 lg:py-10">
    <h1 class="font-bold text-3xl">
      Short Link
    </h1>
    <div class="shadow py-4 px-5 mt-5 rounded-md">
      <h2 class="font-medium text-xl">
        Paste your link here
      </h2>
      <div class="flex mt-4">
        <input
          type="text"
          class="w-full py-2 px-3 border rounded-l-md"
          placeholder="Enter your link"
          v-model="link"
          :disabled="isShortened"
        />
        <button class="bg-blue-500 text-white py-2 px-3 rounded-r-md"
          @click="onShorten"
          v-if="!isShortened"
        >
          Shorten
        </button>
        <button class="bg-blue-500 text-white py-2 px-3 rounded-r-md w-[110px]"
          @click="onCopyLink"
          v-if="isShortened">
          Copy Link
        </button>
      </div>
      <div class="mt-5" v-if="isShortened">
        <p>
          Original link: <a :href="originalLink" class="text-blue-500 hover:text-blue-700">{{ originalLink }}</a>
        </p>
        <button class="bg-blue-500 text-white rounded-md py-2 px-3 mt-3" @click="onTryAnotherLink">
          Try another link
        </button>
      </div>
    </div>
  </main>
</template>
