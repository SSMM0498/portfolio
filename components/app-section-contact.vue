<template>
  <section id="#Contact">
    <h1>Rejoignez la Tontine !</h1>
    <div class="content row">
      <div v-if="success" class="success-message">
        <h3>🎉 Félicitations !</h3>
        <p>Votre demande a été envoyée avec succès. Notre équipe vous contactera rapidement pour vous expliquer le fonctionnement de la tontine et vous accompagner dans votre projet de digitalisation.</p>
      </div>
      <form v-else @submit.prevent="sendMessage" class="contact" action="">
        <input required v-model="form.name" name="name" type="name" placeholder="Votre nom complet" />
        <input required v-model="form.email" name="email" type="email" placeholder="Votre email" />
        <input required v-model="form.phoneNumber" name="phoneNumber" type="text" placeholder="Votre numéro WhatsApp" />
        <input required v-model="form.subject" name="subject" type="text" placeholder="Type de projet (Logo, Site, App...)" />
        <textarea required v-model="form.message" name="message" placeholder="Décrivez votre projet et vos besoins"></textarea>
        <div v-if="errored" class="error-message">
          Une erreur s'est produite. Avez-vous bien rempli tous les champs ?
        </div>
        <button>
          <template v-if="loading">Envoi en cours...</template>
          <template v-if="!loading">Rejoindre la Tontine</template>
        </button>
      </form>
      <div class="contact-text">
        <span>Prêt à digitaliser votre activité ?</span>
        <p>Rejoignez notre tontine et obtenez votre logo, site web et application mobile en payant petit à petit, sans stress.</p>
        <div class="benefits">
          <div class="benefit">✨ Paiement mensuel accessible</div>
          <div class="benefit">✨ Communauté d'entrepreneurs</div>
          <div class="benefit">✨ Accompagnement complet</div>
          <div class="benefit">✨ Maintenance incluse 3 mois</div>
        </div>
      </div>
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
<style scoped>
.success-message {
  background: rgba(0, 255, 0, 0.1);
  border: 1px solid rgba(0, 255, 0, 0.3);
  border-radius: 10px;
  padding: 2rem;
  text-align: center;
  width: 55%;
  margin-left: 100px;
}

.success-message h3 {
  color: #00ff00;
  margin-bottom: 1rem;
  font-size: 2rem;
}

.error-message {
  background: rgba(255, 0, 0, 0.1);
  border: 1px solid rgba(255, 0, 0, 0.3);
  border-radius: 5px;
  padding: 1rem;
  margin-bottom: 1rem;
  color: #ff6b6b;
}

.benefits {
  margin-top: 1.5rem;
}

.benefit {
  margin-bottom: 0.5rem;
  font-size: 1rem;
  color: var(--second);
}

@media only screen and (max-width: 650px) {
  form.contact {
    margin-left: 0;
    width: 100%;
  }

  .contact-text {
    display: none;
  }

  .success-message {
    width: 100%;
    margin-left: 0;
  }
}
</style>