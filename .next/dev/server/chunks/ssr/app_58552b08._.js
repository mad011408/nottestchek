module.exports = [
"[project]/app/hooks/usePricingDialog.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "redirectToPricing",
    ()=>redirectToPricing,
    "usePricingDialog",
    ()=>usePricingDialog
]);
const usePricingDialog = (subscription)=>{
    return {
        showPricing: false,
        handleClosePricing: ()=>{},
        openPricing: ()=>{}
    };
};
const redirectToPricing = ()=>{};
}),
"[project]/app/hooks/useFileUpload.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useFileUpload",
    ()=>useFileUpload
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.28.5_@opentelemetry+api@1.9.0_@playwright+test@1.57.0_react-_bc0e796ca3d7ea4640f9d74c95225eb3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$sonner$40$2$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/sonner@2.0.7_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/sonner/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$convex$40$1$2e$29$2e$2_react$40$19$2e$2$2e$1$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/convex@1.29.2_react@19.2.1/node_modules/convex/dist/esm/values/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$convex$40$1$2e$29$2e$2_react$40$19$2e$2$2e$1$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/convex@1.29.2_react@19.2.1/node_modules/convex/dist/esm/values/errors.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$file$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils/file-utils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$token$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/token-utils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$contexts$2f$GlobalState$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/contexts/GlobalState.tsx [app-ssr] (ecmascript)");
;
;
;
;
;
;
const USE_S3_STORAGE = process.env.NEXT_PUBLIC_USE_S3_STORAGE === "true";
const useFileUpload = (mode = "ask")=>{
    const fileInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const { uploadedFiles, addUploadedFile, updateUploadedFile, removeUploadedFile, subscription, getTotalTokens } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$contexts$2f$GlobalState$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGlobalState"])();
    // Drag and drop state
    const [isDragOver, setIsDragOver] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showDragOverlay, setShowDragOverlay] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const dragCounterRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(0);
    // Stubbed Convex hooks
    const generateUploadUrl = async ()=>"stub-url";
    const deleteFile = async ()=>{};
    const saveFile = async ()=>({
            url: "stub-url",
            fileId: "stub-id",
            tokens: 0
        });
    const generateS3UploadUrlAction = async ()=>({
            uploadUrl: "stub-url",
            s3Key: "stub-key"
        });
    // Wrap Convex mutation to match `() => Promise<string>` signature expected by the util
    const generateUploadUrlFn = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>generateUploadUrl({}), [
        generateUploadUrl
    ]);
    // Helper function to check and validate files before processing
    const validateAndFilterFiles = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((files)=>{
        const existingUploadedCount = uploadedFiles.length;
        const totalFiles = existingUploadedCount + files.length;
        // Check file limits
        let filesToProcess = files;
        let truncated = false;
        if (totalFiles > __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$file$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MAX_FILES_LIMIT"]) {
            const remainingSlots = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$file$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MAX_FILES_LIMIT"] - existingUploadedCount;
            if (remainingSlots <= 0) {
                return {
                    validFiles: [],
                    invalidFiles: [],
                    truncated: false,
                    processedCount: 0
                };
            }
            filesToProcess = files.slice(0, remainingSlots);
            truncated = true;
        }
        // Validate each file
        const validFiles = [];
        const invalidFiles = [];
        for (const file of filesToProcess){
            const validation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$file$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["validateFile"])(file);
            if (validation.valid) {
                validFiles.push(file);
            } else {
                invalidFiles.push(`${file.name}: ${validation.error}`);
            }
        }
        return {
            validFiles,
            invalidFiles,
            truncated,
            processedCount: filesToProcess.length
        };
    }, [
        uploadedFiles.length
    ]);
    // Helper function to show feedback messages
    const showProcessingFeedback = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((result, source, hasRemainingSlots = true)=>{
        const messages = [];
        // Handle case where no slots are available
        if (!hasRemainingSlots) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$sonner$40$2$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(`Maximum ${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$file$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MAX_FILES_LIMIT"]} files allowed. Please remove some files before adding more.`);
            return;
        }
        // Add truncation message
        if (result.truncated) {
            messages.push(`Only ${result.processedCount} files were added. Maximum ${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$file$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MAX_FILES_LIMIT"]} files allowed.`);
        }
        // Add validation errors
        if (result.invalidFiles.length > 0) {
            messages.push(`Some files were invalid:\n${result.invalidFiles.join("\n")}`);
        }
        // Show error messages if any
        if (messages.length > 0) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$sonner$40$2$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(messages.join("\n\n"));
        }
    }, []);
    // Upload file to S3 storage
    const uploadFileToS3 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (file, uploadIndex)=>{
        try {
            // Step 1: Generate presigned S3 upload URL
            const { uploadUrl, s3Key } = await generateS3UploadUrlAction({
                fileName: file.name,
                contentType: file.type || "application/octet-stream"
            });
            // Step 2: Upload file to S3 using presigned URL
            const uploadResponse = await fetch(uploadUrl, {
                method: "PUT",
                body: file,
                headers: {
                    "Content-Type": file.type || "application/octet-stream"
                }
            });
            if (!uploadResponse.ok) {
                throw new Error(`Failed to upload file ${file.name}: ${uploadResponse.statusText}`);
            }
            // Step 3: Save file metadata to database with S3 key
            const { url, fileId, tokens } = await saveFile({
                s3Key,
                name: file.name,
                mediaType: file.type,
                size: file.size,
                mode
            });
            // Only check token limit for "ask" mode
            // In "agent" mode, files are accessed in sandbox, no token limit applies
            if (mode === "ask") {
                const currentTotal = getTotalTokens();
                const newTotal = currentTotal + tokens;
                if (newTotal > __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$token$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MAX_TOKENS_FILE"]) {
                    // Exceeds limit - delete file from storage and remove from upload list
                    deleteFile({
                        fileId: fileId
                    }).catch(console.error);
                    removeUploadedFile(uploadIndex);
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$sonner$40$2$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(`${file.name} exceeds token limit (${newTotal.toLocaleString()}/${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$token$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MAX_TOKENS_FILE"].toLocaleString()} tokens). Tip: Switch to Agent mode to upload larger files.`);
                    return;
                }
            }
            // Set success state with tokens
            updateUploadedFile(uploadIndex, {
                tokens,
                uploading: false,
                uploaded: true,
                fileId,
                url
            });
        } catch (error) {
            console.error("Failed to upload file:", error);
            // Extract error message from ConvexError or regular Error
            const errorMessage = (()=>{
                if (error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$convex$40$1$2e$29$2e$2_react$40$19$2e$2$2e$1$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ConvexError"]) {
                    const errorData = error.data;
                    return errorData?.message || error.message || "Upload failed";
                }
                if (error instanceof Error) {
                    return error.message;
                }
                return "Upload failed";
            })();
            // Update the upload state to error
            updateUploadedFile(uploadIndex, {
                uploading: false,
                uploaded: false,
                error: errorMessage
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$sonner$40$2$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(errorMessage);
        }
    }, [
        generateS3UploadUrlAction,
        saveFile,
        getTotalTokens,
        deleteFile,
        removeUploadedFile,
        updateUploadedFile,
        mode
    ]);
    // Upload file to Convex storage
    const uploadFileToConvex = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (file, uploadIndex)=>{
        try {
            const { fileId, url, tokens } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$file$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["uploadSingleFileToConvex"])(file, generateUploadUrlFn, saveFile, mode);
            // Only check token limit for "ask" mode
            // In "agent" mode, files are accessed in sandbox, no token limit applies
            if (mode === "ask") {
                const currentTotal = getTotalTokens();
                const newTotal = currentTotal + tokens;
                if (newTotal > __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$token$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MAX_TOKENS_FILE"]) {
                    // Exceeds limit - delete file from storage and remove from upload list
                    deleteFile({
                        fileId: fileId
                    }).catch(console.error);
                    removeUploadedFile(uploadIndex);
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$sonner$40$2$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(`${file.name} exceeds token limit (${newTotal.toLocaleString()}/${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$token$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MAX_TOKENS_FILE"].toLocaleString()} tokens). Tip: Switch to Agent mode to upload larger files.`);
                    return;
                }
            }
            // Set success state with tokens
            updateUploadedFile(uploadIndex, {
                tokens,
                uploading: false,
                uploaded: true,
                fileId,
                url
            });
        } catch (error) {
            console.error("Failed to upload file:", error);
            const errorMessage = error instanceof Error ? error.message : "Upload failed";
            // Update the upload state to error
            updateUploadedFile(uploadIndex, {
                uploading: false,
                uploaded: false,
                error: errorMessage
            });
            // Backend already wraps error with file name
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$sonner$40$2$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(errorMessage);
        }
    }, [
        generateUploadUrlFn,
        saveFile,
        getTotalTokens,
        deleteFile,
        removeUploadedFile,
        updateUploadedFile,
        mode
    ]);
    // Helper function to start file uploads
    const startFileUploads = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((files)=>{
        const startingIndex = uploadedFiles.length;
        files.forEach((file, index)=>{
            // Add file as "uploading" state immediately
            addUploadedFile({
                file,
                uploading: true,
                uploaded: false
            });
            // Start upload in background with correct index
            // Use S3 or Convex based on feature flag
            if (USE_S3_STORAGE) {
                uploadFileToS3(file, startingIndex + index);
            } else {
                uploadFileToConvex(file, startingIndex + index);
            }
        });
    }, [
        uploadedFiles.length,
        addUploadedFile,
        uploadFileToS3,
        uploadFileToConvex
    ]);
    // Unified file processing function
    const processFiles = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (files, source)=>{
        // Check if user has pro plan for file uploads
        if (subscription === "free") {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$sonner$40$2$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error("Upgrade plan to upload files.");
            return;
        }
        const result = validateAndFilterFiles(files);
        // Check if we have slots available
        const existingUploadedCount = uploadedFiles.length;
        const remainingSlots = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$file$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MAX_FILES_LIMIT"] - existingUploadedCount;
        const hasRemainingSlots = remainingSlots > 0;
        // Show feedback messages
        showProcessingFeedback(result, source, hasRemainingSlots);
        // Start uploads for valid files
        if (result.validFiles.length > 0 && hasRemainingSlots) {
            startFileUploads(result.validFiles);
        }
    }, [
        subscription,
        validateAndFilterFiles,
        showProcessingFeedback,
        startFileUploads,
        uploadedFiles.length
    ]);
    const handleFileUploadEvent = async (event)=>{
        const selectedFiles = event.target.files;
        if (!selectedFiles || selectedFiles.length === 0) return;
        await processFiles(Array.from(selectedFiles), "upload");
        // Clear the input
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };
    const handleRemoveFile = async (indexToRemove)=>{
        const uploadedFile = uploadedFiles[indexToRemove];
        // If the file was uploaded to Convex, delete it from storage
        if (uploadedFile?.fileId) {
            try {
                await deleteFile({
                    fileId: uploadedFile.fileId
                });
            } catch (error) {
                console.error("Failed to delete file from storage:", error);
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$sonner$40$2$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error("Failed to delete file from storage");
            }
        }
        // removeUploadedFile in GlobalState will automatically handle token removal
        removeUploadedFile(indexToRemove);
    };
    const handleAttachClick = ()=>{
        fileInputRef.current?.click();
    };
    const handlePasteEvent = async (event)=>{
        const items = event.clipboardData?.items;
        if (!items) return false;
        const files = [];
        // Extract files from clipboard
        for(let i = 0; i < items.length; i++){
            const item = items[i];
            if (item.kind === "file") {
                const file = item.getAsFile();
                if (file) {
                    files.push(file);
                }
            }
        }
        if (files.length === 0) return false;
        // Prevent default paste behavior to avoid pasting file names as text
        event.preventDefault();
        await processFiles(files, "paste");
        return true;
    };
    // Helper to get all uploaded file message parts for sending
    const getUploadedFileMessageParts = ()=>{
        return uploadedFiles.map(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$file$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createFileMessagePartFromUploadedFile"]).filter((part)=>part !== null);
    };
    // Helper to check if all files have finished uploading
    const allFilesUploaded = ()=>{
        return uploadedFiles.length > 0 && uploadedFiles.every((file)=>file.uploaded && !file.uploading);
    };
    // Helper to check if any files are currently uploading
    const anyFilesUploading = ()=>{
        return uploadedFiles.some((file)=>file.uploading);
    };
    // Drag and drop event handlers
    const handleDragEnter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((e)=>{
        e.preventDefault();
        e.stopPropagation();
        dragCounterRef.current++;
        if (e.dataTransfer?.items && e.dataTransfer.items.length > 0) {
            setShowDragOverlay(true);
        }
    }, []);
    const handleDragLeave = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((e)=>{
        e.preventDefault();
        e.stopPropagation();
        dragCounterRef.current--;
        if (dragCounterRef.current === 0) {
            setShowDragOverlay(false);
            setIsDragOver(false);
        }
    }, []);
    const handleDragOver = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((e)=>{
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer) {
            e.dataTransfer.dropEffect = "copy";
        }
        setIsDragOver(true);
    }, []);
    const handleDrop = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (e)=>{
        e.preventDefault();
        e.stopPropagation();
        // Reset drag state
        setShowDragOverlay(false);
        setIsDragOver(false);
        dragCounterRef.current = 0;
        const files = e.dataTransfer?.files;
        if (!files || files.length === 0) return;
        await processFiles(Array.from(files), "drop");
    }, [
        processFiles
    ]);
    return {
        fileInputRef,
        handleFileUploadEvent,
        handleRemoveFile,
        handleAttachClick,
        handlePasteEvent,
        getUploadedFileMessageParts,
        allFilesUploaded,
        anyFilesUploading,
        getTotalTokens,
        // Drag and drop state and handlers
        isDragOver,
        showDragOverlay,
        handleDragEnter,
        handleDragLeave,
        handleDragOver,
        handleDrop
    };
};
}),
"[project]/app/hooks/useFeedback.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useFeedback",
    ()=>useFeedback
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.28.5_@opentelemetry+api@1.9.0_@playwright+test@1.57.0_react-_bc0e796ca3d7ea4640f9d74c95225eb3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$convex$40$1$2e$29$2e$2_react$40$19$2e$2$2e$1$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/convex@1.29.2_react@19.2.1/node_modules/convex/dist/esm/values/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$convex$40$1$2e$29$2e$2_react$40$19$2e$2$2e$1$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/convex@1.29.2_react@19.2.1/node_modules/convex/dist/esm/values/errors.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$sonner$40$2$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/sonner@2.0.7_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/sonner/dist/index.mjs [app-ssr] (ecmascript)");
;
;
;
const useFeedback = ({ messages, setMessages })=>{
    // Track feedback input state for negative feedback
    const [feedbackInputMessageId, setFeedbackInputMessageId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    // Stubbed Convex mutation for feedback
    const createFeedback = async ()=>{};
    // Handle feedback submission (positive/negative)
    const handleFeedback = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (messageId, type)=>{
        // Find the current message to check existing feedback
        const currentMessage = messages.find((msg)=>msg.id === messageId);
        const existingFeedback = currentMessage?.metadata?.feedbackType;
        if (type === "positive") {
            // Skip if positive feedback already exists
            if (existingFeedback === "positive") {
                return;
            }
            // For positive feedback, save immediately
            try {
                await createFeedback({
                    feedback_type: "positive",
                    message_id: messageId
                });
                // Update local message state and merge metadata
                setMessages(messages.map((msg)=>msg.id === messageId ? {
                        ...msg,
                        metadata: {
                            ...msg.metadata,
                            feedbackType: "positive"
                        }
                    } : msg));
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$sonner$40$2$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success("Thank you for your feedback!");
            } catch (error) {
                console.error("Failed to save feedback:", error);
                const errorMessage = error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$convex$40$1$2e$29$2e$2_react$40$19$2e$2$2e$1$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ConvexError"] ? error.data?.message || error.message || "Failed to save feedback" : error instanceof Error ? error.message : "Failed to save feedback. Please try again.";
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$sonner$40$2$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(errorMessage);
            }
        } else {
            // For negative feedback
            if (existingFeedback === "negative") {
                // If negative feedback already exists, just show input for details
                setFeedbackInputMessageId(messageId);
                return;
            }
            // Save negative feedback immediately without details and show input
            try {
                await createFeedback({
                    feedback_type: "negative",
                    message_id: messageId
                });
                // Update local message state and merge metadata
                setMessages(messages.map((msg)=>msg.id === messageId ? {
                        ...msg,
                        metadata: {
                            ...msg.metadata,
                            feedbackType: "negative"
                        }
                    } : msg));
                // Then show input for additional details
                setFeedbackInputMessageId(messageId);
            } catch (error) {
                console.error("Failed to save initial negative feedback:", error);
                const errorMessage = error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$convex$40$1$2e$29$2e$2_react$40$19$2e$2$2e$1$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ConvexError"] ? error.data?.message || error.message || "Failed to save feedback" : error instanceof Error ? error.message : "Failed to save feedback. Please try again.";
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$sonner$40$2$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(errorMessage);
            }
        }
    }, [
        createFeedback,
        messages,
        setMessages
    ]);
    // Handle negative feedback details submission (updates existing feedback)
    const handleFeedbackSubmit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (details)=>{
        if (!feedbackInputMessageId) return;
        try {
            // Update the existing negative feedback with details
            await createFeedback({
                feedback_type: "negative",
                feedback_details: details,
                message_id: feedbackInputMessageId
            });
            // Local state already shows negative feedback, just hide the input
            setFeedbackInputMessageId(null);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$sonner$40$2$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success("Thank you for your feedback!");
        } catch (error) {
            console.error("Failed to update feedback details:", error);
            const errorMessage = error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$convex$40$1$2e$29$2e$2_react$40$19$2e$2$2e$1$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ConvexError"] ? error.data?.message || error.message || "Failed to save feedback details" : error instanceof Error ? error.message : "Failed to save feedback details. Please try again.";
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$sonner$40$2$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(errorMessage);
        }
    }, [
        createFeedback,
        feedbackInputMessageId
    ]);
    // Handle feedback input cancellation
    const handleFeedbackCancel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        setFeedbackInputMessageId(null);
    }, []);
    return {
        feedbackInputMessageId,
        handleFeedback,
        handleFeedbackSubmit,
        handleFeedbackCancel
    };
};
}),
"[project]/app/hooks/useFileUrlCache.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useFileUrlCache",
    ()=>useFileUrlCache
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.28.5_@opentelemetry+api@1.9.0_@playwright+test@1.57.0_react-_bc0e796ca3d7ea4640f9d74c95225eb3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$convex$40$1$2e$29$2e$2_react$40$19$2e$2$2e$1$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$react$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/convex@1.29.2_react@19.2.1/node_modules/convex/dist/esm/react/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$convex$40$1$2e$29$2e$2_react$40$19$2e$2$2e$1$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$react$2f$client$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/convex@1.29.2_react@19.2.1/node_modules/convex/dist/esm/react/client.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$convex$2f$_generated$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/convex/_generated/api.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$file$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils/file-utils.ts [app-ssr] (ecmascript)");
;
;
;
;
const URL_CACHE_EXPIRATION = 50 * 60 * 1000; // 50 minutes (S3 URLs expire in 1 hour)
function useFileUrlCache(messages) {
    const getFileUrlsBatchAction = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$convex$40$1$2e$29$2e$2_react$40$19$2e$2$2e$1$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$react$2f$client$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAction"])(__TURBOPACK__imported__module__$5b$project$5d2f$convex$2f$_generated$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].s3Actions.getFileUrlsBatchAction);
    const urlCacheRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(new Map());
    const prefetchedIdsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(new Set());
    // Get cached URL for a file (returns null if expired or not cached)
    const getCachedUrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((fileId)=>{
        const cached = urlCacheRef.current.get(fileId);
        if (!cached) return null;
        // Check if URL has expired
        const now = Date.now();
        if (now - cached.timestamp > URL_CACHE_EXPIRATION) {
            urlCacheRef.current.delete(fileId);
            prefetchedIdsRef.current.delete(fileId);
            return null;
        }
        return cached.url;
    }, []);
    // Set/update cached URL for a file (used for lazy-loaded non-image files)
    const setCachedUrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((fileId, url)=>{
        const now = Date.now();
        urlCacheRef.current.set(fileId, {
            url,
            timestamp: now
        });
        prefetchedIdsRef.current.add(fileId);
    }, []);
    // Prefetch image URLs for messages
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        async function prefetchImageUrls() {
            // Track seen fileIds within this run to avoid duplicates
            const seenInThisRun = new Set();
            const s3ImageFiles = [];
            for (const message of messages){
                if (!message.fileDetails) continue;
                for (const file of message.fileDetails){
                    // Only process files that:
                    // 1. Have an S3 key (not Convex storage)
                    // 2. Are supported image types
                    // 3. Haven't been prefetched yet
                    // 4. Haven't been seen in this run
                    if (file.s3Key && file.mediaType && (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$file$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isSupportedImageMediaType"])(file.mediaType) && !prefetchedIdsRef.current.has(file.fileId) && !seenInThisRun.has(file.fileId)) {
                        s3ImageFiles.push({
                            fileId: file.fileId,
                            mediaType: file.mediaType
                        });
                        seenInThisRun.add(file.fileId);
                    }
                }
            }
            // Also collect image files from message parts
            for (const message of messages){
                for (const part of message.parts){
                    if (part.type === "file" && "fileId" in part && "s3Key" in part && part.s3Key && part.mediaType && (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$file$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isSupportedImageMediaType"])(part.mediaType) && typeof part.fileId === "string" && !prefetchedIdsRef.current.has(part.fileId) && !seenInThisRun.has(part.fileId)) {
                        s3ImageFiles.push({
                            fileId: part.fileId,
                            mediaType: part.mediaType
                        });
                        seenInThisRun.add(part.fileId);
                    }
                }
            }
            // If no new images to prefetch, return early
            if (s3ImageFiles.length === 0) {
                return;
            }
            // Batch fetch URLs with deduplicated fileIds
            try {
                const fileIds = s3ImageFiles.map((f)=>f.fileId);
                const urlMap = await getFileUrlsBatchAction({
                    fileIds
                });
                // Cache the fetched URLs (only if urlMap is valid)
                if (urlMap && typeof urlMap === "object") {
                    const now = Date.now();
                    for (const [fileId, url] of Object.entries(urlMap)){
                        urlCacheRef.current.set(fileId, {
                            url,
                            timestamp: now
                        });
                        prefetchedIdsRef.current.add(fileId);
                    }
                }
            } catch (error) {
                console.error("Failed to prefetch image URLs:", error);
            }
        }
        prefetchImageUrls();
    }, [
        messages,
        getFileUrlsBatchAction
    ]);
    // Cleanup expired URLs periodically
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const cleanupInterval = setInterval(()=>{
            const now = Date.now();
            const entriesToDelete = [];
            for (const [fileId, cached] of urlCacheRef.current.entries()){
                if (now - cached.timestamp > URL_CACHE_EXPIRATION) {
                    entriesToDelete.push(fileId);
                }
            }
            for (const fileId of entriesToDelete){
                urlCacheRef.current.delete(fileId);
                prefetchedIdsRef.current.delete(fileId);
            }
        }, 5 * 60 * 1000); // Clean up every 5 minutes
        return ()=>clearInterval(cleanupInterval);
    }, []);
    return {
        getCachedUrl,
        setCachedUrl
    };
}
}),
"[project]/app/hooks/useSidebarNavigation.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useSidebarNavigation",
    ()=>useSidebarNavigation
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.28.5_@opentelemetry+api@1.9.0_@playwright+test@1.57.0_react-_bc0e796ca3d7ea4640f9d74c95225eb3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$sidebar$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils/sidebar-utils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$types$2f$chat$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/types/chat.ts [app-ssr] (ecmascript)");
;
;
;
const useSidebarNavigation = ({ messages, sidebarContent, onNavigate })=>{
    const toolExecutions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$sidebar$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["extractAllSidebarContent"])(messages), [
        messages
    ]);
    const currentIndex = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (!sidebarContent) return -1;
        // Try to match by toolCallId first (most reliable)
        const contentToolCallId = "toolCallId" in sidebarContent ? sidebarContent.toolCallId : undefined;
        if (contentToolCallId) {
            const index = toolExecutions.findIndex((item)=>"toolCallId" in item && item.toolCallId === contentToolCallId);
            if (index !== -1) return index;
        }
        // Fallback to content-based matching
        return toolExecutions.findIndex((item)=>{
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$types$2f$chat$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isSidebarTerminal"])(item) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$types$2f$chat$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isSidebarTerminal"])(sidebarContent)) {
                return item.command === sidebarContent.command && item.toolCallId === sidebarContent.toolCallId;
            }
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$types$2f$chat$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isSidebarFile"])(item) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$types$2f$chat$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isSidebarFile"])(sidebarContent)) {
                return item.path === sidebarContent.path && item.action === sidebarContent.action;
            }
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$types$2f$chat$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isSidebarPython"])(item) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$types$2f$chat$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isSidebarPython"])(sidebarContent)) {
                return item.code === sidebarContent.code;
            }
            return false;
        });
    }, [
        sidebarContent,
        toolExecutions
    ]);
    const handlePrev = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (currentIndex > 0 && onNavigate) {
            onNavigate(toolExecutions[currentIndex - 1]);
        }
    }, [
        currentIndex,
        toolExecutions,
        onNavigate
    ]);
    const handleNext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (currentIndex < toolExecutions.length - 1 && onNavigate) {
            onNavigate(toolExecutions[currentIndex + 1]);
        }
    }, [
        currentIndex,
        toolExecutions,
        onNavigate
    ]);
    const handleJumpToLive = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (toolExecutions.length > 0 && onNavigate) {
            onNavigate(toolExecutions[toolExecutions.length - 1]);
        }
    }, [
        toolExecutions,
        onNavigate
    ]);
    const handleSliderClick = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((e)=>{
        if (toolExecutions.length === 0 || !onNavigate) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const percentage = Math.max(0, Math.min(1, x / rect.width));
        const targetIndex = Math.round(percentage * (toolExecutions.length - 1));
        const clampedIndex = Math.max(0, Math.min(targetIndex, toolExecutions.length - 1));
        onNavigate(toolExecutions[clampedIndex]);
    }, [
        toolExecutions,
        onNavigate
    ]);
    const getProgressPercentage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (toolExecutions.length <= 1) return 100;
        const effectiveIndex = Math.max(0, Math.min(currentIndex, toolExecutions.length - 1));
        return Math.max(0, Math.min(100, effectiveIndex / (toolExecutions.length - 1) * 100));
    }, [
        currentIndex,
        toolExecutions.length
    ]);
    const isAtLive = currentIndex === toolExecutions.length - 1;
    const canGoPrev = currentIndex > 0;
    const canGoNext = currentIndex < toolExecutions.length - 1;
    const maxIndex = Math.max(0, toolExecutions.length - 1);
    return {
        toolExecutions,
        currentIndex,
        maxIndex,
        handlePrev,
        handleNext,
        handleJumpToLive,
        handleSliderClick,
        getProgressPercentage,
        isAtLive,
        canGoPrev,
        canGoNext
    };
};
}),
"[project]/app/hooks/useChats.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useChats",
    ()=>useChats
]);
"use client";
const useChats = (shouldFetch = true)=>{
    const user = {
        id: "default-user"
    };
    const setChats = (chats)=>{};
    // Stubbed paginated chats
    const paginatedChats = {
        results: [],
        status: "Exhausted",
        loadMore: ()=>{}
    };
    return paginatedChats;
};
}),
"[project]/app/hooks/usePentestgptMigration.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "usePentestgptMigration",
    ()=>usePentestgptMigration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.28.5_@opentelemetry+api@1.9.0_@playwright+test@1.57.0_react-_bc0e796ca3d7ea4640f9d74c95225eb3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$sonner$40$2$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/sonner@2.0.7_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/sonner/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$contexts$2f$GlobalState$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/contexts/GlobalState.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
const usePentestgptMigration = ()=>{
    const { setMigrateFromPentestgptDialogOpen } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$contexts$2f$GlobalState$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGlobalState"])();
    const [isMigrating, setIsMigrating] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useState(false);
    const migrate = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useCallback(async ()=>{
        if (isMigrating) return;
        setIsMigrating(true);
        try {
            const response = await fetch("/api/migrate-pentestgpt", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await response.json();
            if (!response.ok) {
                const errorMessage = data.message || data.error || "Migration failed";
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$sonner$40$2$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(errorMessage);
                setMigrateFromPentestgptDialogOpen(false);
                return;
            }
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$sonner$40$2$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success("Migration complete. Updating your account...");
            try {
                const url = new URL(window.location.href);
                url.searchParams.set("refresh", "entitlements");
                url.searchParams.delete("confirm-migrate-pentestgpt");
                if (data?.showTeamWelcome) {
                    url.searchParams.set("team-welcome", "true");
                }
                window.location.replace(url.toString());
            } catch  {
                try {
                    await fetch("/api/entitlements", {
                        credentials: "include"
                    });
                } catch  {}
                window.location.reload();
            }
        } catch (error) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$sonner$40$2$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error("An unexpected error occurred during migration");
            setMigrateFromPentestgptDialogOpen(false);
        } finally{
            setIsMigrating(false);
        }
    }, [
        isMigrating,
        setMigrateFromPentestgptDialogOpen
    ]);
    return {
        isMigrating,
        migrate
    };
};
const __TURBOPACK__default__export__ = usePentestgptMigration;
}),
"[project]/app/hooks/useMessageScroll.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useMessageScroll",
    ()=>useMessageScroll
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$use$2d$stick$2d$to$2d$bottom$40$1$2e$1$2e$1_react$40$19$2e$2$2e$1$2f$node_modules$2f$use$2d$stick$2d$to$2d$bottom$2f$dist$2f$useStickToBottom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/use-stick-to-bottom@1.1.1_react@19.2.1/node_modules/use-stick-to-bottom/dist/useStickToBottom.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.28.5_@opentelemetry+api@1.9.0_@playwright+test@1.57.0_react-_bc0e796ca3d7ea4640f9d74c95225eb3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
;
const useMessageScroll = ()=>{
    const stickToBottom = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$use$2d$stick$2d$to$2d$bottom$40$1$2e$1$2e$1_react$40$19$2e$2$2e$1$2f$node_modules$2f$use$2d$stick$2d$to$2d$bottom$2f$dist$2f$useStickToBottom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStickToBottom"])({
        resize: "smooth",
        initial: "instant"
    });
    const scrollToBottom = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((options)=>{
        if (options?.instant) {
            const scrollContainer = stickToBottom.scrollRef.current;
            if (scrollContainer) {
                scrollContainer.scrollTop = scrollContainer.scrollHeight;
            }
            return true;
        }
        return stickToBottom.scrollToBottom({
            animation: "smooth",
            preserveScrollPosition: !options?.force
        });
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    [
        stickToBottom.scrollToBottom,
        stickToBottom.scrollRef
    ]);
    return {
        scrollRef: stickToBottom.scrollRef,
        contentRef: stickToBottom.contentRef,
        isAtBottom: stickToBottom.isAtBottom,
        scrollToBottom
    };
};
}),
"[project]/app/hooks/useChatHandlers.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useChatHandlers",
    ()=>useChatHandlers
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.28.5_@opentelemetry+api@1.9.0_@playwright+test@1.57.0_react-_bc0e796ca3d7ea4640f9d74c95225eb3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$contexts$2f$GlobalState$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/contexts/GlobalState.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$token$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/token-utils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$sonner$40$2$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/sonner@2.0.7_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/sonner/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$todo$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils/todo-utils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$DataStreamProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/DataStreamProvider.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$message$2d$processor$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils/message-processor.ts [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
const useChatHandlers = ({ chatId, messages, sendMessage, stop, regenerate, setMessages, isExistingChat, activateChatLocally, status, isSendingNowRef, hasManuallyStoppedRef })=>{
    const { setIsAutoResuming } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$DataStreamProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useDataStream"])();
    const { input, uploadedFiles, chatMode, setChatTitle, clearInput, clearUploadedFiles, todos, setTodos, setCurrentChatId, isUploadingFiles, subscription, temporaryChatsEnabled, queueMessage, messageQueue, removeQueuedMessage, queueBehavior, sandboxPreference, selectedModel, customSystemPrompt } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$contexts$2f$GlobalState$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGlobalState"])();
    // Avoid stale closure on temporary flag
    const temporaryChatsEnabledRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(temporaryChatsEnabled);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        temporaryChatsEnabledRef.current = temporaryChatsEnabled;
    }, [
        temporaryChatsEnabled
    ]);
    const deleteLastAssistantMessage = async ()=>{};
    const saveAssistantMessage = async ()=>{};
    const regenerateWithNewContent = async ()=>{};
    const cancelStreamMutation = async ()=>{};
    const cancelTempStreamMutation = async ()=>{};
    const handleSubmit = async (e)=>{
        e.preventDefault();
        setIsAutoResuming(false);
        // Reset manual stop flag when user submits a new message
        hasManuallyStoppedRef.current = false;
        // Prevent submission if files are still uploading
        if (isUploadingFiles) {
            return;
        }
        // Allow submission if there's text input or uploaded files
        const hasValidFiles = uploadedFiles.some((f)=>f.uploaded && f.url);
        if (input.trim() || hasValidFiles) {
            // If streaming in Agent mode, check queue behavior
            if (status === "streaming" && chatMode === "agent") {
                const validFiles = uploadedFiles.filter((file)=>file.uploaded && file.url && file.fileId);
                if (queueBehavior === "queue") {
                    // Queue the message - will auto-send after current response completes
                    queueMessage(input, validFiles.map((f)=>({
                            file: f.file,
                            fileId: f.fileId,
                            url: f.url
                        })));
                    clearInput();
                    clearUploadedFiles();
                    return;
                } else if (queueBehavior === "stop-and-send") {
                    // Immediately stop current stream and send right away
                    stop();
                    // Cancel the stream in database and save current message state
                    if (!temporaryChatsEnabledRef.current) {
                        cancelStreamMutation({
                            chatId
                        }).catch((error)=>{
                            console.error("Failed to cancel stream:", error);
                        });
                        const lastMessage = messages[messages.length - 1];
                        if (lastMessage && lastMessage.role === "assistant") {
                            saveAssistantMessage({
                                id: lastMessage.id,
                                chatId,
                                role: lastMessage.role,
                                parts: lastMessage.parts
                            }).catch((error)=>{
                                console.error("Failed to save message on stop:", error);
                            });
                        }
                    } else {
                        // Temporary chats: signal cancel via temp stream coordination
                        cancelTempStreamMutation({
                            chatId
                        }).catch(()=>{});
                    }
                // Continue to send the new message immediately below (don't return)
                }
            }
            // Check token limit before sending based on user plan
            const tokenCount = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$token$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["countInputTokens"])(input, uploadedFiles);
            const maxTokens = 120000;
            // Additional validation for Ask mode: ensure files don't exceed Ask mode token limits
            // This prevents uploading files in Agent mode then switching to Ask mode to send them
            if (chatMode === "ask" && uploadedFiles.length > 0) {
                const fileTokens = uploadedFiles.reduce((total, file)=>total + (file.tokens || 0), 0);
                if (fileTokens > maxTokens) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$sonner$40$2$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error("Cannot send files in Ask mode", {
                        description: `Files exceed token limit (${fileTokens.toLocaleString()}/${maxTokens.toLocaleString()} tokens).`
                    });
                    return;
                }
            }
            if (tokenCount > maxTokens) {
                const hasFiles = uploadedFiles.length > 0;
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$sonner$40$2$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error("Message is too long", {
                    description: `Your message is too large (${tokenCount.toLocaleString()} tokens). Please make it shorter${hasFiles ? " or remove some files" : ""}.`
                });
                return;
            }
            if (!isExistingChat && !temporaryChatsEnabledRef.current) {
                setChatTitle(null);
                setCurrentChatId(chatId);
                window.history.replaceState({}, "", `/c/${chatId}`);
                activateChatLocally();
            }
            try {
                // Get file objects from uploaded files - URLs are already resolved in global state
                const validFiles = uploadedFiles.filter((file)=>file.uploaded && file.url && file.fileId);
                sendMessage({
                    text: input.trim() || undefined,
                    files: validFiles.length > 0 ? validFiles.map((uploadedFile)=>({
                            type: "file",
                            filename: uploadedFile.file.name,
                            mediaType: uploadedFile.file.type,
                            url: uploadedFile.url,
                            fileId: uploadedFile.fileId
                        })) : undefined
                }, {
                    body: {
                        mode: chatMode,
                        todos,
                        temporary: temporaryChatsEnabled,
                        sandboxPreference,
                        selectedModel,
                        customSystemPrompt
                    }
                });
            } catch (error) {
                console.error("Failed to process files:", error);
                // Fallback to text-only message if file processing fails
                sendMessage({
                    text: input
                }, {
                    body: {
                        mode: chatMode,
                        todos,
                        temporary: temporaryChatsEnabled,
                        sandboxPreference,
                        selectedModel,
                        customSystemPrompt
                    }
                });
            }
            clearInput();
            clearUploadedFiles();
        }
    };
    const handleStop = async ()=>{
        setIsAutoResuming(false);
        // Set manual stop flag to prevent auto-processing of queue
        hasManuallyStoppedRef.current = true;
        // Stop the stream immediately (client-side abort)
        stop();
        // Early return if no messages to process
        if (messages.length === 0) return;
        try {
            // Normalize messages to mark incomplete tools as interrupted/completed
            // This removes shimmer effect from any tools that were in-progress
            const { messages: normalizedMessages, hasChanges } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$message$2d$processor$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["normalizeMessages"])(messages);
            // Update local state if changes were made
            if (hasChanges) {
                setMessages(normalizedMessages);
            }
            // Don't clear queued messages - let them remain in the queue
            // User can manually delete them if needed
            if (!temporaryChatsEnabled) {
                // Cancel the stream in database first (sets canceled_at for backend detection)
                await cancelStreamMutation({
                    chatId
                }).catch((error)=>{
                    console.error("Failed to cancel stream:", error);
                });
                // Save the normalized message state to database (with interrupted tools marked as completed)
                const lastMessage = normalizedMessages[normalizedMessages.length - 1];
                if (lastMessage?.role === "assistant") {
                    await saveAssistantMessage({
                        id: lastMessage.id,
                        chatId,
                        role: lastMessage.role,
                        parts: lastMessage.parts
                    }).catch((error)=>{
                        console.error("Failed to save message on stop:", error);
                    });
                }
            } else {
                // Temporary chats: signal cancel via temp stream coordination
                await cancelTempStreamMutation({
                    chatId
                }).catch(()=>{});
            }
        } catch (error) {
            console.error("Error in handleStop:", error);
        }
    };
    const handleRegenerate = async ()=>{
        setIsAutoResuming(false);
        // Remove only todos from the last assistant message being regenerated.
        // This ensures that if the new run yields no todos, old assistant todos won't persist,
        // while preserving todos from previous assistant messages.
        const lastAssistant = [
            ...messages
        ].reverse().find((m)=>m.role === "assistant");
        const lastAssistantId = lastAssistant?.id;
        const cleanedTodos = lastAssistantId ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$todo$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["removeTodosBySourceMessages"])(todos, [
            lastAssistantId
        ]) : todos;
        if (cleanedTodos !== todos) setTodos(cleanedTodos);
        // Check if the last assistant message has actual content
        // If it's empty or has no parts, it was never saved (error occurred)
        // In this case, we shouldn't delete anything from the database
        const hasContent = lastAssistant?.parts && lastAssistant.parts.length > 0;
        if (!temporaryChatsEnabled) {
            // Only delete if the last assistant message has content
            // This prevents deleting previous valid messages when an error occurred
            if (hasContent) {
                await deleteLastAssistantMessage({
                    chatId,
                    todos: cleanedTodos
                });
            }
            // For persisted chats, backend fetches from database - explicitly send no messages
            regenerate({
                body: {
                    mode: chatMode,
                    messages: [],
                    todos: cleanedTodos,
                    regenerate: true,
                    temporary: false,
                    sandboxPreference
                }
            });
        } else {
            // For temporary chats, send all messages except the last assistant message
            const messagesForRegenerate = messages && messages.length > 0 ? messages.slice(0, -1) : messages;
            regenerate({
                body: {
                    mode: chatMode,
                    messages: messagesForRegenerate,
                    todos: cleanedTodos,
                    regenerate: true,
                    temporary: true,
                    sandboxPreference
                }
            });
        }
    };
    const handleRetry = async ()=>{
        setIsAutoResuming(false);
        const cleanedTodos = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$todo$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["removeTodosBySourceMessages"])(todos, todos.filter((t)=>t.sourceMessageId).map((t)=>t.sourceMessageId));
        if (cleanedTodos !== todos) setTodos(cleanedTodos);
        if (!temporaryChatsEnabled) {
            // For persisted chats, backend fetches from database - explicitly send no messages
            regenerate({
                body: {
                    mode: chatMode,
                    messages: [],
                    todos: cleanedTodos,
                    regenerate: true,
                    temporary: false,
                    sandboxPreference
                }
            });
        } else {
            // For temporary chats, filter out empty assistant message if present (from error)
            // Check if last message is an empty assistant message
            const lastMessage = messages[messages.length - 1];
            const isLastMessageEmptyAssistant = lastMessage?.role === "assistant" && (!lastMessage.parts || lastMessage.parts.length === 0);
            const messagesToSend = isLastMessageEmptyAssistant ? messages.slice(0, -1) : messages;
            regenerate({
                body: {
                    mode: chatMode,
                    messages: messagesToSend,
                    todos: cleanedTodos,
                    regenerate: true,
                    temporary: true,
                    sandboxPreference
                }
            });
        }
    };
    const handleEditMessage = async (messageId, newContent)=>{
        setIsAutoResuming(false);
        // Find the edited message index to identify subsequent messages
        const editedMessageIndex = messages.findIndex((m)=>m.id === messageId);
        if (editedMessageIndex !== -1) {
            // Get all subsequent messages (both user and assistant) that will be removed
            const subsequentMessages = messages.slice(editedMessageIndex + 1);
            const idsToClean = subsequentMessages.map((m)=>m.id);
            // Also clean todos from the edited message itself if it's an assistant message
            const editedMessage = messages[editedMessageIndex];
            if (editedMessage.role === "assistant") {
                idsToClean.push(messageId);
            }
            // Remove todos linked to the edited message and all subsequent messages
            if (idsToClean.length > 0) {
                const updatedTodos = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$todo$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["removeTodosBySourceMessages"])(todos, idsToClean);
                setTodos(updatedTodos);
            }
        }
        if (!temporaryChatsEnabled) {
            try {
                await regenerateWithNewContent({
                    messageId: messageId,
                    newContent
                });
            } catch (error) {
            // Swallow benign errors (e.g., racing edits where the message was already removed)
            // Avoid logging to keep console clean
            }
        }
        // Update local state to reflect the edit and remove subsequent messages
        setMessages((prevMessages)=>{
            const editedMessageIndex = prevMessages.findIndex((msg)=>msg.id === messageId);
            if (editedMessageIndex === -1) return prevMessages;
            const updatedMessages = prevMessages.slice(0, editedMessageIndex + 1);
            updatedMessages[editedMessageIndex] = {
                ...updatedMessages[editedMessageIndex],
                parts: [
                    {
                        type: "text",
                        text: newContent
                    }
                ]
            };
            return updatedMessages;
        });
        // Trigger regeneration of assistant response with cleaned todos
        const cleanedTodosForEdit = (()=>{
            const editedIndex = messages.findIndex((m)=>m.id === messageId);
            if (editedIndex === -1) return todos;
            const subsequentMessages = messages.slice(editedIndex + 1);
            const idsToClean = subsequentMessages.map((m)=>m.id);
            const editedMessage = messages[editedIndex];
            if (editedMessage.role === "assistant") idsToClean.push(messageId);
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$todo$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["removeTodosBySourceMessages"])(todos, idsToClean);
        })();
        // For persisted chats, backend fetches from database
        // For temporary chats, send all messages up to and including the edited message
        if (!temporaryChatsEnabled) {
            regenerate({
                body: {
                    mode: chatMode,
                    messages: [],
                    todos: cleanedTodosForEdit,
                    regenerate: true,
                    temporary: false,
                    sandboxPreference
                }
            });
        } else {
            // For temporary chats, send messages up to and including the edited message
            const messagesUpToEdit = messages.slice(0, editedMessageIndex + 1);
            const editedMessage = messages[editedMessageIndex];
            messagesUpToEdit[editedMessageIndex] = {
                ...editedMessage,
                parts: [
                    {
                        type: "text",
                        text: newContent
                    }
                ]
            };
            regenerate({
                body: {
                    mode: chatMode,
                    messages: messagesUpToEdit,
                    todos: cleanedTodosForEdit,
                    regenerate: true,
                    temporary: true,
                    sandboxPreference
                }
            });
        }
    };
    const handleSendNow = async (messageId)=>{
        const message = messageQueue.find((m)=>m.id === messageId);
        if (!message) return;
        // Set flag to prevent auto-processing from interfering
        isSendingNowRef.current = true;
        // Reset manual stop flag when using Send Now
        hasManuallyStoppedRef.current = false;
        try {
            // Remove the message from queue FIRST (before stopping)
            removeQueuedMessage(messageId);
            // Stop the stream - replicate handleStop logic but WITHOUT clearing the queue
            setIsAutoResuming(false);
            stop(); // Client-side abort
            // Normalize messages to mark incomplete tools as interrupted/completed
            if (messages.length > 0) {
                const { messages: normalizedMessages, hasChanges } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$message$2d$processor$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["normalizeMessages"])(messages);
                // Update local state if changes were made
                if (hasChanges) {
                    setMessages(normalizedMessages);
                }
                // Cancel stream and save normalized message state
                if (!temporaryChatsEnabled) {
                    await cancelStreamMutation({
                        chatId
                    }).catch((error)=>{
                        console.error("Failed to cancel stream:", error);
                    });
                    // Save the normalized message state to database
                    const lastMessage = normalizedMessages[normalizedMessages.length - 1];
                    if (lastMessage?.role === "assistant") {
                        await saveAssistantMessage({
                            id: lastMessage.id,
                            chatId,
                            role: lastMessage.role,
                            parts: lastMessage.parts
                        }).catch((error)=>{
                            console.error("Failed to save message on stop:", error);
                        });
                    }
                } else {
                    // Temporary chats: signal cancel via temp stream coordination
                    await cancelTempStreamMutation({
                        chatId
                    }).catch(()=>{});
                }
            }
            // Send the queued message immediately
            const validFiles = message.files || [];
            const messagePayload = {};
            // Only add text if it exists
            if (message.text) {
                messagePayload.text = message.text;
            }
            // Only add files if they exist
            if (validFiles.length > 0) {
                messagePayload.files = validFiles.map((f)=>({
                        type: "file",
                        filename: f.file.name,
                        mediaType: f.file.type,
                        url: f.url,
                        fileId: f.fileId
                    }));
            }
            sendMessage(messagePayload, {
                body: {
                    mode: chatMode,
                    todos,
                    temporary: temporaryChatsEnabled,
                    sandboxPreference,
                    selectedModel,
                    customSystemPrompt
                }
            });
        } catch (error) {
            console.error("Failed to send queued message:", error);
        } finally{
            // Clear flag after a brief delay to allow status to change
            setTimeout(()=>{
                isSendingNowRef.current = false;
            }, 200);
        }
    };
    return {
        handleSubmit,
        handleStop,
        handleRegenerate,
        handleRetry,
        handleEditMessage,
        handleSendNow
    };
};
}),
"[project]/app/hooks/useDocumentDragAndDrop.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useDocumentDragAndDrop",
    ()=>useDocumentDragAndDrop
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.28.5_@opentelemetry+api@1.9.0_@playwright+test@1.57.0_react-_bc0e796ca3d7ea4640f9d74c95225eb3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
const useDocumentDragAndDrop = (handlers)=>{
    const { handleDragEnter, handleDragLeave, handleDragOver, handleDrop } = handlers;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const onEnter = (e)=>handleDragEnter(e);
        const onLeave = (e)=>handleDragLeave(e);
        const onOver = (e)=>handleDragOver(e);
        const onDrop = (e)=>handleDrop(e);
        document.addEventListener("dragenter", onEnter);
        document.addEventListener("dragleave", onLeave);
        document.addEventListener("dragover", onOver);
        document.addEventListener("drop", onDrop);
        return ()=>{
            document.removeEventListener("dragenter", onEnter);
            document.removeEventListener("dragleave", onLeave);
            document.removeEventListener("dragover", onOver);
            document.removeEventListener("drop", onDrop);
        };
    }, [
        handleDragEnter,
        handleDragLeave,
        handleDragOver,
        handleDrop
    ]);
};
}),
"[project]/app/hooks/useAutoResume.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAutoResume",
    ()=>useAutoResume
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.28.5_@opentelemetry+api@1.9.0_@playwright+test@1.57.0_react-_bc0e796ca3d7ea4640f9d74c95225eb3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$DataStreamProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/DataStreamProvider.tsx [app-ssr] (ecmascript)");
"use client";
;
;
function useAutoResume({ autoResume, initialMessages, resumeStream, setMessages }) {
    const { dataStream, setIsAutoResuming } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$DataStreamProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useDataStream"])();
    const hasAutoResumedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!autoResume || hasAutoResumedRef.current) return;
        if (initialMessages.length === 0) return;
        const mostRecentMessage = initialMessages.at(-1);
        if (mostRecentMessage?.role === "user") {
            hasAutoResumedRef.current = true;
            setIsAutoResuming(true);
            resumeStream();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        autoResume,
        initialMessages.length > 0
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!dataStream) return;
        if (dataStream.length === 0) return;
        const dataPart = dataStream[0];
        if (dataPart.type === "data-appendMessage") {
            const message = JSON.parse(dataPart.data);
            setMessages([
                ...initialMessages,
                message
            ]);
            // First message arrived, we can allow Stop button again
            setIsAutoResuming(false);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        dataStream,
        initialMessages,
        setMessages
    ]);
}
}),
"[project]/app/hooks/useLatestRef.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useLatestRef",
    ()=>useLatestRef
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.28.5_@opentelemetry+api@1.9.0_@playwright+test@1.57.0_react-_bc0e796ca3d7ea4640f9d74c95225eb3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
const useLatestRef = (value)=>{
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(value);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        ref.current = value;
    }, [
        value
    ]);
    return ref;
};
}),
"[project]/app/hooks/useUpgrade.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useUpgrade",
    ()=>useUpgrade
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.28.5_@opentelemetry+api@1.9.0_@playwright+test@1.57.0_react-_bc0e796ca3d7ea4640f9d74c95225eb3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$workos$2d$inc$2b$authkit$2d$nextjs$40$2$2e$12$2e$0_next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$_d69fb94637ccf89267342f537ef484a4$2f$node_modules$2f40$workos$2d$inc$2f$authkit$2d$nextjs$2f$dist$2f$esm$2f$components$2f$authkit$2d$provider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@workos-inc+authkit-nextjs@2.12.0_next@16.0.10_@babel+core@7.28.5_@opentelemetry+api@1._d69fb94637ccf89267342f537ef484a4/node_modules/@workos-inc/authkit-nextjs/dist/esm/components/authkit-provider.js [app-ssr] (ecmascript)");
;
;
const useUpgrade = ()=>{
    const { user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$workos$2d$inc$2b$authkit$2d$nextjs$40$2$2e$12$2e$0_next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$_d69fb94637ccf89267342f537ef484a4$2f$node_modules$2f40$workos$2d$inc$2f$authkit$2d$nextjs$2f$dist$2f$esm$2f$components$2f$authkit$2d$provider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuth"])();
    const [upgradeLoading, setUpgradeLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [upgradeError, setUpgradeError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const handleUpgrade = async (planKey, e, quantity, currentSubscription)=>{
        e?.preventDefault();
        // Prevent duplicate submits
        if (upgradeLoading) {
            return;
        }
        if (!user) {
            setUpgradeError("Please sign in to upgrade");
            return;
        }
        setUpgradeLoading(true);
        setUpgradeError("");
        try {
            const requestBody = {
                plan: planKey || "pro-monthly-plan"
            };
            // Add quantity for team plans
            if (quantity && quantity > 1) {
                requestBody.quantity = quantity;
            }
            // Use regular checkout for new subscriptions (free users)
            if (!currentSubscription || currentSubscription === "free") {
                const res = await fetch("/api/subscribe", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(requestBody)
                });
                if (!res.ok) {
                    const text = await res.text();
                    throw new Error(`HTTP ${res.status}: ${text}`);
                }
                const { error, url } = await res.json();
                if (url) {
                    window.location.href = url;
                    return;
                }
                if (error) {
                    setUpgradeError(`Error: ${error}`);
                } else {
                    setUpgradeError("Unknown error creating checkout session");
                }
            } else {
                // For existing subscribers, use immediate subscription update
                // This prevents the "free credit" exploit
                const res = await fetch("/api/subscription-details", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        plan: planKey,
                        confirm: true,
                        quantity: quantity
                    })
                });
                if (!res.ok) {
                    const text = await res.text();
                    throw new Error(`HTTP ${res.status}: ${text}`);
                }
                const result = await res.json();
                if (result.success) {
                    // Subscription updated successfully, refresh to show new plan
                    const url = new URL(window.location.href);
                    url.searchParams.set("refresh", "entitlements");
                    url.hash = ""; // Remove #pricing hash if present
                    window.location.href = url.toString();
                } else if (result.invoiceUrl) {
                    // Payment failed, redirect to invoice payment page
                    window.location.href = result.invoiceUrl;
                } else if (result.error) {
                    setUpgradeError(`Error: ${result.error}`);
                } else {
                    setUpgradeError("Unknown error updating subscription");
                }
            }
        } catch (err) {
            // Surface real error messages when err is an Error
            if (err instanceof Error) {
                setUpgradeError(err.message);
            } else {
                setUpgradeError("An unexpected error occurred");
            }
        } finally{
            setUpgradeLoading(false);
        }
    };
    return {
        upgradeLoading,
        upgradeError,
        handleUpgrade,
        setUpgradeError
    };
};
}),
"[project]/app/contexts/FileUrlCacheContext.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FileUrlCacheProvider",
    ()=>FileUrlCacheProvider,
    "useFileUrlCacheContext",
    ()=>useFileUrlCacheContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.28.5_@opentelemetry+api@1.9.0_@playwright+test@1.57.0_react-_bc0e796ca3d7ea4640f9d74c95225eb3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.28.5_@opentelemetry+api@1.9.0_@playwright+test@1.57.0_react-_bc0e796ca3d7ea4640f9d74c95225eb3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
;
const FileUrlCacheContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(null);
function FileUrlCacheProvider({ children, getCachedUrl, setCachedUrl }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FileUrlCacheContext.Provider, {
        value: {
            getCachedUrl,
            setCachedUrl
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/app/contexts/FileUrlCacheContext.tsx",
        lineNumber: 22,
        columnNumber: 5
    }, this);
}
function useFileUrlCacheContext() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(FileUrlCacheContext);
}
}),
"[project]/app/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>Page
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.28.5_@opentelemetry+api@1.9.0_@playwright+test@1.57.0_react-_bc0e796ca3d7ea4640f9d74c95225eb3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.28.5_@opentelemetry+api@1.9.0_@playwright+test@1.57.0_react-_bc0e796ca3d7ea4640f9d74c95225eb3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$convex$40$1$2e$29$2e$2_react$40$19$2e$2$2e$1$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$react$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/convex@1.29.2_react@19.2.1/node_modules/convex/dist/esm/react/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$convex$40$1$2e$29$2e$2_react$40$19$2e$2$2e$1$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$react$2f$auth_helpers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/convex@1.29.2_react@19.2.1/node_modules/convex/dist/esm/react/auth_helpers.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ChatInput$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/ChatInput.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$Header$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/Header.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$Footer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/Footer.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$chat$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/chat.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$PricingDialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/PricingDialog.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$TeamPricingDialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/TeamPricingDialog.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$TeamDialogs$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/TeamDialogs.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$MigratePentestgptDialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/MigratePentestgptDialog.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$hooks$2f$usePricingDialog$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/hooks/usePricingDialog.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$contexts$2f$GlobalState$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/contexts/GlobalState.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$hooks$2f$usePentestgptMigration$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/hooks/usePentestgptMigration.ts [app-ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$chat$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$chat$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
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
;
;
;
;
// Simple unauthenticated content that redirects to login on message send
const UnauthenticatedContent = ()=>{
    const handleSubmit = (e)=>{
        e.preventDefault();
        // Preserve input draft for later; redirect to login
        window.location.href = "/login";
    };
    const handleStop = ()=>{
    // No-op for unauthenticated users
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "h-full bg-background flex flex-col overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-shrink-0",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$Header$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 32,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 31,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 flex flex-col min-h-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 flex flex-col items-center justify-center px-4 py-8 min-h-0",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-full max-w-full sm:max-w-[768px] sm:min-w-[390px] flex flex-col items-center space-y-8",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                            className: "text-3xl font-bold text-foreground mb-2",
                                            children: "HackerAI"
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 41,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-muted-foreground",
                                            children: "Your AI pentest assistant"
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 44,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 40,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-full",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ChatInput$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ChatInput"], {
                                        onSubmit: handleSubmit,
                                        onStop: handleStop,
                                        onSendNow: ()=>{},
                                        status: "ready",
                                        isCentered: true,
                                        isNewChat: true,
                                        clearDraftOnSubmit: false
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 49,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 48,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 38,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 37,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-shrink-0",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$Footer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 64,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 63,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 35,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/app/page.tsx",
        lineNumber: 30,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
// Authenticated content that shows chat (UUID generated internally)
const AuthenticatedContent = ()=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$chat$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Chat"], {
        autoResume: false
    }, void 0, false, {
        fileName: "[project]/app/page.tsx",
        lineNumber: 73,
        columnNumber: 10
    }, ("TURBOPACK compile-time value", void 0));
};
function Page() {
    const { subscription, teamPricingDialogOpen, setTeamPricingDialogOpen, teamWelcomeDialogOpen, setTeamWelcomeDialogOpen, migrateFromPentestgptDialogOpen, setMigrateFromPentestgptDialogOpen } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$contexts$2f$GlobalState$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGlobalState"])();
    const { showPricing, handleClosePricing } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$hooks$2f$usePricingDialog$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePricingDialog"])(subscription);
    const { isMigrating, migrate } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$hooks$2f$usePentestgptMigration$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePentestgptMigration"])();
    const searchParams = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : "";
    const { initialSeats, initialPlan } = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useMemo(()=>{
        if ("TURBOPACK compile-time truthy", 1) {
            return {
                initialSeats: 5,
                initialPlan: "monthly"
            };
        }
        //TURBOPACK unreachable
        ;
        const urlParams = undefined;
        const urlSeats = undefined;
        const urlPlan = undefined;
        let seats;
        const plan = undefined;
    }, [
        searchParams
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$convex$40$1$2e$29$2e$2_react$40$19$2e$2$2e$1$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$react$2f$auth_helpers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Authenticated"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthenticatedContent, {}, void 0, false, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 118,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 117,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$convex$40$1$2e$29$2e$2_react$40$19$2e$2$2e$1$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$react$2f$auth_helpers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Unauthenticated"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(UnauthenticatedContent, {}, void 0, false, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 121,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 120,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$PricingDialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                isOpen: showPricing,
                onClose: handleClosePricing
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 123,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$TeamPricingDialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                isOpen: teamPricingDialogOpen,
                onClose: ()=>setTeamPricingDialogOpen(false),
                initialSeats: initialSeats,
                initialPlan: initialPlan
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 124,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$TeamDialogs$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TeamWelcomeDialog"], {
                open: teamWelcomeDialogOpen,
                onOpenChange: setTeamWelcomeDialogOpen
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 130,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_bc0e796ca3d7ea4640f9d74c95225eb3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$MigratePentestgptDialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                open: migrateFromPentestgptDialogOpen,
                onOpenChange: setMigrateFromPentestgptDialogOpen,
                isMigrating: isMigrating,
                onConfirm: migrate
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 134,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
];

//# sourceMappingURL=app_58552b08._.js.map