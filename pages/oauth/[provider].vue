<script lang="ts" setup>
import { z } from "zod";

definePageMeta({
  layout: "authentication",
  name: "oauth",
  public: true,
});

const $router = useRouter();
const $route = useRoute("oauth-provider");
const $auth = useAuth();
const $toast = useToast();
const { t: $t } = useI18n();

const schema = z.enum(["google", "facebook", "github"]);

onMounted(async () => {
  try {
    const result = schema.safeParse($route.params.provider);
    if (!result.success) {
      $router.push({ name: "login" });
      $toast.add({ title: $t("pages.oauth.codeNotValid"), icon: "i-tabler-alert-circle", color: "red" });
    } else {
      const provider = result.data;
      await $auth.oauthLogin(provider, window.location.search);
      $router.push({ name: "index" });
    }
  } catch {
    $router.push({ name: "login" });
    $toast.add({ title: $t("pages.oauth.codeNotValid"), icon: "i-tabler-alert-circle", color: "red" });
  }
});
</script>

<template>
  <u-card class="max-w-xl">
    <template #header
      ><span class="capitalize">{{ $t("pages.oauth.logginInWith", { key: $route.params.provider }) }}</span></template
    >
    <div class="flex items-center space-x-4">
      <u-skeleton class="h-12 w-12" :ui="{ rounded: 'rounded-full' }" />
      <div class="space-y-2">
        <u-skeleton class="h-4 w-[250px]" />
        <u-skeleton class="h-4 w-[200px]" />
      </div>
    </div>
  </u-card>
</template>
