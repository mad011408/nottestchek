(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/[root-of-the-server]__f2b15f93._.js",
"[externals]/node:buffer [external] (node:buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:buffer", () => require("node:buffer"));

module.exports = mod;
}),
"[externals]/node:async_hooks [external] (node:async_hooks, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}),
"[project]/middleware.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "config",
    ()=>config,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$workos$2d$inc$2b$authkit$2d$nextjs$40$2$2e$12$2e$0_next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$_d69fb94637ccf89267342f537ef484a4$2f$node_modules$2f40$workos$2d$inc$2f$authkit$2d$nextjs$2f$dist$2f$esm$2f$middleware$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@workos-inc+authkit-nextjs@2.12.0_next@16.0.10_@babel+core@7.28.5_@opentelemetry+api@1._d69fb94637ccf89267342f537ef484a4/node_modules/@workos-inc/authkit-nextjs/dist/esm/middleware.js [middleware-edge] (ecmascript)");
;
function getRedirectUri() {
    if (process.env.VERCEL_ENV === "preview" && process.env.VERCEL_URL) {
        return `https://${process.env.VERCEL_URL}/callback`;
    }
    return undefined;
}
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$workos$2d$inc$2b$authkit$2d$nextjs$40$2$2e$12$2e$0_next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$_d69fb94637ccf89267342f537ef484a4$2f$node_modules$2f40$workos$2d$inc$2f$authkit$2d$nextjs$2f$dist$2f$esm$2f$middleware$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["authkitMiddleware"])({
    redirectUri: getRedirectUri(),
    eagerAuth: true,
    middlewareAuth: {
        enabled: true,
        unauthenticatedPaths: [
            "/",
            "/login",
            "/signup",
            "/logout",
            "/api/clear-auth-cookies",
            "/callback",
            "/privacy-policy",
            "/terms-of-service",
            "/manifest.json",
            "/share/:path*"
        ]
    }
});
const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
        // Always run for API routes
        "/(api|trpc)(.*)"
    ]
};
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__f2b15f93._.js.map