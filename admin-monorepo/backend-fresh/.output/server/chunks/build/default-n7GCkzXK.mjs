import { _ as __nuxt_component_0 } from './nuxt-link-CcLXw0O4.mjs';
import { defineComponent, computed, mergeProps, withCtx, createVNode, toDisplayString, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent, ssrInterpolate, ssrRenderSlot } from 'vue/server-renderer';
import { u as useAuthStore, d as useRoute } from './server.mjs';
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
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    const authStore = useAuthStore();
    const route = useRoute();
    const navItems = [
      { to: "/dashboard", icon: "\u{1F4CA}", label: "\uB300\uC2DC\uBCF4\uB4DC" },
      { to: "/users", icon: "\u{1F465}", label: "\uC0AC\uC6A9\uC790 \uAD00\uB9AC" },
      { to: "/settings", icon: "\u2699\uFE0F", label: "\uC124\uC815" }
    ];
    const userInitial = computed(
      () => {
        var _a, _b, _c;
        return (_c = (_b = (_a = authStore.user) == null ? void 0 : _a.name) == null ? void 0 : _b.charAt(0).toUpperCase()) != null ? _c : "A";
      }
    );
    const pageTitle = computed(() => {
      var _a;
      const matched = navItems.find((i) => route.path.startsWith(i.to));
      return (_a = matched == null ? void 0 : matched.label) != null ? _a : "Admin";
    });
    const currentDate = computed(
      () => (/* @__PURE__ */ new Date()).toLocaleDateString("ko-KR", { year: "numeric", month: "long", day: "numeric" })
    );
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b;
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-50 flex" }, _attrs))}><aside class="w-64 bg-gray-900 text-white flex flex-col fixed inset-y-0 left-0 z-50"><div class="h-16 flex items-center px-6 border-b border-gray-700"><span class="text-xl font-bold text-white">\u26A1 Admin</span></div><nav class="flex-1 px-4 py-6 space-y-1 overflow-y-auto"><!--[-->`);
      ssrRenderList(navItems, (item) => {
        _push(ssrRenderComponent(_component_NuxtLink, {
          key: item.to,
          to: item.to,
          class: "flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors",
          "active-class": "bg-indigo-600 text-white"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="text-lg"${_scopeId}>${ssrInterpolate(item.icon)}</span><span class="text-sm font-medium"${_scopeId}>${ssrInterpolate(item.label)}</span>`);
            } else {
              return [
                createVNode("span", { class: "text-lg" }, toDisplayString(item.icon), 1),
                createVNode("span", { class: "text-sm font-medium" }, toDisplayString(item.label), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></nav><div class="p-4 border-t border-gray-700"><div class="flex items-center gap-3"><div class="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-sm font-bold">${ssrInterpolate(unref(userInitial))}</div><div class="flex-1 min-w-0"><p class="text-sm font-medium text-white truncate">${ssrInterpolate((_a = unref(authStore).user) == null ? void 0 : _a.name)}</p><p class="text-xs text-gray-400 truncate">${ssrInterpolate((_b = unref(authStore).user) == null ? void 0 : _b.email)}</p></div><button class="text-gray-400 hover:text-white transition-colors" title="\uB85C\uADF8\uC544\uC6C3"> \u{1F6AA} </button></div></div></aside><div class="flex-1 ml-64"><header class="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-40"><h1 class="text-lg font-semibold text-gray-800">${ssrInterpolate(unref(pageTitle))}</h1><div class="flex items-center gap-3"><span class="text-sm text-gray-500">${ssrInterpolate(unref(currentDate))}</span></div></header><main class="p-6">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=default-n7GCkzXK.mjs.map
