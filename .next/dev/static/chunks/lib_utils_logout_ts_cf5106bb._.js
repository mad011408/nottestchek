(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/lib/utils/logout.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "clientLogout",
    ()=>clientLogout
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$client$2d$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils/client-storage.ts [app-client] (ecmascript)");
"use client";
;
const clientLogout = (redirectPath = "/logout")=>{
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$client$2d$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clearAllDrafts"])();
    } catch  {
    // ignore
    } finally{
        try {
            window.location.href = redirectPath;
        } catch  {
        // ignore
        }
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=lib_utils_logout_ts_cf5106bb._.js.map