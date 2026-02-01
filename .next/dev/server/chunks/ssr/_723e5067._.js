module.exports = [
"[project]/node_modules/.pnpm/@workos-inc+authkit-nextjs@2.12.0_next@16.0.10_@babel+core@7.28.5_@opentelemetry+api@1._d69fb94637ccf89267342f537ef484a4/node_modules/@workos-inc/authkit-nextjs/dist/esm/env-variables.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* istanbul ignore file */ __turbopack_context__.s([
    "WORKOS_API_HOSTNAME",
    ()=>WORKOS_API_HOSTNAME,
    "WORKOS_API_HTTPS",
    ()=>WORKOS_API_HTTPS,
    "WORKOS_API_KEY",
    ()=>WORKOS_API_KEY,
    "WORKOS_API_PORT",
    ()=>WORKOS_API_PORT,
    "WORKOS_CLIENT_ID",
    ()=>WORKOS_CLIENT_ID,
    "WORKOS_COOKIE_DOMAIN",
    ()=>WORKOS_COOKIE_DOMAIN,
    "WORKOS_COOKIE_MAX_AGE",
    ()=>WORKOS_COOKIE_MAX_AGE,
    "WORKOS_COOKIE_NAME",
    ()=>WORKOS_COOKIE_NAME,
    "WORKOS_COOKIE_PASSWORD",
    ()=>WORKOS_COOKIE_PASSWORD,
    "WORKOS_COOKIE_SAMESITE",
    ()=>WORKOS_COOKIE_SAMESITE,
    "WORKOS_REDIRECT_URI",
    ()=>WORKOS_REDIRECT_URI
]);
var _a, _b, _c, _d;
function getEnvVariable(name) {
    return process.env[name];
}
// Optional env variables
const WORKOS_API_HOSTNAME = getEnvVariable('WORKOS_API_HOSTNAME');
const WORKOS_API_HTTPS = getEnvVariable('WORKOS_API_HTTPS');
const WORKOS_API_PORT = getEnvVariable('WORKOS_API_PORT');
const WORKOS_COOKIE_DOMAIN = getEnvVariable('WORKOS_COOKIE_DOMAIN');
const WORKOS_COOKIE_MAX_AGE = getEnvVariable('WORKOS_COOKIE_MAX_AGE');
const WORKOS_COOKIE_NAME = getEnvVariable('WORKOS_COOKIE_NAME');
const WORKOS_COOKIE_SAMESITE = getEnvVariable('WORKOS_COOKIE_SAMESITE');
// Required env variables
const WORKOS_API_KEY = (_a = getEnvVariable('WORKOS_API_KEY')) !== null && _a !== void 0 ? _a : '';
const WORKOS_CLIENT_ID = (_b = getEnvVariable('WORKOS_CLIENT_ID')) !== null && _b !== void 0 ? _b : '';
const WORKOS_COOKIE_PASSWORD = (_c = getEnvVariable('WORKOS_COOKIE_PASSWORD')) !== null && _c !== void 0 ? _c : '';
const WORKOS_REDIRECT_URI = (_d = process.env.NEXT_PUBLIC_WORKOS_REDIRECT_URI) !== null && _d !== void 0 ? _d : '';
;
 //# sourceMappingURL=env-variables.js.map
}),
"[project]/node_modules/.pnpm/@workos-inc+authkit-nextjs@2.12.0_next@16.0.10_@babel+core@7.28.5_@opentelemetry+api@1._d69fb94637ccf89267342f537ef484a4/node_modules/@workos-inc/authkit-nextjs/dist/esm/cookie.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getCookieOptions",
    ()=>getCookieOptions,
    "getJwtCookie",
    ()=>getJwtCookie
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$workos$2d$inc$2b$authkit$2d$nextjs$40$2$2e$12$2e$0_next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$_d69fb94637ccf89267342f537ef484a4$2f$node_modules$2f40$workos$2d$inc$2f$authkit$2d$nextjs$2f$dist$2f$esm$2f$env$2d$variables$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@workos-inc+authkit-nextjs@2.12.0_next@16.0.10_@babel+core@7.28.5_@opentelemetry+api@1._d69fb94637ccf89267342f537ef484a4/node_modules/@workos-inc/authkit-nextjs/dist/esm/env-variables.js [app-rsc] (ecmascript)");
;
const JWT_COOKIE_MAX_AGE = 30; // seconds
const JWT_COOKIE_NAME = 'workos-access-token';
function assertValidSamSite(sameSite) {
    if (![
        'lax',
        'strict',
        'none'
    ].includes(sameSite.toLowerCase())) {
        throw new Error(`Invalid SameSite value: ${sameSite}`);
    }
}
function getCookieOptions(redirectUri, asString = false, expired = false) {
    const sameSite = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$workos$2d$inc$2b$authkit$2d$nextjs$40$2$2e$12$2e$0_next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$_d69fb94637ccf89267342f537ef484a4$2f$node_modules$2f40$workos$2d$inc$2f$authkit$2d$nextjs$2f$dist$2f$esm$2f$env$2d$variables$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["WORKOS_COOKIE_SAMESITE"] || 'lax';
    assertValidSamSite(sameSite);
    const urlString = redirectUri || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$workos$2d$inc$2b$authkit$2d$nextjs$40$2$2e$12$2e$0_next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$_d69fb94637ccf89267342f537ef484a4$2f$node_modules$2f40$workos$2d$inc$2f$authkit$2d$nextjs$2f$dist$2f$esm$2f$env$2d$variables$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["WORKOS_REDIRECT_URI"];
    // Default to secure=true when no URL available (production default)
    // Developers should set WORKOS_REDIRECT_URI for proper local dev
    let secure;
    if (sameSite.toLowerCase() === 'none') {
        secure = true;
    } else if (urlString) {
        try {
            const url = new URL(urlString);
            secure = url.protocol === 'https:';
        } catch (_a) {
            // Invalid URL - default to secure
            secure = true;
        }
    } else {
        secure = true;
    }
    let maxAge;
    if (expired) {
        maxAge = 0;
    } else if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$workos$2d$inc$2b$authkit$2d$nextjs$40$2$2e$12$2e$0_next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$_d69fb94637ccf89267342f537ef484a4$2f$node_modules$2f40$workos$2d$inc$2f$authkit$2d$nextjs$2f$dist$2f$esm$2f$env$2d$variables$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["WORKOS_COOKIE_MAX_AGE"]) {
        const parsed = parseInt(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$workos$2d$inc$2b$authkit$2d$nextjs$40$2$2e$12$2e$0_next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$_d69fb94637ccf89267342f537ef484a4$2f$node_modules$2f40$workos$2d$inc$2f$authkit$2d$nextjs$2f$dist$2f$esm$2f$env$2d$variables$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["WORKOS_COOKIE_MAX_AGE"], 10);
        maxAge = Number.isFinite(parsed) ? parsed : 60 * 60 * 24 * 400;
    } else {
        maxAge = 60 * 60 * 24 * 400;
    }
    if (asString) {
        const capitalizedSameSite = sameSite.charAt(0).toUpperCase() + sameSite.slice(1).toLowerCase();
        const parts = [
            'Path=/',
            'HttpOnly',
            `SameSite=${capitalizedSameSite}`,
            `Max-Age=${maxAge}`
        ];
        if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$workos$2d$inc$2b$authkit$2d$nextjs$40$2$2e$12$2e$0_next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$_d69fb94637ccf89267342f537ef484a4$2f$node_modules$2f40$workos$2d$inc$2f$authkit$2d$nextjs$2f$dist$2f$esm$2f$env$2d$variables$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["WORKOS_COOKIE_DOMAIN"]) {
            parts.push(`Domain=${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$workos$2d$inc$2b$authkit$2d$nextjs$40$2$2e$12$2e$0_next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$_d69fb94637ccf89267342f537ef484a4$2f$node_modules$2f40$workos$2d$inc$2f$authkit$2d$nextjs$2f$dist$2f$esm$2f$env$2d$variables$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["WORKOS_COOKIE_DOMAIN"]}`);
        }
        if (secure) {
            parts.push('Secure');
        }
        return parts.join('; ');
    }
    return {
        path: '/',
        httpOnly: true,
        secure,
        sameSite,
        // Defaults to 400 days, the maximum allowed by Chrome
        // It's fine to have a long cookie expiry date as the access/refresh tokens
        // act as the actual time-limited aspects of the session.
        maxAge,
        domain: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$workos$2d$inc$2b$authkit$2d$nextjs$40$2$2e$12$2e$0_next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$_d69fb94637ccf89267342f537ef484a4$2f$node_modules$2f40$workos$2d$inc$2f$authkit$2d$nextjs$2f$dist$2f$esm$2f$env$2d$variables$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["WORKOS_COOKIE_DOMAIN"] || ''
    };
}
function getJwtCookie(body, requestUrlOrRedirectUri, expired) {
    const cookie = `${JWT_COOKIE_NAME}=${expired ? '' : body !== null && body !== void 0 ? body : ''}`;
    // Force Secure in production, except for localhost
    let secure = false;
    const isProduction = ("TURBOPACK compile-time value", "development") === 'production';
    if (requestUrlOrRedirectUri) {
        try {
            const url = new URL(requestUrlOrRedirectUri);
            const isLocalhost = url.hostname === 'localhost' || url.hostname === '127.0.0.1';
            // In production, always use Secure unless explicitly on localhost
            secure = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : url.protocol === 'https:';
        } catch (_a) {
            // If URL parsing fails, default to secure in production
            secure = isProduction;
            // If it's not a valid URL, fall back to WORKOS_REDIRECT_URI
            const fallbackUrl = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$workos$2d$inc$2b$authkit$2d$nextjs$40$2$2e$12$2e$0_next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$_d69fb94637ccf89267342f537ef484a4$2f$node_modules$2f40$workos$2d$inc$2f$authkit$2d$nextjs$2f$dist$2f$esm$2f$env$2d$variables$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["WORKOS_REDIRECT_URI"];
            if (fallbackUrl) {
                try {
                    const url = new URL(fallbackUrl);
                    secure = url.protocol === 'https:';
                } catch (_b) {
                    secure = false;
                }
            }
        }
    } else if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$workos$2d$inc$2b$authkit$2d$nextjs$40$2$2e$12$2e$0_next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$_d69fb94637ccf89267342f537ef484a4$2f$node_modules$2f40$workos$2d$inc$2f$authkit$2d$nextjs$2f$dist$2f$esm$2f$env$2d$variables$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["WORKOS_REDIRECT_URI"]) {
        // No URL provided, check WORKOS_REDIRECT_URI
        try {
            const url = new URL(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$workos$2d$inc$2b$authkit$2d$nextjs$40$2$2e$12$2e$0_next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$_d69fb94637ccf89267342f537ef484a4$2f$node_modules$2f40$workos$2d$inc$2f$authkit$2d$nextjs$2f$dist$2f$esm$2f$env$2d$variables$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["WORKOS_REDIRECT_URI"]);
            secure = url.protocol === 'https:';
        } catch (_c) {
            secure = false;
        }
    }
    const maxAge = expired ? 0 : JWT_COOKIE_MAX_AGE;
    const parts = [
        cookie,
        'SameSite=Lax',
        `Max-Age=${maxAge}`
    ];
    // Only add Secure flag if on HTTPS
    if (secure) {
        parts.push('Secure');
    }
    if (expired) {
        parts.push(`Expires=${new Date(0).toUTCString()}`);
    }
    return parts.join('; ');
} //# sourceMappingURL=cookie.js.map
}),
"[project]/node_modules/.pnpm/@workos-inc+authkit-nextjs@2.12.0_next@16.0.10_@babel+core@7.28.5_@opentelemetry+api@1._d69fb94637ccf89267342f537ef484a4/node_modules/@workos-inc/authkit-nextjs/dist/esm/utils.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "errorResponseWithFallback",
    ()=>errorResponseWithFallback,
    "lazy",
    ()=>lazy,
    "redirectWithFallback",
    ()=>redirectWithFallback,
    "setCachePreventionHeaders",
    ()=>setCachePreventionHeaders
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.28.5_@opentelemetry+api@1.9.0_@playwright+test@1.57.0_react-_bc0e796ca3d7ea4640f9d74c95225eb3/node_modules/next/server.js [app-rsc] (ecmascript)");
;
function setCachePreventionHeaders(headers) {
    headers.set('Cache-Control', 'private, no-cache, no-store, must-revalidate, max-age=0');
    headers.set('Pragma', 'no-cache');
    headers.set('Expires', '0');
    headers.set('x-middleware-cache', 'no-cache');
}
function redirectWithFallback(redirectUri, headers) {
    const newHeaders = headers ? new Headers(headers) : new Headers();
    newHeaders.set('Location', redirectUri);
    // Fall back to standard Response if NextResponse is not available.
    // This is to support Next.js 13.
    return (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NextResponse"] === null || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NextResponse"] === void 0 ? void 0 : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NextResponse"].redirect) ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NextResponse"].redirect(redirectUri, {
        headers
    }) : new Response(null, {
        status: 307,
        headers: newHeaders
    });
}
function errorResponseWithFallback(errorBody) {
    // Fall back to standard Response if NextResponse is not available.
    // This is to support Next.js 13.
    return (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NextResponse"] === null || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NextResponse"] === void 0 ? void 0 : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NextResponse"].json) ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NextResponse"].json(errorBody, {
        status: 500
    }) : new Response(JSON.stringify(errorBody), {
        status: 500,
        headers: {
            'Content-Type': 'application/json'
        }
    });
}
function lazy(fn) {
    let called = false;
    let result;
    return ()=>{
        if (!called) {
            result = fn();
            called = true;
        }
        return result;
    };
} //# sourceMappingURL=utils.js.map
}),
"[project]/node_modules/.pnpm/@workos-inc+authkit-nextjs@2.12.0_next@16.0.10_@babel+core@7.28.5_@opentelemetry+api@1._d69fb94637ccf89267342f537ef484a4/node_modules/@workos-inc/authkit-nextjs/dist/esm/workos.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "VERSION",
    ()=>VERSION,
    "getWorkOS",
    ()=>getWorkOS
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$workos$2d$inc$2b$node$40$7$2e$77$2e$0_next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playw_e7bc53efb3bb5b71261f0a7e8b50f69a$2f$node_modules$2f40$workos$2d$inc$2f$node$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@workos-inc+node@7.77.0_next@16.0.10_@babel+core@7.28.5_@opentelemetry+api@1.9.0_@playw_e7bc53efb3bb5b71261f0a7e8b50f69a/node_modules/@workos-inc/node/lib/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$workos$2d$inc$2b$authkit$2d$nextjs$40$2$2e$12$2e$0_next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$_d69fb94637ccf89267342f537ef484a4$2f$node_modules$2f40$workos$2d$inc$2f$authkit$2d$nextjs$2f$dist$2f$esm$2f$env$2d$variables$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@workos-inc+authkit-nextjs@2.12.0_next@16.0.10_@babel+core@7.28.5_@opentelemetry+api@1._d69fb94637ccf89267342f537ef484a4/node_modules/@workos-inc/authkit-nextjs/dist/esm/env-variables.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$workos$2d$inc$2b$authkit$2d$nextjs$40$2$2e$12$2e$0_next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$_d69fb94637ccf89267342f537ef484a4$2f$node_modules$2f40$workos$2d$inc$2f$authkit$2d$nextjs$2f$dist$2f$esm$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@workos-inc+authkit-nextjs@2.12.0_next@16.0.10_@babel+core@7.28.5_@opentelemetry+api@1._d69fb94637ccf89267342f537ef484a4/node_modules/@workos-inc/authkit-nextjs/dist/esm/utils.js [app-rsc] (ecmascript)");
;
;
;
const VERSION = '2.12.0';
const options = {
    apiHostname: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$workos$2d$inc$2b$authkit$2d$nextjs$40$2$2e$12$2e$0_next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$_d69fb94637ccf89267342f537ef484a4$2f$node_modules$2f40$workos$2d$inc$2f$authkit$2d$nextjs$2f$dist$2f$esm$2f$env$2d$variables$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["WORKOS_API_HOSTNAME"],
    https: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$workos$2d$inc$2b$authkit$2d$nextjs$40$2$2e$12$2e$0_next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$_d69fb94637ccf89267342f537ef484a4$2f$node_modules$2f40$workos$2d$inc$2f$authkit$2d$nextjs$2f$dist$2f$esm$2f$env$2d$variables$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["WORKOS_API_HTTPS"] ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$workos$2d$inc$2b$authkit$2d$nextjs$40$2$2e$12$2e$0_next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$_d69fb94637ccf89267342f537ef484a4$2f$node_modules$2f40$workos$2d$inc$2f$authkit$2d$nextjs$2f$dist$2f$esm$2f$env$2d$variables$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["WORKOS_API_HTTPS"] === 'true' : true,
    port: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$workos$2d$inc$2b$authkit$2d$nextjs$40$2$2e$12$2e$0_next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$_d69fb94637ccf89267342f537ef484a4$2f$node_modules$2f40$workos$2d$inc$2f$authkit$2d$nextjs$2f$dist$2f$esm$2f$env$2d$variables$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["WORKOS_API_PORT"] ? parseInt(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$workos$2d$inc$2b$authkit$2d$nextjs$40$2$2e$12$2e$0_next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$_d69fb94637ccf89267342f537ef484a4$2f$node_modules$2f40$workos$2d$inc$2f$authkit$2d$nextjs$2f$dist$2f$esm$2f$env$2d$variables$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["WORKOS_API_PORT"]) : undefined,
    appInfo: {
        name: 'authkit/nextjs',
        version: VERSION
    }
};
const getWorkOS = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$workos$2d$inc$2b$authkit$2d$nextjs$40$2$2e$12$2e$0_next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$_d69fb94637ccf89267342f537ef484a4$2f$node_modules$2f40$workos$2d$inc$2f$authkit$2d$nextjs$2f$dist$2f$esm$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["lazy"])(()=>new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$workos$2d$inc$2b$node$40$7$2e$77$2e$0_next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playw_e7bc53efb3bb5b71261f0a7e8b50f69a$2f$node_modules$2f40$workos$2d$inc$2f$node$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["WorkOS"](__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$workos$2d$inc$2b$authkit$2d$nextjs$40$2$2e$12$2e$0_next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$_d69fb94637ccf89267342f537ef484a4$2f$node_modules$2f40$workos$2d$inc$2f$authkit$2d$nextjs$2f$dist$2f$esm$2f$env$2d$variables$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["WORKOS_API_KEY"], options)); //# sourceMappingURL=workos.js.map
}),
"[project]/node_modules/.pnpm/@workos-inc+authkit-nextjs@2.12.0_next@16.0.10_@babel+core@7.28.5_@opentelemetry+api@1._d69fb94637ccf89267342f537ef484a4/node_modules/@workos-inc/authkit-nextjs/dist/esm/get-authorization-url.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getAuthorizationUrl",
    ()=>getAuthorizationUrl
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$workos$2d$inc$2b$authkit$2d$nextjs$40$2$2e$12$2e$0_next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$_d69fb94637ccf89267342f537ef484a4$2f$node_modules$2f40$workos$2d$inc$2f$authkit$2d$nextjs$2f$dist$2f$esm$2f$workos$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@workos-inc+authkit-nextjs@2.12.0_next@16.0.10_@babel+core@7.28.5_@opentelemetry+api@1._d69fb94637ccf89267342f537ef484a4/node_modules/@workos-inc/authkit-nextjs/dist/esm/workos.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$workos$2d$inc$2b$authkit$2d$nextjs$40$2$2e$12$2e$0_next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$_d69fb94637ccf89267342f537ef484a4$2f$node_modules$2f40$workos$2d$inc$2f$authkit$2d$nextjs$2f$dist$2f$esm$2f$env$2d$variables$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@workos-inc+authkit-nextjs@2.12.0_next@16.0.10_@babel+core@7.28.5_@opentelemetry+api@1._d69fb94637ccf89267342f537ef484a4/node_modules/@workos-inc/authkit-nextjs/dist/esm/env-variables.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.28.5_@opentelemetry+api@1.9.0_@playwright+test@1.57.0_react-_bc0e796ca3d7ea4640f9d74c95225eb3/node_modules/next/headers.js [app-rsc] (ecmascript)");
;
;
;
async function getAuthorizationUrl(options = {}) {
    const headersList = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["headers"])();
    const { returnPathname, screenHint, organizationId, redirectUri = headersList.get('x-redirect-uri'), loginHint, prompt, state: customState } = options;
    const internalState = returnPathname ? btoa(JSON.stringify({
        returnPathname
    })).replace(/\+/g, '-').replace(/\//g, '_') : null;
    const finalState = internalState && customState ? `${internalState}.${customState}` : internalState || customState || undefined;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$workos$2d$inc$2b$authkit$2d$nextjs$40$2$2e$12$2e$0_next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$_d69fb94637ccf89267342f537ef484a4$2f$node_modules$2f40$workos$2d$inc$2f$authkit$2d$nextjs$2f$dist$2f$esm$2f$workos$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getWorkOS"])().userManagement.getAuthorizationUrl({
        provider: 'authkit',
        clientId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$workos$2d$inc$2b$authkit$2d$nextjs$40$2$2e$12$2e$0_next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$_d69fb94637ccf89267342f537ef484a4$2f$node_modules$2f40$workos$2d$inc$2f$authkit$2d$nextjs$2f$dist$2f$esm$2f$env$2d$variables$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["WORKOS_CLIENT_ID"],
        redirectUri: redirectUri !== null && redirectUri !== void 0 ? redirectUri : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$workos$2d$inc$2b$authkit$2d$nextjs$40$2$2e$12$2e$0_next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$_d69fb94637ccf89267342f537ef484a4$2f$node_modules$2f40$workos$2d$inc$2f$authkit$2d$nextjs$2f$dist$2f$esm$2f$env$2d$variables$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["WORKOS_REDIRECT_URI"],
        state: finalState,
        screenHint,
        organizationId,
        loginHint,
        prompt
    });
}
;
 //# sourceMappingURL=get-authorization-url.js.map
}),
"[project]/node_modules/.pnpm/@workos-inc+authkit-nextjs@2.12.0_next@16.0.10_@babel+core@7.28.5_@opentelemetry+api@1._d69fb94637ccf89267342f537ef484a4/node_modules/@workos-inc/authkit-nextjs/dist/esm/session.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"4013260466097ea158ba09ffff73d22dbf63ef36ae":"getTokenClaims","40a5920ce52f26aee3dc0a9af536017c9c44caf4d8":"getSessionFromCookie","609b93760ca6ea3a89f8a08d9717377385b379ce03":"saveSession","7f133b7c7f926b1b03f14810023f0548bdc7bdfdcc":"refreshSession","7f4f0444316524c5604d6d822c9f3e5063d06cfa40":"withAuth","7f5aa256f4d24c5c145c6b7d9c4715c00457260349":"updateSessionMiddleware","7f7da72f9a24b56e5f727d0b802bdaed9d8f235027":"encryptSession","7fdd9e6008b95cb66215aff3e5325131684b975c91":"updateSession"},"",""] */ __turbopack_context__.s([
    "encryptSession",
    ()=>encryptSession,
    "getSessionFromCookie",
    ()=>getSessionFromCookie,
    "getTokenClaims",
    ()=>getTokenClaims,
    "refreshSession",
    ()=>refreshSession,
    "saveSession",
    ()=>saveSession,
    "updateSession",
    ()=>updateSession,
    "updateSessionMiddleware",
    ()=>updateSessionMiddleware,
    "withAuth",
    ()=>withAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.28.5_@opentelemetry+api@1.9.0_@playwright+test@1.57.0_react-_bc0e796ca3d7ea4640f9d74c95225eb3/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$app$2d$render$2f$encryption$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.28.5_@opentelemetry+api@1.9.0_@playwright+test@1.57.0_react-_bc0e796ca3d7ea4640f9d74c95225eb3/node_modules/next/dist/server/app-render/encryption.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$iron$2d$session$40$8$2e$0$2e$4$2f$node_modules$2f$iron$2d$session$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/iron-session@8.0.4/node_modules/iron-session/dist/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$5$2e$10$2e$0$2f$node_modules$2f$jose$2f$dist$2f$node$2f$esm$2f$jwks$2f$remote$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/jose@5.10.0/node_modules/jose/dist/node/esm/jwks/remote.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$5$2e$10$2e$0$2f$node_modules$2f$jose$2f$dist$2f$node$2f$esm$2f$util$2f$decode_jwt$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/jose@5.10.0/node_modules/jose/dist/node/esm/util/decode_jwt.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$5$2e$10$2e$0$2f$node_modules$2f$jose$2f$dist$2f$node$2f$esm$2f$jwt$2f$verify$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/jose@5.10.0/node_modules/jose/dist/node/esm/jwt/verify.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.28.5_@opentelemetry+api@1.9.0_@playwright+test@1.57.0_react-_bc0e796ca3d7ea4640f9d74c95225eb3/node_modules/next/headers.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$api$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.28.5_@opentelemetry+api@1.9.0_@playwright+test@1.57.0_react-_bc0e796ca3d7ea4640f9d74c95225eb3/node_modules/next/dist/api/navigation.react-server.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.28.5_@opentelemetry+api@1.9.0_@playwright+test@1.57.0_react-_bc0e796ca3d7ea4640f9d74c95225eb3/node_modules/next/dist/client/components/navigation.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.28.5_@opentelemetry+api@1.9.0_@playwright+test@1.57.0_react-_bc0e796ca3d7ea4640f9d74c95225eb3/node_modules/next/server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$workos$2d$inc$2b$authkit$2d$nextjs$40$2$2e$12$2e$0_next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$_d69fb94637ccf89267342f537ef484a4$2f$node_modules$2f40$workos$2d$inc$2f$authkit$2d$nextjs$2f$dist$2f$esm$2f$cookie$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@workos-inc+authkit-nextjs@2.12.0_next@16.0.10_@babel+core@7.28.5_@opentelemetry+api@1._d69fb94637ccf89267342f537ef484a4/node_modules/@workos-inc/authkit-nextjs/dist/esm/cookie.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$workos$2d$inc$2b$authkit$2d$nextjs$40$2$2e$12$2e$0_next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$_d69fb94637ccf89267342f537ef484a4$2f$node_modules$2f40$workos$2d$inc$2f$authkit$2d$nextjs$2f$dist$2f$esm$2f$env$2d$variables$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@workos-inc+authkit-nextjs@2.12.0_next@16.0.10_@babel+core@7.28.5_@opentelemetry+api@1._d69fb94637ccf89267342f537ef484a4/node_modules/@workos-inc/authkit-nextjs/dist/esm/env-variables.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$workos$2d$inc$2b$authkit$2d$nextjs$40$2$2e$12$2e$0_next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$_d69fb94637ccf89267342f537ef484a4$2f$node_modules$2f40$workos$2d$inc$2f$authkit$2d$nextjs$2f$dist$2f$esm$2f$get$2d$authorization$2d$url$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@workos-inc+authkit-nextjs@2.12.0_next@16.0.10_@babel+core@7.28.5_@opentelemetry+api@1._d69fb94637ccf89267342f537ef484a4/node_modules/@workos-inc/authkit-nextjs/dist/esm/get-authorization-url.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$workos$2d$inc$2b$authkit$2d$nextjs$40$2$2e$12$2e$0_next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$_d69fb94637ccf89267342f537ef484a4$2f$node_modules$2f40$workos$2d$inc$2f$authkit$2d$nextjs$2f$dist$2f$esm$2f$workos$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@workos-inc+authkit-nextjs@2.12.0_next@16.0.10_@babel+core@7.28.5_@opentelemetry+api@1._d69fb94637ccf89267342f537ef484a4/node_modules/@workos-inc/authkit-nextjs/dist/esm/workos.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$path$2d$to$2d$regexp$40$6$2e$3$2e$0$2f$node_modules$2f$path$2d$to$2d$regexp$2f$dist$2e$es2015$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/path-to-regexp@6.3.0/node_modules/path-to-regexp/dist.es2015/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$workos$2d$inc$2b$authkit$2d$nextjs$40$2$2e$12$2e$0_next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$_d69fb94637ccf89267342f537ef484a4$2f$node_modules$2f40$workos$2d$inc$2f$authkit$2d$nextjs$2f$dist$2f$esm$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@workos-inc+authkit-nextjs@2.12.0_next@16.0.10_@babel+core@7.28.5_@opentelemetry+api@1._d69fb94637ccf89267342f537ef484a4/node_modules/@workos-inc/authkit-nextjs/dist/esm/utils.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.28.5_@opentelemetry+api@1.9.0_@playwright+test@1.57.0_react-_bc0e796ca3d7ea4640f9d74c95225eb3/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
;
;
const sessionHeaderName = 'x-workos-session';
const middlewareHeaderName = 'x-workos-middleware';
const signUpPathsHeaderName = 'x-sign-up-paths';
const jwtCookieName = 'workos-access-token';
const JWKS = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$workos$2d$inc$2b$authkit$2d$nextjs$40$2$2e$12$2e$0_next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$_d69fb94637ccf89267342f537ef484a4$2f$node_modules$2f40$workos$2d$inc$2f$authkit$2d$nextjs$2f$dist$2f$esm$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["lazy"])(()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$5$2e$10$2e$0$2f$node_modules$2f$jose$2f$dist$2f$node$2f$esm$2f$jwks$2f$remote$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createRemoteJWKSet"])(new URL((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$workos$2d$inc$2b$authkit$2d$nextjs$40$2$2e$12$2e$0_next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$_d69fb94637ccf89267342f537ef484a4$2f$node_modules$2f40$workos$2d$inc$2f$authkit$2d$nextjs$2f$dist$2f$esm$2f$workos$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getWorkOS"])().userManagement.getJwksUrl(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$workos$2d$inc$2b$authkit$2d$nextjs$40$2$2e$12$2e$0_next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$_d69fb94637ccf89267342f537ef484a4$2f$node_modules$2f40$workos$2d$inc$2f$authkit$2d$nextjs$2f$dist$2f$esm$2f$env$2d$variables$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["WORKOS_CLIENT_ID"]))));
/**
 * Applies cache security headers with Vary header deduplication.
 * Only applies headers if the request is authenticated (has session, cookie, or Authorization header).
 * Used in middleware where existing Vary headers may already be present.
 * @param headers - The Headers object to set the cache security headers on.
 * @param request - The NextRequest object to check for authentication.
 * @param sessionData - Optional session data to check for authentication.
 */ function applyCacheSecurityHeaders(headers, request, sessionData) {
    const cookieName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$workos$2d$inc$2b$authkit$2d$nextjs$40$2$2e$12$2e$0_next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$_d69fb94637ccf89267342f537ef484a4$2f$node_modules$2f40$workos$2d$inc$2f$authkit$2d$nextjs$2f$dist$2f$esm$2f$env$2d$variables$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["WORKOS_COOKIE_NAME"] || 'wos-session';
    // Only apply cache headers for authenticated requests
    if (!(sessionData === null || sessionData === void 0 ? void 0 : sessionData.accessToken) && !request.cookies.has(cookieName) && !request.headers.has('authorization')) {
        return;
    }
    const varyValues = new Set([
        'cookie'
    ]);
    if (request.headers.has('authorization')) {
        varyValues.add('authorization');
    }
    const currentVary = headers.get('Vary');
    if (currentVary) {
        currentVary.split(',').forEach((v)=>{
            const trimmed = v.trim().toLowerCase();
            if (trimmed) varyValues.add(trimmed);
        });
    }
    headers.set('Vary', Array.from(varyValues).map((v)=>v.charAt(0).toUpperCase() + v.slice(1)).join(', '));
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$workos$2d$inc$2b$authkit$2d$nextjs$40$2$2e$12$2e$0_next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$_d69fb94637ccf89267342f537ef484a4$2f$node_modules$2f40$workos$2d$inc$2f$authkit$2d$nextjs$2f$dist$2f$esm$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["setCachePreventionHeaders"])(headers);
}
/**
 * Determines if a request is for an initial document load (not API/RSC/prefetch)
 */ function isInitialDocumentRequest(request) {
    const accept = request.headers.get('accept') || '';
    const isDocumentRequest = accept.includes('text/html');
    const isRSCRequest = request.headers.has('RSC') || request.headers.has('Next-Router-State-Tree');
    const isPrefetch = request.headers.get('Purpose') === 'prefetch' || request.headers.get('Sec-Purpose') === 'prefetch' || request.headers.has('Next-Router-Prefetch');
    return isDocumentRequest && !isRSCRequest && !isPrefetch;
}
async function encryptSession(session) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$iron$2d$session$40$8$2e$0$2e$4$2f$node_modules$2f$iron$2d$session$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sealData"])(session, {
        password: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$workos$2d$inc$2b$authkit$2d$nextjs$40$2$2e$12$2e$0_next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$_d69fb94637ccf89267342f537ef484a4$2f$node_modules$2f40$workos$2d$inc$2f$authkit$2d$nextjs$2f$dist$2f$esm$2f$env$2d$variables$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["WORKOS_COOKIE_PASSWORD"],
        ttl: 0
    });
}
async function updateSessionMiddleware(request, debug, middlewareAuth, redirectUri, signUpPaths, eagerAuth = false) {
    if (!redirectUri && !__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$workos$2d$inc$2b$authkit$2d$nextjs$40$2$2e$12$2e$0_next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$_d69fb94637ccf89267342f537ef484a4$2f$node_modules$2f40$workos$2d$inc$2f$authkit$2d$nextjs$2f$dist$2f$esm$2f$env$2d$variables$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["WORKOS_REDIRECT_URI"]) {
        throw new Error('You must provide a redirect URI in the AuthKit middleware or in the environment variables.');
    }
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$workos$2d$inc$2b$authkit$2d$nextjs$40$2$2e$12$2e$0_next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$_d69fb94637ccf89267342f537ef484a4$2f$node_modules$2f40$workos$2d$inc$2f$authkit$2d$nextjs$2f$dist$2f$esm$2f$env$2d$variables$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["WORKOS_COOKIE_PASSWORD"] || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$workos$2d$inc$2b$authkit$2d$nextjs$40$2$2e$12$2e$0_next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$_d69fb94637ccf89267342f537ef484a4$2f$node_modules$2f40$workos$2d$inc$2f$authkit$2d$nextjs$2f$dist$2f$esm$2f$env$2d$variables$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["WORKOS_COOKIE_PASSWORD"].length < 32) {
        throw new Error('You must provide a valid cookie password that is at least 32 characters in the environment variables.');
    }
    let url;
    if (redirectUri) {
        url = new URL(redirectUri);
    } else {
        url = new URL(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$workos$2d$inc$2b$authkit$2d$nextjs$40$2$2e$12$2e$0_next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$_d69fb94637ccf89267342f537ef484a4$2f$node_modules$2f40$workos$2d$inc$2f$authkit$2d$nextjs$2f$dist$2f$esm$2f$env$2d$variables$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["WORKOS_REDIRECT_URI"]);
    }
    if (middlewareAuth.enabled && url.pathname === request.nextUrl.pathname && !middlewareAuth.unauthenticatedPaths.includes(url.pathname)) {
        // In the case where:
        // - We're using middleware auth mode
        // - The redirect URI is in the middleware matcher
        // - The redirect URI isn't in the unauthenticatedPaths array
        //
        // then we would get stuck in a login loop due to the redirect happening before the session is set.
        // It's likely that the user accidentally forgot to add the path to unauthenticatedPaths, so we add it here.
        middlewareAuth.unauthenticatedPaths.push(url.pathname);
    }
    const matchedPaths = middlewareAuth.unauthenticatedPaths.filter((pathGlob)=>{
        const pathRegex = getMiddlewareAuthPathRegex(pathGlob);
        return pathRegex.exec(request.nextUrl.pathname);
    });
    const { session, headers, authorizationUrl } = await updateSession(request, {
        debug,
        redirectUri,
        screenHint: getScreenHint(signUpPaths, request.nextUrl.pathname),
        eagerAuth
    });
    // If the user is logged out and this path isn't on the allowlist for logged out paths, redirect to AuthKit.
    if (middlewareAuth.enabled && matchedPaths.length === 0 && !session.user) {
        if (debug) {
            console.log(`Unauthenticated user on protected route ${request.url}, redirecting to AuthKit`);
        }
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$workos$2d$inc$2b$authkit$2d$nextjs$40$2$2e$12$2e$0_next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$_d69fb94637ccf89267342f537ef484a4$2f$node_modules$2f40$workos$2d$inc$2f$authkit$2d$nextjs$2f$dist$2f$esm$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirectWithFallback"])(authorizationUrl, headers);
    }
    // Record the sign up paths so we can use them later
    if (signUpPaths.length > 0) {
        headers.set(signUpPathsHeaderName, signUpPaths.join(','));
    }
    applyCacheSecurityHeaders(headers, request, session);
    // Create a new request with modified headers (for page handlers)
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set(middlewareHeaderName, headers.get(middlewareHeaderName));
    requestHeaders.set('x-url', headers.get('x-url'));
    if (headers.has('x-redirect-uri')) {
        requestHeaders.set('x-redirect-uri', headers.get('x-redirect-uri'));
    }
    if (headers.has(signUpPathsHeaderName)) {
        requestHeaders.set(signUpPathsHeaderName, headers.get(signUpPathsHeaderName));
    }
    // Pass session to page handlers via request header
    // This ensures handlers see refreshed sessions immediately (before Set-Cookie reaches browser)
    const sessionHeader = headers.get(sessionHeaderName);
    if (sessionHeader) {
        requestHeaders.set(sessionHeaderName, sessionHeader);
    }
    // Remove session header from response headers to prevent leakage
    headers.delete(sessionHeaderName);
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NextResponse"].next({
        request: {
            headers: requestHeaders
        },
        headers
    });
}
async function updateSession(request, options = {
    debug: false
}) {
    var _a, _b;
    const session = await getSessionFromCookie(request);
    // Since we're setting the headers in the response, we need to create a new Headers object without copying
    // the request headers.
    // See https://github.com/vercel/next.js/issues/50659#issuecomment-2333990159
    const newRequestHeaders = new Headers();
    // Record that the request was routed through the middleware so we can check later for DX purposes
    newRequestHeaders.set(middlewareHeaderName, 'true');
    // We store the current request url in a custom header, so we can always have access to it
    // This is because on hard navigations we don't have access to `next-url` but need to get the current
    // `pathname` to be able to return the users where they came from before sign-in
    newRequestHeaders.set('x-url', request.url);
    if (options.redirectUri) {
        // Store the redirect URI in a custom header, so we always have access to it and so that subsequent
        // calls to `getAuthorizationUrl` will use the same redirect URI
        newRequestHeaders.set('x-redirect-uri', options.redirectUri);
    }
    newRequestHeaders.delete(sessionHeaderName);
    if (!session) {
        if (options.debug) {
            console.log('No session found from cookie');
        }
        return {
            session: {
                user: null
            },
            headers: newRequestHeaders,
            authorizationUrl: await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$workos$2d$inc$2b$authkit$2d$nextjs$40$2$2e$12$2e$0_next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$_d69fb94637ccf89267342f537ef484a4$2f$node_modules$2f40$workos$2d$inc$2f$authkit$2d$nextjs$2f$dist$2f$esm$2f$get$2d$authorization$2d$url$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getAuthorizationUrl"])({
                returnPathname: getReturnPathname(request.url),
                redirectUri: options.redirectUri || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$workos$2d$inc$2b$authkit$2d$nextjs$40$2$2e$12$2e$0_next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$_d69fb94637ccf89267342f537ef484a4$2f$node_modules$2f40$workos$2d$inc$2f$authkit$2d$nextjs$2f$dist$2f$esm$2f$env$2d$variables$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["WORKOS_REDIRECT_URI"],
                screenHint: options.screenHint
            })
        };
    }
    const hasValidSession = await verifyAccessToken(session.accessToken);
    const cookieName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$workos$2d$inc$2b$authkit$2d$nextjs$40$2$2e$12$2e$0_next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$_d69fb94637ccf89267342f537ef484a4$2f$node_modules$2f40$workos$2d$inc$2f$authkit$2d$nextjs$2f$dist$2f$esm$2f$env$2d$variables$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["WORKOS_COOKIE_NAME"] || 'wos-session';
    applyCacheSecurityHeaders(newRequestHeaders, request, session);
    if (hasValidSession) {
        newRequestHeaders.set(sessionHeaderName, request.cookies.get(cookieName).value);
        const { sid: sessionId, org_id: organizationId, role, roles, permissions, entitlements, feature_flags: featureFlags } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$5$2e$10$2e$0$2f$node_modules$2f$jose$2f$dist$2f$node$2f$esm$2f$util$2f$decode_jwt$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["decodeJwt"])(session.accessToken);
        // Set JWT cookie if eagerAuth is enabled
        // Only set on document requests (initial page loads), not on API/RSC requests
        if (options.eagerAuth && isInitialDocumentRequest(request)) {
            const existingJwtCookie = request.cookies.get(jwtCookieName);
            // Only set if cookie doesn't exist or has different value
            if (!existingJwtCookie || existingJwtCookie.value !== session.accessToken) {
                newRequestHeaders.append('Set-Cookie', (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$workos$2d$inc$2b$authkit$2d$nextjs$40$2$2e$12$2e$0_next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$_d69fb94637ccf89267342f537ef484a4$2f$node_modules$2f40$workos$2d$inc$2f$authkit$2d$nextjs$2f$dist$2f$esm$2f$cookie$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getJwtCookie"])(session.accessToken, request.url));
            }
        }
        return {
            session: {
                sessionId,
                user: session.user,
                organizationId,
                role,
                roles,
                permissions,
                entitlements,
                featureFlags,
                impersonator: session.impersonator,
                accessToken: session.accessToken
            },
            headers: newRequestHeaders
        };
    }
    try {
        if (options.debug) {
            // istanbul ignore next
            console.log(`Session invalid. ${session.accessToken ? `Refreshing access token that ends in ${session.accessToken.slice(-10)}` : 'Access token missing.'}`);
        }
        const { org_id: organizationIdFromAccessToken } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$5$2e$10$2e$0$2f$node_modules$2f$jose$2f$dist$2f$node$2f$esm$2f$util$2f$decode_jwt$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["decodeJwt"])(session.accessToken);
        const { accessToken, refreshToken, user, impersonator } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$workos$2d$inc$2b$authkit$2d$nextjs$40$2$2e$12$2e$0_next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$_d69fb94637ccf89267342f537ef484a4$2f$node_modules$2f40$workos$2d$inc$2f$authkit$2d$nextjs$2f$dist$2f$esm$2f$workos$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getWorkOS"])().userManagement.authenticateWithRefreshToken({
            clientId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$workos$2d$inc$2b$authkit$2d$nextjs$40$2$2e$12$2e$0_next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$_d69fb94637ccf89267342f537ef484a4$2f$node_modules$2f40$workos$2d$inc$2f$authkit$2d$nextjs$2f$dist$2f$esm$2f$env$2d$variables$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["WORKOS_CLIENT_ID"],
            refreshToken: session.refreshToken,
            organizationId: organizationIdFromAccessToken
        });
        if (options.debug) {
            console.log('Session successfully refreshed');
        }
        // Encrypt session with new access and refresh tokens
        const encryptedSession = await encryptSession({
            accessToken,
            refreshToken,
            user,
            impersonator
        });
        newRequestHeaders.append('Set-Cookie', `${cookieName}=${encryptedSession}; ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$workos$2d$inc$2b$authkit$2d$nextjs$40$2$2e$12$2e$0_next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$_d69fb94637ccf89267342f537ef484a4$2f$node_modules$2f40$workos$2d$inc$2f$authkit$2d$nextjs$2f$dist$2f$esm$2f$cookie$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCookieOptions"])(request.url, true)}`);
        newRequestHeaders.set(sessionHeaderName, encryptedSession);
        // Set JWT cookie if eagerAuth is enabled
        // Only set on document requests (initial page loads), not on API/RSC requests
        if (options.eagerAuth && isInitialDocumentRequest(request)) {
            newRequestHeaders.append('Set-Cookie', (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$workos$2d$inc$2b$authkit$2d$nextjs$40$2$2e$12$2e$0_next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$_d69fb94637ccf89267342f537ef484a4$2f$node_modules$2f40$workos$2d$inc$2f$authkit$2d$nextjs$2f$dist$2f$esm$2f$cookie$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getJwtCookie"])(accessToken, request.url));
        }
        const { sid: sessionId, org_id: organizationId, role, roles, permissions, entitlements, feature_flags: featureFlags } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$5$2e$10$2e$0$2f$node_modules$2f$jose$2f$dist$2f$node$2f$esm$2f$util$2f$decode_jwt$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["decodeJwt"])(accessToken);
        (_a = options.onSessionRefreshSuccess) === null || _a === void 0 ? void 0 : _a.call(options, {
            accessToken,
            user,
            impersonator,
            organizationId
        });
        return {
            session: {
                sessionId,
                user,
                organizationId,
                role,
                roles,
                permissions,
                entitlements,
                featureFlags,
                impersonator,
                accessToken
            },
            headers: newRequestHeaders
        };
    } catch (e) {
        if (options.debug) {
            console.log('Failed to refresh. Deleting cookie.', e);
        }
        // When we need to delete a cookie, return it as a header as you can't delete cookies from edge middleware
        const deleteCookie = `${cookieName}=; Expires=${new Date(0).toUTCString()}; ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$workos$2d$inc$2b$authkit$2d$nextjs$40$2$2e$12$2e$0_next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$_d69fb94637ccf89267342f537ef484a4$2f$node_modules$2f40$workos$2d$inc$2f$authkit$2d$nextjs$2f$dist$2f$esm$2f$cookie$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCookieOptions"])(request.url, true, true)}`;
        newRequestHeaders.append('Set-Cookie', deleteCookie);
        // Delete JWT cookie if eagerAuth is enabled
        if (options.eagerAuth) {
            const deleteJwtCookie = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$workos$2d$inc$2b$authkit$2d$nextjs$40$2$2e$12$2e$0_next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$_d69fb94637ccf89267342f537ef484a4$2f$node_modules$2f40$workos$2d$inc$2f$authkit$2d$nextjs$2f$dist$2f$esm$2f$cookie$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getJwtCookie"])(null, request.url, true);
            newRequestHeaders.append('Set-Cookie', deleteJwtCookie);
        }
        (_b = options.onSessionRefreshError) === null || _b === void 0 ? void 0 : _b.call(options, {
            error: e,
            request
        });
        return {
            session: {
                user: null
            },
            headers: newRequestHeaders,
            authorizationUrl: await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$workos$2d$inc$2b$authkit$2d$nextjs$40$2$2e$12$2e$0_next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$_d69fb94637ccf89267342f537ef484a4$2f$node_modules$2f40$workos$2d$inc$2f$authkit$2d$nextjs$2f$dist$2f$esm$2f$get$2d$authorization$2d$url$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getAuthorizationUrl"])({
                returnPathname: getReturnPathname(request.url),
                redirectUri: options.redirectUri || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$workos$2d$inc$2b$authkit$2d$nextjs$40$2$2e$12$2e$0_next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$_d69fb94637ccf89267342f537ef484a4$2f$node_modules$2f40$workos$2d$inc$2f$authkit$2d$nextjs$2f$dist$2f$esm$2f$env$2d$variables$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["WORKOS_REDIRECT_URI"]
            })
        };
    }
}
async function refreshSession({ organizationId: nextOrganizationId, ensureSignedIn = false } = {}) {
    const session = await getSessionFromCookie();
    if (!session) {
        if (ensureSignedIn) {
            await redirectToSignIn();
        }
        return {
            user: null
        };
    }
    const { org_id: organizationIdFromAccessToken } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$5$2e$10$2e$0$2f$node_modules$2f$jose$2f$dist$2f$node$2f$esm$2f$util$2f$decode_jwt$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["decodeJwt"])(session.accessToken);
    let refreshResult;
    try {
        refreshResult = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$workos$2d$inc$2b$authkit$2d$nextjs$40$2$2e$12$2e$0_next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$_d69fb94637ccf89267342f537ef484a4$2f$node_modules$2f40$workos$2d$inc$2f$authkit$2d$nextjs$2f$dist$2f$esm$2f$workos$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getWorkOS"])().userManagement.authenticateWithRefreshToken({
            clientId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$workos$2d$inc$2b$authkit$2d$nextjs$40$2$2e$12$2e$0_next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$_d69fb94637ccf89267342f537ef484a4$2f$node_modules$2f40$workos$2d$inc$2f$authkit$2d$nextjs$2f$dist$2f$esm$2f$env$2d$variables$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["WORKOS_CLIENT_ID"],
            refreshToken: session.refreshToken,
            organizationId: nextOrganizationId !== null && nextOrganizationId !== void 0 ? nextOrganizationId : organizationIdFromAccessToken
        });
    } catch (error) {
        throw new Error(`Failed to refresh session: ${error instanceof Error ? error.message : String(error)}`, {
            cause: error
        });
    }
    const headersList = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["headers"])();
    const url = headersList.get('x-url');
    await saveSession(refreshResult, url || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$workos$2d$inc$2b$authkit$2d$nextjs$40$2$2e$12$2e$0_next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$_d69fb94637ccf89267342f537ef484a4$2f$node_modules$2f40$workos$2d$inc$2f$authkit$2d$nextjs$2f$dist$2f$esm$2f$env$2d$variables$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["WORKOS_REDIRECT_URI"]);
    const { accessToken, user, impersonator } = refreshResult;
    const { sid: sessionId, org_id: organizationId, role, roles, permissions, entitlements, feature_flags: featureFlags } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$5$2e$10$2e$0$2f$node_modules$2f$jose$2f$dist$2f$node$2f$esm$2f$util$2f$decode_jwt$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["decodeJwt"])(accessToken);
    return {
        sessionId,
        user,
        organizationId,
        role,
        roles,
        permissions,
        entitlements,
        featureFlags,
        impersonator,
        accessToken
    };
}
function getMiddlewareAuthPathRegex(pathGlob) {
    try {
        const url = new URL(pathGlob, 'https://example.com');
        const path = `${url.pathname}${url.hash || ''}`;
        const tokens = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$path$2d$to$2d$regexp$40$6$2e$3$2e$0$2f$node_modules$2f$path$2d$to$2d$regexp$2f$dist$2e$es2015$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["parse"])(path);
        const regex = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$path$2d$to$2d$regexp$40$6$2e$3$2e$0$2f$node_modules$2f$path$2d$to$2d$regexp$2f$dist$2e$es2015$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["tokensToRegexp"])(tokens).source;
        return new RegExp(regex);
    } catch (err) {
        console.log('err', err);
        const message = err instanceof Error ? err.message : String(err);
        throw new Error(`Error parsing routes for middleware auth. Reason: ${message}`);
    }
}
async function redirectToSignIn() {
    var _a;
    const headersList = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["headers"])();
    const url = headersList.get('x-url');
    if (!url) {
        throw new Error('No URL found in the headers');
    }
    // Determine if the current route is in the sign up paths
    const signUpPaths = (_a = headersList.get(signUpPathsHeaderName)) === null || _a === void 0 ? void 0 : _a.split(',');
    const pathname = new URL(url).pathname;
    const screenHint = getScreenHint(signUpPaths, pathname);
    const returnPathname = getReturnPathname(url);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])(await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$workos$2d$inc$2b$authkit$2d$nextjs$40$2$2e$12$2e$0_next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$_d69fb94637ccf89267342f537ef484a4$2f$node_modules$2f40$workos$2d$inc$2f$authkit$2d$nextjs$2f$dist$2f$esm$2f$get$2d$authorization$2d$url$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getAuthorizationUrl"])({
        returnPathname,
        screenHint
    }));
}
async function getTokenClaims(accessToken) {
    const token = accessToken !== null && accessToken !== void 0 ? accessToken : (await withAuth()).accessToken;
    if (!token) {
        return {};
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$5$2e$10$2e$0$2f$node_modules$2f$jose$2f$dist$2f$node$2f$esm$2f$util$2f$decode_jwt$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["decodeJwt"])(token);
}
async function withAuth(options) {
    const session = await getSessionFromHeader();
    if (!session) {
        if (options === null || options === void 0 ? void 0 : options.ensureSignedIn) {
            await redirectToSignIn();
        }
        return {
            user: null
        };
    }
    const { sid: sessionId, org_id: organizationId, role, roles, permissions, entitlements, feature_flags: featureFlags } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$5$2e$10$2e$0$2f$node_modules$2f$jose$2f$dist$2f$node$2f$esm$2f$util$2f$decode_jwt$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["decodeJwt"])(session.accessToken);
    return {
        sessionId,
        user: session.user,
        organizationId,
        role,
        roles,
        permissions,
        entitlements,
        featureFlags,
        impersonator: session.impersonator,
        accessToken: session.accessToken
    };
}
async function verifyAccessToken(accessToken) {
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$5$2e$10$2e$0$2f$node_modules$2f$jose$2f$dist$2f$node$2f$esm$2f$jwt$2f$verify$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jwtVerify"])(accessToken, JWKS());
        return true;
    } catch (_a) {
        return false;
    }
}
async function getSessionFromCookie(request) {
    const cookieName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$workos$2d$inc$2b$authkit$2d$nextjs$40$2$2e$12$2e$0_next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$_d69fb94637ccf89267342f537ef484a4$2f$node_modules$2f40$workos$2d$inc$2f$authkit$2d$nextjs$2f$dist$2f$esm$2f$env$2d$variables$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["WORKOS_COOKIE_NAME"] || 'wos-session';
    let cookie;
    if (request) {
        cookie = request.cookies.get(cookieName);
    } else {
        const nextCookies = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])();
        cookie = nextCookies.get(cookieName);
    }
    if (cookie) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$iron$2d$session$40$8$2e$0$2e$4$2f$node_modules$2f$iron$2d$session$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["unsealData"])(cookie.value, {
            password: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$workos$2d$inc$2b$authkit$2d$nextjs$40$2$2e$12$2e$0_next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$_d69fb94637ccf89267342f537ef484a4$2f$node_modules$2f40$workos$2d$inc$2f$authkit$2d$nextjs$2f$dist$2f$esm$2f$env$2d$variables$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["WORKOS_COOKIE_PASSWORD"]
        });
    }
}
async function getSessionFromHeader() {
    const headersList = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["headers"])();
    const hasMiddleware = Boolean(headersList.get(middlewareHeaderName));
    if (!hasMiddleware) {
        const url = headersList.get('x-url');
        throw new Error(`You are calling 'withAuth' on ${url !== null && url !== void 0 ? url : 'a route'} that isn't covered by the AuthKit middleware. Make sure it is running on all paths you are calling 'withAuth' from by updating your middleware config in 'middleware.(js|ts)'.`);
    }
    const authHeader = headersList.get(sessionHeaderName);
    if (!authHeader) return;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$iron$2d$session$40$8$2e$0$2e$4$2f$node_modules$2f$iron$2d$session$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["unsealData"])(authHeader, {
        password: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$workos$2d$inc$2b$authkit$2d$nextjs$40$2$2e$12$2e$0_next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$_d69fb94637ccf89267342f537ef484a4$2f$node_modules$2f40$workos$2d$inc$2f$authkit$2d$nextjs$2f$dist$2f$esm$2f$env$2d$variables$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["WORKOS_COOKIE_PASSWORD"]
    });
}
function getReturnPathname(url) {
    const newUrl = new URL(url);
    return `${newUrl.pathname}${newUrl.searchParams.size > 0 ? '?' + newUrl.searchParams.toString() : ''}`;
}
function getScreenHint(signUpPaths, pathname) {
    if (!signUpPaths) return 'sign-in';
    const screenHintPaths = signUpPaths.filter((pathGlob)=>{
        const pathRegex = getMiddlewareAuthPathRegex(pathGlob);
        return pathRegex.exec(pathname);
    });
    return screenHintPaths.length > 0 ? 'sign-up' : 'sign-in';
}
async function saveSession(sessionOrResponse, request) {
    const cookieName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$workos$2d$inc$2b$authkit$2d$nextjs$40$2$2e$12$2e$0_next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$_d69fb94637ccf89267342f537ef484a4$2f$node_modules$2f40$workos$2d$inc$2f$authkit$2d$nextjs$2f$dist$2f$esm$2f$env$2d$variables$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["WORKOS_COOKIE_NAME"] || 'wos-session';
    const encryptedSession = await encryptSession(sessionOrResponse);
    const nextCookies = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])();
    const url = typeof request === 'string' ? request : request.url;
    nextCookies.set(cookieName, encryptedSession, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$workos$2d$inc$2b$authkit$2d$nextjs$40$2$2e$12$2e$0_next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$_d69fb94637ccf89267342f537ef484a4$2f$node_modules$2f40$workos$2d$inc$2f$authkit$2d$nextjs$2f$dist$2f$esm$2f$cookie$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCookieOptions"])(url));
}
;
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    getTokenClaims,
    getSessionFromCookie,
    saveSession,
    encryptSession,
    refreshSession,
    updateSession,
    updateSessionMiddleware,
    withAuth
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getTokenClaims, "4013260466097ea158ba09ffff73d22dbf63ef36ae", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getSessionFromCookie, "40a5920ce52f26aee3dc0a9af536017c9c44caf4d8", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(saveSession, "609b93760ca6ea3a89f8a08d9717377385b379ce03", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(encryptSession, "7f7da72f9a24b56e5f727d0b802bdaed9d8f235027", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(refreshSession, "7f133b7c7f926b1b03f14810023f0548bdc7bdfdcc", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateSession, "7fdd9e6008b95cb66215aff3e5325131684b975c91", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateSessionMiddleware, "7f5aa256f4d24c5c145c6b7d9c4715c00457260349", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(withAuth, "7f4f0444316524c5604d6d822c9f3e5063d06cfa40", null);
 //# sourceMappingURL=session.js.map
}),
"[project]/node_modules/.pnpm/@workos-inc+authkit-nextjs@2.12.0_next@16.0.10_@babel+core@7.28.5_@opentelemetry+api@1._d69fb94637ccf89267342f537ef484a4/node_modules/@workos-inc/authkit-nextjs/dist/esm/auth.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"40005485044578e201a8c42c4b94b8626e40ef66d8":"signOut","401977c999a7435c7d45c63452a9118b0722013d5f":"getSignUpUrl","40275c48b1df076aa6ecf368371cd474bb5fe57489":"getSignInUrl","601930ded6ea2b2a33eac2f9da1b63aa9b95300909":"switchToOrganization"},"",""] */ __turbopack_context__.s([
    "getSignInUrl",
    ()=>getSignInUrl,
    "getSignUpUrl",
    ()=>getSignUpUrl,
    "signOut",
    ()=>signOut,
    "switchToOrganization",
    ()=>switchToOrganization
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.28.5_@opentelemetry+api@1.9.0_@playwright+test@1.57.0_react-_bc0e796ca3d7ea4640f9d74c95225eb3/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$app$2d$render$2f$encryption$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.28.5_@opentelemetry+api@1.9.0_@playwright+test@1.57.0_react-_bc0e796ca3d7ea4640f9d74c95225eb3/node_modules/next/dist/server/app-render/encryption.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$5$2e$10$2e$0$2f$node_modules$2f$jose$2f$dist$2f$node$2f$esm$2f$util$2f$decode_jwt$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/jose@5.10.0/node_modules/jose/dist/node/esm/util/decode_jwt.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.28.5_@opentelemetry+api@1.9.0_@playwright+test@1.57.0_react-_bc0e796ca3d7ea4640f9d74c95225eb3/node_modules/next/cache.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.28.5_@opentelemetry+api@1.9.0_@playwright+test@1.57.0_react-_bc0e796ca3d7ea4640f9d74c95225eb3/node_modules/next/headers.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$api$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.28.5_@opentelemetry+api@1.9.0_@playwright+test@1.57.0_react-_bc0e796ca3d7ea4640f9d74c95225eb3/node_modules/next/dist/api/navigation.react-server.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.28.5_@opentelemetry+api@1.9.0_@playwright+test@1.57.0_react-_bc0e796ca3d7ea4640f9d74c95225eb3/node_modules/next/dist/client/components/navigation.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$workos$2d$inc$2b$authkit$2d$nextjs$40$2$2e$12$2e$0_next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$_d69fb94637ccf89267342f537ef484a4$2f$node_modules$2f40$workos$2d$inc$2f$authkit$2d$nextjs$2f$dist$2f$esm$2f$env$2d$variables$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@workos-inc+authkit-nextjs@2.12.0_next@16.0.10_@babel+core@7.28.5_@opentelemetry+api@1._d69fb94637ccf89267342f537ef484a4/node_modules/@workos-inc/authkit-nextjs/dist/esm/env-variables.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$workos$2d$inc$2b$authkit$2d$nextjs$40$2$2e$12$2e$0_next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$_d69fb94637ccf89267342f537ef484a4$2f$node_modules$2f40$workos$2d$inc$2f$authkit$2d$nextjs$2f$dist$2f$esm$2f$cookie$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@workos-inc+authkit-nextjs@2.12.0_next@16.0.10_@babel+core@7.28.5_@opentelemetry+api@1._d69fb94637ccf89267342f537ef484a4/node_modules/@workos-inc/authkit-nextjs/dist/esm/cookie.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$workos$2d$inc$2b$authkit$2d$nextjs$40$2$2e$12$2e$0_next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$_d69fb94637ccf89267342f537ef484a4$2f$node_modules$2f40$workos$2d$inc$2f$authkit$2d$nextjs$2f$dist$2f$esm$2f$get$2d$authorization$2d$url$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@workos-inc+authkit-nextjs@2.12.0_next@16.0.10_@babel+core@7.28.5_@opentelemetry+api@1._d69fb94637ccf89267342f537ef484a4/node_modules/@workos-inc/authkit-nextjs/dist/esm/get-authorization-url.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$workos$2d$inc$2b$authkit$2d$nextjs$40$2$2e$12$2e$0_next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$_d69fb94637ccf89267342f537ef484a4$2f$node_modules$2f40$workos$2d$inc$2f$authkit$2d$nextjs$2f$dist$2f$esm$2f$session$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@workos-inc+authkit-nextjs@2.12.0_next@16.0.10_@babel+core@7.28.5_@opentelemetry+api@1._d69fb94637ccf89267342f537ef484a4/node_modules/@workos-inc/authkit-nextjs/dist/esm/session.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$workos$2d$inc$2b$authkit$2d$nextjs$40$2$2e$12$2e$0_next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$_d69fb94637ccf89267342f537ef484a4$2f$node_modules$2f40$workos$2d$inc$2f$authkit$2d$nextjs$2f$dist$2f$esm$2f$workos$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@workos-inc+authkit-nextjs@2.12.0_next@16.0.10_@babel+core@7.28.5_@opentelemetry+api@1._d69fb94637ccf89267342f537ef484a4/node_modules/@workos-inc/authkit-nextjs/dist/esm/workos.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.28.5_@opentelemetry+api@1.9.0_@playwright+test@1.57.0_react-_bc0e796ca3d7ea4640f9d74c95225eb3/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
/**
 * A wrapper around revalidateTag to provide compatibility with previous versions.
 * @param tag The tag to revalidate.
 */ function revalidateTagCompat(tag) {
    const fn = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidateTag"];
    return fn(tag, 'max');
}
async function getSignInUrl({ organizationId, loginHint, redirectUri, prompt, state } = {}) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$workos$2d$inc$2b$authkit$2d$nextjs$40$2$2e$12$2e$0_next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$_d69fb94637ccf89267342f537ef484a4$2f$node_modules$2f40$workos$2d$inc$2f$authkit$2d$nextjs$2f$dist$2f$esm$2f$get$2d$authorization$2d$url$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getAuthorizationUrl"])({
        organizationId,
        screenHint: 'sign-in',
        loginHint,
        redirectUri,
        prompt,
        state
    });
}
async function getSignUpUrl({ organizationId, loginHint, redirectUri, prompt, state } = {}) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$workos$2d$inc$2b$authkit$2d$nextjs$40$2$2e$12$2e$0_next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$_d69fb94637ccf89267342f537ef484a4$2f$node_modules$2f40$workos$2d$inc$2f$authkit$2d$nextjs$2f$dist$2f$esm$2f$get$2d$authorization$2d$url$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getAuthorizationUrl"])({
        organizationId,
        screenHint: 'sign-up',
        loginHint,
        redirectUri,
        prompt,
        state
    });
}
async function signOut({ returnTo } = {}) {
    let sessionId;
    try {
        const { sessionId: sid } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$workos$2d$inc$2b$authkit$2d$nextjs$40$2$2e$12$2e$0_next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$_d69fb94637ccf89267342f537ef484a4$2f$node_modules$2f40$workos$2d$inc$2f$authkit$2d$nextjs$2f$dist$2f$esm$2f$session$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["withAuth"])();
        sessionId = sid;
    } catch (error) {
        // Fall back to reading session directly from cookie when middleware isn't available
        const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$workos$2d$inc$2b$authkit$2d$nextjs$40$2$2e$12$2e$0_next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$_d69fb94637ccf89267342f537ef484a4$2f$node_modules$2f40$workos$2d$inc$2f$authkit$2d$nextjs$2f$dist$2f$esm$2f$session$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getSessionFromCookie"])();
        if (session && session.accessToken) {
            const { sid } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$5$2e$10$2e$0$2f$node_modules$2f$jose$2f$dist$2f$node$2f$esm$2f$util$2f$decode_jwt$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["decodeJwt"])(session.accessToken);
            sessionId = sid;
        } else {
            // can't recover - throw the original error.
            throw error;
        }
    } finally{
        const nextCookies = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])();
        const cookieName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$workos$2d$inc$2b$authkit$2d$nextjs$40$2$2e$12$2e$0_next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$_d69fb94637ccf89267342f537ef484a4$2f$node_modules$2f40$workos$2d$inc$2f$authkit$2d$nextjs$2f$dist$2f$esm$2f$env$2d$variables$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["WORKOS_COOKIE_NAME"] || 'wos-session';
        const { domain, path, sameSite, secure } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$workos$2d$inc$2b$authkit$2d$nextjs$40$2$2e$12$2e$0_next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$_d69fb94637ccf89267342f537ef484a4$2f$node_modules$2f40$workos$2d$inc$2f$authkit$2d$nextjs$2f$dist$2f$esm$2f$cookie$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCookieOptions"])();
        nextCookies.delete({
            name: cookieName,
            domain,
            path,
            sameSite,
            secure
        });
        if (sessionId) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$workos$2d$inc$2b$authkit$2d$nextjs$40$2$2e$12$2e$0_next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$_d69fb94637ccf89267342f537ef484a4$2f$node_modules$2f40$workos$2d$inc$2f$authkit$2d$nextjs$2f$dist$2f$esm$2f$workos$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getWorkOS"])().userManagement.getLogoutUrl({
                sessionId,
                returnTo
            }));
        } else {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])(returnTo !== null && returnTo !== void 0 ? returnTo : '/');
        }
    }
}
async function switchToOrganization(organizationId, options = {}) {
    var _a;
    const { returnTo, revalidationStrategy = 'path', revalidationTags = [] } = options;
    const headersList = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["headers"])();
    let result;
    // istanbul ignore next
    const pathname = returnTo || headersList.get('x-url') || '/';
    try {
        result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$workos$2d$inc$2b$authkit$2d$nextjs$40$2$2e$12$2e$0_next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$_d69fb94637ccf89267342f537ef484a4$2f$node_modules$2f40$workos$2d$inc$2f$authkit$2d$nextjs$2f$dist$2f$esm$2f$session$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["refreshSession"])({
            organizationId,
            ensureSignedIn: true
        });
    } catch (// eslint-disable-next-line @typescript-eslint/no-explicit-any
    error) {
        const { cause } = error;
        /* istanbul ignore next */ if ((_a = cause === null || cause === void 0 ? void 0 : cause.rawData) === null || _a === void 0 ? void 0 : _a.authkit_redirect_url) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])(cause.rawData.authkit_redirect_url);
        } else {
            if ((cause === null || cause === void 0 ? void 0 : cause.error) === 'sso_required' || (cause === null || cause === void 0 ? void 0 : cause.error) === 'mfa_enrollment') {
                const url = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$workos$2d$inc$2b$authkit$2d$nextjs$40$2$2e$12$2e$0_next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$_d69fb94637ccf89267342f537ef484a4$2f$node_modules$2f40$workos$2d$inc$2f$authkit$2d$nextjs$2f$dist$2f$esm$2f$get$2d$authorization$2d$url$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getAuthorizationUrl"])({
                    organizationId
                });
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])(url);
            }
            throw error;
        }
    }
    switch(revalidationStrategy){
        case 'path':
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])(pathname);
            break;
        case 'tag':
            for (const tag of revalidationTags){
                revalidateTagCompat(tag);
            }
            break;
    }
    if (revalidationStrategy !== 'none') {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])(pathname);
    }
    return result;
} //# sourceMappingURL=auth.js.map
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    getSignInUrl,
    getSignUpUrl,
    signOut,
    switchToOrganization
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getSignInUrl, "40275c48b1df076aa6ecf368371cd474bb5fe57489", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getSignUpUrl, "401977c999a7435c7d45c63452a9118b0722013d5f", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(signOut, "40005485044578e201a8c42c4b94b8626e40ef66d8", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(switchToOrganization, "601930ded6ea2b2a33eac2f9da1b63aa9b95300909", null);
}),
"[project]/node_modules/.pnpm/@workos-inc+authkit-nextjs@2.12.0_next@16.0.10_@babel+core@7.28.5_@opentelemetry+api@1._d69fb94637ccf89267342f537ef484a4/node_modules/@workos-inc/authkit-nextjs/dist/esm/actions.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"0043a0fd8cb9f3792b728d9687e9d3b5c48e04e195":"refreshAccessTokenAction","00f3de29d4dcbaec1b152bd5825b9541c27a231768":"getAccessTokenAction","7f1a59b6c090ea656859f8486cb0142b1088c76c87":"refreshAuthAction","7f3bbcd7756dea148c69f1c85ec5c41135007a93fd":"getOrganizationAction","7f5f40b63758360e05be2af9b1992b093d78a417e6":"getAuthAction","7f6035d9afbd468499c5a3102bacbf06d0ea23e388":"checkSessionAction","7fa36e799108281d43922241a38c5b8271a879f704":"handleSignOutAction","7fac63887bbdb11f232fce1646b3a174763ffe26eb":"switchToOrganizationAction"},"",""] */ __turbopack_context__.s([
    "checkSessionAction",
    ()=>checkSessionAction,
    "getAccessTokenAction",
    ()=>getAccessTokenAction,
    "getAuthAction",
    ()=>getAuthAction,
    "getOrganizationAction",
    ()=>getOrganizationAction,
    "handleSignOutAction",
    ()=>handleSignOutAction,
    "refreshAccessTokenAction",
    ()=>refreshAccessTokenAction,
    "refreshAuthAction",
    ()=>refreshAuthAction,
    "switchToOrganizationAction",
    ()=>switchToOrganizationAction
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.28.5_@opentelemetry+api@1.9.0_@playwright+test@1.57.0_react-_bc0e796ca3d7ea4640f9d74c95225eb3/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$app$2d$render$2f$encryption$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.28.5_@opentelemetry+api@1.9.0_@playwright+test@1.57.0_react-_bc0e796ca3d7ea4640f9d74c95225eb3/node_modules/next/dist/server/app-render/encryption.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$workos$2d$inc$2b$authkit$2d$nextjs$40$2$2e$12$2e$0_next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$_d69fb94637ccf89267342f537ef484a4$2f$node_modules$2f40$workos$2d$inc$2f$authkit$2d$nextjs$2f$dist$2f$esm$2f$auth$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@workos-inc+authkit-nextjs@2.12.0_next@16.0.10_@babel+core@7.28.5_@opentelemetry+api@1._d69fb94637ccf89267342f537ef484a4/node_modules/@workos-inc/authkit-nextjs/dist/esm/auth.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$workos$2d$inc$2b$authkit$2d$nextjs$40$2$2e$12$2e$0_next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$_d69fb94637ccf89267342f537ef484a4$2f$node_modules$2f40$workos$2d$inc$2f$authkit$2d$nextjs$2f$dist$2f$esm$2f$session$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@workos-inc+authkit-nextjs@2.12.0_next@16.0.10_@babel+core@7.28.5_@opentelemetry+api@1._d69fb94637ccf89267342f537ef484a4/node_modules/@workos-inc/authkit-nextjs/dist/esm/session.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$workos$2d$inc$2b$authkit$2d$nextjs$40$2$2e$12$2e$0_next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$_d69fb94637ccf89267342f537ef484a4$2f$node_modules$2f40$workos$2d$inc$2f$authkit$2d$nextjs$2f$dist$2f$esm$2f$workos$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@workos-inc+authkit-nextjs@2.12.0_next@16.0.10_@babel+core@7.28.5_@opentelemetry+api@1._d69fb94637ccf89267342f537ef484a4/node_modules/@workos-inc/authkit-nextjs/dist/esm/workos.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.28.5_@opentelemetry+api@1.9.0_@playwright+test@1.57.0_react-_bc0e796ca3d7ea4640f9d74c95225eb3/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
;
/**
 * This function is used to sanitize the auth object.
 * Remove the accessToken from the auth object as it is not needed on the client side.
 * @param value - The auth object to sanitize
 * @returns The sanitized auth object
 */ function sanitize(value) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { accessToken, ...sanitized } = value;
    return sanitized;
}
const checkSessionAction = async ()=>{
    return true;
};
const handleSignOutAction = async ({ returnTo } = {})=>{
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$workos$2d$inc$2b$authkit$2d$nextjs$40$2$2e$12$2e$0_next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$_d69fb94637ccf89267342f537ef484a4$2f$node_modules$2f40$workos$2d$inc$2f$authkit$2d$nextjs$2f$dist$2f$esm$2f$auth$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["signOut"])({
        returnTo
    });
};
const getOrganizationAction = async (organizationId)=>{
    return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$workos$2d$inc$2b$authkit$2d$nextjs$40$2$2e$12$2e$0_next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$_d69fb94637ccf89267342f537ef484a4$2f$node_modules$2f40$workos$2d$inc$2f$authkit$2d$nextjs$2f$dist$2f$esm$2f$workos$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getWorkOS"])().organizations.getOrganization(organizationId);
};
const getAuthAction = async (options)=>{
    return sanitize(await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$workos$2d$inc$2b$authkit$2d$nextjs$40$2$2e$12$2e$0_next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$_d69fb94637ccf89267342f537ef484a4$2f$node_modules$2f40$workos$2d$inc$2f$authkit$2d$nextjs$2f$dist$2f$esm$2f$session$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["withAuth"])(options));
};
const refreshAuthAction = async ({ ensureSignedIn, organizationId })=>{
    return sanitize(await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$workos$2d$inc$2b$authkit$2d$nextjs$40$2$2e$12$2e$0_next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$_d69fb94637ccf89267342f537ef484a4$2f$node_modules$2f40$workos$2d$inc$2f$authkit$2d$nextjs$2f$dist$2f$esm$2f$session$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["refreshSession"])({
        ensureSignedIn,
        organizationId
    }));
};
const switchToOrganizationAction = async (organizationId, options)=>{
    return sanitize(await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$workos$2d$inc$2b$authkit$2d$nextjs$40$2$2e$12$2e$0_next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$_d69fb94637ccf89267342f537ef484a4$2f$node_modules$2f40$workos$2d$inc$2f$authkit$2d$nextjs$2f$dist$2f$esm$2f$auth$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["switchToOrganization"])(organizationId, options));
};
async function getAccessTokenAction() {
    const auth = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$workos$2d$inc$2b$authkit$2d$nextjs$40$2$2e$12$2e$0_next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$_d69fb94637ccf89267342f537ef484a4$2f$node_modules$2f40$workos$2d$inc$2f$authkit$2d$nextjs$2f$dist$2f$esm$2f$session$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["withAuth"])();
    return auth.accessToken;
}
async function refreshAccessTokenAction() {
    const auth = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$workos$2d$inc$2b$authkit$2d$nextjs$40$2$2e$12$2e$0_next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$_d69fb94637ccf89267342f537ef484a4$2f$node_modules$2f40$workos$2d$inc$2f$authkit$2d$nextjs$2f$dist$2f$esm$2f$session$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["refreshSession"])();
    return auth.accessToken;
} //# sourceMappingURL=actions.js.map
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    checkSessionAction,
    handleSignOutAction,
    getOrganizationAction,
    getAuthAction,
    refreshAuthAction,
    switchToOrganizationAction,
    getAccessTokenAction,
    refreshAccessTokenAction
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(checkSessionAction, "7f6035d9afbd468499c5a3102bacbf06d0ea23e388", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(handleSignOutAction, "7fa36e799108281d43922241a38c5b8271a879f704", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getOrganizationAction, "7f3bbcd7756dea148c69f1c85ec5c41135007a93fd", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getAuthAction, "7f5f40b63758360e05be2af9b1992b093d78a417e6", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(refreshAuthAction, "7f1a59b6c090ea656859f8486cb0142b1088c76c87", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(switchToOrganizationAction, "7fac63887bbdb11f232fce1646b3a174763ffe26eb", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getAccessTokenAction, "00f3de29d4dcbaec1b152bd5825b9541c27a231768", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(refreshAccessTokenAction, "0043a0fd8cb9f3792b728d9687e9d3b5c48e04e195", null);
}),
"[project]/.next-internal/server/app/page/actions.js { ACTIONS_MODULE0 => \"[project]/node_modules/.pnpm/@workos-inc+authkit-nextjs@2.12.0_next@16.0.10_@babel+core@7.28.5_@opentelemetry+api@1._d69fb94637ccf89267342f537ef484a4/node_modules/@workos-inc/authkit-nextjs/dist/esm/actions.js [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/lib/actions/billing-portal.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$workos$2d$inc$2b$authkit$2d$nextjs$40$2$2e$12$2e$0_next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$_d69fb94637ccf89267342f537ef484a4$2f$node_modules$2f40$workos$2d$inc$2f$authkit$2d$nextjs$2f$dist$2f$esm$2f$actions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@workos-inc+authkit-nextjs@2.12.0_next@16.0.10_@babel+core@7.28.5_@opentelemetry+api@1._d69fb94637ccf89267342f537ef484a4/node_modules/@workos-inc/authkit-nextjs/dist/esm/actions.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actions$2f$billing$2d$portal$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/actions/billing-portal.ts [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
;
}),
"[project]/.next-internal/server/app/page/actions.js { ACTIONS_MODULE0 => \"[project]/node_modules/.pnpm/@workos-inc+authkit-nextjs@2.12.0_next@16.0.10_@babel+core@7.28.5_@opentelemetry+api@1._d69fb94637ccf89267342f537ef484a4/node_modules/@workos-inc/authkit-nextjs/dist/esm/actions.js [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/lib/actions/billing-portal.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "0043a0fd8cb9f3792b728d9687e9d3b5c48e04e195",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$workos$2d$inc$2b$authkit$2d$nextjs$40$2$2e$12$2e$0_next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$_d69fb94637ccf89267342f537ef484a4$2f$node_modules$2f40$workos$2d$inc$2f$authkit$2d$nextjs$2f$dist$2f$esm$2f$actions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["refreshAccessTokenAction"],
    "00444aeb896bc9d4937e78e642dc1e72c6f9168488",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actions$2f$billing$2d$portal$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"],
    "00f3de29d4dcbaec1b152bd5825b9541c27a231768",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$workos$2d$inc$2b$authkit$2d$nextjs$40$2$2e$12$2e$0_next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$_d69fb94637ccf89267342f537ef484a4$2f$node_modules$2f40$workos$2d$inc$2f$authkit$2d$nextjs$2f$dist$2f$esm$2f$actions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getAccessTokenAction"],
    "7f1a59b6c090ea656859f8486cb0142b1088c76c87",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$workos$2d$inc$2b$authkit$2d$nextjs$40$2$2e$12$2e$0_next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$_d69fb94637ccf89267342f537ef484a4$2f$node_modules$2f40$workos$2d$inc$2f$authkit$2d$nextjs$2f$dist$2f$esm$2f$actions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["refreshAuthAction"],
    "7f5f40b63758360e05be2af9b1992b093d78a417e6",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$workos$2d$inc$2b$authkit$2d$nextjs$40$2$2e$12$2e$0_next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$_d69fb94637ccf89267342f537ef484a4$2f$node_modules$2f40$workos$2d$inc$2f$authkit$2d$nextjs$2f$dist$2f$esm$2f$actions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getAuthAction"],
    "7f6035d9afbd468499c5a3102bacbf06d0ea23e388",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$workos$2d$inc$2b$authkit$2d$nextjs$40$2$2e$12$2e$0_next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$_d69fb94637ccf89267342f537ef484a4$2f$node_modules$2f40$workos$2d$inc$2f$authkit$2d$nextjs$2f$dist$2f$esm$2f$actions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["checkSessionAction"],
    "7fa36e799108281d43922241a38c5b8271a879f704",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$workos$2d$inc$2b$authkit$2d$nextjs$40$2$2e$12$2e$0_next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$_d69fb94637ccf89267342f537ef484a4$2f$node_modules$2f40$workos$2d$inc$2f$authkit$2d$nextjs$2f$dist$2f$esm$2f$actions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["handleSignOutAction"],
    "7fac63887bbdb11f232fce1646b3a174763ffe26eb",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$workos$2d$inc$2b$authkit$2d$nextjs$40$2$2e$12$2e$0_next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$_d69fb94637ccf89267342f537ef484a4$2f$node_modules$2f40$workos$2d$inc$2f$authkit$2d$nextjs$2f$dist$2f$esm$2f$actions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["switchToOrganizationAction"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$node_modules$2f2e$pnpm$2f40$workos$2d$inc$2b$authkit$2d$nextjs$40$2$2e$12$2e$0_next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$_d69fb94637ccf89267342f537ef484a4$2f$node_modules$2f40$workos$2d$inc$2f$authkit$2d$nextjs$2f$dist$2f$esm$2f$actions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$lib$2f$actions$2f$billing$2d$portal$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/page/actions.js { ACTIONS_MODULE0 => "[project]/node_modules/.pnpm/@workos-inc+authkit-nextjs@2.12.0_next@16.0.10_@babel+core@7.28.5_@opentelemetry+api@1._d69fb94637ccf89267342f537ef484a4/node_modules/@workos-inc/authkit-nextjs/dist/esm/actions.js [app-rsc] (ecmascript)", ACTIONS_MODULE1 => "[project]/lib/actions/billing-portal.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$workos$2d$inc$2b$authkit$2d$nextjs$40$2$2e$12$2e$0_next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$_d69fb94637ccf89267342f537ef484a4$2f$node_modules$2f40$workos$2d$inc$2f$authkit$2d$nextjs$2f$dist$2f$esm$2f$actions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@workos-inc+authkit-nextjs@2.12.0_next@16.0.10_@babel+core@7.28.5_@opentelemetry+api@1._d69fb94637ccf89267342f537ef484a4/node_modules/@workos-inc/authkit-nextjs/dist/esm/actions.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actions$2f$billing$2d$portal$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/actions/billing-portal.ts [app-rsc] (ecmascript)");
}),
];

//# sourceMappingURL=_723e5067._.js.map