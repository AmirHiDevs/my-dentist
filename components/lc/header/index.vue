<script setup lang="ts" xmlns="http://www.w3.org/1999/html">
import {useFormValidation} from '~/composables/useFormValidation'
import {header, services} from "~/data/CustomComponents";
import Dialog from "~/components/shared/modal/Dialog.vue";
import type {PropType} from "@vue/runtime-core";
import type {HeaderSettings} from "~/utils/types";

/********************************************************/

const props = defineProps({
  headerSettings: {
    type: Object as PropType<HeaderSettings>,
    required: true,
    default: {
      headerLogo: '/images/logos/Sami-logo-black.png',
      headerItems: header
    },
  },
  services: {
    type: Map<string | number, { id: string | number, title: string }>,
    required: true,
    default: services[0],
  }
})
/********************************************************/
const masks = usePersianMask()
const showReserveDialog = ref(false)
const drawer = ref<boolean>(false);
// const {$bus} = useNuxtApp()
// const openLoginDialog = () => {
//   $bus.$emit('loginDialogOpen', [true, 0])
// }
/********************************************************/
const {activeSection} = useActiveSection(props.headerSettings?.headerItems || header)

const {
  hasValues,
  hasErrors,
  loading,
  isSucceeded,
  clearErrors,
  errors,
  onSubmit,
  first_name,
  last_name,
  reserveMobile,
  reserveEmail,
  age,
  service,
  description
} = useFormValidation([ 'first_name', 'last_name', 'reserveMobile', 'age', 'service'])

watch(showReserveDialog, (newValue, oldValue) => {
  if (newValue === false && oldValue === true) {
    clearErrors()
  }
})

const saveBtn = async (): Promise<void> => {
  try {
    // Call the existing onSubmit function
    await onSubmit();

  } catch (error) {
    console.error('An error occurred during form submission:', error);
  }
};

useListen('closeModal', (value: boolean) => {
  showReserveDialog.value = value
  isSucceeded.value = value
})
</script>
<template>
  <!-- -----------------------------------------------
        Start Header
  ----------------------------------------------- -->
  <v-app-bar class="app-header header">
    <v-container class="fill-height">
      <v-toolbar v-if="props.headerSettings">
        <v-app-bar-nav-icon
            width="30"
            class="drawer-icon mr-0"
            @click.stop="drawer = !drawer"
        ></v-app-bar-nav-icon>
        <!--         visit-btn-->
        <Dialog :form-title="'رزرو نوبت'" :is-succeeded="isSucceeded" :loading="loading"
                v-model="showReserveDialog">
          <template v-slot:button="props">
            <v-btn
                class="px-6 py-0 bg-primary ml-2 reserve-btn"
                flat
                size="large"
                text="رزرو نوبت"
                v-bind="props"
            >
            </v-btn>
          </template>
            <template #body="{onSubmit}">
          <v-row justify="center">
              <v-col
                  cols="12"
                  sm="6"
              >
                <v-text-field
                    maxlength="30"
                    v-maska="masks.persianLettersMask"
                    v-model="first_name"
                    :error-messages="<string>errors.first_name"
                    variant="outlined"
                    label="نام"
                    required
                ></v-text-field>
              </v-col>
              <v-col
                  cols="12"
                  sm="6"
              >
                <v-text-field
                    maxlength="30"
                    v-maska="masks.persianLettersMask"
                    v-model="last_name"
                    :error-messages="<string>errors.last_name"
                    variant="outlined"
                    label="نام خانوادگی"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                    maxlength="13"
                    v-maska="masks.mobilePersianNumberMask"
                    v-model="reserveMobile"
                    :error-messages="<string>errors.reserveMobile"
                    variant="outlined"
                    label="شماره تلفن همراه"
                    placeholder="مثال: ****-***-**۰۹ "
                    required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                    maxlength="40"
                    v-maska="masks.englishAlphanumericMask"
                    v-model="reserveEmail"
                    :error-messages="<string>errors.reserveEmail"
                    variant="outlined"
                    label="ایمیل"
                    placeholder="example@gmail.com"
                    required
                ></v-text-field>
              </v-col>
              <v-col
                  cols="12"
                  sm="6"
              >
                <v-text-field
                    maxlength="3"
                    v-maska="masks.persianNumbersMask"
                    v-model="age"
                    :error-messages="<string>errors.age"
                    variant="outlined"
                    required
                    label="سن"
                ></v-text-field>

              </v-col>
              <v-col
                  cols="12"
                  sm="6"
              >
                <v-autocomplete
                    v-model="service"
                    :error-messages="<string>errors.service"
                    variant="outlined"
                    :items="Array.from(props.services?.values() ?? [])"
                    item-title="title"
                    item-value="id"
                    label="درخواست مورد نظر"
                    multiple
                ></v-autocomplete>
              </v-col>
              <v-col
                  cols="12"
              >
                <v-textarea
                    maxlength="500"
                    v-maska="masks.persianAlphanumericMask"
                    v-model="description"
                    :error-messages="<string>errors.description"
                    variant="outlined"
                    label="توضیحات"
                />
              </v-col>
          </v-row>
              <v-card-actions class="justify-space-around mt-0 pt-0">
                <v-btn
                    :disabled="!(hasValues && !hasErrors)"
                    class="px-6 py-0"
                    color="green"
                    variant="text"
                    text="ذخیره"
                    type="submit"
                    @click="saveBtn"
                />

                <v-btn
                    class="px-6 py-0"
                    color="red-dark"
                    variant="text"
                    text="بستن"
                    @click="showReserveDialog = false;clearErrors()"
                />
              </v-card-actions>
            </template>
        </Dialog>


        <!--         Desktop view Navigation-->
        <v-navigation-drawer
            v-model="drawer"
            location="right"
            temporary
        />
        <v-row align="center" class="my-0">
          <div
              class="navigation"
          >
            <ul class="navbar-nav d-flex">
              <li
                  class="nav-item"
                  v-for="nav in props.headerSettings?.headerItems"
                  :key="[]"
                  :class="{ active: activeSection === nav.key }"
              >
                <NuxtLink :to="{path: '/', hash: `#${nav.key}`}" class="nav-link">
                  {{ nav.label }}
                </NuxtLink>
              </li>
            </ul>
          </div>
          <!--         Logo-->
          <div class="logo mr-auto pr-5">
            <NuxtLink to="/" class="logo d-flex">
              <img :src="`${useAppConfig().api.baseUrl+ '/storage/' +props.headerSettings?.headerLogo}`" alt="logo"/>
            </NuxtLink>
          </div>
        </v-row>
      </v-toolbar>
    </v-container>
  </v-app-bar>
  <!-- -----------------------------------------------
        End Header
  ----------------------------------------------- -->
  <!----sidebar menu drawer start----->
  <div class="nav2">
    <v-navigation-drawer class="bg-green-accent-1 d-md-none" v-model="drawer" temporary location="right">
      <div
          class="navigation"
      >
        <ul class="navbar-nav py-4">
          <li class="nav-item  mb-4"
              v-for="nav in props.headerSettings?.headerItems"
              :key="[]"
              :class="{ active: activeSection === nav.key }"
          >
            <NuxtLink :to="{path: '/', hash: `#${nav.key}`}" class="nav-link">
              {{ nav.label }}
            </NuxtLink>
          </li>
          <v-divider class="mb-3"/>
          <li class="nav-item">
            <v-list-item
                variant="text"
                style="color: #03192C;"
                :ripple="false"
                title="رزرو نوبت"
                @click="showReserveDialog = true"
            >
              <template #prepend>
                <v-icon color="primary" class="opacity-100">mdi-calendar-check</v-icon>
              </template>
            </v-list-item>
            <!--            <NuxtLink  class="nav-link pr-5 my-3">-->
            <!--              رزرو نوبت-->
            <!--            </NuxtLink>-->
          </li>
        </ul>
      </div>
    </v-navigation-drawer>
  </div>
</template>

<style scoped lang="scss">
.drawer-icon {
  display: none !important;
}

.reserve-btn {
  display: inline !important;
}




@media (max-width: 855px) {
  .drawer-icon {
    display: inline !important;
  }

  .reserve-btn {
    display: none !important;
  }

  .app-header {
    .navigation {
      display: none !important;
    }
  }
}
</style>