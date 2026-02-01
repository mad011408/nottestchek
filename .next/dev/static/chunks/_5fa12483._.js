(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/lib/utils/file-utils.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MAX_FILES_LIMIT",
    ()=>MAX_FILES_LIMIT,
    "createFileMessagePart",
    ()=>createFileMessagePart,
    "createFileMessagePartFromUploadedFile",
    ()=>createFileMessagePartFromUploadedFile,
    "fileToBase64",
    ()=>fileToBase64,
    "formatFileSize",
    ()=>formatFileSize,
    "getMaxFileSize",
    ()=>getMaxFileSize,
    "isImageFile",
    ()=>isImageFile,
    "isSupportedImageMediaType",
    ()=>isSupportedImageMediaType,
    "uploadSingleFileToConvex",
    ()=>uploadSingleFileToConvex,
    "validateFile",
    ()=>validateFile
]);
async function uploadSingleFileToConvex(file, generateUploadUrl, saveFile, mode = "ask") {
    // Step 1: Get upload URL
    const postUrl = await generateUploadUrl();
    // Step 2: Upload file to Convex storage
    // Use a fallback Content-Type if browser doesn't provide one (common for .md, .txt files)
    const contentType = file.type || "application/octet-stream";
    const result = await fetch(postUrl, {
        method: "POST",
        headers: {
            "Content-Type": contentType
        },
        body: file
    });
    if (!result.ok) {
        throw new Error(`Failed to upload file ${file.name}: ${result.statusText}`);
    }
    const { storageId } = await result.json();
    // Step 3: Save file metadata to database and get URL, file ID, and tokens
    const { url, fileId, tokens } = await saveFile({
        storageId,
        name: file.name,
        mediaType: contentType,
        size: file.size,
        mode
    });
    return {
        fileId,
        url,
        tokens
    };
}
function createFileMessagePart(uploadedFile) {
    if (!uploadedFile.fileId) {
        throw new Error("File must have fileId to create message part");
    }
    // Use fallback for empty media types (common for .md, .txt files)
    const mediaType = uploadedFile.file.type || "application/octet-stream";
    return {
        type: "file",
        mediaType,
        fileId: uploadedFile.fileId,
        name: uploadedFile.file.name,
        size: uploadedFile.file.size
    };
}
function getMaxFileSize() {
    return 10 * 1024 * 1024; // 10MB
}
function validateFile(file) {
    if (file.size > getMaxFileSize()) {
        return {
            valid: false,
            error: `File size must be less than ${getMaxFileSize() / (1024 * 1024)}MB`
        };
    }
    return {
        valid: true
    };
}
function formatFileSize(bytes) {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = [
        "B",
        "KB",
        "MB",
        "GB"
    ];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}
function fileToBase64(file) {
    return new Promise((resolve, reject)=>{
        const reader = new FileReader();
        reader.onload = ()=>resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}
function isImageFile(file) {
    return file.type.startsWith("image/");
}
function isSupportedImageMediaType(mediaType) {
    const supportedTypes = [
        "image/png",
        "image/jpeg",
        "image/jpg",
        "image/webp",
        "image/gif"
    ];
    return supportedTypes.includes(mediaType.toLowerCase());
}
const MAX_FILES_LIMIT = 5;
function createFileMessagePartFromUploadedFile(uploadedFile) {
    if (!uploadedFile.fileId || !uploadedFile.uploaded) {
        return null;
    }
    return {
        type: "file",
        mediaType: uploadedFile.file.type,
        fileId: uploadedFile.fileId,
        name: uploadedFile.file.name,
        size: uploadedFile.file.size
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/token-utils.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FILE_READ_TRUNCATION_MESSAGE",
    ()=>FILE_READ_TRUNCATION_MESSAGE,
    "MAX_TOKENS_FILE",
    ()=>MAX_TOKENS_FILE,
    "MAX_TOKENS_FREE",
    ()=>MAX_TOKENS_FREE,
    "MAX_TOKENS_PRO_AND_TEAM",
    ()=>MAX_TOKENS_PRO_AND_TEAM,
    "MAX_TOKENS_ULTRA",
    ()=>MAX_TOKENS_ULTRA,
    "STREAM_MAX_TOKENS",
    ()=>STREAM_MAX_TOKENS,
    "TIMEOUT_MESSAGE",
    ()=>TIMEOUT_MESSAGE,
    "TOOL_DEFAULT_MAX_TOKENS",
    ()=>TOOL_DEFAULT_MAX_TOKENS,
    "TRUNCATION_MESSAGE",
    ()=>TRUNCATION_MESSAGE,
    "countInputTokens",
    ()=>countInputTokens,
    "countMessagesTokens",
    ()=>countMessagesTokens,
    "getMaxTokensForSubscription",
    ()=>getMaxTokensForSubscription,
    "sliceByTokens",
    ()=>sliceByTokens,
    "truncateContent",
    ()=>truncateContent,
    "truncateMessagesToTokenLimit",
    ()=>truncateMessagesToTokenLimit,
    "truncateOutput",
    ()=>truncateOutput
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$main$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/gpt-tokenizer@3.4.0/node_modules/gpt-tokenizer/esm/main.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$encoding$2f$o200k_base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/gpt-tokenizer@3.4.0/node_modules/gpt-tokenizer/esm/encoding/o200k_base.js [app-client] (ecmascript)");
;
const MAX_TOKENS_FREE = 16000;
const MAX_TOKENS_PRO_AND_TEAM = 32000;
const MAX_TOKENS_ULTRA = 100000;
const MAX_TOKENS_FILE = 24000;
const getMaxTokensForSubscription = (subscription)=>{
    if (subscription === "ultra") return MAX_TOKENS_ULTRA;
    if (subscription === "pro" || subscription === "team") return MAX_TOKENS_PRO_AND_TEAM;
    return MAX_TOKENS_FREE;
};
const STREAM_MAX_TOKENS = 2048;
const TOOL_DEFAULT_MAX_TOKENS = 2048;
const TRUNCATION_MESSAGE = "\n\n[... OUTPUT TRUNCATED - middle content removed to fit context limits ...]\n\n";
const FILE_READ_TRUNCATION_MESSAGE = "\n\n[Content truncated due to size limit. Use line ranges to read in chunks]";
const TIMEOUT_MESSAGE = (seconds, pid)=>pid ? `\n\nCommand output paused after ${seconds} seconds. Command continues in background with PID: ${pid}` : `\n\nCommand output paused after ${seconds} seconds. Command continues in background.`;
_c = TIMEOUT_MESSAGE;
/**
 * Count tokens for a single message part
 */ const countPartTokens = (part, fileTokens = {})=>{
    if (part.type === "text" && "text" in part) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$encoding$2f$o200k_base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["countTokens"])(part.text || "");
    }
    if (part.type === "file" && "fileId" in part && part.fileId) {
        const fileId = part.fileId;
        return fileTokens[fileId] || 0;
    }
    // For tool-call, tool-result, and other part types, count their JSON structure
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$encoding$2f$o200k_base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["countTokens"])(JSON.stringify(part));
};
/**
 * Extracts and counts tokens from message text and file tokens (excluding reasoning blocks)
 */ const getMessageTokenCountWithFiles = (message, fileTokens = {})=>{
    // Filter out reasoning blocks before counting tokens
    const partsWithoutReasoning = message.parts.filter((part)=>part.type !== "step-start" && part.type !== "reasoning");
    // Count tokens for all parts
    const totalTokens = partsWithoutReasoning.reduce((sum, part)=>sum + countPartTokens(part, fileTokens), 0);
    return totalTokens;
};
const truncateMessagesToTokenLimit = (messages, fileTokens = {}, maxTokens = MAX_TOKENS_FREE)=>{
    if (messages.length === 0) return messages;
    const result = [];
    let totalTokens = 0;
    // Process from newest to oldest
    for(let i = messages.length - 1; i >= 0; i--){
        const messageTokens = getMessageTokenCountWithFiles(messages[i], fileTokens);
        if (totalTokens + messageTokens > maxTokens) break;
        totalTokens += messageTokens;
        result.unshift(messages[i]);
    }
    return result;
};
const countMessagesTokens = (messages, fileTokens = {})=>{
    return messages.reduce((total, message)=>total + getMessageTokenCountWithFiles(message, fileTokens), 0);
};
const truncateContent = (content, marker = TRUNCATION_MESSAGE)=>{
    const tokens = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$encoding$2f$o200k_base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["encode"])(content);
    if (tokens.length <= TOOL_DEFAULT_MAX_TOKENS) return content;
    const markerTokens = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$encoding$2f$o200k_base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["countTokens"])(marker);
    if (TOOL_DEFAULT_MAX_TOKENS <= markerTokens) {
        return TOOL_DEFAULT_MAX_TOKENS <= 0 ? "" : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$encoding$2f$o200k_base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["decode"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$encoding$2f$o200k_base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["encode"])(marker).slice(-TOOL_DEFAULT_MAX_TOKENS));
    }
    const budgetForContent = TOOL_DEFAULT_MAX_TOKENS - markerTokens;
    // 25% head + 75% tail strategy
    const headBudget = Math.floor(budgetForContent * 0.25);
    const tailBudget = budgetForContent - headBudget;
    const headTokens = tokens.slice(0, headBudget);
    const tailTokens = tokens.slice(-tailBudget);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$encoding$2f$o200k_base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["decode"])(headTokens) + marker + (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$encoding$2f$o200k_base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["decode"])(tailTokens);
};
const sliceByTokens = (content, maxTokens)=>{
    if (maxTokens <= 0) return "";
    const tokens = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$encoding$2f$o200k_base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["encode"])(content);
    if (tokens.length <= maxTokens) return content;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$encoding$2f$o200k_base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["decode"])(tokens.slice(0, maxTokens));
};
const countInputTokens = (input, uploadedFiles = [])=>{
    const textTokens = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$encoding$2f$o200k_base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["countTokens"])(input);
    const fileTokens = uploadedFiles.reduce((total, file)=>total + (file.tokens || 0), 0);
    return textTokens + fileTokens;
};
function truncateOutput(args) {
    const { content, mode } = args;
    const suffix = mode === "read-file" ? FILE_READ_TRUNCATION_MESSAGE : TRUNCATION_MESSAGE;
    return truncateContent(content, suffix);
}
var _c;
__turbopack_context__.k.register(_c, "TIMEOUT_MESSAGE");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/utils/shiki.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ShikiErrorBoundary",
    ()=>ShikiErrorBoundary,
    "isLanguageSupported",
    ()=>isLanguageSupported
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.28.5_@opentelemetry+api@1.9.0_@playwright+test@1.57.0_react-_bc0e796ca3d7ea4640f9d74c95225eb3/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$shiki$40$3$2e$19$2e$0$2f$node_modules$2f$shiki$2f$dist$2f$langs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/shiki@3.19.0/node_modules/shiki/dist/langs.mjs [app-client] (ecmascript)");
;
;
// Create a Set of all supported language IDs and aliases from Shiki
const SUPPORTED_LANGUAGES = new Set(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$shiki$40$3$2e$19$2e$0$2f$node_modules$2f$shiki$2f$dist$2f$langs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["bundledLanguagesInfo"].flatMap((lang)=>[
        lang.id,
        ...lang.aliases || []
    ]));
const isLanguageSupported = (lang)=>{
    if (!lang) return false;
    return SUPPORTED_LANGUAGES.has(lang.toLowerCase());
};
class ShikiErrorBoundary extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Component"] {
    state = {
        hasError: false
    };
    static getDerivedStateFromError(error) {
        console.log("[ShikiErrorBoundary] Caught error:", error.message);
        return {
            hasError: true
        };
    }
    componentDidCatch(error) {
        console.log("[ShikiErrorBoundary] Error caught and suppressed:", error.message);
    }
    render() {
        const { hasError } = this.state;
        return hasError ? this.props.fallback : this.props.children;
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/utils/message-utils.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Utility functions for processing message parts
 */ __turbopack_context__.s([
    "extractMessageText",
    ()=>extractMessageText,
    "extractWebSourcesFromMessage",
    ()=>extractWebSourcesFromMessage,
    "findLastAssistantMessageIndex",
    ()=>findLastAssistantMessageIndex,
    "hasTextContent",
    ()=>hasTextContent
]);
const extractMessageText = (parts)=>{
    return parts.filter((part)=>part.type === "text").map((part)=>part.text || "").join("");
};
const hasTextContent = (parts)=>{
    return parts.some((part)=>part.type === "text" && part.text && part.text.trim() !== "" || part.type === "step-start" || part.type.startsWith("tool-"));
};
const findLastAssistantMessageIndex = (messages)=>{
    return messages.map((msg, index)=>({
            msg,
            index
        })).reverse().find(({ msg })=>msg.role === "assistant")?.index;
};
const extractWebSourcesFromMessage = (message)=>{
    const sources = [];
    const parts = Array.isArray(message?.parts) ? message.parts : [];
    for (const part of parts){
        if (part?.type === "tool-web" || part?.type === "tool-web_search") {
            if (part.state !== "output-available") continue;
            const output = part.output;
            let results = undefined;
            if (Array.isArray(output)) {
                results = output;
            } else if (Array.isArray(output?.result)) {
                results = output.result;
            } else if (Array.isArray(output?.results)) {
                results = output.results;
            }
            if (Array.isArray(results)) {
                for (const r of results){
                    const url = r?.url || r?.id;
                    if (!url || typeof url !== "string") continue;
                    sources.push({
                        title: r?.title,
                        url,
                        text: r?.text,
                        publishedDate: r?.publishedDate
                    });
                }
            }
        }
    }
    return sources;
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/utils/sidebar-utils.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "extractAllSidebarContent",
    ()=>extractAllSidebarContent
]);
function extractAllSidebarContent(messages) {
    const contentList = [];
    messages.forEach((message)=>{
        if (message.role !== "assistant" || !message.parts) return;
        // Collect terminal output from data-terminal parts (for streaming)
        const terminalDataMap = new Map();
        // Collect Python output from data-python parts (for streaming)
        const pythonDataMap = new Map();
        // Collect diff data from data-diff parts (for search_replace UI-only diff display)
        const diffDataMap = new Map();
        message.parts.forEach((part)=>{
            if (part.type === "data-terminal" && part.data?.toolCallId) {
                const toolCallId = part.data.toolCallId;
                const terminalOutput = part.data?.terminal || "";
                const existing = terminalDataMap.get(toolCallId) || "";
                terminalDataMap.set(toolCallId, existing + terminalOutput);
            }
            if (part.type === "data-python" && part.data?.toolCallId) {
                const toolCallId = part.data.toolCallId;
                const pythonOutput = part.data?.terminal || ""; // Python uses same 'terminal' field
                const existing = pythonDataMap.get(toolCallId) || "";
                pythonDataMap.set(toolCallId, existing + pythonOutput);
            }
            if (part.type === "data-diff" && part.data?.toolCallId) {
                const toolCallId = part.data.toolCallId;
                diffDataMap.set(toolCallId, {
                    originalContent: part.data.originalContent || "",
                    modifiedContent: part.data.modifiedContent || ""
                });
            }
        });
        message.parts.forEach((part)=>{
            // Terminal
            if (part.type === "tool-run_terminal_cmd" && part.input?.command) {
                const command = part.input.command;
                // Get streaming output from data-terminal parts
                const streamingOutput = terminalDataMap.get(part.toolCallId || "") || "";
                // Extract output from result object (handles both new and legacy formats)
                const result = part.output?.result;
                let output = "";
                if (result) {
                    // New format: result.output
                    if (typeof result.output === "string") {
                        output = result.output;
                    } else if (result.stdout !== undefined || result.stderr !== undefined) {
                        output = (result.stdout || "") + (result.stderr || "");
                    } else if (typeof result === "string") {
                        output = result;
                    }
                }
                // Fallback to streaming output or direct output property
                const finalOutput = output || streamingOutput || part.output?.output || "";
                contentList.push({
                    command,
                    output: finalOutput,
                    isExecuting: part.state === "input-available" || part.state === "running",
                    isBackground: part.input.is_background,
                    toolCallId: part.toolCallId || ""
                });
            }
            // Python
            if (part.type === "tool-python" && part.input?.code) {
                const code = part.input.code;
                // Get streaming output from data-python parts
                const streamingOutput = pythonDataMap.get(part.toolCallId || "") || "";
                const result = part.output?.result;
                let output = "";
                if (result) {
                    // New format: result.output
                    if (typeof result.output === "string") {
                        output = result.output;
                    } else if (result.stdout !== undefined || result.stderr !== undefined) {
                        output = (result.stdout || "") + (result.stderr || "");
                    } else if (typeof result === "string") {
                        output = result;
                    }
                }
                const finalOutput = output || streamingOutput || part.output?.output || "";
                contentList.push({
                    code,
                    output: finalOutput,
                    isExecuting: part.state === "input-available" || part.state === "running",
                    toolCallId: part.toolCallId || ""
                });
            }
            // File Operations - only extract when output is available
            // This ensures content is ready when auto-following
            if ((part.type === "tool-read_file" || part.type === "tool-write_file" || part.type === "tool-search_replace" || part.type === "tool-multi_edit") && part.state === "output-available") {
                const fileInput = part.input;
                if (!fileInput) return;
                const filePath = fileInput.file_path || fileInput.path || fileInput.target_file || "";
                if (!filePath) return;
                let action = "reading";
                let content = "";
                let range = undefined;
                if (part.type === "tool-read_file") {
                    action = "reading";
                    // Extract result - handle both string and object formats
                    const result = part.output?.result;
                    let rawContent = "";
                    if (typeof result === "string") {
                        rawContent = result;
                    } else if (result && typeof result === "object") {
                        // If result is an object, try to extract content
                        rawContent = result.content || result.text || result.result || "";
                    }
                    // Clean line numbers from read output (only if we have content)
                    if (rawContent) {
                        content = rawContent.replace(/^\s*\d+\|/gm, "");
                    }
                    if (fileInput.offset && fileInput.limit) {
                        range = {
                            start: fileInput.offset,
                            end: fileInput.offset + fileInput.limit - 1
                        };
                    }
                } else if (part.type === "tool-write_file") {
                    action = "writing";
                    content = fileInput.contents || fileInput.content || "";
                } else if (part.type === "tool-search_replace" || part.type === "tool-multi_edit") {
                    action = "editing";
                    // Extract result - handle both string and object formats
                    const result = part.output?.result;
                    if (typeof result === "string") {
                        content = result;
                    } else if (result && typeof result === "object") {
                        content = result.content || result.text || result.result || "";
                    } else {
                        content = "";
                    }
                }
                // For search_replace, try to get diff data from data-diff parts (not persisted across reloads)
                let originalContent;
                let modifiedContent;
                if (part.type === "tool-search_replace" && part.toolCallId) {
                    const streamedDiff = diffDataMap.get(part.toolCallId);
                    if (streamedDiff) {
                        originalContent = streamedDiff.originalContent;
                        modifiedContent = streamedDiff.modifiedContent;
                    }
                }
                contentList.push({
                    path: filePath,
                    content: modifiedContent || content,
                    range,
                    action,
                    toolCallId: part.toolCallId || "",
                    originalContent,
                    modifiedContent
                });
            }
        });
    });
    return contentList;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/actions/data:862455 [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"003f9b8585cd6937dff29c5655a01c0dea65bc92d2":"default"},"lib/actions/billing-portal.ts",""] */ __turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.28.5_@opentelemetry+api@1.9.0_@playwright+test@1.57.0_react-_bc0e796ca3d7ea4640f9d74c95225eb3/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
"use turbopack no side effects";
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("003f9b8585cd6937dff29c5655a01c0dea65bc92d2", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "default");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vYmlsbGluZy1wb3J0YWwudHMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc2VydmVyXCI7XG5cbmltcG9ydCB7IHJlZGlyZWN0IH0gZnJvbSBcIm5leHQvbmF2aWdhdGlvblwiO1xuaW1wb3J0IHsgc3RyaXBlIH0gZnJvbSBcIi4uLy4uL2FwcC9hcGkvc3RyaXBlXCI7XG5pbXBvcnQgeyB3b3Jrb3MgfSBmcm9tIFwiQC9hcHAvYXBpL3dvcmtvc1wiO1xuaW1wb3J0IHsgd2l0aEF1dGggfSBmcm9tIFwiQHdvcmtvcy1pbmMvYXV0aGtpdC1uZXh0anNcIjtcblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24gcmVkaXJlY3RUb0JpbGxpbmdQb3J0YWwoKSB7XG4gIGNvbnN0IHsgb3JnYW5pemF0aW9uSWQsIHVzZXIgfSA9IGF3YWl0IHdpdGhBdXRoKCk7XG5cbiAgaWYgKCF1c2VyPy5pZCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIlVzZXIgbm90IGF1dGhlbnRpY2F0ZWRcIik7XG4gIH1cblxuICBpZiAoIW9yZ2FuaXphdGlvbklkKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiTm8gb3JnYW5pemF0aW9uIGZvdW5kXCIpO1xuICB9XG5cbiAgLy8gQ2hlY2sgaWYgdXNlciBpcyBhbiBhZG1pbiBvZiB0aGUgb3JnYW5pemF0aW9uIChmb3IgdGVhbSBzdWJzY3JpcHRpb25zKVxuICBjb25zdCBtZW1iZXJzaGlwcyA9IGF3YWl0IHdvcmtvcy51c2VyTWFuYWdlbWVudC5saXN0T3JnYW5pemF0aW9uTWVtYmVyc2hpcHMoe1xuICAgIHVzZXJJZDogdXNlci5pZCxcbiAgICBvcmdhbml6YXRpb25JZCxcbiAgICBzdGF0dXNlczogW1wiYWN0aXZlXCJdLFxuICB9KTtcblxuICBjb25zdCB1c2VyTWVtYmVyc2hpcCA9IG1lbWJlcnNoaXBzLmRhdGFbMF07XG4gIGlmICghdXNlck1lbWJlcnNoaXApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJVc2VyIGlzIG5vdCBhIG1lbWJlciBvZiB0aGlzIG9yZ2FuaXphdGlvblwiKTtcbiAgfVxuXG4gIC8vIE9ubHkgYWRtaW5zIGNhbiBhY2Nlc3MgYmlsbGluZyBwb3J0YWwgZm9yIHRlYW0gc3Vic2NyaXB0aW9uc1xuICBpZiAodXNlck1lbWJlcnNoaXAucm9sZT8uc2x1ZyAhPT0gXCJhZG1pblwiKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiT25seSBhZG1pbnMgY2FuIG1hbmFnZSBiaWxsaW5nXCIpO1xuICB9XG5cbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcbiAgICBgJHt3b3Jrb3MuYmFzZVVSTH0vb3JnYW5pemF0aW9ucy8ke29yZ2FuaXphdGlvbklkfWAsXG4gICAge1xuICAgICAgaGVhZGVyczoge1xuICAgICAgICBBdXRob3JpemF0aW9uOiBgQmVhcmVyICR7cHJvY2Vzcy5lbnYuV09SS09TX0FQSV9LRVl9YCxcbiAgICAgICAgXCJjb250ZW50LXR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICB9LFxuICAgIH0sXG4gICk7XG4gIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJGYWlsZWQgdG8gZmV0Y2ggb3JnYW5pemF0aW9uIGRldGFpbHNcIik7XG4gIH1cbiAgY29uc3Qgd29ya29zT3JnID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuXG4gIGlmICghd29ya29zT3JnPy5zdHJpcGVfY3VzdG9tZXJfaWQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJObyBiaWxsaW5nIGFjY291bnQgZm91bmQgZm9yIHRoaXMgb3JnYW5pemF0aW9uXCIpO1xuICB9XG5cbiAgY29uc3QgYmFzZVVybCA9IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX0JBU0VfVVJMO1xuICBjb25zdCBiaWxsaW5nUG9ydGFsU2Vzc2lvbiA9IGF3YWl0IHN0cmlwZS5iaWxsaW5nUG9ydGFsLnNlc3Npb25zLmNyZWF0ZSh7XG4gICAgY3VzdG9tZXI6IHdvcmtvc09yZy5zdHJpcGVfY3VzdG9tZXJfaWQsXG4gICAgcmV0dXJuX3VybDogYCR7YmFzZVVybH1gLFxuICB9KTtcblxuICBpZiAoIWJpbGxpbmdQb3J0YWxTZXNzaW9uPy51cmwpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJGYWlsZWQgdG8gY3JlYXRlIGJpbGxpbmcgcG9ydGFsIHNlc3Npb25cIik7XG4gIH1cbiAgcmVkaXJlY3QoYmlsbGluZ1BvcnRhbFNlc3Npb24udXJsKTtcbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoia1NBTzhCIn0=
}),
"[project]/lib/pricing/features.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "freeFeatures",
    ()=>freeFeatures,
    "proFeatures",
    ()=>proFeatures,
    "teamFeatures",
    ()=>teamFeatures,
    "ultraFeatures",
    ()=>ultraFeatures
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$556$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkle$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.556.0_react@19.2.1/node_modules/lucide-react/dist/esm/icons/sparkle.js [app-client] (ecmascript) <export default as Sparkle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$556$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$messages$2d$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessagesSquare$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.556.0_react@19.2.1/node_modules/lucide-react/dist/esm/icons/messages-square.js [app-client] (ecmascript) <export default as MessagesSquare>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$556$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$brain$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Brain$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.556.0_react@19.2.1/node_modules/lucide-react/dist/esm/icons/brain.js [app-client] (ecmascript) <export default as Brain>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$556$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.556.0_react@19.2.1/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$556$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.556.0_react@19.2.1/node_modules/lucide-react/dist/esm/icons/upload.js [app-client] (ecmascript) <export default as Upload>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$556$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flask$2d$conical$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FlaskConical$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.556.0_react@19.2.1/node_modules/lucide-react/dist/esm/icons/flask-conical.js [app-client] (ecmascript) <export default as FlaskConical>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$556$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2d$terminal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SquareTerminal$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.556.0_react@19.2.1/node_modules/lucide-react/dist/esm/icons/square-terminal.js [app-client] (ecmascript) <export default as SquareTerminal>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$556$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$credit$2d$card$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CreditCard$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.556.0_react@19.2.1/node_modules/lucide-react/dist/esm/icons/credit-card.js [app-client] (ecmascript) <export default as CreditCard>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$556$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.556.0_react@19.2.1/node_modules/lucide-react/dist/esm/icons/users.js [app-client] (ecmascript) <export default as Users>");
;
const freeFeatures = [
    {
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$556$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkle$3e$__["Sparkle"],
        text: "Access to basic AI model"
    },
    {
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$556$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"],
        text: "Limited and slower responses"
    },
    {
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$556$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$brain$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Brain$3e$__["Brain"],
        text: "Basic memory and context"
    }
];
const proFeatures = [
    {
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$556$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkle$3e$__["Sparkle"],
        text: "Access to smartest AI model"
    },
    {
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$556$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$messages$2d$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessagesSquare$3e$__["MessagesSquare"],
        text: "Expanded messaging"
    },
    {
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$556$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__["Upload"],
        text: "Access to file uploads"
    },
    {
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$556$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2d$terminal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SquareTerminal$3e$__["SquareTerminal"],
        text: "Agent mode with terminal"
    },
    {
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$556$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$brain$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Brain$3e$__["Brain"],
        text: "Expanded memory and context"
    }
];
const ultraFeatures = [
    {
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$556$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$messages$2d$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessagesSquare$3e$__["MessagesSquare"],
        text: "Unlimited messages and uploads"
    },
    {
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$556$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$brain$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Brain$3e$__["Brain"],
        text: "Maximum memory and context"
    },
    {
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$556$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2d$terminal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SquareTerminal$3e$__["SquareTerminal"],
        text: "Expanded Agent mode"
    },
    {
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$556$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flask$2d$conical$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FlaskConical$3e$__["FlaskConical"],
        text: "Research preview of new features"
    }
];
const teamFeatures = [
    {
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$556$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkle$3e$__["Sparkle"],
        text: "Everything in Pro and more: access to smartest AI model, expanded messaging, file uploads, agent mode with terminal, expanded memory and context"
    },
    {
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$556$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$credit$2d$card$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CreditCard$3e$__["CreditCard"],
        text: "Centralized billing and invoicing"
    },
    {
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$556$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"],
        text: "Advanced team + seat management"
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
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
"[project]/lib/utils/message-processor.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "normalizeMessages",
    ()=>normalizeMessages
]);
const normalizeMessages = (messages)=>{
    // Early return for empty messages
    if (!messages || messages.length === 0) {
        return {
            messages: [],
            lastMessage: [],
            hasChanges: false
        };
    }
    // Quick check: if no assistant messages, skip processing
    const hasAssistantMessages = messages.some((m)=>m.role === "assistant");
    if (!hasAssistantMessages) {
        const lastUserMessage = messages.slice().reverse().find((msg)=>msg.role === "user");
        return {
            messages,
            lastMessage: lastUserMessage ? [
                lastUserMessage
            ] : [],
            hasChanges: false
        };
    }
    let hasChanges = false;
    const normalizedMessages = messages.map((message)=>{
        // Only process assistant messages
        if (message.role !== "assistant" || !message.parts) {
            return message;
        }
        const processedParts = [];
        let messageChanged = false;
        // Collect terminal output from data-terminal parts (only terminal tools use data streaming)
        const terminalDataMap = new Map();
        message.parts.forEach((part)=>{
            const dataPart = part;
            // Only handle data-terminal parts (other tools don't use data streaming)
            if (dataPart.type === "data-terminal" && dataPart.data?.toolCallId) {
                const toolCallId = dataPart.data.toolCallId;
                const terminalOutput = dataPart.data.terminal || "";
                // Accumulate terminal output for each toolCallId
                const existing = terminalDataMap.get(toolCallId) || "";
                terminalDataMap.set(toolCallId, existing + terminalOutput);
                messageChanged = true; // Data-terminal parts will be removed
            }
        });
        // Process each part, transform incomplete tools, and filter out data-terminal parts
        message.parts.forEach((part)=>{
            const toolPart = part;
            // Skip data-terminal parts - we've already collected their data
            if (toolPart.type === "data-terminal") {
                messageChanged = true; // Part is being removed
                return;
            }
            // Check if this is a tool part that needs transformation
            if (toolPart.type?.startsWith("tool-")) {
                if (toolPart.state === "input-available") {
                    // Transform incomplete tools to completed state
                    const transformedPart = transformIncompleteToolPart(toolPart, terminalDataMap);
                    processedParts.push(transformedPart);
                    messageChanged = true; // Part is being transformed
                } else if (toolPart.state === "input-streaming") {
                    // Transform streaming tools to completed state (they were interrupted)
                    const transformedPart = transformIncompleteToolPart({
                        ...toolPart,
                        state: "input-available"
                    }, terminalDataMap);
                    processedParts.push(transformedPart);
                    messageChanged = true; // Part is being transformed
                } else {
                    // Keep completed tools unchanged
                    processedParts.push(part);
                }
            } else {
                // Keep non-tool parts unchanged
                processedParts.push(part);
            }
        });
        if (messageChanged) {
            hasChanges = true;
        }
        return messageChanged ? {
            ...message,
            parts: processedParts
        } : message;
    });
    // Prepare last message array with only the last user message
    const lastUserMessage = normalizedMessages.slice().reverse().find((msg)=>msg.role === "user");
    const lastMessage = lastUserMessage ? [
        lastUserMessage
    ] : [];
    return {
        messages: normalizedMessages,
        lastMessage,
        hasChanges
    };
};
/**
 * Transforms an incomplete tool part (input-available state) to a complete one (output-available state)
 * using collected terminal data for terminal tools.
 */ const transformIncompleteToolPart = (toolPart, terminalDataMap)=>{
    // Handle terminal tools with special terminal output handling
    if (toolPart.type === "tool-run_terminal_cmd") {
        return transformTerminalToolPart(toolPart, terminalDataMap);
    }
    // Handle all other tools generically (they don't have data streaming)
    return transformGenericToolPart(toolPart);
};
/**
 * Transforms terminal tool parts with special handling for terminal output
 */ const transformTerminalToolPart = (terminalPart, terminalDataMap)=>{
    const stdout = terminalDataMap.get(terminalPart.toolCallId) || "";
    return {
        type: "tool-run_terminal_cmd",
        toolCallId: terminalPart.toolCallId,
        state: "output-available",
        input: terminalPart.input,
        output: {
            result: {
                exitCode: 130,
                stdout: stdout,
                stderr: stdout.length === 0 ? "Command was stopped/aborted by user" : ""
            }
        }
    };
};
/**
 * Generic transformation for all non-terminal tool types
 */ const transformGenericToolPart = (toolPart)=>{
    // Handle specific tool types with appropriate default outputs
    switch(toolPart.type){
        case "tool-todo_write":
            return {
                ...toolPart,
                state: "output-available",
                output: {
                    result: "Todo operation was interrupted by user",
                    counts: {
                        completed: 0,
                        total: 0
                    },
                    currentTodos: []
                }
            };
        default:
            // Generic transformation for file tools and unknown tool types
            return {
                ...toolPart,
                state: "output-available",
                output: {
                    result: "Operation was interrupted by user"
                }
            };
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/types/chat.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isSidebarFile",
    ()=>isSidebarFile,
    "isSidebarPython",
    ()=>isSidebarPython,
    "isSidebarTerminal",
    ()=>isSidebarTerminal,
    "messageMetadataSchema",
    ()=>messageMetadataSchema
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$13$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/zod@4.1.13/node_modules/zod/v4/classic/external.js [app-client] (ecmascript) <export * as z>");
;
const isSidebarFile = (content)=>{
    return "path" in content;
};
const isSidebarTerminal = (content)=>{
    return "command" in content && !("code" in content);
};
const isSidebarPython = (content)=>{
    return "code" in content;
};
const messageMetadataSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$13$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    feedbackType: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$13$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        "positive",
        "negative"
    ])
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_5fa12483._.js.map