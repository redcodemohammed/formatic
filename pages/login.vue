<script lang="ts" setup>
import { type z } from "zod";
import type { Form } from "#ui/types";

definePageMeta({
  layout: "authentication",
  name: "login",
  public: true,
});

const { fetch } = useUserSession();

const { isLoading } = storeToRefs(useLoadingStore());
const { $api } = useNuxtApp();
const {
  schemas: { loginSchema },
} = useValidators();

type Schema = z.infer<typeof loginSchema>;

const state = reactive<Schema>({
  email: "",
  password: "",
});
const passwordIsShown = ref(false);
const form = ref<Form<Schema>>();
async function login() {
  try {
    await $api("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(state),
    });

    await fetch();

    navigateTo({ name: "index" });
  } catch (e) {
    reportErrors(e);
  }
}
async function register() {
  try {
    const valid = await form.value?.validate();
    if (valid) {
      await $api("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(state),
      });

      await fetch();

      navigateTo({ name: "index" });
    }
  } catch (e) {
    reportErrors(e);
  }
}
</script>

<template>
  <u-card class="max-w-xl">
    <template #header>{{ $t("pages.auth.login.loginFormTitle") }}</template>

    <u-form ref="form" class="gap-4 flex flex-col" :schema="loginSchema" :state="state" @submit="login">
      <u-form-group :label="$t('common.forms.email')" name="email">
        <u-input v-model="state.email" dir="ltr" trailing-icon="i-tabler-mail">
          <template #leading> <u-button class="hidden"></u-button> </template
        ></u-input>
      </u-form-group>
      <u-form-group :label="$t('common.forms.password')" name="password">
        <u-input v-model="state.password" trailing-icon="i-tabler-password" :ui="{ icon: { leading: { pointer: '' } } }" dir="ltr" :type="passwordIsShown ? 'text' : 'password'">
          <template #leading>
            <u-button :icon="passwordIsShown ? 'i-tabler-eye' : 'i-tabler-eye-closed'" color="gray" variant="link" :padded="false" @click="passwordIsShown = !passwordIsShown"></u-button>
          </template>
        </u-input>
      </u-form-group>
      <!-- <u-button class="text-end hover:underline text-indigo-300" variant="link" @click="$modals.forgetPasswordModal = true">{{ $t("pages.auth.login.forgotYourPassword") }}</u-button> -->
      <div class="flex gap-4">
        <u-button class="flex-1" block icon="i-tabler-login" :loading="isLoading" type="submit"> {{ $t("common.actions.login") }} </u-button>
        <u-button class="flex-1" block icon="i-tabler-login" :loading="isLoading" type="submit" variant="outline" @click.prevent="register">
          {{ $t("common.actions.register") }}
        </u-button>
      </div>
    </u-form>

    <u-divider class="my-6">{{ $t("pages.auth.login.orLoginWith") }}</u-divider>
    <div class="flex flex-col gap-2">
      <u-skeleton v-if="isLoading" class="h-4 w-[250px]" />
      <u-skeleton v-if="isLoading" class="h-4 w-[250px]" />
      <u-skeleton v-if="isLoading" class="h-4 w-[200px]" />
      <u-button color="gray" variant="solid" block icon="i-logos-google-icon" @click="openUrl('/api/auth/google')">{{ $t("pages.auth.login.loginWithGoogle") }}</u-button>
      <!-- <u-button color="gray" variant="solid" block icon="i-logos-facebook"> {{ $t("pages.auth.login.loginWithFacebook") }}</u-button> -->
      <u-button color="gray" variant="solid" block icon="i-logos-github-icon" @click="openUrl('/api/auth/github')">{{ $t("pages.auth.login.loginWithGithub") }}</u-button>
    </div>
  </u-card>
</template>
