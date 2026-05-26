import { defineComponent, reactive, ref, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr } from "vue/server-renderer";
import "/Users/graybebop/Documents/프로젝트/05-Vue프로젝트/laravel-stocks/admin-monorepo/frontend/node_modules/hookable/dist/index.mjs";
import { u as useAuthStore, f as useRouter } from "../server.mjs";
import "/Users/graybebop/Documents/프로젝트/05-Vue프로젝트/laravel-stocks/admin-monorepo/frontend/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
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
  __name: "login",
  __ssrInlineRender: true,
  setup(__props) {
    useAuthStore();
    useRouter();
    const form = reactive({ email: "", password: "" });
    const loading = ref(false);
    const errorMsg = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-900 flex items-center justify-center px-4" }, _attrs))}><div class="w-full max-w-md"><div class="text-center mb-8"><h1 class="text-3xl font-bold text-white">⚡ Admin</h1><p class="text-gray-400 mt-2">관리자 대시보드에 로그인하세요</p></div><div class="bg-gray-800 rounded-2xl p-8 shadow-2xl">`);
      if (unref(errorMsg)) {
        _push(`<div class="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-sm">${ssrInterpolate(unref(errorMsg))}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="space-y-5"><div><label class="block text-sm font-medium text-gray-300 mb-2">이메일</label><input${ssrRenderAttr("value", unref(form).email)} type="email" placeholder="admin@example.com" class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"></div><div><label class="block text-sm font-medium text-gray-300 mb-2">비밀번호</label><input${ssrRenderAttr("value", unref(form).password)} type="password" placeholder="••••••••" class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"></div><button${ssrIncludeBooleanAttr(unref(loading)) ? " disabled" : ""} class="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors">${ssrInterpolate(unref(loading) ? "로그인 중..." : "로그인")}</button></div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/auth/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=login-BeNEo8mc.js.map
