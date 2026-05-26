import { _ as __nuxt_component_0 } from './nuxt-link-CcLXw0O4.mjs';
import { defineComponent, withAsyncContext, computed, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
import { u as useAuthStore, b as useFetch, g as useRuntimeConfig } from './server.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'pinia';
import 'vue-router';
import '@vue/shared';
import 'perfect-debounce';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const config = useRuntimeConfig();
    const authStore = useAuthStore();
    const { data: stats, pending } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      `${config.public.apiBase}/dashboard/stats`,
      {
        headers: { Authorization: `Bearer ${authStore.token}` }
      },
      "$66w1WAvhCy"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const statCards = computed(() => {
      var _a, _b, _c, _d, _e, _f;
      return [
        { label: "\uC804\uCCB4 \uC0AC\uC6A9\uC790", icon: "\u{1F465}", value: (_b = (_a = stats.value) == null ? void 0 : _a.total_users) != null ? _b : 0 },
        { label: "\uC774\uBC88 \uB2EC \uAC00\uC785", icon: "\u{1F4C8}", value: (_d = (_c = stats.value) == null ? void 0 : _c.active_users) != null ? _d : 0 },
        { label: "\uC624\uB298 \uC2E0\uADDC \uAC00\uC785", icon: "\u{1F195}", value: (_f = (_e = stats.value) == null ? void 0 : _e.today_signups) != null ? _f : 0 }
      ];
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div><h2 class="text-2xl font-bold text-gray-800">\uB300\uC2DC\uBCF4\uB4DC</h2><p class="text-gray-500 text-sm mt-1">\uC11C\uBE44\uC2A4 \uD604\uD669\uC744 \uD55C\uB208\uC5D0 \uD655\uC778\uD558\uC138\uC694.</p></div><div class="grid grid-cols-1 md:grid-cols-3 gap-6"><!--[-->`);
      ssrRenderList(unref(statCards), (card) => {
        _push(`<div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100"><div class="flex items-center justify-between"><div><p class="text-sm text-gray-500 font-medium">${ssrInterpolate(card.label)}</p><p class="text-3xl font-bold text-gray-900 mt-2">${ssrInterpolate(unref(pending) ? "..." : card.value)}</p></div><div class="text-3xl">${ssrInterpolate(card.icon)}</div></div></div>`);
      });
      _push(`<!--]--></div><div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100"><h3 class="font-semibold text-gray-800 mb-4">\uCD5C\uADFC \uAC00\uC785 \uC0AC\uC6A9\uC790</h3><p class="text-sm text-gray-400">\uC0AC\uC6A9\uC790 \uBAA9\uB85D\uC740 \uC0AC\uC6A9\uC790 \uAD00\uB9AC \uBA54\uB274\uC5D0\uC11C \uD655\uC778\uD558\uC138\uC694.</p>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/users",
        class: "inline-block mt-3 text-sm text-indigo-600 hover:underline"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` \uC0AC\uC6A9\uC790 \uAD00\uB9AC \uBC14\uB85C\uAC00\uAE30 \u2192 `);
          } else {
            return [
              createTextVNode(" \uC0AC\uC6A9\uC790 \uAD00\uB9AC \uBC14\uB85C\uAC00\uAE30 \u2192 ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-Dy_HQO3D.mjs.map
