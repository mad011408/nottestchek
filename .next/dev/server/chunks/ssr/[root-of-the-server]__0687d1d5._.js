module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/lib/errors.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ChatSDKError",
    ()=>ChatSDKError,
    "getMessageByErrorCode",
    ()=>getMessageByErrorCode,
    "visibilityBySurface",
    ()=>visibilityBySurface
]);
const visibilityBySurface = {
    database: "log",
    chat: "response",
    auth: "response",
    stream: "response",
    api: "response",
    history: "response",
    vote: "response",
    document: "response",
    suggestions: "response"
};
class ChatSDKError extends Error {
    type;
    surface;
    statusCode;
    constructor(errorCode, cause){
        super();
        const [type, surface] = errorCode.split(":");
        this.type = type;
        this.cause = cause;
        this.surface = surface;
        this.message = getMessageByErrorCode(errorCode);
        this.statusCode = getStatusCodeByType(this.type);
    }
    toResponse() {
        const code = `${this.type}:${this.surface}`;
        const visibility = visibilityBySurface[this.surface];
        const { message, cause, statusCode } = this;
        if (visibility === "log") {
            console.error({
                code,
                message,
                cause
            });
            return Response.json({
                code: "",
                message: "Something went wrong. Please try again later."
            }, {
                status: statusCode
            });
        }
        return Response.json({
            code,
            message,
            cause
        }, {
            status: statusCode
        });
    }
}
function getMessageByErrorCode(errorCode) {
    if (errorCode.includes("database")) {
        return "An error occurred while executing a database query.";
    }
    switch(errorCode){
        case "bad_request:api":
            return "The request couldn't be processed. Please check your input and try again.";
        case "unauthorized:auth":
            return "You need to sign in before continuing.";
        case "forbidden:auth":
            return "Your account does not have access to this feature.";
        case "rate_limit:chat":
            return "You have exceeded your maximum number of messages for the day. Please try again later.";
        case "not_found:chat":
            return "The requested chat was not found. Please check the chat ID and try again.";
        case "forbidden:chat":
            return "This chat belongs to another user. Please check the chat ID and try again.";
        case "unauthorized:chat":
            return "You need to sign in to view this chat. Please sign in and try again.";
        case "offline:chat":
            return "We're having trouble sending your message. Please check your internet connection and try again.";
        case "not_found:document":
            return "The requested document was not found. Please check the document ID and try again.";
        case "forbidden:document":
            return "This document belongs to another user. Please check the document ID and try again.";
        case "unauthorized:document":
            return "You need to sign in to view this document. Please sign in and try again.";
        case "bad_request:document":
            return "The request to create or update the document was invalid. Please check your input and try again.";
        default:
            return "Something went wrong. Please try again later.";
    }
}
function getStatusCodeByType(type) {
    switch(type){
        case "bad_request":
            return 400;
        case "unauthorized":
            return 401;
        case "forbidden":
            return 403;
        case "not_found":
            return 404;
        case "rate_limit":
            return 429;
        case "offline":
            return 503;
        default:
            return 500;
    }
}
}),
"[project]/lib/utils.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn,
    "convertToUIMessages",
    ()=>convertToUIMessages,
    "fetchWithErrorHandlers",
    ()=>fetchWithErrorHandlers
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$clsx$40$2$2e$1$2e$1$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/clsx@2.1.1/node_modules/clsx/dist/clsx.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$tailwind$2d$merge$40$3$2e$4$2e$0$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/tailwind-merge@3.4.0/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$errors$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/errors.ts [app-ssr] (ecmascript)");
;
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$tailwind$2d$merge$40$3$2e$4$2e$0$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$clsx$40$2$2e$1$2e$1$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
async function fetchWithErrorHandlers(input, init) {
    try {
        const response = await fetch(input, init);
        if (!response.ok) {
            const { code, cause } = await response.json();
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$errors$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ChatSDKError"](code, cause);
        }
        return response;
    } catch (error) {
        if (typeof navigator !== "undefined" && !navigator.onLine) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$errors$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ChatSDKError"]("offline:chat");
        }
        throw error;
    }
}
function convertToUIMessages(messages) {
    return messages.map((message)=>({
            id: message.id,
            role: message.role,
            // Sanitize parts: remove any old URLs that may be stored in database
            // URLs expire, so we always fetch fresh ones via fileId
            parts: message.parts.map((part)=>{
                if (part.type === "file" && part.url) {
                    const { url, ...partWithoutUrl } = part;
                    return partWithoutUrl;
                }
                return part;
            }),
            sourceMessageId: message.source_message_id,
            metadata: message.feedback ? {
                feedbackType: message.feedback.feedbackType
            } : undefined,
            fileDetails: message.fileDetails
        }));
}
}),
"[project]/components/ui/tooltip.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Tooltip",
    ()=>Tooltip,
    "TooltipContent",
    ()=>TooltipContent,
    "TooltipProvider",
    ()=>TooltipProvider,
    "TooltipTrigger",
    ()=>TooltipTrigger
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.28.5_@opentelemetry+api@1.9.0_@playwright+test@1.57.0_react-_bc0e796ca3d7ea4640f9d74c95225eb3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$radix$2d$ui$2b$react$2d$tooltip$40$1$2e$2$2e$8_$40$types$2b$react$2d$dom$40$19$2e$1$2e$7_$40$types$2b$react$40$19$2e$1$2e$9_$5f40$types$2b$react_9e67379daf7d30148220488c6700a5f8$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tooltip$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@radix-ui+react-tooltip@1.2.8_@types+react-dom@19.1.7_@types+react@19.1.9__@types+react_9e67379daf7d30148220488c6700a5f8/node_modules/@radix-ui/react-tooltip/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
function TooltipProvider({ delayDuration = 0, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$radix$2d$ui$2b$react$2d$tooltip$40$1$2e$2$2e$8_$40$types$2b$react$2d$dom$40$19$2e$1$2e$7_$40$types$2b$react$40$19$2e$1$2e$9_$5f40$types$2b$react_9e67379daf7d30148220488c6700a5f8$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tooltip$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Provider"], {
        "data-slot": "tooltip-provider",
        delayDuration: delayDuration,
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/tooltip.tsx",
        lineNumber: 13,
        columnNumber: 5
    }, this);
}
function Tooltip({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(TooltipProvider, {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$radix$2d$ui$2b$react$2d$tooltip$40$1$2e$2$2e$8_$40$types$2b$react$2d$dom$40$19$2e$1$2e$7_$40$types$2b$react$40$19$2e$1$2e$9_$5f40$types$2b$react_9e67379daf7d30148220488c6700a5f8$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tooltip$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Root"], {
            "data-slot": "tooltip",
            ...props
        }, void 0, false, {
            fileName: "[project]/components/ui/tooltip.tsx",
            lineNumber: 26,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/ui/tooltip.tsx",
        lineNumber: 25,
        columnNumber: 5
    }, this);
}
function TooltipTrigger({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$radix$2d$ui$2b$react$2d$tooltip$40$1$2e$2$2e$8_$40$types$2b$react$2d$dom$40$19$2e$1$2e$7_$40$types$2b$react$40$19$2e$1$2e$9_$5f40$types$2b$react_9e67379daf7d30148220488c6700a5f8$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tooltip$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Trigger"], {
        "data-slot": "tooltip-trigger",
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/tooltip.tsx",
        lineNumber: 34,
        columnNumber: 10
    }, this);
}
function TooltipContent({ className, sideOffset = 0, children, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$radix$2d$ui$2b$react$2d$tooltip$40$1$2e$2$2e$8_$40$types$2b$react$2d$dom$40$19$2e$1$2e$7_$40$types$2b$react$40$19$2e$1$2e$9_$5f40$types$2b$react_9e67379daf7d30148220488c6700a5f8$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tooltip$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Portal"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$radix$2d$ui$2b$react$2d$tooltip$40$1$2e$2$2e$8_$40$types$2b$react$2d$dom$40$19$2e$1$2e$7_$40$types$2b$react$40$19$2e$1$2e$9_$5f40$types$2b$react_9e67379daf7d30148220488c6700a5f8$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tooltip$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Content"], {
            "data-slot": "tooltip-content",
            sideOffset: sideOffset,
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("bg-primary text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance", className),
            ...props,
            children: [
                children,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$radix$2d$ui$2b$react$2d$tooltip$40$1$2e$2$2e$8_$40$types$2b$react$2d$dom$40$19$2e$1$2e$7_$40$types$2b$react$40$19$2e$1$2e$9_$5f40$types$2b$react_9e67379daf7d30148220488c6700a5f8$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tooltip$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Arrow"], {
                    className: "bg-primary fill-primary z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]"
                }, void 0, false, {
                    fileName: "[project]/components/ui/tooltip.tsx",
                    lineNumber: 55,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/ui/tooltip.tsx",
            lineNumber: 45,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/ui/tooltip.tsx",
        lineNumber: 44,
        columnNumber: 5
    }, this);
}
;
}),
"[project]/hooks/use-mobile.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useIsMobile",
    ()=>useIsMobile
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.28.5_@opentelemetry+api@1.9.0_@playwright+test@1.57.0_react-_bc0e796ca3d7ea4640f9d74c95225eb3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
const MOBILE_BREAKPOINT = 768;
function useIsMobile() {
    const [isMobile, setIsMobile] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](undefined);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"](()=>{
        const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
        const onChange = ()=>{
            setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
        };
        mql.addEventListener("change", onChange);
        setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
        return ()=>mql.removeEventListener("change", onChange);
    }, []);
    return !!isMobile;
}
}),
"[project]/components/ui/sonner.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Toaster",
    ()=>Toaster
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.28.5_@opentelemetry+api@1.9.0_@playwright+test@1.57.0_react-_bc0e796ca3d7ea4640f9d74c95225eb3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$themes$40$0$2e$4$2e$6_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next-themes@0.4.6_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/next-themes/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$sonner$40$2$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/sonner@2.0.7_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/sonner/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$mobile$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/use-mobile.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
const Toaster = ({ ...props })=>{
    const { theme = "system" } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$themes$40$0$2e$4$2e$6_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTheme"])();
    const isMobile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$mobile$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useIsMobile"])();
    const getPositionProps = ()=>{
        if (isMobile) {
            return {
                position: "top-center",
                offset: {
                    top: 20
                }
            };
        }
        return {
            position: "bottom-right",
            offset: {
                bottom: 140,
                right: 50
            }
        };
    };
    const positionProps = getPositionProps();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$sonner$40$2$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Toaster"], {
        theme: theme,
        className: "toaster group",
        position: positionProps.position,
        offset: positionProps.offset,
        toastOptions: {
            classNames: {
                toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
                description: "group-[.toast]:text-muted-foreground",
                actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
                cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
            }
        },
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/sonner.tsx",
        lineNumber: 29,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
;
}),
"[project]/convex/_generated/api.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* eslint-disable */ /**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */ __turbopack_context__.s([
    "api",
    ()=>api,
    "components",
    ()=>components,
    "internal",
    ()=>internal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$convex$40$1$2e$29$2e$2_react$40$19$2e$2$2e$1$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/convex@1.29.2_react@19.2.1/node_modules/convex/dist/esm/server/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$convex$40$1$2e$29$2e$2_react$40$19$2e$2$2e$1$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/convex@1.29.2_react@19.2.1/node_modules/convex/dist/esm/server/api.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$convex$40$1$2e$29$2e$2_react$40$19$2e$2$2e$1$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$components$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/convex@1.29.2_react@19.2.1/node_modules/convex/dist/esm/server/components/index.js [app-ssr] (ecmascript) <locals>");
;
const api = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$convex$40$1$2e$29$2e$2_react$40$19$2e$2$2e$1$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["anyApi"];
const internal = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$convex$40$1$2e$29$2e$2_react$40$19$2e$2$2e$1$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["anyApi"];
const components = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$convex$40$1$2e$29$2e$2_react$40$19$2e$2$2e$1$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$components$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["componentsGeneric"])();
}),
"[project]/lib/utils/todo-utils.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "areTodosEqual",
    ()=>areTodosEqual,
    "computeReplaceAssistantTodos",
    ()=>computeReplaceAssistantTodos,
    "getBaseTodosForRequest",
    ()=>getBaseTodosForRequest,
    "getTodoStats",
    ()=>getTodoStats,
    "hasPartialTodos",
    ()=>hasPartialTodos,
    "mergeTodos",
    ()=>mergeTodos,
    "removeTodosBySourceMessage",
    ()=>removeTodosBySourceMessage,
    "removeTodosBySourceMessages",
    ()=>removeTodosBySourceMessages,
    "shouldTreatAsMerge",
    ()=>shouldTreatAsMerge
]);
const mergeTodos = (currentTodos, newTodos)=>{
    let hasChanges = false;
    const updatedTodos = [
        ...currentTodos
    ];
    for (const newTodo of newTodos){
        const existingIndex = updatedTodos.findIndex((t)=>t.id === newTodo.id);
        if (existingIndex >= 0) {
            // Check if the todo actually changed
            const existing = updatedTodos[existingIndex];
            const merged = {
                ...existing,
                // Preserve existing fields when incoming values are undefined
                content: newTodo.content !== undefined ? newTodo.content : existing.content,
                status: newTodo.status !== undefined ? newTodo.status : existing.status,
                sourceMessageId: newTodo.sourceMessageId !== undefined ? newTodo.sourceMessageId : existing.sourceMessageId
            };
            if (existing.content !== merged.content || existing.status !== merged.status || existing.sourceMessageId !== merged.sourceMessageId) {
                updatedTodos[existingIndex] = merged;
                hasChanges = true;
            }
        } else {
            // Add new todo
            if (isCompleteTodoLike(newTodo)) {
                updatedTodos.push(newTodo);
                hasChanges = true;
            }
        }
    }
    // Only return new array if there were actual changes
    return hasChanges ? updatedTodos : currentTodos;
};
/**
 * Narrow a `TodoLike` to a full `Todo` by ensuring required fields exist.
 */ const isCompleteTodoLike = (candidate)=>{
    return candidate.content !== undefined && candidate.status !== undefined;
};
const hasPartialTodos = (todos)=>{
    if (!Array.isArray(todos)) return false;
    return todos.some((t)=>t.content === undefined || t.status === undefined);
};
const shouldTreatAsMerge = (mergeFlag, todos)=>{
    return Boolean(mergeFlag) || hasPartialTodos(todos);
};
const computeReplaceAssistantTodos = (currentTodos, incoming, sourceMessageId)=>{
    const manual = currentTodos.filter((t)=>!t.sourceMessageId);
    const stamped = sourceMessageId ? incoming.map((t)=>({
            ...t,
            sourceMessageId
        })) : incoming;
    return [
        ...stamped,
        ...manual
    ];
};
const getBaseTodosForRequest = (existingTodos, incomingTodos, opts)=>{
    const existing = Array.isArray(existingTodos) ? existingTodos : [];
    const incoming = Array.isArray(incomingTodos) ? incomingTodos : [];
    if (opts.isTemporary) return incoming;
    if (opts.regenerate) return existing.filter((t)=>!t.sourceMessageId);
    return existing;
};
const areTodosEqual = (todo1, todo2)=>{
    return todo1.content === todo2.content && todo1.status === todo2.status;
};
const getTodoStats = (todos)=>{
    const completed = todos.filter((t)=>t.status === "completed").length;
    const inProgress = todos.filter((t)=>t.status === "in_progress").length;
    const pending = todos.filter((t)=>t.status === "pending").length;
    const cancelled = todos.filter((t)=>t.status === "cancelled").length;
    const total = todos.length;
    const done = completed + cancelled;
    return {
        completed,
        inProgress,
        pending,
        cancelled,
        total,
        done
    };
};
const removeTodosBySourceMessage = (todos, messageId)=>{
    return todos.filter((t)=>t.sourceMessageId !== messageId);
};
const removeTodosBySourceMessages = (todos, messageIds)=>{
    if (messageIds.length === 0) return todos;
    const idSet = new Set(messageIds);
    return todos.filter((t)=>{
        if (!t.sourceMessageId) return true;
        // If the assistant id is in the set, drop the todo
        if (idSet.has(t.sourceMessageId)) return false;
        return true;
    });
};
}),
"[project]/lib/utils/sidebar-storage.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Sidebar localStorage utilities
 * Handles persistent storage for sidebar state with mobile-aware behavior
 */ // Storage keys for different sidebar contexts
__turbopack_context__.s([
    "STORAGE_KEYS",
    ()=>STORAGE_KEYS,
    "chatSidebarStorage",
    ()=>chatSidebarStorage,
    "clearAllSidebarStates",
    ()=>clearAllSidebarStates,
    "clearSidebarState",
    ()=>clearSidebarState,
    "createSidebarStorage",
    ()=>createSidebarStorage,
    "getSavedSidebarState",
    ()=>getSavedSidebarState,
    "mainSidebarStorage",
    ()=>mainSidebarStorage,
    "saveSidebarState",
    ()=>saveSidebarState
]);
const STORAGE_KEYS = {
    CHAT_SIDEBAR: "chatSidebarOpen",
    MAIN_SIDEBAR: "sidebar_state"
};
const getSavedSidebarState = (isMobile, storageKey = STORAGE_KEYS.CHAT_SIDEBAR)=>{
    if ("TURBOPACK compile-time truthy", 1) {
        return false;
    }
    //TURBOPACK unreachable
    ;
};
const saveSidebarState = (state, isMobile, storageKey = STORAGE_KEYS.CHAT_SIDEBAR)=>{
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
};
const clearSidebarState = (storageKey = STORAGE_KEYS.CHAT_SIDEBAR)=>{
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
};
const clearAllSidebarStates = ()=>{
    Object.values(STORAGE_KEYS).forEach((key)=>{
        clearSidebarState(key);
    });
};
const createSidebarStorage = (storageKey)=>({
        get: (isMobile)=>getSavedSidebarState(isMobile, storageKey),
        save: (state, isMobile)=>saveSidebarState(state, isMobile, storageKey),
        clear: ()=>clearSidebarState(storageKey)
    });
const chatSidebarStorage = createSidebarStorage(STORAGE_KEYS.CHAT_SIDEBAR);
const mainSidebarStorage = createSidebarStorage(STORAGE_KEYS.MAIN_SIDEBAR);
}),
"[externals]/node:crypto [external] (node:crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:crypto", () => require("node:crypto"));

module.exports = mod;
}),
"[project]/lib/utils/client-storage.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CHAT_MODE_STORAGE_KEY",
    ()=>CHAT_MODE_STORAGE_KEY,
    "CONVERSATION_DRAFTS_STORAGE_KEY",
    ()=>CONVERSATION_DRAFTS_STORAGE_KEY,
    "NULL_THREAD_DRAFT_ID",
    ()=>NULL_THREAD_DRAFT_ID,
    "cleanupExpiredDrafts",
    ()=>cleanupExpiredDrafts,
    "clearAllDrafts",
    ()=>clearAllDrafts,
    "getDraftContentById",
    ()=>getDraftContentById,
    "getDrafts",
    ()=>getDrafts,
    "getUserIdFromDrafts",
    ()=>getUserIdFromDrafts,
    "readChatMode",
    ()=>readChatMode,
    "readDraftStore",
    ()=>readDraftStore,
    "removeDraft",
    ()=>removeDraft,
    "setUserIdInDrafts",
    ()=>setUserIdInDrafts,
    "upsertDraft",
    ()=>upsertDraft,
    "writeChatMode",
    ()=>writeChatMode,
    "writeDraftStore",
    ()=>writeDraftStore
]);
const CONVERSATION_DRAFTS_STORAGE_KEY = "conversation_drafts";
const NULL_THREAD_DRAFT_ID = "null_thread";
const CHAT_MODE_STORAGE_KEY = "chat_mode";
const isBrowser = ()=>("TURBOPACK compile-time value", "undefined") !== "undefined";
const readDraftStore = ()=>{
    if (!isBrowser()) return {
        drafts: []
    };
    //TURBOPACK unreachable
    ;
};
const writeDraftStore = (store)=>{
    if (!isBrowser()) return;
    //TURBOPACK unreachable
    ;
};
const readChatMode = ()=>{
    if (!isBrowser()) return null;
    //TURBOPACK unreachable
    ;
};
const writeChatMode = (mode)=>{
    if (!isBrowser()) return;
    //TURBOPACK unreachable
    ;
};
const getDraftContentById = (id)=>{
    const store = readDraftStore();
    const entry = store.drafts.find((d)=>d.id === id);
    return entry ? entry.content : null;
};
const upsertDraft = (id, content, timestamp)=>{
    const store = readDraftStore();
    const idx = store.drafts.findIndex((d)=>d.id === id);
    const entry = {
        id,
        content,
        timestamp: typeof timestamp === "number" ? timestamp : Date.now()
    };
    if (idx >= 0) {
        store.drafts[idx] = entry;
    } else {
        store.drafts.push(entry);
    }
    writeDraftStore(store);
};
const removeDraft = (id)=>{
    const store = readDraftStore();
    const nextDrafts = store.drafts.filter((d)=>d.id !== id);
    writeDraftStore({
        ...store,
        drafts: nextDrafts
    });
};
const getDrafts = ()=>readDraftStore().drafts;
const getUserIdFromDrafts = ()=>readDraftStore().userId;
const setUserIdInDrafts = (userId)=>{
    const store = readDraftStore();
    writeDraftStore({
        ...store,
        userId
    });
};
const clearAllDrafts = ()=>{
    if (!isBrowser()) return;
    //TURBOPACK unreachable
    ;
};
const cleanupExpiredDrafts = ()=>{
    if (!isBrowser()) return;
    //TURBOPACK unreachable
    ;
};
}),
"[project]/app/contexts/GlobalState.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GlobalStateProvider",
    ()=>GlobalStateProvider,
    "useGlobalState",
    ()=>useGlobalState
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.28.5_@opentelemetry+api@1.9.0_@playwright+test@1.57.0_react-_bc0e796ca3d7ea4640f9d74c95225eb3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.28.5_@opentelemetry+api@1.9.0_@playwright+test@1.57.0_react-_bc0e796ca3d7ea4640f9d74c95225eb3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$convex$40$1$2e$29$2e$2_react$40$19$2e$2$2e$1$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$react$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/convex@1.29.2_react@19.2.1/node_modules/convex/dist/esm/react/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$convex$40$1$2e$29$2e$2_react$40$19$2e$2$2e$1$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$react$2f$client$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/convex@1.29.2_react@19.2.1/node_modules/convex/dist/esm/react/client.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$convex$2f$_generated$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/convex/_generated/api.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$todo$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils/todo-utils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$mobile$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/use-mobile.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$sidebar$2d$storage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils/sidebar-storage.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$uuid$40$13$2e$0$2e$0$2f$node_modules$2f$uuid$2f$dist$2d$node$2f$v4$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/uuid@13.0.0/node_modules/uuid/dist-node/v4.js [app-ssr] (ecmascript) <export default as v4>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$sonner$40$2$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/sonner@2.0.7_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/sonner/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$client$2d$storage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils/client-storage.ts [app-ssr] (ecmascript)");
"use client";
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
const GlobalStateContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
const GlobalStateProvider = ({ children })=>{
    const user = {
        id: "default-user",
        email: "user@example.com"
    };
    const entitlements = [
        "ultra-plan"
    ];
    const isMobile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$mobile$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useIsMobile"])();
    const prevIsMobile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(isMobile);
    const [input, setInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [uploadedFiles, setUploadedFiles] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [chatMode, setChatMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>{
        const saved = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$client$2d$storage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["readChatMode"])();
        return saved === "ask" || saved === "agent" ? saved : "ask";
    });
    const [chatTitle, setChatTitle] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [currentChatId, setCurrentChatId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isSwitchingChats, setIsSwitchingChats] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [sidebarOpen, setSidebarOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [sidebarContent, setSidebarContent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    // Persist chat mode preference to localStorage on change
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$client$2d$storage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["writeChatMode"])(chatMode);
    }, [
        chatMode
    ]);
    // Initialize chat sidebar state
    const [chatSidebarOpen, setChatSidebarOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$sidebar$2d$storage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["chatSidebarStorage"].get(isMobile));
    const [todos, setTodos] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isTodoPanelExpanded, setIsTodoPanelExpanded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const mergeTodos = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((newTodos)=>{
        setTodos((currentTodos)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$todo$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mergeTodos"])(currentTodos, newTodos));
    }, []);
    const replaceAssistantTodos = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((incoming, sourceMessageId)=>{
        setTodos((current)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$todo$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["computeReplaceAssistantTodos"])(current, incoming, sourceMessageId));
    }, []);
    const [chats, setChats] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [subscription, setSubscription] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("free");
    const [isCheckingProPlan, setIsCheckingProPlan] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const chatResetRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Rate limit warning dismissal state (persists across chat switches)
    const [hasUserDismissedRateLimitWarning, setHasUserDismissedRateLimitWarning] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // Message queue state (for Agent mode queueing)
    const [messageQueue, setMessageQueue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    // Queue behavior preference (persisted to localStorage)
    const [queueBehavior, setQueueBehaviorState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>{
        if ("TURBOPACK compile-time truthy", 1) return "queue";
        //TURBOPACK unreachable
        ;
        const saved = undefined;
    });
    // Sandbox preference (persisted to localStorage)
    const [sandboxPreference, setSandboxPreferenceState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>{
        if ("TURBOPACK compile-time truthy", 1) return "e2b";
        //TURBOPACK unreachable
        ;
    });
    // Persist queue behavior to localStorage
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
    }, [
        queueBehavior
    ]);
    // Persist sandbox preference to localStorage
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
    }, [
        sandboxPreference
    ]);
    // Initialize temporary chats from URL parameter
    const [temporaryChatsEnabled, setTemporaryChatsEnabled] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>{
        if ("TURBOPACK compile-time truthy", 1) return false;
        //TURBOPACK unreachable
        ;
        const urlParams = undefined;
    });
    // Initialize team pricing dialog from URL hash
    const [teamPricingDialogOpen, setTeamPricingDialogOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>{
        if ("TURBOPACK compile-time truthy", 1) return false;
        //TURBOPACK unreachable
        ;
    });
    // Initialize team welcome dialog from URL parameter
    const [teamWelcomeDialogOpen, setTeamWelcomeDialogOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>{
        if ("TURBOPACK compile-time truthy", 1) return false;
        //TURBOPACK unreachable
        ;
        const urlParams = undefined;
    });
    // Initialize PentestGPT migration confirm dialog from URL parameter
    const [migrateFromPentestgptDialogOpen, setMigrateFromPentestgptDialogOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>{
        if ("TURBOPACK compile-time truthy", 1) return false;
        //TURBOPACK unreachable
        ;
        const urlParams = undefined;
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // Save state on desktop
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$sidebar$2d$storage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["chatSidebarStorage"].save(chatSidebarOpen, isMobile);
        // Close sidebar when transitioning from desktop to mobile
        if (!prevIsMobile.current && isMobile && chatSidebarOpen) {
            setChatSidebarOpen(false);
        }
        prevIsMobile.current = isMobile;
    }, [
        chatSidebarOpen,
        isMobile
    ]);
    // Cleanup expired drafts on app initialization (once per session)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$client$2d$storage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cleanupExpiredDrafts"])();
    }, []); // Empty dependency array = runs once on mount
    // Derive subscription tier from current token entitlements
    // Prefer normalized entitlements ("pro-plan", "ultra-plan"); fall back to monthly/yearly keys for backward compatibility
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setSubscription("ultra");
    }, [
        user,
        entitlements
    ]);
    // Trigger aggregate migration for authenticated users (on-demand backfill)
    const ensureAggregatesMigrated = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$convex$40$1$2e$29$2e$2_react$40$19$2e$2$2e$1$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$react$2f$client$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMutation"])(__TURBOPACK__imported__module__$5b$project$5d2f$convex$2f$_generated$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].aggregateMigrations.ensureUserAggregatesMigrated);
    const hasMigrationRun = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    const previousUserIdRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const currentUserId = user?.id ?? null;
        // Reset migration flag if user changed (logout/login as different user)
        if (previousUserIdRef.current !== currentUserId) {
            hasMigrationRun.current = false;
            previousUserIdRef.current = currentUserId;
        }
        if (!user || hasMigrationRun.current) return;
        hasMigrationRun.current = true;
        ensureAggregatesMigrated().catch((error)=>{
            console.error("Failed to migrate user aggregates:", error);
        });
    }, [
        user,
        ensureAggregatesMigrated
    ]);
    // Refresh entitlements only when explicitly requested via URL param
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const refreshFromUrl = async ()=>{
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            if ("TURBOPACK compile-time truthy", 1) return;
            //TURBOPACK unreachable
            ;
            const url = undefined;
            const shouldRefresh = undefined;
        };
        refreshFromUrl();
    }, [
        user
    ]);
    // Listen for URL changes to sync temporary chat state
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handleUrlChange = ()=>{
            if ("TURBOPACK compile-time truthy", 1) return;
            //TURBOPACK unreachable
            ;
            const urlParams = undefined;
            const urlTemporaryEnabled = undefined;
        };
        // Listen for popstate events (browser back/forward)
        window.addEventListener("popstate", handleUrlChange);
        return ()=>{
            window.removeEventListener("popstate", handleUrlChange);
        };
    }, [
        temporaryChatsEnabled
    ]);
    // Listen for hash changes to sync team pricing dialog state
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handleHashChange = ()=>{
            if ("TURBOPACK compile-time truthy", 1) return;
            //TURBOPACK unreachable
            ;
            const shouldOpen = undefined;
        };
        // Listen for hash changes
        window.addEventListener("hashchange", handleHashChange);
        window.addEventListener("popstate", handleHashChange);
        return ()=>{
            window.removeEventListener("hashchange", handleHashChange);
            window.removeEventListener("popstate", handleHashChange);
        };
    }, [
        teamPricingDialogOpen
    ]);
    // Listen for URL changes to sync team welcome dialog state
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handleUrlChange = ()=>{
            if ("TURBOPACK compile-time truthy", 1) return;
            //TURBOPACK unreachable
            ;
            const urlParams = undefined;
            const shouldOpen = undefined;
        };
        // Listen for popstate events (browser back/forward)
        window.addEventListener("popstate", handleUrlChange);
        return ()=>{
            window.removeEventListener("popstate", handleUrlChange);
        };
    }, [
        teamWelcomeDialogOpen
    ]);
    // Listen for URL changes to sync PentestGPT migration confirm dialog state
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handleUrlChange = ()=>{
            if ("TURBOPACK compile-time truthy", 1) return;
            //TURBOPACK unreachable
            ;
            const urlParams = undefined;
            const shouldOpen = undefined;
        };
        window.addEventListener("popstate", handleUrlChange);
        return ()=>{
            window.removeEventListener("popstate", handleUrlChange);
        };
    }, [
        migrateFromPentestgptDialogOpen
    ]);
    const clearInput = ()=>{
        setInput("");
    };
    const clearUploadedFiles = ()=>{
        setUploadedFiles([]);
    };
    // Calculate total tokens from all files that have tokens
    const getTotalTokens = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        return uploadedFiles.reduce((total, file)=>{
            return file.tokens ? total + file.tokens : total;
        }, 0);
    }, [
        uploadedFiles
    ]);
    // Check if any files are currently uploading or have errors
    const isUploadingFiles = uploadedFiles.some((file)=>file.uploading || file.error);
    const addUploadedFile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((file)=>{
        setUploadedFiles((prev)=>[
                ...prev,
                file
            ]);
    }, []);
    const removeUploadedFile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((index)=>{
        setUploadedFiles((prev)=>prev.filter((_, i)=>i !== index));
    }, []);
    const updateUploadedFile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((index, updates)=>{
        setUploadedFiles((prev)=>prev.map((file, i)=>i === index ? {
                    ...file,
                    ...updates
                } : file));
    }, []);
    // Message queue handlers
    const queueMessage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((text, files)=>{
        setMessageQueue((prev)=>{
            // Limit queue size to 10 messages
            if (prev.length >= 10) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$sonner$40$2$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error("Queue is full", {
                    description: "Please wait for queued messages to send before adding more."
                });
                return prev;
            }
            const newMessage = {
                id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$uuid$40$13$2e$0$2e$0$2f$node_modules$2f$uuid$2f$dist$2d$node$2f$v4$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
                text,
                files,
                timestamp: Date.now()
            };
            return [
                ...prev,
                newMessage
            ];
        });
    }, []);
    const removeQueuedMessage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((id)=>{
        setMessageQueue((prev)=>prev.filter((msg)=>msg.id !== id));
    }, []);
    const clearQueue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        setMessageQueue([]);
    }, []);
    const dequeueNext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        let nextMessage = null;
        setMessageQueue((prev)=>{
            if (prev.length === 0) return prev;
            nextMessage = prev[0];
            return prev.slice(1);
        });
        return nextMessage;
    }, []);
    const initializeChat = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((chatId, _fromRoute)=>{
        setIsSwitchingChats(true);
        setCurrentChatId(chatId);
        // Don't clear input here - let ChatInput restore draft automatically
        // setInput("");  // Removed - ChatInput will handle draft restoration
        setTodos([]);
        setIsTodoPanelExpanded(false);
    }, []);
    const initializeNewChat = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        // Allow chat component to reset its local state immediately
        if (chatResetRef.current) {
            chatResetRef.current();
        }
        setCurrentChatId(null);
        setTodos([]);
        setIsTodoPanelExpanded(false);
        setChatTitle(null);
    }, []);
    const setChatReset = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((fn)=>{
        chatResetRef.current = fn;
    }, []);
    const activateChat = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((chatId)=>{
        setCurrentChatId(chatId);
    }, []);
    const openSidebar = (content)=>{
        setSidebarContent(content);
        setSidebarOpen(true);
    };
    const updateSidebarContent = (updates)=>{
        setSidebarContent((current)=>{
            if (current) {
                return {
                    ...current,
                    ...updates
                };
            }
            return current;
        });
    };
    const closeSidebar = ()=>{
        setSidebarOpen(false);
        setSidebarContent(null);
    };
    const toggleChatSidebar = ()=>{
        setChatSidebarOpen((prev)=>!prev);
    };
    // Custom setter for temporary chats that also updates URL
    const setTemporaryChatsEnabledWithUrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((enabled)=>{
        setTemporaryChatsEnabled(enabled);
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
    }, []);
    // Custom setter for team welcome dialog that also updates URL
    const setTeamWelcomeDialogOpenWithUrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((open)=>{
        setTeamWelcomeDialogOpen(open);
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
    }, []);
    // Custom setter for PentestGPT migration confirm dialog that also updates URL
    const setMigrateFromPentestgptDialogOpenWithUrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((open)=>{
        setMigrateFromPentestgptDialogOpen(open);
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
    }, []);
    const value = {
        input,
        setInput,
        uploadedFiles,
        setUploadedFiles,
        addUploadedFile,
        removeUploadedFile,
        updateUploadedFile,
        getTotalTokens,
        isUploadingFiles,
        chatMode,
        setChatMode,
        chatTitle,
        setChatTitle,
        currentChatId,
        setCurrentChatId,
        chats,
        setChats,
        isSwitchingChats,
        setIsSwitchingChats,
        sidebarOpen,
        setSidebarOpen,
        sidebarContent,
        setSidebarContent,
        chatSidebarOpen,
        setChatSidebarOpen,
        todos,
        setTodos,
        mergeTodos,
        replaceAssistantTodos,
        isTodoPanelExpanded,
        setIsTodoPanelExpanded,
        subscription,
        isCheckingProPlan,
        clearInput,
        clearUploadedFiles,
        openSidebar,
        updateSidebarContent,
        closeSidebar,
        toggleChatSidebar,
        initializeChat,
        initializeNewChat,
        activateChat,
        temporaryChatsEnabled,
        setTemporaryChatsEnabled: setTemporaryChatsEnabledWithUrl,
        teamPricingDialogOpen,
        setTeamPricingDialogOpen,
        teamWelcomeDialogOpen,
        setTeamWelcomeDialogOpen: setTeamWelcomeDialogOpenWithUrl,
        migrateFromPentestgptDialogOpen,
        setMigrateFromPentestgptDialogOpen: setMigrateFromPentestgptDialogOpenWithUrl,
        setChatReset,
        hasUserDismissedRateLimitWarning,
        setHasUserDismissedRateLimitWarning,
        messageQueue,
        queueMessage,
        removeQueuedMessage,
        clearQueue,
        dequeueNext,
        queueBehavior,
        setQueueBehavior: setQueueBehaviorState,
        sandboxPreference,
        setSandboxPreference: setSandboxPreferenceState
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(GlobalStateContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/app/contexts/GlobalState.tsx",
        lineNumber: 729,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const useGlobalState = ()=>{
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(GlobalStateContext);
    if (context === undefined) {
        throw new Error("useGlobalState must be used within a GlobalStateProvider");
    }
    return context;
};
}),
"[project]/lib/auth/cross-tab-mutex.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Cross-tab mutex using localStorage.
 *
 * Ensures only one tab can hold a lock at a time.
 * Uses localStorage for synchronization across tabs.
 */ __turbopack_context__.s([
    "CrossTabMutex",
    ()=>CrossTabMutex
]);
const DEFAULT_LOCK_KEY = "cross-tab-mutex";
const DEFAULT_LOCK_TIMEOUT_MS = 10000;
class CrossTabMutex {
    tabId;
    lockKey;
    lockTimeoutMs;
    log;
    constructor(options = {}){
        this.tabId = typeof crypto !== "undefined" ? crypto.randomUUID() : Math.random().toString(36).slice(2);
        this.lockKey = options.lockKey ?? DEFAULT_LOCK_KEY;
        this.lockTimeoutMs = options.lockTimeoutMs ?? DEFAULT_LOCK_TIMEOUT_MS;
        this.log = options.onLog ?? (()=>{});
    }
    /**
   * Try to acquire the lock. Returns true if acquired, false if held by another tab.
   */ tryAcquire() {
        if (typeof localStorage === "undefined") {
            return true;
        }
        const now = Date.now();
        try {
            const existing = localStorage.getItem(this.lockKey);
            if (existing) {
                const lock = JSON.parse(existing);
                const age = now - lock.timestamp;
                if (age < this.lockTimeoutMs) {
                    if (lock.tabId === this.tabId) {
                        this.log("We already hold the lock");
                        return true;
                    }
                    // this.log(`Lock held by ${lock.tabId.slice(0, 8)} (${age}ms old)`);
                    return false;
                }
                this.log(`Stale lock from ${lock.tabId.slice(0, 8)}, taking over`);
            }
            const lockData = {
                tabId: this.tabId,
                timestamp: now
            };
            localStorage.setItem(this.lockKey, JSON.stringify(lockData));
            // Verify we got it
            const verify = localStorage.getItem(this.lockKey);
            if (verify) {
                const verifyLock = JSON.parse(verify);
                if (verifyLock.tabId === this.tabId) {
                    this.log("Lock acquired");
                    return true;
                }
                this.log(`Lost race to ${verifyLock.tabId.slice(0, 8)}`);
                return false;
            }
            return false;
        } catch (e) {
            this.log(`localStorage error: ${e}`);
            return true;
        }
    }
    /**
   * Release the lock if we hold it.
   */ release() {
        if (typeof localStorage === "undefined") {
            return;
        }
        try {
            const existing = localStorage.getItem(this.lockKey);
            if (existing) {
                const lock = JSON.parse(existing);
                if (lock.tabId === this.tabId) {
                    localStorage.removeItem(this.lockKey);
                    this.log("Lock released");
                }
            }
        } catch  {
        // Ignore
        }
    }
    /**
   * Wait to acquire the lock, retrying until acquired or timeout.
   * Returns true if acquired, false if timed out.
   */ async acquireWithWait(timeoutMs = 15000, retryIntervalMs = 50) {
        const startTime = Date.now();
        while(Date.now() - startTime < timeoutMs){
            if (this.tryAcquire()) {
                return true;
            }
            await new Promise((resolve)=>setTimeout(resolve, retryIntervalMs + (Math.random() - 0.5) * 10));
        }
        this.log("Timeout waiting for lock");
        return false;
    }
    /**
   * Execute a function while holding the lock.
   * Waits for lock acquisition with timeout, then executes.
   * Returns null if lock acquisition timed out.
   */ async withLock(fn, timeoutMs = 15000) {
        const acquired = await this.acquireWithWait(timeoutMs);
        if (!acquired) {
            return null;
        }
        try {
            return await fn();
        } finally{
            this.release();
        }
    }
    /**
   * Force clear the lock (use for testing/debugging).
   */ forceClear() {
        if (typeof localStorage === "undefined") {
            return;
        }
        localStorage.removeItem(this.lockKey);
        this.log("Lock force cleared");
    }
}
}),
"[project]/lib/auth/shared-token.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Shared token storage for cross-tab coordination.
 *
 * Allows tabs to share refreshed tokens via localStorage,
 * preventing redundant API calls when multiple tabs need fresh tokens.
 */ __turbopack_context__.s([
    "SHARED_TOKEN_KEY",
    ()=>SHARED_TOKEN_KEY,
    "TOKEN_FRESHNESS_MS",
    ()=>TOKEN_FRESHNESS_MS,
    "clearExpiredSharedToken",
    ()=>clearExpiredSharedToken,
    "clearSharedToken",
    ()=>clearSharedToken,
    "getFreshSharedToken",
    ()=>getFreshSharedToken,
    "getFreshSharedTokenWithFallback",
    ()=>getFreshSharedTokenWithFallback,
    "getSharedToken",
    ()=>getSharedToken,
    "isTokenFresh",
    ()=>isTokenFresh,
    "setSharedToken",
    ()=>setSharedToken
]);
const SHARED_TOKEN_KEY = "hackerai-shared-token";
const TOKEN_FRESHNESS_MS = 60000; // Consider token "fresh" if refreshed within 60s
function isValidSharedToken(parsed) {
    return typeof parsed === "object" && parsed !== null && typeof parsed.token === "string" && typeof parsed.refreshedAt === "number";
}
function getSharedToken() {
    if (typeof localStorage === "undefined") {
        return null;
    }
    try {
        const data = localStorage.getItem(SHARED_TOKEN_KEY);
        if (!data) return null;
        const parsed = JSON.parse(data);
        if (isValidSharedToken(parsed)) {
            return parsed;
        }
        return null;
    } catch  {
        return null;
    }
}
function setSharedToken(token) {
    if (typeof localStorage === "undefined") {
        return;
    }
    try {
        const data = {
            token,
            refreshedAt: Date.now()
        };
        localStorage.setItem(SHARED_TOKEN_KEY, JSON.stringify(data));
    } catch  {
    // Ignore localStorage errors
    }
}
function clearExpiredSharedToken() {
    if (typeof localStorage === "undefined") {
        return;
    }
    try {
        const data = localStorage.getItem(SHARED_TOKEN_KEY);
        if (data) {
            const parsed = JSON.parse(data);
            if (isValidSharedToken(parsed) && Date.now() - parsed.refreshedAt >= TOKEN_FRESHNESS_MS) {
                localStorage.removeItem(SHARED_TOKEN_KEY);
            }
        }
    } catch  {
    // Ignore
    }
}
function isTokenFresh(sharedToken) {
    if (!sharedToken) return false;
    return Date.now() - sharedToken.refreshedAt < TOKEN_FRESHNESS_MS;
}
function clearSharedToken() {
    if (typeof localStorage === "undefined") {
        return;
    }
    try {
        localStorage.removeItem(SHARED_TOKEN_KEY);
    } catch  {
    // Ignore
    }
}
function getFreshSharedToken() {
    const sharedToken = getSharedToken();
    if (isTokenFresh(sharedToken)) {
        return sharedToken.token;
    }
    return null;
}
async function getFreshSharedTokenWithFallback(fallback) {
    const freshToken = getFreshSharedToken();
    if (freshToken) {
        return freshToken;
    }
    const newToken = await fallback();
    if (newToken) {
        setSharedToken(newToken);
    }
    return newToken ?? null;
}
}),
"[project]/lib/auth/feature-flags.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Simple feature flag system for auth features.
 * Uses deterministic hashing of user ID for consistent rollout percentages.
 */ /**
 * Hash a string to a number between 0 and 99.
 * Uses a simple hash algorithm that's consistent across sessions.
 */ __turbopack_context__.s([
    "FEATURE_FLAGS",
    ()=>FEATURE_FLAGS,
    "FEATURE_ROLLOUTS",
    ()=>FEATURE_ROLLOUTS,
    "isCrossTabTokenSharingEnabled",
    ()=>isCrossTabTokenSharingEnabled,
    "isFeatureEnabled",
    ()=>isFeatureEnabled
]);
function hashToPercentage(str) {
    let hash = 0;
    for(let i = 0; i < str.length; i++){
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = hash | 0; // Convert to 32bit integer
    }
    return Math.abs(hash) % 100;
}
function isFeatureEnabled(userId, featureKey, percentage) {
    if (percentage <= 0) return false;
    if (percentage >= 100) return true;
    // Combine userId with featureKey for independent rollouts per feature
    const combinedKey = `${featureKey}:${userId}`;
    const userPercentile = hashToPercentage(combinedKey);
    return userPercentile < percentage;
}
const FEATURE_FLAGS = {
    CROSS_TAB_TOKEN_SHARING: "cross-tab-token-sharing"
};
// Feature flag rollout percentages (configurable via environment variables)
function getCrossTabRolloutPercentage() {
    const envValue = process.env.NEXT_PUBLIC_FF_CROSS_TAB_TOKEN_SHARING;
    if (envValue === undefined || envValue === "") return 0;
    const parsed = parseInt(envValue, 10);
    if (isNaN(parsed) || parsed < 0 || parsed > 100) return 0;
    return parsed;
}
const FEATURE_ROLLOUTS = {
    get [FEATURE_FLAGS.CROSS_TAB_TOKEN_SHARING] () {
        return getCrossTabRolloutPercentage();
    }
};
function isCrossTabTokenSharingEnabled(userId) {
    if (!userId) return false;
    const enabled = isFeatureEnabled(userId, FEATURE_FLAGS.CROSS_TAB_TOKEN_SHARING, FEATURE_ROLLOUTS[FEATURE_FLAGS.CROSS_TAB_TOKEN_SHARING]);
    console.log(`[Feature Flag] ${FEATURE_FLAGS.CROSS_TAB_TOKEN_SHARING}: ${enabled ? "enabled" : "disabled"} for user ${userId.slice(0, 8)}...`);
    return enabled;
}
}),
"[project]/lib/auth/use-auth-from-authkit.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAuthFromAuthKit",
    ()=>useAuthFromAuthKit,
    "useSharedTokenCleanup",
    ()=>useSharedTokenCleanup
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.28.5_@opentelemetry+api@1.9.0_@playwright+test@1.57.0_react-_bc0e796ca3d7ea4640f9d74c95225eb3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$workos$2d$inc$2b$authkit$2d$nextjs$40$2$2e$12$2e$0_next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$_d69fb94637ccf89267342f537ef484a4$2f$node_modules$2f40$workos$2d$inc$2f$authkit$2d$nextjs$2f$dist$2f$esm$2f$components$2f$authkit$2d$provider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@workos-inc+authkit-nextjs@2.12.0_next@16.0.10_@babel+core@7.28.5_@opentelemetry+api@1._d69fb94637ccf89267342f537ef484a4/node_modules/@workos-inc/authkit-nextjs/dist/esm/components/authkit-provider.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$workos$2d$inc$2b$authkit$2d$nextjs$40$2$2e$12$2e$0_next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$_d69fb94637ccf89267342f537ef484a4$2f$node_modules$2f40$workos$2d$inc$2f$authkit$2d$nextjs$2f$dist$2f$esm$2f$components$2f$useAccessToken$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@workos-inc+authkit-nextjs@2.12.0_next@16.0.10_@babel+core@7.28.5_@opentelemetry+api@1._d69fb94637ccf89267342f537ef484a4/node_modules/@workos-inc/authkit-nextjs/dist/esm/components/useAccessToken.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2f$cross$2d$tab$2d$mutex$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth/cross-tab-mutex.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2f$shared$2d$token$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth/shared-token.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2f$feature$2d$flags$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth/feature-flags.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
// Singleton mutex shared across all hook instances in this tab
const refreshMutex = new __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2f$cross$2d$tab$2d$mutex$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CrossTabMutex"]({
    lockKey: "hackerai-token-refresh",
    lockTimeoutMs: 15000,
    onLog: (msg)=>console.log(`[Convex Auth] ${msg}`)
});
function useSharedTokenCleanup(enabled) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!enabled) return;
        const interval = setInterval(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2f$shared$2d$token$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clearExpiredSharedToken"], __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2f$shared$2d$token$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TOKEN_FRESHNESS_MS"]);
        return ()=>clearInterval(interval);
    }, [
        enabled
    ]);
}
const defaultDeps = {
    useAuth: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$workos$2d$inc$2b$authkit$2d$nextjs$40$2$2e$12$2e$0_next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$_d69fb94637ccf89267342f537ef484a4$2f$node_modules$2f40$workos$2d$inc$2f$authkit$2d$nextjs$2f$dist$2f$esm$2f$components$2f$authkit$2d$provider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuth"],
    useAccessToken: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$workos$2d$inc$2b$authkit$2d$nextjs$40$2$2e$12$2e$0_next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$_d69fb94637ccf89267342f537ef484a4$2f$node_modules$2f40$workos$2d$inc$2f$authkit$2d$nextjs$2f$dist$2f$esm$2f$components$2f$useAccessToken$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAccessToken"],
    mutex: refreshMutex,
    isCrossTabEnabled: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2f$feature$2d$flags$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isCrossTabTokenSharingEnabled"]
};
function useAuthFromAuthKit(deps = defaultDeps) {
    const { user, loading: isLoading } = deps.useAuth();
    const { getAccessToken, accessToken, refresh } = deps.useAccessToken();
    const accessTokenRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(undefined);
    const isCrossTabEnabled = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>(deps.isCrossTabEnabled ?? __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2f$feature$2d$flags$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isCrossTabTokenSharingEnabled"])(user?.id), [
        deps.isCrossTabEnabled,
        user?.id
    ]);
    useSharedTokenCleanup(isCrossTabEnabled);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        accessTokenRef.current = accessToken;
    }, [
        accessToken
    ]);
    const isAuthenticated = !!user;
    const fetchAccessToken = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ({ forceRefreshToken } = {})=>{
        if (!user) {
            return null;
        }
        try {
            if (forceRefreshToken) {
                // Use new cross-tab coordination if feature flag is enabled
                if (isCrossTabEnabled) {
                    // Convex is asking for a fresh token (current one was rejected).
                    // Coordinate refresh across tabs to avoid redundant API calls.
                    const refreshWithLock = async ()=>{
                        const token = await deps.mutex.withLock(async ()=>{
                            // Double-check after acquiring lock - another tab may have refreshed while we waited
                            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2f$shared$2d$token$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getFreshSharedTokenWithFallback"])(async ()=>refresh());
                        });
                        // If lock timed out, fall back to getAccessToken
                        return token ?? await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2f$shared$2d$token$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getFreshSharedTokenWithFallback"])(getAccessToken);
                    };
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2f$shared$2d$token$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getFreshSharedTokenWithFallback"])(refreshWithLock);
                }
                // Legacy behavior: direct refresh without cross-tab coordination
                const newToken = await refresh();
                return newToken ?? null;
            }
            return await getAccessToken() ?? null;
        } catch  {
            // On network errors during laptop wake, fall back to cached token.
            // Even if expired, Convex will treat it like null and clear auth.
            // AuthKit's tokenStore schedules automatic retries in the background.
            console.log("[Convex Auth] Using cached token during network issues");
            return accessTokenRef.current ?? null;
        }
    }, [
        user,
        getAccessToken,
        refresh,
        deps.mutex,
        isCrossTabEnabled
    ]);
    return {
        isLoading,
        isAuthenticated,
        fetchAccessToken
    };
}
}),
"[project]/components/ConvexClientProvider.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ConvexClientProvider",
    ()=>ConvexClientProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.28.5_@opentelemetry+api@1.9.0_@playwright+test@1.57.0_react-_bc0e796ca3d7ea4640f9d74c95225eb3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.28.5_@opentelemetry+api@1.9.0_@playwright+test@1.57.0_react-_bc0e796ca3d7ea4640f9d74c95225eb3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$convex$40$1$2e$29$2e$2_react$40$19$2e$2$2e$1$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$react$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/convex@1.29.2_react@19.2.1/node_modules/convex/dist/esm/react/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$convex$40$1$2e$29$2e$2_react$40$19$2e$2$2e$1$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$react$2f$client$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/convex@1.29.2_react@19.2.1/node_modules/convex/dist/esm/react/client.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$convex$40$1$2e$29$2e$2_react$40$19$2e$2$2e$1$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$react$2f$ConvexAuthState$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/convex@1.29.2_react@19.2.1/node_modules/convex/dist/esm/react/ConvexAuthState.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$workos$2d$inc$2b$authkit$2d$nextjs$40$2$2e$12$2e$0_next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$_d69fb94637ccf89267342f537ef484a4$2f$node_modules$2f40$workos$2d$inc$2f$authkit$2d$nextjs$2f$dist$2f$esm$2f$components$2f$authkit$2d$provider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@workos-inc+authkit-nextjs@2.12.0_next@16.0.10_@babel+core@7.28.5_@opentelemetry+api@1._d69fb94637ccf89267342f537ef484a4/node_modules/@workos-inc/authkit-nextjs/dist/esm/components/authkit-provider.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2f$use$2d$auth$2d$from$2d$authkit$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth/use-auth-from-authkit.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
const noop = ()=>{};
function ConvexClientProvider({ children }) {
    const [convex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>{
        const client = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$convex$40$1$2e$29$2e$2_react$40$19$2e$2$2e$1$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$react$2f$client$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ConvexReactClient"](process.env.NEXT_PUBLIC_CONVEX_URL);
        return client;
    });
    return(// Prevent AuthKit's default window.location.reload() on session expiration.
    // We handle auth state gracefully via Convex token refresh and middleware checks.
    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$workos$2d$inc$2b$authkit$2d$nextjs$40$2$2e$12$2e$0_next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$_d69fb94637ccf89267342f537ef484a4$2f$node_modules$2f40$workos$2d$inc$2f$authkit$2d$nextjs$2f$dist$2f$esm$2f$components$2f$authkit$2d$provider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AuthKitProvider"], {
        onSessionExpired: noop,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$convex$40$1$2e$29$2e$2_react$40$19$2e$2$2e$1$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$react$2f$ConvexAuthState$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ConvexProviderWithAuth"], {
            client: convex,
            useAuth: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2f$use$2d$auth$2d$from$2d$authkit$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuthFromAuthKit"],
            children: children
        }, void 0, false, {
            fileName: "[project]/components/ConvexClientProvider.tsx",
            lineNumber: 21,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/ConvexClientProvider.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, this));
}
}),
"[project]/lib/utils/todo-block-manager.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useTodoBlockManager",
    ()=>useTodoBlockManager
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.28.5_@opentelemetry+api@1.9.0_@playwright+test@1.57.0_react-_bc0e796ca3d7ea4640f9d74c95225eb3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
const useTodoBlockManager = ()=>{
    const [messageTodoOpen, setMessageTodoOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    const autoOpenTodoBlock = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((messageId, blockId)=>{
        setMessageTodoOpen((prev)=>{
            const current = prev[messageId] || {
                autoId: null,
                manualIds: []
            };
            if (current.autoId === blockId) {
                return prev; // no change
            }
            // Only the latest autoId stays open automatically. Manual opens persist.
            return {
                ...prev,
                [messageId]: {
                    autoId: blockId,
                    manualIds: current.manualIds
                }
            };
        });
    }, []);
    const toggleTodoBlock = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((messageId, blockId)=>{
        setMessageTodoOpen((prev)=>{
            const current = prev[messageId] || {
                autoId: null,
                manualIds: []
            };
            const isManual = current.manualIds.includes(blockId);
            const isAuto = current.autoId === blockId;
            if (isManual) {
                // Remove from manual list
                const nextManual = current.manualIds.filter((id)=>id !== blockId);
                return {
                    ...prev,
                    [messageId]: {
                        autoId: current.autoId,
                        manualIds: nextManual
                    }
                };
            } else if (isAuto) {
                // Close auto-opened block by clearing autoId
                return {
                    ...prev,
                    [messageId]: {
                        autoId: null,
                        manualIds: current.manualIds
                    }
                };
            } else {
                // Add to manual list
                const nextManual = [
                    ...current.manualIds,
                    blockId
                ];
                return {
                    ...prev,
                    [messageId]: {
                        autoId: current.autoId,
                        manualIds: nextManual
                    }
                };
            }
        });
    }, []);
    const isBlockExpanded = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((messageId, blockId)=>{
        const stateForMessage = messageTodoOpen[messageId] || {
            autoId: null,
            manualIds: []
        };
        return stateForMessage.autoId === blockId || stateForMessage.manualIds.includes(blockId);
    }, [
        messageTodoOpen
    ]);
    return {
        messageTodoOpen,
        autoOpenTodoBlock,
        toggleTodoBlock,
        isBlockExpanded
    };
};
}),
"[project]/app/contexts/TodoBlockContext.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TodoBlockProvider",
    ()=>TodoBlockProvider,
    "useTodoBlockContext",
    ()=>useTodoBlockContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.28.5_@opentelemetry+api@1.9.0_@playwright+test@1.57.0_react-_bc0e796ca3d7ea4640f9d74c95225eb3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.28.5_@opentelemetry+api@1.9.0_@playwright+test@1.57.0_react-_bc0e796ca3d7ea4640f9d74c95225eb3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$todo$2d$block$2d$manager$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils/todo-block-manager.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
const TodoBlockContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
const TodoBlockProvider = ({ children })=>{
    const { autoOpenTodoBlock, toggleTodoBlock, isBlockExpanded } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$todo$2d$block$2d$manager$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTodoBlockManager"])();
    const value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>({
            autoOpenTodoBlock,
            toggleTodoBlock,
            isBlockExpanded
        }), [
        autoOpenTodoBlock,
        toggleTodoBlock,
        isBlockExpanded
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(TodoBlockContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/app/contexts/TodoBlockContext.tsx",
        lineNumber: 36,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const useTodoBlockContext = ()=>{
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(TodoBlockContext);
    if (context === undefined) {
        throw new Error("useTodoBlockContext must be used within a TodoBlockProvider");
    }
    return context;
};
}),
"[project]/app/components/DataStreamProvider.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DataStreamProvider",
    ()=>DataStreamProvider,
    "useDataStream",
    ()=>useDataStream
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.28.5_@opentelemetry+api@1.9.0_@playwright+test@1.57.0_react-_bc0e796ca3d7ea4640f9d74c95225eb3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.28.5_@opentelemetry+api@1.9.0_@playwright+test@1.57.0_react-_bc0e796ca3d7ea4640f9d74c95225eb3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
const DataStreamContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(null);
function DataStreamProvider({ children }) {
    const [dataStream, setDataStream] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isAutoResuming, setIsAutoResuming] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>({
            dataStream,
            setDataStream,
            isAutoResuming,
            setIsAutoResuming
        }), [
        dataStream,
        isAutoResuming
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(DataStreamContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/app/components/DataStreamProvider.tsx",
        lineNumber: 34,
        columnNumber: 5
    }, this);
}
function useDataStream() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(DataStreamContext);
    if (!context) {
        throw new Error("useDataStream must be used within a DataStreamProvider");
    }
    return context;
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0687d1d5._.js.map