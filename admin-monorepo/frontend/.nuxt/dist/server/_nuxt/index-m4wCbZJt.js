import { defineComponent, useSSRContext } from "vue";
import { n as navigateTo } from "../server.mjs";
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
import "vue/server-renderer";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  setup(__props) {
    navigateTo("/dashboard");
    return () => {
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=index-m4wCbZJt.js.map
