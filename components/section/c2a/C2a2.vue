<template>
    <v-parallax dark src="@/assets/img/bgHero.jpg" height="750">
      <v-row align="center" justify="center">
        <v-col cols="10">
          <v-row align="center" justify="center">
            <v-col cols="12" md="6" xl="8">
              <h1 class="display-2 font-weight-bold mb-4">Vuetify.js</h1>
              <h1 class="font-weight-light">
                Lorem ipsum dolor sit amet consectetur <br />
                adipisicing elit. Maiores porro voluptatibus <br />
                delectus nam optio harum!
              </h1>
              <v-btn
                  rounded
                  outlined
                  large
                  dark
                  @click="$vuetify.goTo('#features')"
                  class="mt-5"
              >
                Saiba mais
                <v-icon class="ml-2">mdi-arrow-down</v-icon>
              </v-btn>
              <div class="video d-flex align-center py-4">
                <a @click.stop="dialog = true" class="playBut">
                  <svg
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      x="0px"
                      y="0px"
                      width="60px"
                      height="60px"
                      viewBox="0 0 213.7 213.7"
                      enable-background="new 0 0 213.7 213.7"
                      xml:space="preserve"
                  >
                    <polygon
                        class="triangle"
                        id="XMLID_18_"
                        fill="none"
                        stroke-width="7"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-miterlimit="10"
                        points="73.5,62.5 148.5,105.8 73.5,149.1 "
                    />

                    <circle
                        class="circle"
                        id="XMLID_17_"
                        fill="none"
                        stroke-width="7"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-miterlimit="10"
                        cx="106.8"
                        cy="106.8"
                        r="103.3"
                    />
                  </svg>
                </a>
                <p class="subheading ml-2 mb-0">Assista o vídeo</p>
              </div>
            </v-col>
            <v-col cols="12" md="6" xl="4" class="hidden-sm-and-down"> </v-col>
          </v-row>
        </v-col>
      </v-row>
      <div class="svg-border-waves text-white">
        <v-img src="@/assets/borderWaves.svg" />
      </div>
    </v-parallax>

</template>

<script>

</script>

<style lang="scss" scoped>
.circle {
  stroke: white;
  stroke-dasharray: 650;
  stroke-dashoffset: 650;
  -webkit-transition: all 0.5s ease-in-out;
  opacity: 0.3;
}

.playBut {
  /*  border: 1px solid red;*/
  display: inline-block;
  -webkit-transition: all 0.5s ease;

  .triangle {
    -webkit-transition: all 0.7s ease-in-out;
    stroke-dasharray: 240;
    stroke-dashoffset: 480;
    stroke: white;
    transform: translateY(0);
  }

  &:hover {
    .triangle {
      stroke-dashoffset: 0;
      opacity: 1;
      stroke: white;
      animation: nudge 0.7s ease-in-out;

      @keyframes nudge {
        0% {
          transform: translateX(0);
        }
        30% {
          transform: translateX(-5px);
        }
        50% {
          transform: translateX(5px);
        }
        70% {
          transform: translateX(-2px);
        }
        100% {
          transform: translateX(0);
        }
      }
    }

    .circle {
      stroke-dashoffset: 0;
      opacity: 1;
    }
  }
}
</style>

<style lang="scss" scoped>
.btn-play {
  transition: 0.2s;
}

.svg-border-waves .v-image {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3rem;
  width: 100%;
  overflow: hidden;
}

#hero {
  z-index: 0;
}
.svg-border-waves img {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  margin-bottom: -2px;
  z-index: -1;
}

.card {
  min-height: 300px;
  padding: 10px;
  transition: 0.5s ease-out;
}

.card .v-image {
  margin-bottom: 15px;
  transition: 0.75s;
}

.card h1 {
  margin-bottom: 10px;
}

.zoom-efect {
  transform: scale(1.1);
}

.up {
  transform: translateY(-20px);
  transition: 0.5s ease-out;
}
</style>

<style lang="scss" scoped>
section {
  position: relative;
}
</style>