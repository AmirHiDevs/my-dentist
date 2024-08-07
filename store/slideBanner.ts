import {defineStore} from "pinia";
import type {SlideBanner} from "~/utils/types";


export const useSlideBannerStore = defineStore('slideBanner', {
    state: () => ({
        slideBanners: new Map<number, SlideBanner>(),
    }),

    actions: {
        async fetch() {
            const response = await useNuxtApp().$api.all<SlideBanner>('/api/slider-banner', {
                    sort: {created_at: 'desc'}
                });

            // @ts-ignore
            response.data.forEach(slideBanner => {
                this.slideBanners.set(slideBanner.id, slideBanner);
            });
        }
    },
})
