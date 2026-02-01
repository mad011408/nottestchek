(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/lib/errors.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/utils.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn,
    "convertToUIMessages",
    ()=>convertToUIMessages,
    "fetchWithErrorHandlers",
    ()=>fetchWithErrorHandlers
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$clsx$40$2$2e$1$2e$1$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/clsx@2.1.1/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$tailwind$2d$merge$40$3$2e$4$2e$0$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/tailwind-merge@3.4.0/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$errors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/errors.ts [app-client] (ecmascript)");
;
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$tailwind$2d$merge$40$3$2e$4$2e$0$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$clsx$40$2$2e$1$2e$1$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
async function fetchWithErrorHandlers(input, init) {
    try {
        const response = await fetch(input, init);
        if (!response.ok) {
            const { code, cause } = await response.json();
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$errors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChatSDKError"](code, cause);
        }
        return response;
    } catch (error) {
        if (typeof navigator !== "undefined" && !navigator.onLine) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$errors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChatSDKError"]("offline:chat");
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ui/tooltip.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.28.5_@opentelemetry+api@1.9.0_@playwright+test@1.57.0_react-_bc0e796ca3d7ea4640f9d74c95225eb3/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$radix$2d$ui$2b$react$2d$tooltip$40$1$2e$2$2e$8_$40$types$2b$react$2d$dom$40$19$2e$1$2e$7_$40$types$2b$react$40$19$2e$1$2e$9_$5f40$types$2b$react_9e67379daf7d30148220488c6700a5f8$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tooltip$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@radix-ui+react-tooltip@1.2.8_@types+react-dom@19.1.7_@types+react@19.1.9__@types+react_9e67379daf7d30148220488c6700a5f8/node_modules/@radix-ui/react-tooltip/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
function TooltipProvider({ delayDuration = 0, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$radix$2d$ui$2b$react$2d$tooltip$40$1$2e$2$2e$8_$40$types$2b$react$2d$dom$40$19$2e$1$2e$7_$40$types$2b$react$40$19$2e$1$2e$9_$5f40$types$2b$react_9e67379daf7d30148220488c6700a5f8$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tooltip$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Provider"], {
        "data-slot": "tooltip-provider",
        delayDuration: delayDuration,
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/tooltip.tsx",
        lineNumber: 13,
        columnNumber: 5
    }, this);
}
_c = TooltipProvider;
function Tooltip({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TooltipProvider, {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$radix$2d$ui$2b$react$2d$tooltip$40$1$2e$2$2e$8_$40$types$2b$react$2d$dom$40$19$2e$1$2e$7_$40$types$2b$react$40$19$2e$1$2e$9_$5f40$types$2b$react_9e67379daf7d30148220488c6700a5f8$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tooltip$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
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
_c1 = Tooltip;
function TooltipTrigger({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$radix$2d$ui$2b$react$2d$tooltip$40$1$2e$2$2e$8_$40$types$2b$react$2d$dom$40$19$2e$1$2e$7_$40$types$2b$react$40$19$2e$1$2e$9_$5f40$types$2b$react_9e67379daf7d30148220488c6700a5f8$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tooltip$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Trigger"], {
        "data-slot": "tooltip-trigger",
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/tooltip.tsx",
        lineNumber: 34,
        columnNumber: 10
    }, this);
}
_c2 = TooltipTrigger;
function TooltipContent({ className, sideOffset = 0, children, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$radix$2d$ui$2b$react$2d$tooltip$40$1$2e$2$2e$8_$40$types$2b$react$2d$dom$40$19$2e$1$2e$7_$40$types$2b$react$40$19$2e$1$2e$9_$5f40$types$2b$react_9e67379daf7d30148220488c6700a5f8$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tooltip$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Portal"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$radix$2d$ui$2b$react$2d$tooltip$40$1$2e$2$2e$8_$40$types$2b$react$2d$dom$40$19$2e$1$2e$7_$40$types$2b$react$40$19$2e$1$2e$9_$5f40$types$2b$react_9e67379daf7d30148220488c6700a5f8$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tooltip$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Content"], {
            "data-slot": "tooltip-content",
            sideOffset: sideOffset,
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("bg-primary text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance", className),
            ...props,
            children: [
                children,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$radix$2d$ui$2b$react$2d$tooltip$40$1$2e$2$2e$8_$40$types$2b$react$2d$dom$40$19$2e$1$2e$7_$40$types$2b$react$40$19$2e$1$2e$9_$5f40$types$2b$react_9e67379daf7d30148220488c6700a5f8$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tooltip$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Arrow"], {
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
_c3 = TooltipContent;
;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "TooltipProvider");
__turbopack_context__.k.register(_c1, "Tooltip");
__turbopack_context__.k.register(_c2, "TooltipTrigger");
__turbopack_context__.k.register(_c3, "TooltipContent");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/hooks/use-mobile.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useIsMobile",
    ()=>useIsMobile
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.28.5_@opentelemetry+api@1.9.0_@playwright+test@1.57.0_react-_bc0e796ca3d7ea4640f9d74c95225eb3/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
const MOBILE_BREAKPOINT = 768;
function useIsMobile() {
    _s();
    const [isMobile, setIsMobile] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](undefined);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "useIsMobile.useEffect": ()=>{
            const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
            const onChange = {
                "useIsMobile.useEffect.onChange": ()=>{
                    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
                }
            }["useIsMobile.useEffect.onChange"];
            mql.addEventListener("change", onChange);
            setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
            return ({
                "useIsMobile.useEffect": ()=>mql.removeEventListener("change", onChange)
            })["useIsMobile.useEffect"];
        }
    }["useIsMobile.useEffect"], []);
    return !!isMobile;
}
_s(useIsMobile, "D6B2cPXNCaIbeOx+abFr1uxLRM0=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ui/sonner.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Toaster",
    ()=>Toaster
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.28.5_@opentelemetry+api@1.9.0_@playwright+test@1.57.0_react-_bc0e796ca3d7ea4640f9d74c95225eb3/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$themes$40$0$2e$4$2e$6_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next-themes@0.4.6_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/next-themes/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$sonner$40$2$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/sonner@2.0.7_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$mobile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/use-mobile.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
const Toaster = ({ ...props })=>{
    _s();
    const { theme = "system" } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$themes$40$0$2e$4$2e$6_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"])();
    const isMobile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$mobile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsMobile"])();
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$sonner$40$2$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Toaster"], {
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
_s(Toaster, "sv/TK27aZpAlI2BOiDO/G8K+JaU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$themes$40$0$2e$4$2e$6_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"],
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$mobile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsMobile"]
    ];
});
_c = Toaster;
;
var _c;
__turbopack_context__.k.register(_c, "Toaster");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/convex/_generated/api.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$convex$40$1$2e$29$2e$2_react$40$19$2e$2$2e$1$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/convex@1.29.2_react@19.2.1/node_modules/convex/dist/esm/server/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$convex$40$1$2e$29$2e$2_react$40$19$2e$2$2e$1$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/convex@1.29.2_react@19.2.1/node_modules/convex/dist/esm/server/api.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$convex$40$1$2e$29$2e$2_react$40$19$2e$2$2e$1$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$components$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/convex@1.29.2_react@19.2.1/node_modules/convex/dist/esm/server/components/index.js [app-client] (ecmascript) <locals>");
;
const api = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$convex$40$1$2e$29$2e$2_react$40$19$2e$2$2e$1$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["anyApi"];
const internal = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$convex$40$1$2e$29$2e$2_react$40$19$2e$2$2e$1$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["anyApi"];
const components = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$convex$40$1$2e$29$2e$2_react$40$19$2e$2$2e$1$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$components$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["componentsGeneric"])();
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/utils/todo-utils.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/utils/sidebar-storage.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
    if (isMobile || ("TURBOPACK compile-time value", "object") === "undefined") {
        return false;
    }
    try {
        const saved = localStorage.getItem(storageKey);
        return saved ? JSON.parse(saved) : false;
    } catch  {
        return false;
    }
};
const saveSidebarState = (state, isMobile, storageKey = STORAGE_KEYS.CHAT_SIDEBAR)=>{
    if (!isMobile && ("TURBOPACK compile-time value", "object") !== "undefined") {
        try {
            localStorage.setItem(storageKey, JSON.stringify(state));
        } catch  {
        // Silently fail in production environments
        // This handles cases like:
        // - Incognito mode
        // - Storage quota exceeded
        // - Storage disabled by user/browser policy
        }
    }
};
const clearSidebarState = (storageKey = STORAGE_KEYS.CHAT_SIDEBAR)=>{
    if ("TURBOPACK compile-time truthy", 1) {
        try {
            localStorage.removeItem(storageKey);
        } catch  {
        // Silently fail in production
        }
    }
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/utils/client-storage.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
const isBrowser = ()=>("TURBOPACK compile-time value", "object") !== "undefined";
const readDraftStore = ()=>{
    if (!isBrowser()) //TURBOPACK unreachable
    ;
    try {
        const raw = window.localStorage.getItem(CONVERSATION_DRAFTS_STORAGE_KEY);
        if (!raw) return {
            drafts: []
        };
        const parsed = JSON.parse(raw);
        const drafts = Array.isArray(parsed?.drafts) ? parsed.drafts : [];
        const userId = typeof parsed?.userId === "string" ? parsed.userId : undefined;
        return {
            drafts,
            userId
        };
    } catch  {
        return {
            drafts: []
        };
    }
};
const writeDraftStore = (store)=>{
    if (!isBrowser()) //TURBOPACK unreachable
    ;
    try {
        window.localStorage.setItem(CONVERSATION_DRAFTS_STORAGE_KEY, JSON.stringify({
            drafts: store.drafts,
            userId: store.userId
        }));
    } catch  {
    // ignore
    }
};
const readChatMode = ()=>{
    if (!isBrowser()) //TURBOPACK unreachable
    ;
    try {
        const raw = window.localStorage.getItem(CHAT_MODE_STORAGE_KEY);
        if (raw === "ask" || raw === "agent") return raw;
        return null;
    } catch  {
        return null;
    }
};
const writeChatMode = (mode)=>{
    if (!isBrowser()) //TURBOPACK unreachable
    ;
    try {
        window.localStorage.setItem(CHAT_MODE_STORAGE_KEY, mode);
    } catch  {
    // ignore
    }
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
    if (!isBrowser()) //TURBOPACK unreachable
    ;
    try {
        window.localStorage.removeItem(CONVERSATION_DRAFTS_STORAGE_KEY);
    } catch  {
    // ignore
    }
};
const cleanupExpiredDrafts = ()=>{
    if (!isBrowser()) //TURBOPACK unreachable
    ;
    try {
        const store = readDraftStore();
        const now = Date.now();
        const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;
        // Filter out drafts older than 7 days
        const validDrafts = store.drafts.filter((draft)=>{
            const age = now - draft.timestamp;
            return age < SEVEN_DAYS_MS;
        });
        // Only write if we actually removed drafts (avoid unnecessary writes)
        if (validDrafts.length !== store.drafts.length) {
            writeDraftStore({
                ...store,
                drafts: validDrafts
            });
            console.log(`[Draft Cleanup] Removed ${store.drafts.length - validDrafts.length} expired drafts`);
        }
    } catch (error) {
        // Silently fail - cleanup is not critical
        console.warn("[Draft Cleanup] Failed to cleanup expired drafts:", error);
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/contexts/GlobalState.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GlobalStateProvider",
    ()=>GlobalStateProvider,
    "useGlobalState",
    ()=>useGlobalState
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.28.5_@opentelemetry+api@1.9.0_@playwright+test@1.57.0_react-_bc0e796ca3d7ea4640f9d74c95225eb3/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.28.5_@opentelemetry+api@1.9.0_@playwright+test@1.57.0_react-_bc0e796ca3d7ea4640f9d74c95225eb3/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$convex$40$1$2e$29$2e$2_react$40$19$2e$2$2e$1$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/convex@1.29.2_react@19.2.1/node_modules/convex/dist/esm/react/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$convex$40$1$2e$29$2e$2_react$40$19$2e$2$2e$1$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$react$2f$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/convex@1.29.2_react@19.2.1/node_modules/convex/dist/esm/react/client.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$convex$2f$_generated$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/convex/_generated/api.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$todo$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils/todo-utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$mobile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/use-mobile.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$sidebar$2d$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils/sidebar-storage.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$uuid$40$13$2e$0$2e$0$2f$node_modules$2f$uuid$2f$dist$2f$v4$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/uuid@13.0.0/node_modules/uuid/dist/v4.js [app-client] (ecmascript) <export default as v4>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$sonner$40$2$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/sonner@2.0.7_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$client$2d$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils/client-storage.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
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
const GlobalStateContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
const GlobalStateProvider = ({ children })=>{
    _s();
    const user = {
        id: "default-user",
        email: "user@example.com"
    };
    const entitlements = [
        "ultra-plan"
    ];
    const isMobile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$mobile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsMobile"])();
    const prevIsMobile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(isMobile);
    const [input, setInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [uploadedFiles, setUploadedFiles] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [chatMode, setChatMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "GlobalStateProvider.useState": ()=>{
            const saved = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$client$2d$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readChatMode"])();
            return saved === "ask" || saved === "agent" ? saved : "ask";
        }
    }["GlobalStateProvider.useState"]);
    const [chatTitle, setChatTitle] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [currentChatId, setCurrentChatId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isSwitchingChats, setIsSwitchingChats] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [sidebarOpen, setSidebarOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [sidebarContent, setSidebarContent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Persist chat mode preference to localStorage on change
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "GlobalStateProvider.useEffect": ()=>{
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$client$2d$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["writeChatMode"])(chatMode);
        }
    }["GlobalStateProvider.useEffect"], [
        chatMode
    ]);
    // Initialize chat sidebar state
    const [chatSidebarOpen, setChatSidebarOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "GlobalStateProvider.useState": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$sidebar$2d$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["chatSidebarStorage"].get(isMobile)
    }["GlobalStateProvider.useState"]);
    const [todos, setTodos] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isTodoPanelExpanded, setIsTodoPanelExpanded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const mergeTodos = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "GlobalStateProvider.useCallback[mergeTodos]": (newTodos)=>{
            setTodos({
                "GlobalStateProvider.useCallback[mergeTodos]": (currentTodos)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$todo$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mergeTodos"])(currentTodos, newTodos)
            }["GlobalStateProvider.useCallback[mergeTodos]"]);
        }
    }["GlobalStateProvider.useCallback[mergeTodos]"], []);
    const replaceAssistantTodos = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "GlobalStateProvider.useCallback[replaceAssistantTodos]": (incoming, sourceMessageId)=>{
            setTodos({
                "GlobalStateProvider.useCallback[replaceAssistantTodos]": (current)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$todo$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["computeReplaceAssistantTodos"])(current, incoming, sourceMessageId)
            }["GlobalStateProvider.useCallback[replaceAssistantTodos]"]);
        }
    }["GlobalStateProvider.useCallback[replaceAssistantTodos]"], []);
    const [chats, setChats] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [subscription, setSubscription] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("free");
    const [isCheckingProPlan, setIsCheckingProPlan] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const chatResetRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Rate limit warning dismissal state (persists across chat switches)
    const [hasUserDismissedRateLimitWarning, setHasUserDismissedRateLimitWarning] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Message queue state (for Agent mode queueing)
    const [messageQueue, setMessageQueue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    // Queue behavior preference (persisted to localStorage)
    const [queueBehavior, setQueueBehaviorState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "GlobalStateProvider.useState": ()=>{
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            const saved = localStorage.getItem("queue-behavior");
            if (saved === "queue" || saved === "stop-and-send") {
                return saved;
            }
            return "queue"; // Default: queue after current message completes
        }
    }["GlobalStateProvider.useState"]);
    // Sandbox preference (persisted to localStorage)
    const [sandboxPreference, setSandboxPreferenceState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "GlobalStateProvider.useState": ()=>{
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            return localStorage.getItem("sandbox-preference") || "e2b";
        }
    }["GlobalStateProvider.useState"]);
    // Persist queue behavior to localStorage
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "GlobalStateProvider.useEffect": ()=>{
            if ("TURBOPACK compile-time truthy", 1) {
                localStorage.setItem("queue-behavior", queueBehavior);
            }
        }
    }["GlobalStateProvider.useEffect"], [
        queueBehavior
    ]);
    // Persist sandbox preference to localStorage
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "GlobalStateProvider.useEffect": ()=>{
            if ("TURBOPACK compile-time truthy", 1) {
                localStorage.setItem("sandbox-preference", sandboxPreference);
            }
        }
    }["GlobalStateProvider.useEffect"], [
        sandboxPreference
    ]);
    // Initialize temporary chats from URL parameter
    const [temporaryChatsEnabled, setTemporaryChatsEnabled] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "GlobalStateProvider.useState": ()=>{
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            const urlParams = new URLSearchParams(window.location.search);
            return urlParams.get("temporary-chat") === "true";
        }
    }["GlobalStateProvider.useState"]);
    // Initialize team pricing dialog from URL hash
    const [teamPricingDialogOpen, setTeamPricingDialogOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "GlobalStateProvider.useState": ()=>{
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            return window.location.hash === "#team-pricing-seat-selection";
        }
    }["GlobalStateProvider.useState"]);
    // Initialize team welcome dialog from URL parameter
    const [teamWelcomeDialogOpen, setTeamWelcomeDialogOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "GlobalStateProvider.useState": ()=>{
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            const urlParams = new URLSearchParams(window.location.search);
            return urlParams.get("team-welcome") === "true";
        }
    }["GlobalStateProvider.useState"]);
    // Initialize PentestGPT migration confirm dialog from URL parameter
    const [migrateFromPentestgptDialogOpen, setMigrateFromPentestgptDialogOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "GlobalStateProvider.useState": ()=>{
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            const urlParams = new URLSearchParams(window.location.search);
            return urlParams.get("confirm-migrate-pentestgpt") === "true";
        }
    }["GlobalStateProvider.useState"]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "GlobalStateProvider.useEffect": ()=>{
            // Save state on desktop
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$sidebar$2d$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["chatSidebarStorage"].save(chatSidebarOpen, isMobile);
            // Close sidebar when transitioning from desktop to mobile
            if (!prevIsMobile.current && isMobile && chatSidebarOpen) {
                setChatSidebarOpen(false);
            }
            prevIsMobile.current = isMobile;
        }
    }["GlobalStateProvider.useEffect"], [
        chatSidebarOpen,
        isMobile
    ]);
    // Cleanup expired drafts on app initialization (once per session)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "GlobalStateProvider.useEffect": ()=>{
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$client$2d$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cleanupExpiredDrafts"])();
        }
    }["GlobalStateProvider.useEffect"], []); // Empty dependency array = runs once on mount
    // Derive subscription tier from current token entitlements
    // Prefer normalized entitlements ("pro-plan", "ultra-plan"); fall back to monthly/yearly keys for backward compatibility
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "GlobalStateProvider.useEffect": ()=>{
            setSubscription("ultra");
        }
    }["GlobalStateProvider.useEffect"], [
        user,
        entitlements
    ]);
    // Trigger aggregate migration for authenticated users (on-demand backfill)
    const ensureAggregatesMigrated = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$convex$40$1$2e$29$2e$2_react$40$19$2e$2$2e$1$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$react$2f$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])(__TURBOPACK__imported__module__$5b$project$5d2f$convex$2f$_generated$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].aggregateMigrations.ensureUserAggregatesMigrated);
    const hasMigrationRun = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const previousUserIdRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "GlobalStateProvider.useEffect": ()=>{
            const currentUserId = user?.id ?? null;
            // Reset migration flag if user changed (logout/login as different user)
            if (previousUserIdRef.current !== currentUserId) {
                hasMigrationRun.current = false;
                previousUserIdRef.current = currentUserId;
            }
            if (!user || hasMigrationRun.current) return;
            hasMigrationRun.current = true;
            ensureAggregatesMigrated().catch({
                "GlobalStateProvider.useEffect": (error)=>{
                    console.error("Failed to migrate user aggregates:", error);
                }
            }["GlobalStateProvider.useEffect"]);
        }
    }["GlobalStateProvider.useEffect"], [
        user,
        ensureAggregatesMigrated
    ]);
    // Refresh entitlements only when explicitly requested via URL param
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "GlobalStateProvider.useEffect": ()=>{
            const refreshFromUrl = {
                "GlobalStateProvider.useEffect.refreshFromUrl": async ()=>{
                    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
                    ;
                    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
                    ;
                    const url = new URL(window.location.href);
                    const shouldRefresh = url.searchParams.get("refresh") === "entitlements";
                    if (!shouldRefresh) return;
                    setIsCheckingProPlan(true);
                    try {
                        const controller = new AbortController();
                        const timeoutId = setTimeout({
                            "GlobalStateProvider.useEffect.refreshFromUrl.timeoutId": ()=>controller.abort()
                        }["GlobalStateProvider.useEffect.refreshFromUrl.timeoutId"], 10000);
                        const response = await fetch("/api/entitlements", {
                            credentials: "include",
                            signal: controller.signal
                        });
                        clearTimeout(timeoutId);
                        if (response.ok) {
                            const data = await response.json();
                            const tier = data.subscription;
                            setSubscription(tier === "ultra" || tier === "team" || tier === "pro" ? tier : "free");
                        } else {
                            if (response.status === 401) {
                                if ("TURBOPACK compile-time truthy", 1) {
                                    const { clientLogout } = await __turbopack_context__.A("[project]/lib/utils/logout.ts [app-client] (ecmascript, async loader)");
                                    clientLogout();
                                    return;
                                }
                            }
                            setSubscription("free");
                        }
                    } catch  {
                        setSubscription("free");
                    } finally{
                        setIsCheckingProPlan(false);
                        // Remove the refresh param to avoid repeated refreshes
                        url.searchParams.delete("refresh");
                        window.history.replaceState({}, "", url.toString());
                    }
                }
            }["GlobalStateProvider.useEffect.refreshFromUrl"];
            refreshFromUrl();
        }
    }["GlobalStateProvider.useEffect"], [
        user
    ]);
    // Listen for URL changes to sync temporary chat state
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "GlobalStateProvider.useEffect": ()=>{
            const handleUrlChange = {
                "GlobalStateProvider.useEffect.handleUrlChange": ()=>{
                    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
                    ;
                    const urlParams = new URLSearchParams(window.location.search);
                    const urlTemporaryEnabled = urlParams.get("temporary-chat") === "true";
                    // Only update state if it differs from URL to avoid infinite loops
                    if (temporaryChatsEnabled !== urlTemporaryEnabled) {
                        setTemporaryChatsEnabled(urlTemporaryEnabled);
                    }
                }
            }["GlobalStateProvider.useEffect.handleUrlChange"];
            // Listen for popstate events (browser back/forward)
            window.addEventListener("popstate", handleUrlChange);
            return ({
                "GlobalStateProvider.useEffect": ()=>{
                    window.removeEventListener("popstate", handleUrlChange);
                }
            })["GlobalStateProvider.useEffect"];
        }
    }["GlobalStateProvider.useEffect"], [
        temporaryChatsEnabled
    ]);
    // Listen for hash changes to sync team pricing dialog state
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "GlobalStateProvider.useEffect": ()=>{
            const handleHashChange = {
                "GlobalStateProvider.useEffect.handleHashChange": ()=>{
                    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
                    ;
                    const shouldOpen = window.location.hash === "#team-pricing-seat-selection";
                    // Only update state if it differs to avoid infinite loops
                    if (teamPricingDialogOpen !== shouldOpen) {
                        setTeamPricingDialogOpen(shouldOpen);
                    }
                }
            }["GlobalStateProvider.useEffect.handleHashChange"];
            // Listen for hash changes
            window.addEventListener("hashchange", handleHashChange);
            window.addEventListener("popstate", handleHashChange);
            return ({
                "GlobalStateProvider.useEffect": ()=>{
                    window.removeEventListener("hashchange", handleHashChange);
                    window.removeEventListener("popstate", handleHashChange);
                }
            })["GlobalStateProvider.useEffect"];
        }
    }["GlobalStateProvider.useEffect"], [
        teamPricingDialogOpen
    ]);
    // Listen for URL changes to sync team welcome dialog state
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "GlobalStateProvider.useEffect": ()=>{
            const handleUrlChange = {
                "GlobalStateProvider.useEffect.handleUrlChange": ()=>{
                    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
                    ;
                    const urlParams = new URLSearchParams(window.location.search);
                    const shouldOpen = urlParams.get("team-welcome") === "true";
                    // Only update state if it differs to avoid infinite loops
                    if (teamWelcomeDialogOpen !== shouldOpen) {
                        setTeamWelcomeDialogOpen(shouldOpen);
                    }
                }
            }["GlobalStateProvider.useEffect.handleUrlChange"];
            // Listen for popstate events (browser back/forward)
            window.addEventListener("popstate", handleUrlChange);
            return ({
                "GlobalStateProvider.useEffect": ()=>{
                    window.removeEventListener("popstate", handleUrlChange);
                }
            })["GlobalStateProvider.useEffect"];
        }
    }["GlobalStateProvider.useEffect"], [
        teamWelcomeDialogOpen
    ]);
    // Listen for URL changes to sync PentestGPT migration confirm dialog state
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "GlobalStateProvider.useEffect": ()=>{
            const handleUrlChange = {
                "GlobalStateProvider.useEffect.handleUrlChange": ()=>{
                    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
                    ;
                    const urlParams = new URLSearchParams(window.location.search);
                    const shouldOpen = urlParams.get("confirm-migrate-pentestgpt") === "true";
                    if (migrateFromPentestgptDialogOpen !== shouldOpen) {
                        setMigrateFromPentestgptDialogOpen(shouldOpen);
                    }
                }
            }["GlobalStateProvider.useEffect.handleUrlChange"];
            window.addEventListener("popstate", handleUrlChange);
            return ({
                "GlobalStateProvider.useEffect": ()=>{
                    window.removeEventListener("popstate", handleUrlChange);
                }
            })["GlobalStateProvider.useEffect"];
        }
    }["GlobalStateProvider.useEffect"], [
        migrateFromPentestgptDialogOpen
    ]);
    const clearInput = ()=>{
        setInput("");
    };
    const clearUploadedFiles = ()=>{
        setUploadedFiles([]);
    };
    // Calculate total tokens from all files that have tokens
    const getTotalTokens = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "GlobalStateProvider.useCallback[getTotalTokens]": ()=>{
            return uploadedFiles.reduce({
                "GlobalStateProvider.useCallback[getTotalTokens]": (total, file)=>{
                    return file.tokens ? total + file.tokens : total;
                }
            }["GlobalStateProvider.useCallback[getTotalTokens]"], 0);
        }
    }["GlobalStateProvider.useCallback[getTotalTokens]"], [
        uploadedFiles
    ]);
    // Check if any files are currently uploading or have errors
    const isUploadingFiles = uploadedFiles.some((file)=>file.uploading || file.error);
    const addUploadedFile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "GlobalStateProvider.useCallback[addUploadedFile]": (file)=>{
            setUploadedFiles({
                "GlobalStateProvider.useCallback[addUploadedFile]": (prev)=>[
                        ...prev,
                        file
                    ]
            }["GlobalStateProvider.useCallback[addUploadedFile]"]);
        }
    }["GlobalStateProvider.useCallback[addUploadedFile]"], []);
    const removeUploadedFile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "GlobalStateProvider.useCallback[removeUploadedFile]": (index)=>{
            setUploadedFiles({
                "GlobalStateProvider.useCallback[removeUploadedFile]": (prev)=>prev.filter({
                        "GlobalStateProvider.useCallback[removeUploadedFile]": (_, i)=>i !== index
                    }["GlobalStateProvider.useCallback[removeUploadedFile]"])
            }["GlobalStateProvider.useCallback[removeUploadedFile]"]);
        }
    }["GlobalStateProvider.useCallback[removeUploadedFile]"], []);
    const updateUploadedFile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "GlobalStateProvider.useCallback[updateUploadedFile]": (index, updates)=>{
            setUploadedFiles({
                "GlobalStateProvider.useCallback[updateUploadedFile]": (prev)=>prev.map({
                        "GlobalStateProvider.useCallback[updateUploadedFile]": (file, i)=>i === index ? {
                                ...file,
                                ...updates
                            } : file
                    }["GlobalStateProvider.useCallback[updateUploadedFile]"])
            }["GlobalStateProvider.useCallback[updateUploadedFile]"]);
        }
    }["GlobalStateProvider.useCallback[updateUploadedFile]"], []);
    // Message queue handlers
    const queueMessage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "GlobalStateProvider.useCallback[queueMessage]": (text, files)=>{
            setMessageQueue({
                "GlobalStateProvider.useCallback[queueMessage]": (prev)=>{
                    // Limit queue size to 10 messages
                    if (prev.length >= 10) {
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$sonner$40$2$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Queue is full", {
                            description: "Please wait for queued messages to send before adding more."
                        });
                        return prev;
                    }
                    const newMessage = {
                        id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$uuid$40$13$2e$0$2e$0$2f$node_modules$2f$uuid$2f$dist$2f$v4$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
                        text,
                        files,
                        timestamp: Date.now()
                    };
                    return [
                        ...prev,
                        newMessage
                    ];
                }
            }["GlobalStateProvider.useCallback[queueMessage]"]);
        }
    }["GlobalStateProvider.useCallback[queueMessage]"], []);
    const removeQueuedMessage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "GlobalStateProvider.useCallback[removeQueuedMessage]": (id)=>{
            setMessageQueue({
                "GlobalStateProvider.useCallback[removeQueuedMessage]": (prev)=>prev.filter({
                        "GlobalStateProvider.useCallback[removeQueuedMessage]": (msg)=>msg.id !== id
                    }["GlobalStateProvider.useCallback[removeQueuedMessage]"])
            }["GlobalStateProvider.useCallback[removeQueuedMessage]"]);
        }
    }["GlobalStateProvider.useCallback[removeQueuedMessage]"], []);
    const clearQueue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "GlobalStateProvider.useCallback[clearQueue]": ()=>{
            setMessageQueue([]);
        }
    }["GlobalStateProvider.useCallback[clearQueue]"], []);
    const dequeueNext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "GlobalStateProvider.useCallback[dequeueNext]": ()=>{
            let nextMessage = null;
            setMessageQueue({
                "GlobalStateProvider.useCallback[dequeueNext]": (prev)=>{
                    if (prev.length === 0) return prev;
                    nextMessage = prev[0];
                    return prev.slice(1);
                }
            }["GlobalStateProvider.useCallback[dequeueNext]"]);
            return nextMessage;
        }
    }["GlobalStateProvider.useCallback[dequeueNext]"], []);
    const initializeChat = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "GlobalStateProvider.useCallback[initializeChat]": (chatId, _fromRoute)=>{
            setIsSwitchingChats(true);
            setCurrentChatId(chatId);
            // Don't clear input here - let ChatInput restore draft automatically
            // setInput("");  // Removed - ChatInput will handle draft restoration
            setTodos([]);
            setIsTodoPanelExpanded(false);
        }
    }["GlobalStateProvider.useCallback[initializeChat]"], []);
    const initializeNewChat = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "GlobalStateProvider.useCallback[initializeNewChat]": ()=>{
            // Allow chat component to reset its local state immediately
            if (chatResetRef.current) {
                chatResetRef.current();
            }
            setCurrentChatId(null);
            setTodos([]);
            setIsTodoPanelExpanded(false);
            setChatTitle(null);
        }
    }["GlobalStateProvider.useCallback[initializeNewChat]"], []);
    const setChatReset = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "GlobalStateProvider.useCallback[setChatReset]": (fn)=>{
            chatResetRef.current = fn;
        }
    }["GlobalStateProvider.useCallback[setChatReset]"], []);
    const activateChat = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "GlobalStateProvider.useCallback[activateChat]": (chatId)=>{
            setCurrentChatId(chatId);
        }
    }["GlobalStateProvider.useCallback[activateChat]"], []);
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
    const setTemporaryChatsEnabledWithUrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "GlobalStateProvider.useCallback[setTemporaryChatsEnabledWithUrl]": (enabled)=>{
            setTemporaryChatsEnabled(enabled);
            if ("TURBOPACK compile-time truthy", 1) {
                const url = new URL(window.location.href);
                if (enabled) {
                    url.searchParams.set("temporary-chat", "true");
                } else {
                    url.searchParams.delete("temporary-chat");
                }
                window.history.replaceState({}, "", url.toString());
            }
        }
    }["GlobalStateProvider.useCallback[setTemporaryChatsEnabledWithUrl]"], []);
    // Custom setter for team welcome dialog that also updates URL
    const setTeamWelcomeDialogOpenWithUrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "GlobalStateProvider.useCallback[setTeamWelcomeDialogOpenWithUrl]": (open)=>{
            setTeamWelcomeDialogOpen(open);
            if ("TURBOPACK compile-time truthy", 1) {
                const url = new URL(window.location.href);
                if (!open) {
                    // Remove the param when dialog is closed
                    url.searchParams.delete("team-welcome");
                    window.history.replaceState({}, "", url.toString());
                }
            }
        }
    }["GlobalStateProvider.useCallback[setTeamWelcomeDialogOpenWithUrl]"], []);
    // Custom setter for PentestGPT migration confirm dialog that also updates URL
    const setMigrateFromPentestgptDialogOpenWithUrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "GlobalStateProvider.useCallback[setMigrateFromPentestgptDialogOpenWithUrl]": (open)=>{
            setMigrateFromPentestgptDialogOpen(open);
            if ("TURBOPACK compile-time truthy", 1) {
                const url = new URL(window.location.href);
                if (open) {
                    url.searchParams.set("confirm-migrate-pentestgpt", "true");
                } else {
                    url.searchParams.delete("confirm-migrate-pentestgpt");
                }
                window.history.replaceState({}, "", url.toString());
            }
        }
    }["GlobalStateProvider.useCallback[setMigrateFromPentestgptDialogOpenWithUrl]"], []);
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(GlobalStateContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/app/contexts/GlobalState.tsx",
        lineNumber: 729,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(GlobalStateProvider, "53FS5nI82A3tvZsZU5IaGckVBiY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$mobile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsMobile"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$convex$40$1$2e$29$2e$2_react$40$19$2e$2$2e$1$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$react$2f$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
_c = GlobalStateProvider;
const useGlobalState = ()=>{
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(GlobalStateContext);
    if (context === undefined) {
        throw new Error("useGlobalState must be used within a GlobalStateProvider");
    }
    return context;
};
_s1(useGlobalState, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "GlobalStateProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/utils/todo-block-manager.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useTodoBlockManager",
    ()=>useTodoBlockManager
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.28.5_@opentelemetry+api@1.9.0_@playwright+test@1.57.0_react-_bc0e796ca3d7ea4640f9d74c95225eb3/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
const useTodoBlockManager = ()=>{
    _s();
    const [messageTodoOpen, setMessageTodoOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const autoOpenTodoBlock = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTodoBlockManager.useCallback[autoOpenTodoBlock]": (messageId, blockId)=>{
            setMessageTodoOpen({
                "useTodoBlockManager.useCallback[autoOpenTodoBlock]": (prev)=>{
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
                }
            }["useTodoBlockManager.useCallback[autoOpenTodoBlock]"]);
        }
    }["useTodoBlockManager.useCallback[autoOpenTodoBlock]"], []);
    const toggleTodoBlock = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTodoBlockManager.useCallback[toggleTodoBlock]": (messageId, blockId)=>{
            setMessageTodoOpen({
                "useTodoBlockManager.useCallback[toggleTodoBlock]": (prev)=>{
                    const current = prev[messageId] || {
                        autoId: null,
                        manualIds: []
                    };
                    const isManual = current.manualIds.includes(blockId);
                    const isAuto = current.autoId === blockId;
                    if (isManual) {
                        // Remove from manual list
                        const nextManual = current.manualIds.filter({
                            "useTodoBlockManager.useCallback[toggleTodoBlock].nextManual": (id)=>id !== blockId
                        }["useTodoBlockManager.useCallback[toggleTodoBlock].nextManual"]);
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
                }
            }["useTodoBlockManager.useCallback[toggleTodoBlock]"]);
        }
    }["useTodoBlockManager.useCallback[toggleTodoBlock]"], []);
    const isBlockExpanded = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTodoBlockManager.useCallback[isBlockExpanded]": (messageId, blockId)=>{
            const stateForMessage = messageTodoOpen[messageId] || {
                autoId: null,
                manualIds: []
            };
            return stateForMessage.autoId === blockId || stateForMessage.manualIds.includes(blockId);
        }
    }["useTodoBlockManager.useCallback[isBlockExpanded]"], [
        messageTodoOpen
    ]);
    return {
        messageTodoOpen,
        autoOpenTodoBlock,
        toggleTodoBlock,
        isBlockExpanded
    };
};
_s(useTodoBlockManager, "eRcW6/8lrl7EOdXHqp9s73zGINQ=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/contexts/TodoBlockContext.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TodoBlockProvider",
    ()=>TodoBlockProvider,
    "useTodoBlockContext",
    ()=>useTodoBlockContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.28.5_@opentelemetry+api@1.9.0_@playwright+test@1.57.0_react-_bc0e796ca3d7ea4640f9d74c95225eb3/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.28.5_@opentelemetry+api@1.9.0_@playwright+test@1.57.0_react-_bc0e796ca3d7ea4640f9d74c95225eb3/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$todo$2d$block$2d$manager$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils/todo-block-manager.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
const TodoBlockContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
const TodoBlockProvider = ({ children })=>{
    _s();
    const { autoOpenTodoBlock, toggleTodoBlock, isBlockExpanded } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$todo$2d$block$2d$manager$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTodoBlockManager"])();
    const value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "TodoBlockProvider.useMemo[value]": ()=>({
                autoOpenTodoBlock,
                toggleTodoBlock,
                isBlockExpanded
            })
    }["TodoBlockProvider.useMemo[value]"], [
        autoOpenTodoBlock,
        toggleTodoBlock,
        isBlockExpanded
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TodoBlockContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/app/contexts/TodoBlockContext.tsx",
        lineNumber: 36,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(TodoBlockProvider, "ElxUOImbLEGDYUMoHrOPH0DyNr8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$todo$2d$block$2d$manager$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTodoBlockManager"]
    ];
});
_c = TodoBlockProvider;
const useTodoBlockContext = ()=>{
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(TodoBlockContext);
    if (context === undefined) {
        throw new Error("useTodoBlockContext must be used within a TodoBlockProvider");
    }
    return context;
};
_s1(useTodoBlockContext, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "TodoBlockProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/DataStreamProvider.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DataStreamProvider",
    ()=>DataStreamProvider,
    "useDataStream",
    ()=>useDataStream
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.28.5_@opentelemetry+api@1.9.0_@playwright+test@1.57.0_react-_bc0e796ca3d7ea4640f9d74c95225eb3/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.28.5_@opentelemetry+api@1.9.0_@playwright+test@1.57.0_react-_bc0e796ca3d7ea4640f9d74c95225eb3/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
const DataStreamContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(null);
function DataStreamProvider({ children }) {
    _s();
    const [dataStream, setDataStream] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isAutoResuming, setIsAutoResuming] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DataStreamProvider.useMemo[value]": ()=>({
                dataStream,
                setDataStream,
                isAutoResuming,
                setIsAutoResuming
            })
    }["DataStreamProvider.useMemo[value]"], [
        dataStream,
        isAutoResuming
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DataStreamContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/app/components/DataStreamProvider.tsx",
        lineNumber: 34,
        columnNumber: 5
    }, this);
}
_s(DataStreamProvider, "+KAjOoKYxRdOWpMkx7WHluxQ6cA=");
_c = DataStreamProvider;
function useDataStream() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(DataStreamContext);
    if (!context) {
        throw new Error("useDataStream must be used within a DataStreamProvider");
    }
    return context;
}
_s1(useDataStream, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "DataStreamProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_17b673a8._.js.map