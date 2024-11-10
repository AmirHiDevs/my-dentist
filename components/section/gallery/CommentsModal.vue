<script setup lang="ts">

import type {PropType} from "@vue/runtime-core";
import type {Comment, GallerySettings} from "~/utils/types";
import {useCommentStore} from "~/store/comment";
import {storeToRefs} from "pinia";
import {DateTime} from 'luxon'

const properties = defineProps({

  settings: {
    type: Object as PropType<GallerySettings>,
    required: true,
  },

  commentsCount: {
    type: Number,
    required: true,
    default: {
      commentsCount: 0
    },
  },

  postId: {
    type: Number,
    required: true,
  },


})

const showCommentsModal = ref<boolean>(false)
const showSuccessMessage = ref<boolean>(false)
const newComment = ref<string>('')

const {loading, error} = storeToRefs(useCommentStore())
const comments = computed<Comment[]>(() => useCommentStore().getCommentsForPost(<number>properties.postId))

const currentPage = computed(() => useCommentStore().getCurrentPage(<number>properties.postId))
const totalPages = computed(() => useCommentStore().getTotalPages(<number>properties.postId))
const hasComments = computed(() => useCommentStore().hasComments(<number>properties.postId))


const load = async ({done}) => {
  if (currentPage.value < totalPages.value && !loading.value) {
    await useCommentStore().loadMoreComments(<number>properties.postId)
    done('ok')
  } else if (currentPage.value === totalPages.value) {
    done('empty')
  } else {
    done('error')
  }
}

const saveComment = async () => {
  if (newComment.value) {
    try {
      await useCommentStore().saveComment(<number>properties.postId,  {comment: newComment.value.trim()} )

      newComment.value = ''
      showSuccessMessage.value = true
    } catch (err) {
      // Handle error (e.g., show error message to user)
      console.error('Failed to save comment:', err)
    }
  }
}

onMounted(() => {
  useCommentStore().getComments(<number>properties.postId)
})

</script>

<template>
  <v-dialog
      v-model="showCommentsModal"
      scrollable
      width="auto"
      height="752px"
  >
    <template v-slot:activator="{ props }" v-if="!!properties.settings">
      <v-btn class="text-none px-0 py-0" size="small" v-bind="props">
        <v-badge :content="usePersianNumber().formattedNumber(<number>properties.commentsCount)"
                 :color="properties.settings.iconColor"
                 :text-color="properties.settings.iconBadgeTextColor" v-if="properties.commentsCount !== 0">
          <v-icon class="mdi mdi-comment-multiple-outline ml-1"
                  :style="`color: ${properties.settings.iconColor}`"></v-icon>
        </v-badge>
        <v-icon v-if="properties.commentsCount === 0" class="mdi mdi-comment-multiple-outline ml-1"
                :style="`color: ${properties.settings.iconColor}`"></v-icon>
      </v-btn>
    </template>
    <v-card class="mx-auto"
            max-width="400" min-width="350">
      <v-card-title>
        <v-row justify="space-between" align="center" class="py-3 px-2">
          <span>نظرات</span>
          <v-icon
              color="blue-darken-1"
              icon="mdi mdi-close"
              size="x-small"
              @click="showCommentsModal = false"
          />
        </v-row>
      </v-card-title>
      <v-divider/>
      <v-card-text class="pt-0">

        <v-infinite-scroll :items="comments" :onLoad="load" :empty-text="hasComments ? 'نظر جدیدی ثبت نشده است.' : 'هیچ نظری برای این پست وجود ندارد.'">
          <template  v-for="item in comments" :key="item.id">
            <!-- Render Comment -->
            <v-list>
              <v-list-item-title>
                <v-avatar>
                  <v-img :alt="<string>item.commentator?.name"
                         :src="item.commentator?.avatar?.original ?? 'images/icons/patient-avatar.png'"/>
                </v-avatar>
                <span class="mr-1">{{ item.commentator?.name }}</span>
                <v-divider vertical thickness="8"/>
                <span class="mr-1 grey--text font-12">{{
                    DateTime.fromSeconds(item.created_at).setLocale('fa').toRelative()
                  }}</span>
              </v-list-item-title>
              <div class="pr-7">
                <v-banner class="border-none text-wrap font-15" :text="item.comment"/>
              </div>
            </v-list>
            <v-list class="pr-5" v-if="item.reply">
              <v-list-item style="color: black">
                <v-list-item-title>
                  <v-avatar>
                    <v-img alt="دکتر سمیرا رونقی"
                           :src="item?.admin?.avatar?.original ?? 'images/icons/admin-avatar.png'"/>
                  </v-avatar>
                  <span class="mr-1">دکتر سمیرا رونقی</span>
                  <v-divider vertical thickness="8"/>
                  <span class="mr-1 grey--text font-12">{{
                      DateTime.fromSeconds(item.updated_at).setLocale('fa').toRelative() }}</span>
                </v-list-item-title>
                <div class="pr-7">
                  <v-banner class="border-none text-wrap font-15" :text="item.reply" stacked/>
                </div>
              </v-list-item>
            </v-list>
          </template>
        </v-infinite-scroll>
      </v-card-text>
      <v-divider class="pt-0 pb-1"/>

      <div style="max-height: 300px;">
      <v-textarea v-model="newComment" rounded="0" variant="plain"
                  label="در اینجا نظر خود را بنویسید... " :disabled="loading"
                  class="border-none px-4 m-0 pb-4" hide-details />
      </div>
        <v-btn
          flat
          color="blue-darken-1 pt-1 mb-0"
          variant="tonal"
          rounded="0"
          @click="saveComment"
          :loading="loading"
          :disabled="!newComment.trim()"
          text="ثبت"
      />

    </v-card>

  </v-dialog>

  <v-dialog
      v-model="showSuccessMessage"
      width="auto"
      height="auto"
  >
    <v-card max-width="300">
      <v-alert
          type="success"
          icon="mdi-message-check"
          variant="tonal"
          title="ثبت موفق"
          elevation="1"
          rounded
      >
        <template #close>
          <v-icon icon="mdi mdi-close" size="small" class="cursor-pointer pt-2"
                  @click="showSuccessMessage = false;showCommentsModal = true"/>
        </template>
        <template #text>
          <div class="mt-3 text-justify">
            با تشکر؛ نظر شما با موفقیت ثبت شد و پس از تایید، قابل نمایش خواهد بود.
          </div>
        </template>
      </v-alert>
    </v-card>
  </v-dialog>

</template>

