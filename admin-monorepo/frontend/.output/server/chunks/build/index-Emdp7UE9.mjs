import { defineComponent, withAsyncContext, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
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
    const { data, pending } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      `${config.public.apiBase}/users`,
      { headers: { Authorization: `Bearer ${authStore.token}` } },
      "$CW9h3FDR-U"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const users = computed(() => {
      var _a, _b;
      return (_b = (_a = data.value) == null ? void 0 : _a.data) != null ? _b : [];
    });
    function formatDate(dateStr) {
      return new Date(dateStr).toLocaleDateString("ko-KR");
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div class="flex items-center justify-between"><div><h2 class="text-2xl font-bold text-gray-800">\uC0AC\uC6A9\uC790 \uAD00\uB9AC</h2><p class="text-gray-500 text-sm mt-1">\uC804\uCCB4 \uC0AC\uC6A9\uC790 \uBAA9\uB85D\uC744 \uAD00\uB9AC\uD558\uC138\uC694.</p></div></div><div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">`);
      if (unref(pending)) {
        _push(`<div class="p-8 text-center text-gray-400">\uBD88\uB7EC\uC624\uB294 \uC911...</div>`);
      } else {
        _push(`<table class="w-full text-sm"><thead class="bg-gray-50 border-b border-gray-100"><tr><th class="text-left px-6 py-4 text-gray-500 font-medium">ID</th><th class="text-left px-6 py-4 text-gray-500 font-medium">\uC774\uB984</th><th class="text-left px-6 py-4 text-gray-500 font-medium">\uC774\uBA54\uC77C</th><th class="text-left px-6 py-4 text-gray-500 font-medium">\uAC00\uC785\uC77C</th></tr></thead><tbody class="divide-y divide-gray-50"><!--[-->`);
        ssrRenderList(unref(users), (user) => {
          _push(`<tr class="hover:bg-gray-50 transition-colors"><td class="px-6 py-4 text-gray-400">#${ssrInterpolate(user.id)}</td><td class="px-6 py-4 font-medium text-gray-800">${ssrInterpolate(user.name)}</td><td class="px-6 py-4 text-gray-600">${ssrInterpolate(user.email)}</td><td class="px-6 py-4 text-gray-400">${ssrInterpolate(formatDate(user.created_at))}</td></tr>`);
        });
        _push(`<!--]-->`);
        if (!unref(users).length) {
          _push(`<tr><td colspan="4" class="px-6 py-8 text-center text-gray-400">\uC0AC\uC6A9\uC790\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.</td></tr>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</tbody></table>`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/users/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-Emdp7UE9.mjs.map
