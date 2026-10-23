<template>
  <section id="section-contact" aria-labelledby="section-contact-title">
    <h2 id="section-contact-title" class="section-title" tabindex="-1">{{ t('contact.title') }}</h2>
    <div class="content row">
      <div v-if="success" ref="successMessage" class="form-success" tabindex="-1">
        {{ t('contact.success') }}
      </div>
      <form v-else @submit.prevent="sendMessage" class="contact">
        <!-- Anti-spam trap: out of sight and out of reach, so only bots fill it in -->
        <div class="trap" inert>
          <label for="contact-website">Website</label>
          <input id="contact-website" v-model="form.website" name="website" type="text" tabindex="-1" autocomplete="off" />
        </div>
        <label for="contact-name" class="visually-hidden">{{ t('contact.name') }}</label>
        <input v-model="form.name" v-bind="fieldAttrs('name')" type="text" autocomplete="name" :placeholder="t('contact.name')" />
        <label for="contact-email" class="visually-hidden">{{ t('contact.email') }}</label>
        <input v-model="form.email" v-bind="fieldAttrs('email')" type="email" autocomplete="email" :placeholder="t('contact.email')" />
        <label for="contact-phoneNumber" class="visually-hidden">{{ t('contact.phone') }}</label>
        <input v-model="form.phoneNumber" v-bind="fieldAttrs('phoneNumber')" type="tel" autocomplete="tel" :placeholder="t('contact.phone')" />
        <label for="contact-subject" class="visually-hidden">{{ t('contact.subject') }}</label>
        <input v-model="form.subject" v-bind="fieldAttrs('subject')" type="text" :placeholder="t('contact.subject')" />
        <label for="contact-message" class="visually-hidden">{{ t('contact.message') }}</label>
        <textarea v-model="form.message" v-bind="fieldAttrs('message')" :placeholder="t('contact.message')"></textarea>
        <div v-if="error" id="contact-error" class="form-error" role="alert">
          {{ t(ERROR_MESSAGES[error]) }}
        </div>
        <button type="submit" :disabled="loading">
          {{ loading ? t('contact.loading') : t('contact.submit') }}
        </button>
      </form>
      <p class="contact-text">
        <span>{{ t('contact.lead') }}</span>
        {{ t('contact.text') }}
        <a class="cv-link" href="/cv/serigne-saliou-mbaye-cv.pdf" download @click="trackCvDownload">{{ t('contact.cv') }}</a>
      </p>
    </div>
  </section>
</template>
<script setup lang="ts">
type ContactError = 'invalid' | 'rateLimited' | 'failed'

const ERROR_MESSAGES: Record<ContactError, string> = {
  invalid: 'contact.errorInvalid',
  rateLimited: 'contact.errorRateLimited',
  failed: 'contact.error',
}

const emptyForm = () => ({
  name: '',
  email: '',
  phoneNumber: '',
  subject: '',
  message: '',
  website: '',
})

const { t } = useI18n()
const { $posthog } = useNuxtApp()
const loading = ref(false)
const success = ref(false)
const error = ref<ContactError | null>(null)
// Fields the server rejected
const invalidFields = ref<string[]>([])
const successMessage = ref<HTMLElement | null>(null)
const form = ref(emptyForm())
// Sent along so the server can tell a person from a bot posting right after the page loaded
let mountedAt = 0

onMounted(() => {
  mountedAt = Date.now()
})

const fieldAttrs = (name: ContactField) => {
  const isInvalid = invalidFields.value.includes(name)
  return {
    id: `contact-${name}`,
    name,
    required: true,
    maxlength: CONTACT_MAX_LENGTH[name],
    'aria-invalid': isInvalid || undefined,
    'aria-describedby': isInvalid ? 'contact-error' : undefined,
  }
}

const trackCvDownload = () => {
  $posthog?.capture('cv_downloaded')
}

const sendMessage = async () => {
  loading.value = true
  await $fetch('/api/contact', {
    method: 'POST',
    body: { ...form.value, elapsed: Date.now() - mountedAt },
  }).then(async () => {
    $posthog?.capture('contact_form_submitted')
    error.value = null
    invalidFields.value = []
    success.value = true;
    form.value = emptyForm()
    // The form is gone: keep the focus, and screen readers, on what replaced it
    await nextTick()
    successMessage.value?.focus()
  })
    .catch((fetchError: any) => {
      $posthog?.capture('contact_form_submission_failed')
      const status = fetchError?.statusCode
      invalidFields.value = status === 400 ? (fetchError.data?.data ?? []).map((field: { field: string }) => field.field) : []
      error.value = status === 400 ? 'invalid' : status === 429 ? 'rateLimited' : 'failed'
      success.value = false
    })
    .finally(() => {
      loading.value = false
    })
}
</script>
<style scoped>
/* Success and error messages */
.form-success {
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

.form-error {
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
  .form-success {
    font-size: 1.35rem;
    line-height: 1.85rem;
    padding: 1.75rem;
    margin-left: 80px;
    margin-right: 80px;
  }

  .form-error {
    font-size: 0.95rem;
    padding: 0.9rem;
  }
}

/* Tablets and below */
@media only screen and (max-width: 768px) {
  .form-success {
    font-size: 1.25rem;
    line-height: 1.75rem;
    padding: 1.5rem;
    margin-left: 60px;
    margin-right: 60px;
  }

  .form-error {
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

  .form-success {
    font-size: 1.1rem;
    line-height: 1.6rem;
    padding: 1.25rem;
    margin-left: 0;
    margin-right: 0;
    text-align: center;
  }

  .form-error {
    font-size: 0.9rem;
    padding: 0.75rem;
  }
}

/* Small mobile devices */
@media only screen and (max-width: 480px) {
  .form-success {
    font-size: 1rem;
    line-height: 1.5rem;
    padding: 1rem;
    border-radius: 6px;
  }

  .form-error {
    font-size: 0.85rem;
    padding: 0.65rem;
    border-radius: 4px;
  }
}

/* Very small mobile devices */
@media only screen and (max-width: 360px) {
  .form-success {
    font-size: 0.95rem;
    line-height: 1.4rem;
    padding: 0.875rem;
  }

  .form-error {
    font-size: 0.8rem;
    padding: 0.6rem;
  }
}
</style>
