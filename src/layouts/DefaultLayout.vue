<template>
  <div>
    <div id="tooltip"></div>
    <section id="notifications"></section>

    <section id="top">
      <Dragger />
      <Nav />
    </section>

    <section id="main">
      <slot />
    </section>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Dragger from "@/components/Dragger.vue";
import Nav from "@/components/Nav.vue";
import router from "@/router";
import { AppSettings, GeneralSettings } from "@/libs/settings";
import "@/libs/helpers/extensions";

@Component({
  components: {
    Dragger,
    Nav
  }
})
export default class DefaultLayout extends Vue {
  mounted() {
    const excludedPages = ["videoPlayer"];

    // If user is on an excludedPage, don't push user to their default startupPage.
    if (!String(this.$route.name).equalsAnyOf(excludedPages)) {
      // Redirect to startup page defined in settings
      // If startupPage setting is a page in the application, redirect to it
      // Else go to first page in AppSettings.pages setting
      if (AppSettings.pages.includes(GeneralSettings.startupPage)) {
        router.push({ name: GeneralSettings.startupPage.toLowerCase() }).catch(() => {});
      } else {
        router.push({ name: AppSettings.pages[0].toLowerCase() }).catch(() => {});
      }
    }

    this.applyTooltips();
  }

  updated() {
    this.applyTooltips();
  }

  applyTooltips() {
    const tooltip = document.getElementById("tooltip")!;
    let els = document.querySelectorAll("[tooltip]");

    const closeTooltip = () => {
      tooltip.style.transform = "scale(0.85)";
      tooltip.style.opacity = "0";
    };

    for (let i = 0, n = els.length; i < n; ++i) {
      let el = els[i] as HTMLElement;

      el.addEventListener("mouseenter", () => {
        const er = el.getBoundingClientRect();

        tooltip.innerHTML = el.getAttribute("tooltip")!;

        tooltip.style.transform = "scale(1)";
        tooltip.style.top = `${er.top - er.height - 2}px`;
        tooltip.style.left = `${er.left.toInWindowBounds("x", tooltip, el)}px`;
        tooltip.style.opacity = "1";
      });

      el.addEventListener("mouseleave", closeTooltip);
      el.addEventListener("mousedown", closeTooltip);
    }
  }
}
</script>

<style lang="scss">
section#top {
  width: 100%;
  z-index: 9999999;
}

section#main {
  height: calc(100vh - 66px);
  overflow-y: auto;
  background-color: $primaryColor;
}

#tooltip {
  position: fixed;
  opacity: 0;
  padding: 8px 10px;
  background-color: $darkAccentColor;
  border-radius: 3px;
  box-shadow: 0px 0px 8px $darkAccentColor;
  font-size: 13px;
  white-space: nowrap;
  transition: opacity 150ms ease-in-out, left 25ms ease-in;
  z-index: 100;
  pointer-events: none;
}
</style>
