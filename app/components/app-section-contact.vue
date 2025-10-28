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
  await $fetch('/api/contact', {
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
<style scoped>
/* Success and error messages */
.content > div {
  font-family: Poppins;
  font-size: 1.5rem;
  line-height: 2rem;
  padding: 2rem;
  border-radius: 8px;
  background-color: rgba(76, 175, 80, 0.1);
  border: 2px solid rgba(76, 175, 80, 0.5);
  color: var(--second);
  margin-left: 100px;
  margin-right: 100px;
}

.mb-4 {
  margin-bottom: 1rem;
  padding: 1rem;
  border-radius: 5px;
  background-color: rgba(244, 67, 54, 0.1);
  border: 1.5px solid rgba(244, 67, 54, 0.5);
  color: var(--second);
  font-size: 1rem;
}

/* Large tablets and below */
@media only screen and (max-width: 1024px) {
  .content > div {
    font-size: 1.35rem;
    line-height: 1.85rem;
    padding: 1.75rem;
    margin-left: 80px;
    margin-right: 80px;
  }

  .mb-4 {
    font-size: 0.95rem;
    padding: 0.9rem;
  }
}

/* Tablets and below */
@media only screen and (max-width: 768px) {
  .content > div {
    font-size: 1.25rem;
    line-height: 1.75rem;
    padding: 1.5rem;
    margin-left: 60px;
    margin-right: 60px;
  }

  .mb-4 {
    font-size: 0.9rem;
    padding: 0.85rem;
  }
}

/* Mobile and below */
@media only screen and (max-width: 650px) {
  form.contact {
    margin-left: 0;
    width: 100%;
  }

  p.contact-text {
    display: none;
  }

  .content > div {
    font-size: 1.1rem;
    line-height: 1.6rem;
    padding: 1.25rem;
    margin-left: 0;
    margin-right: 0;
    text-align: center;
  }

  .mb-4 {
    font-size: 0.9rem;
    padding: 0.75rem;
  }
}

/* Small mobile devices */
@media only screen and (max-width: 480px) {
  .content > div {
    font-size: 1rem;
    line-height: 1.5rem;
    padding: 1rem;
    border-radius: 6px;
  }

  .mb-4 {
    font-size: 0.85rem;
    padding: 0.65rem;
    border-radius: 4px;
  }
}

/* Very small mobile devices */
@media only screen and (max-width: 360px) {
  .content > div {
    font-size: 0.95rem;
    line-height: 1.4rem;
    padding: 0.875rem;
  }

  .mb-4 {
    font-size: 0.8rem;
    padding: 0.6rem;
  }
}
</style>
