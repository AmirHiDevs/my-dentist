<script setup lang="ts">
import {about} from "~/data/CustomComponents";
import type {PropType} from "@vue/runtime-core";
import type {AboutSettings} from "~/utils/types";




const props = defineProps({
  aboutSettings: {
    type: Object as PropType<AboutSettings>,
    required: true,
    default: {
      image: 'images/team/t3.jpg',
      items: about
    },
  }
})


</script>
<template>

    <v-container>
      <div class="about-component mini-spacer">


        <!-- -----------------------------------------------
            Start About
        ----------------------------------------------- -->
                <v-row class="mt-16">
                  <v-col cols="12" sm="6">
                    <div class="img-boarder mx-auto" style="max-height: 490px; max-width: 378px;">
                      <v-img aspect-ratio="3/4" class="elevation-1"
                             rounded cover
                             :src="`${useAppConfig().api.baseUrl+ '/storage/' +<string>props.aboutSettings?.image}`"/>
                    </div>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-row class="mx-0">
                      <div class="d-flex align-center mt-5 about-card" v-for="card in props.aboutSettings?.items" :key="card.title">
                        <div class="icon-round px-4 mr-5" :style="`background-color: ${card.iconBackColor} ;`">
                          <v-icon :style="`color: ${card.iconColor} ;`">{{card.icon}}</v-icon>
                        </div>
                        <p class="text-justify mx-5" :style="`color: ${card.textColor} ;`">{{ card.text }}</p>
                      </div>
                    </v-row>
                  </v-col>
                </v-row>


        <!-- -----------------------------------------------
            End About
        ----------------------------------------------- -->

      </div>
    </v-container>



</template>

<style lang="scss" scoped>
.img-boarder {
  --color: #03192C; /* the border color */
  --border: 8px; /* the border thickness*/
  --offset: 20px; /* control the offset*/
  --gap: 5px; /* the gap on hover */
  --_c: var(--color) var(--border), #0000 0 calc(100% - var(--border)), var(--color) 0;
  --_o: calc(3 * var(--offset));
  padding: calc(var(--gap) + var(--border)) calc(var(--gap) + var(--border) + var(--offset)) calc(var(--gap) + var(--border) + var(--offset)) calc(var(--gap) + var(--border));
  background: linear-gradient(var(--_c)) var(--_o) var(--_o),
  linear-gradient(90deg, var(--_c)) var(--_o) var(--_o);
  background-size: calc(100% - var(--_o)) calc(100% - var(--_o));
  background-repeat: no-repeat;
  //filter: grayscale(.4);
  transition: .5s;
}

.img-boarder:hover {
  background-position: 0 0;
  background-size: calc(100% - var(--offset)) calc(100% - var(--offset));
  //filter: grayscale(0);
}

</style>