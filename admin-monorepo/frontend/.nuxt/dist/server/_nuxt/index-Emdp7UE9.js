import { defineComponent, withAsyncContext, computed, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { u as useAuthStore, b as useFetch, g as useRuntimeConfig } from "../server.mjs";
import "/Users/graybebop/Documents/프로젝트/05-Vue프로젝트/laravel-stocks/admin-monorepo/frontend/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/Users/graybebop/Documents/프로젝트/05-Vue프로젝트/laravel-stocks/admin-monorepo/frontend/node_modules/hookable/dist/index.mjs";
import "/Users/graybebop/Documents/프로젝트/05-Vue프로젝트/laravel-stocks/admin-monorepo/frontend/node_modules/unctx/dist/index.mjs";
import "/Users/graybebop/Documents/프로젝트/05-Vue프로젝트/laravel-stocks/admin-monorepo/frontend/node_modules/h3/dist/index.mjs";
import "pinia";
import "/Users/graybebop/Documents/프로젝트/05-Vue프로젝트/laravel-stocks/admin-monorepo/frontend/node_modules/defu/dist/defu.mjs";
import "vue-router";
import "/Users/graybebop/Documents/프로젝트/05-Vue프로젝트/laravel-stocks/admin-monorepo/frontend/node_modules/ufo/dist/index.mjs";
import "/Users/graybebop/Documents/프로젝트/05-Vue프로젝트/laravel-stocks/admin-monorepo/frontend/node_modules/ohash/dist/index.mjs";
import "@vue/shared";
import "/Users/graybebop/Documents/프로젝트/05-Vue프로젝트/laravel-stocks/admin-monorepo/frontend/node_modules/perfect-debounce/dist/index.mjs";
import "/Users/graybebop/Documents/프로젝트/05-Vue프로젝트/laravel-stocks/admin-monorepo/frontend/node_modules/nuxt/node_modules/cookie-es/dist/index.mjs";
import "/Users/graybebop/Documents/프로젝트/05-Vue프로젝트/laravel-stocks/admin-monorepo/frontend/node_modules/destr/dist/index.mjs";
import "/Users/graybebop/Documents/프로젝트/05-Vue프로젝트/laravel-stocks/admin-monorepo/frontend/node_modules/klona/dist/index.mjs";
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
    const users = computed(() => data.value?.data ?? []);
    function formatDate(dateStr) {
      return new Date(dateStr).toLocaleDateString("ko-KR");
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div class="flex items-center justify-between"><div><h2 class="text-2xl font-bold text-gray-800">사용자 관리</h2><p class="text-gray-500 text-sm mt-1">전체 사용자 목록을 관리하세요.</p></div></div><div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">`);
      if (unref(pending)) {
        _push(`<div class="p-8 text-center text-gray-400">불러오는 중...</div>`);
      } else {
        _push(`<table class="w-full text-sm"><thead class="bg-gray-50 border-b border-gray-100"><tr><th class="text-left px-6 py-4 text-gray-500 font-medium">ID</th><th class="text-left px-6 py-4 text-gray-500 font-medium">이름</th><th class="text-left px-6 py-4 text-gray-500 font-medium">이메일</th><th class="text-left px-6 py-4 text-gray-500 font-medium">가입일</th></tr></thead><tbody class="divide-y divide-gray-50"><!--[-->`);
        ssrRenderList(unref(users), (user) => {
          _push(`<tr class="hover:bg-gray-50 transition-colors"><td class="px-6 py-4 text-gray-400">#${ssrInterpolate(user.id)}</td><td class="px-6 py-4 font-medium text-gray-800">${ssrInterpolate(user.name)}</td><td class="px-6 py-4 text-gray-600">${ssrInterpolate(user.email)}</td><td class="px-6 py-4 text-gray-400">${ssrInterpolate(formatDate(user.created_at))}</td></tr>`);
        });
        _push(`<!--]-->`);
        if (!unref(users).length) {
          _push(`<tr><td colspan="4" class="px-6 py-8 text-center text-gray-400">사용자가 없습니다.</td></tr>`);
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
export {
  _sfc_main as default
};
//# sourceMappingURL=index-Emdp7UE9.js.map
