import { _ as __nuxt_component_0 } from "./nuxt-link-CcLXw0O4.js";
import { defineComponent, withAsyncContext, computed, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrInterpolate, ssrRenderComponent } from "vue/server-renderer";
import { u as useAuthStore, b as useFetch, g as useRuntimeConfig } from "../server.mjs";
import "/Users/graybebop/Documents/프로젝트/05-Vue프로젝트/laravel-stocks/admin-monorepo/frontend/node_modules/ufo/dist/index.mjs";
import "/Users/graybebop/Documents/프로젝트/05-Vue프로젝트/laravel-stocks/admin-monorepo/frontend/node_modules/defu/dist/defu.mjs";
import "/Users/graybebop/Documents/프로젝트/05-Vue프로젝트/laravel-stocks/admin-monorepo/frontend/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/Users/graybebop/Documents/프로젝트/05-Vue프로젝트/laravel-stocks/admin-monorepo/frontend/node_modules/hookable/dist/index.mjs";
import "/Users/graybebop/Documents/프로젝트/05-Vue프로젝트/laravel-stocks/admin-monorepo/frontend/node_modules/unctx/dist/index.mjs";
import "/Users/graybebop/Documents/프로젝트/05-Vue프로젝트/laravel-stocks/admin-monorepo/frontend/node_modules/h3/dist/index.mjs";
import "pinia";
import "vue-router";
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
    const { data: stats, pending } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      `${config.public.apiBase}/dashboard/stats`,
      {
        headers: { Authorization: `Bearer ${authStore.token}` }
      },
      "$66w1WAvhCy"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const statCards = computed(() => [
      { label: "전체 사용자", icon: "👥", value: stats.value?.total_users ?? 0 },
      { label: "이번 달 가입", icon: "📈", value: stats.value?.active_users ?? 0 },
      { label: "오늘 신규 가입", icon: "🆕", value: stats.value?.today_signups ?? 0 }
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div><h2 class="text-2xl font-bold text-gray-800">대시보드</h2><p class="text-gray-500 text-sm mt-1">서비스 현황을 한눈에 확인하세요.</p></div><div class="grid grid-cols-1 md:grid-cols-3 gap-6"><!--[-->`);
      ssrRenderList(unref(statCards), (card) => {
        _push(`<div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100"><div class="flex items-center justify-between"><div><p class="text-sm text-gray-500 font-medium">${ssrInterpolate(card.label)}</p><p class="text-3xl font-bold text-gray-900 mt-2">${ssrInterpolate(unref(pending) ? "..." : card.value)}</p></div><div class="text-3xl">${ssrInterpolate(card.icon)}</div></div></div>`);
      });
      _push(`<!--]--></div><div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100"><h3 class="font-semibold text-gray-800 mb-4">최근 가입 사용자</h3><p class="text-sm text-gray-400">사용자 목록은 사용자 관리 메뉴에서 확인하세요.</p>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/users",
        class: "inline-block mt-3 text-sm text-indigo-600 hover:underline"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` 사용자 관리 바로가기 → `);
          } else {
            return [
              createTextVNode(" 사용자 관리 바로가기 → ")
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
export {
  _sfc_main as default
};
//# sourceMappingURL=index-Dy_HQO3D.js.map
