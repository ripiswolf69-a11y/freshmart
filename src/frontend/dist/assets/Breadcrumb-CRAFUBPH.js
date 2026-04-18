import { c as createLucideIcon, j as jsxRuntimeExports, L as Link } from "./index-BaHQCgOk.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
];
const ArrowLeft = createLucideIcon("arrow-left", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]];
const ChevronRight = createLucideIcon("chevron-right", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8", key: "5wwlr5" }],
  [
    "path",
    {
      d: "M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
      key: "1d0kgt"
    }
  ]
];
const House = createLucideIcon("house", __iconNode);
function Breadcrumb({ items }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "nav",
    {
      "aria-label": "Breadcrumb",
      className: "flex items-center gap-1.5 text-sm text-muted-foreground",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/",
            className: "flex items-center gap-1 hover:text-primary transition-smooth",
            "data-ocid": "breadcrumb.home_link",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(House, { className: "h-3.5 w-3.5" })
          }
        ),
        items.map((item, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-3.5 w-3.5 flex-shrink-0" }),
          item.href && index < items.length - 1 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: item.href,
              className: "hover:text-primary transition-smooth",
              "data-ocid": `breadcrumb.item.${index + 1}`,
              children: item.label
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: item.label })
        ] }, item.label))
      ]
    }
  );
}
export {
  ArrowLeft as A,
  Breadcrumb as B,
  ChevronRight as C
};
