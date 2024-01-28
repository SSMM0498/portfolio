<template>
  <section id="#Contact">
    <h1>Get in touch !</h1>
    <div class="content row">
      <div v-if="success">
        Great! Your message has been sent successfully. I will try to
        respond quickly.
      </div>
      <form v-else @submit.prevent="sendMessage" class="contact" action="">
        <input required v-model="form.name" name="name" type="name" placeholder="Your full name" />
        <input required v-model="form.email" name="email" type="email" placeholder="Your email" />
        <input required v-model="form.phoneNumber" name="phoneNumber" type="text" placeholder="Your phone number" />
        <input required v-model="form.subject" name="subject" type="text" placeholder="Subject" />
        <textarea required v-model="form.message" name="message" placeholder="The message"></textarea>
        <div v-if="errored" class="mb-4">
          Something went wrong. Did you fill out all of the
          fields?
        </div>
        <button>
          <template v-if="loading">Loading...</template>
          <template v-if="!loading">Submit</template>
        </button>
      </form>
      <p class="contact-text">
        <span>Have a question ?</span> Send me a mail <br />
        and let's talk about <br />
        all of your needs
      </p>
    </div>
  </section>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const loading = ref(false)
const success = ref(false)
const errored = ref(false)
const form = ref({
  name: '',
  email: '',
  phoneNumber: '',
  subject: '',
  message: '',
});

const sendMessage = async () => {
  loading.value = true
  await $fetch('http://localhost:3000/api/contact', {
    method: 'POST',
    body: form,
  }).then(() => {
    errored.value = false;
    success.value = true;
    form.value = {
      name: '',
      email: '',
      phoneNumber: '',
      subject: '',
      message: '',
    };
  })
    .catch((_error: any) => {
      errored.value = true
      success.value = false
    })
    .finally(() => {
      loading.value = false
    })
}
</script>
<style>
@media only screen and (max-width: 650px) {
  form.contact {
    margin-left: 0;
    width: 100%;
  }

  p.contact-text {
    display: none;
  }
}
</style>
