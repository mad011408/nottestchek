(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/node_modules/.pnpm/gpt-tokenizer@3.4.0/node_modules/gpt-tokenizer/esm/constants.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ALL_SPECIAL_TOKENS",
    ()=>ALL_SPECIAL_TOKENS,
    "DEFAULT_MERGE_CACHE_SIZE",
    ()=>DEFAULT_MERGE_CACHE_SIZE
]);
const ALL_SPECIAL_TOKENS = 'all';
const DEFAULT_MERGE_CACHE_SIZE = 100_000; //# sourceMappingURL=constants.js.map
}),
"[project]/node_modules/.pnpm/gpt-tokenizer@3.4.0/node_modules/gpt-tokenizer/esm/utfUtil.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* eslint-disable no-bitwise */ /* eslint-disable no-magic-numbers */ __turbopack_context__.s([
    "compareUint8Arrays",
    ()=>compareUint8Arrays,
    "endsWithIncompleteUtfPairSurrogate",
    ()=>endsWithIncompleteUtfPairSurrogate,
    "isAscii",
    ()=>isAscii,
    "tryConvertToString",
    ()=>tryConvertToString
]);
const isAscii = (codePoint)=>codePoint <= 0x7f;
const HIGH_SURROGATE_START = 55_296;
const HIGH_SURROGATE_END = 56_319;
function endsWithIncompleteUtfPairSurrogate(string) {
    if (string.length === 0) return false;
    // Check if the last character is a high surrogate
    // eslint-disable-next-line unicorn/prefer-code-point
    const lastCharCode = string.charCodeAt(string.length - 1);
    return lastCharCode >= HIGH_SURROGATE_START && lastCharCode <= HIGH_SURROGATE_END;
}
function isValidUTF8(bytes) {
    let i = 0;
    while(i < bytes.length){
        const byte1 = bytes[i];
        let numBytes = 0;
        let codePoint = 0;
        // Determine the number of bytes in the current UTF-8 character
        if (byte1 <= 0x7f) {
            // 1-byte character (ASCII)
            numBytes = 1;
            codePoint = byte1;
        } else if ((byte1 & 0xe0) === 0xc0) {
            // 2-byte character
            numBytes = 2;
            codePoint = byte1 & 0x1f;
            if (byte1 <= 0xc1) return false; // Overlong encoding not allowed
        } else if ((byte1 & 0xf0) === 0xe0) {
            // 3-byte character
            numBytes = 3;
            codePoint = byte1 & 0x0f;
        } else if ((byte1 & 0xf8) === 0xf0) {
            // 4-byte character
            numBytes = 4;
            codePoint = byte1 & 0x07;
            if (byte1 > 0xf4) return false; // Code points above U+10FFFF not allowed
        } else {
            // Invalid first byte of UTF-8 character
            return false;
        }
        // Ensure there are enough continuation bytes
        if (i + numBytes > bytes.length) return false;
        // Process the continuation bytes
        for(let j = 1; j < numBytes; j++){
            const byte = bytes[i + j];
            if (byte === undefined || (byte & 0xc0) !== 0x80) return false; // Continuation bytes must start with '10'
            codePoint = codePoint << 6 | byte & 0x3f;
        }
        // Check for overlong encodings
        if (numBytes === 2 && codePoint < 0x80) return false; // Overlong 2-byte sequence
        if (numBytes === 3 && codePoint < 2_048) return false; // Overlong 3-byte sequence
        if (numBytes === 4 && codePoint < 65_536) return false; // Overlong 4-byte sequence
        // Check for surrogate halves (U+D800 to U+DFFF)
        if (codePoint >= 55_296 && codePoint <= 57_343) return false;
        // Check for code points above U+10FFFF
        if (codePoint > 1_114_111) return false;
        // Move to the next character
        i += numBytes;
    }
    return true;
}
const textDecoder = new TextDecoder('utf8', {
    fatal: false
});
function tryConvertToString(arr) {
    if (!isValidUTF8(arr)) {
        return undefined;
    }
    return textDecoder.decode(arr);
}
function compareUint8Arrays(a, b) {
    const len = Math.min(a.length, b.length);
    for(let i = 0; i < len; i++){
        if (a[i] !== b[i]) {
            return a[i] - b[i];
        }
    }
    return a.length - b.length;
} //# sourceMappingURL=utfUtil.js.map
}),
"[project]/node_modules/.pnpm/gpt-tokenizer@3.4.0/node_modules/gpt-tokenizer/esm/util.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "escapeRegExp",
    ()=>escapeRegExp,
    "getMaxValueFromMap",
    ()=>getMaxValueFromMap,
    "getSpecialTokenRegex",
    ()=>getSpecialTokenRegex
]);
function getMaxValueFromMap(map) {
    let max = 0;
    map.forEach((val)=>{
        max = Math.max(max, val);
    });
    return max;
}
function escapeRegExp(string) {
    return string.replace(/[$()*+.?[\\\]^{|}]/g, '\\$&'); // $& means the whole matched string
}
function getSpecialTokenRegex(tokens) {
    const escapedTokens = [
        ...tokens
    ].map(escapeRegExp);
    const inner = escapedTokens.join('|');
    return new RegExp(`(${inner})`);
} //# sourceMappingURL=util.js.map
}),
"[project]/node_modules/.pnpm/gpt-tokenizer@3.4.0/node_modules/gpt-tokenizer/esm/BytePairEncodingCore.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* eslint-disable no-continue */ __turbopack_context__.s([
    "BytePairEncodingCore",
    ()=>BytePairEncodingCore,
    "decoder",
    ()=>decoder
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/gpt-tokenizer@3.4.0/node_modules/gpt-tokenizer/esm/constants.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$utfUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/gpt-tokenizer@3.4.0/node_modules/gpt-tokenizer/esm/utfUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$util$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/gpt-tokenizer@3.4.0/node_modules/gpt-tokenizer/esm/util.js [app-client] (ecmascript)");
;
;
;
const emptyBuffer = new Uint8Array(0);
const decoder = new TextDecoder('utf8');
class BytePairEncodingCore {
    mergeableBytePairRankCount;
    /**
     * an array where the index is the BPE rank,
     * and the value is the string or the array of bytes that it decodes to
     * it may contain holes if token is unused
     */ bytePairRankDecoder;
    bytePairNonUtfRankDecoder = new Map();
    bytePairNonUtfSortedEncoder;
    /**
     * a reverse map of the bytePairRankDecoder,
     * where the key is the string and the value is the rank
     * values that cannot be represented as a string are present in `bytePairNonUtfSortedEncoder`
     */ bytePairStringRankEncoder;
    tokenSplitRegex;
    specialTokensEncoder;
    specialTokensDecoder;
    specialTokenPatternRegex;
    textEncoder = new TextEncoder();
    mergeCache;
    mergeCacheSize;
    constructor({ bytePairRankDecoder, specialTokensEncoder, tokenSplitRegex, mergeCacheSize = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_MERGE_CACHE_SIZE"] }){
        this.bytePairRankDecoder = bytePairRankDecoder;
        this.bytePairStringRankEncoder = new Map();
        this.mergeCacheSize = mergeCacheSize;
        if (mergeCacheSize > 0) {
            this.mergeCache = new Map();
        }
        // size without array holes (which may be present in the encoder)
        this.mergeableBytePairRankCount = Object.keys(bytePairRankDecoder).length;
        const binaryLookup = [];
        // forEach skips array holes:
        bytePairRankDecoder.forEach((value, rank)=>{
            if (typeof value === 'string') {
                this.bytePairStringRankEncoder.set(value, rank);
                return;
            }
            const byteArray = new Uint8Array(value);
            binaryLookup.push([
                byteArray,
                rank
            ]);
            this.bytePairNonUtfRankDecoder.set(rank, byteArray);
        });
        this.bytePairNonUtfSortedEncoder = binaryLookup.sort((a, b)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$utfUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["compareUint8Arrays"])(a[0], b[0]));
        this.specialTokensEncoder = specialTokensEncoder ?? new Map();
        this.specialTokensDecoder = specialTokensEncoder ? new Map([
            ...specialTokensEncoder
        ].map(([key, value])=>[
                value,
                key
            ])) : new Map();
        this.tokenSplitRegex = tokenSplitRegex;
        const escapedSpecialTokens = [
            ...this.specialTokensEncoder.keys()
        ].map(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$util$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["escapeRegExp"]);
        const allSpecialTokensRegex = escapedSpecialTokens.join('|');
        try {
            this.specialTokenPatternRegex = new RegExp(allSpecialTokensRegex, 'y');
        } catch  {
            throw new Error('Invalid regular expression pattern.');
        }
    }
    setMergeCacheSize(newSize) {
        if (this.mergeCacheSize === 0 && newSize > 0) {
            this.mergeCache = new Map();
        }
        this.mergeCacheSize = newSize;
        if (newSize === 0) {
            this.mergeCache = undefined;
        }
    }
    clearMergeCache() {
        this.mergeCache?.clear();
    }
    *encodeNativeGenerator(text, allowedSpecial) {
        let startIndex = 0;
        let lastTokenLength = 0;
        while(true){
            const nextSpecialMatch = this.findNextSpecialToken(text, allowedSpecial, startIndex);
            const nextSpecialStartIndex = nextSpecialMatch?.[0];
            const endIndex = nextSpecialStartIndex ?? text.length;
            const textBeforeSpecial = startIndex === 0 && endIndex === text.length ? text : text.slice(startIndex, endIndex);
            for (const [match] of textBeforeSpecial.matchAll(this.tokenSplitRegex)){
                const token = this.getBpeRankFromString(match);
                if (token !== undefined) {
                    lastTokenLength = 1;
                    yield [
                        token
                    ];
                    continue;
                }
                const tokens = this.bytePairEncode(match);
                lastTokenLength = tokens.length;
                yield tokens;
            }
            if (nextSpecialStartIndex !== undefined) {
                const specialToken = nextSpecialMatch[1];
                const specialTokenValue = this.specialTokensEncoder.get(specialToken);
                if (specialTokenValue === undefined) {
                    throw new Error(`Special token "${specialToken}" is not in the special token encoder.`);
                }
                yield [
                    specialTokenValue
                ];
                startIndex = nextSpecialStartIndex + specialToken.length;
                lastTokenLength = 1;
            } else {
                break;
            }
        }
        return lastTokenLength;
    }
    encodeNative(text, allowedSpecial) {
        let startIndex = 0;
        const tokensArray = []; // Flat list to collect the tokens
        // eslint-disable-next-line no-constant-condition
        while(true){
            const nextSpecialMatch = this.findNextSpecialToken(text, allowedSpecial, startIndex);
            const nextSpecialStartIndex = nextSpecialMatch?.[0];
            const endIndex = nextSpecialStartIndex ?? text.length;
            const textBeforeSpecial = startIndex === 0 && endIndex === text.length ? text : text.slice(startIndex, endIndex);
            for (const [match] of textBeforeSpecial.matchAll(this.tokenSplitRegex)){
                const token = this.getBpeRankFromString(match);
                if (token !== undefined) {
                    tokensArray.push(token);
                    continue;
                }
                const tokens = this.bytePairEncode(match);
                tokensArray.push(...tokens);
            }
            if (nextSpecialStartIndex !== undefined) {
                const specialToken = nextSpecialMatch[1];
                const specialTokenValue = this.specialTokensEncoder.get(specialToken);
                if (specialTokenValue === undefined) {
                    throw new Error(`Special token "${specialToken}" is not in the special token encoder.`);
                }
                tokensArray.push(specialTokenValue);
                startIndex = nextSpecialStartIndex + specialToken.length;
            } else {
                break;
            }
        }
        return tokensArray;
    }
    countNative(text, allowedSpecial) {
        let startIndex = 0;
        let tokensCount = 0;
        // eslint-disable-next-line no-constant-condition
        while(true){
            const nextSpecialMatch = this.findNextSpecialToken(text, allowedSpecial, startIndex);
            const nextSpecialStartIndex = nextSpecialMatch?.[0];
            const endIndex = nextSpecialStartIndex ?? text.length;
            const textBeforeSpecial = startIndex === 0 && endIndex === text.length ? text : text.slice(startIndex, endIndex);
            for (const [match] of textBeforeSpecial.matchAll(this.tokenSplitRegex)){
                const token = this.getBpeRankFromString(match);
                if (token !== undefined) {
                    tokensCount++;
                    continue;
                }
                const tokens = this.bytePairEncode(match);
                tokensCount += tokens.length;
            }
            if (nextSpecialStartIndex !== undefined) {
                const specialToken = nextSpecialMatch[1];
                const specialTokenValue = this.specialTokensEncoder.get(specialToken);
                if (specialTokenValue === undefined) {
                    throw new Error(`Special token "${specialToken}" is not in the special token encoder.`);
                }
                tokensCount++;
                startIndex = nextSpecialStartIndex + specialToken.length;
            } else {
                break;
            }
        }
        return tokensCount;
    }
    *decodeNativeGenerator(tokens) {
        for (const token of tokens){
            const tokenBytes = this.tryDecodeToken(token);
            if (tokenBytes) {
                yield tokenBytes;
            }
        }
    }
    decodeNative(tokens) {
        let decoded = '';
        let intBuffer = emptyBuffer;
        for (const token of tokens){
            const tokenBytes = this.tryDecodeToken(token);
            if (tokenBytes === undefined) {
                throw new Error(`Token ${token} is not in the byte pair encoder.`);
            }
            if (typeof tokenBytes === 'string') {
                if (intBuffer !== emptyBuffer) {
                    decoded += decoder.decode(intBuffer, {
                        stream: true
                    });
                    intBuffer = emptyBuffer;
                }
                decoded += tokenBytes;
            } else {
                const newBuffer = new Uint8Array(intBuffer.length + tokenBytes.length);
                newBuffer.set(intBuffer);
                newBuffer.set(tokenBytes, intBuffer.length);
                intBuffer = newBuffer;
            }
        }
        if (intBuffer !== emptyBuffer) {
            decoded += decoder.decode(intBuffer, {
                stream: true
            });
        }
        return decoded;
    }
    async *decodeNativeAsyncIterable(tokens) {
        for await (const token of tokens){
            const tokenBytesOrString = this.tryDecodeToken(token);
            if (tokenBytesOrString) {
                yield tokenBytesOrString;
            }
        }
    }
    getBpeRankFromString(key) {
        return this.bytePairStringRankEncoder.get(key);
    }
    getBpeRankFromStringOrThrow(key) {
        const value = this.getBpeRankFromString(key);
        if (value === undefined) {
            throw new Error(`The byte-pair encoding does not contain a value for: ${key}`);
        }
        return value;
    }
    getBpeRankFromBytes(key) {
        const keyAsString = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$utfUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tryConvertToString"])(key);
        if (keyAsString !== undefined) {
            return this.getBpeRankFromString(keyAsString);
        }
        // Perform binary search on the binary keys
        const index = this.binarySearch(key);
        if (index !== -1) {
            return this.bytePairNonUtfSortedEncoder[index][1];
        }
        return undefined;
    }
    getBpeRankFromBytesOrThrow(key) {
        const value = this.getBpeRankFromBytes(key);
        if (value === undefined) {
            throw new Error(`The byte-pair encoding does not contain a value for: ${key.toString()}`);
        }
        return value;
    }
    // Binary search on the binary keys
    binarySearch(key) {
        let low = 0;
        let high = this.bytePairNonUtfSortedEncoder.length - 1;
        while(low <= high){
            // eslint-disable-next-line no-bitwise
            const mid = low + high >>> 1;
            const midKey = this.bytePairNonUtfSortedEncoder[mid][0];
            let cmp = 0;
            const maxLength = Math.min(midKey.length, key.length);
            for(let i = 0; i < maxLength; i++){
                cmp = midKey[i] - key[i];
                if (cmp !== 0) break;
            }
            if (cmp === 0) {
                cmp = midKey.length - key.length;
            }
            if (cmp === 0) {
                return mid;
            }
            if (cmp < 0) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
        return -1;
    }
    findNextSpecialToken(text, allowedSpecial, startIndex) {
        let searchIndex = startIndex;
        // eslint-disable-next-line no-constant-condition
        while(true){
            this.specialTokenPatternRegex.lastIndex = searchIndex;
            const nextSpecialMatch = this.specialTokenPatternRegex.exec(text);
            if (!nextSpecialMatch) {
                return undefined;
            }
            const specialToken = nextSpecialMatch[0];
            if (allowedSpecial?.has(specialToken)) {
                const specialTokenStartIndex = nextSpecialMatch.index + searchIndex;
                return [
                    specialTokenStartIndex,
                    specialToken
                ];
            }
            searchIndex = nextSpecialMatch.index + searchIndex + 1;
        }
    }
    tryDecodeToken(tokenRank) {
        const value = this.bytePairRankDecoder[tokenRank];
        if (typeof value === 'string') {
            return value;
        }
        if (typeof value === 'object') {
            const fromBinary = this.bytePairNonUtfRankDecoder.get(tokenRank);
            if (fromBinary) {
                return fromBinary;
            }
        }
        return this.specialTokensDecoder.get(tokenRank);
    }
    addToMergeCache(key, value) {
        if (!this.mergeCache) return;
        if (this.mergeCache.size >= this.mergeCacheSize) {
            // Remove least recently used item (first item)
            const firstKey = this.mergeCache.keys().next().value;
            this.mergeCache.delete(firstKey);
        }
        this.mergeCache.set(key, value);
    }
    bytePairEncode(input) {
        if (input.length === 1 && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$utfUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isAscii"])(input.codePointAt(0))) {
            return [
                this.getBpeRankFromStringOrThrow(input)
            ];
        }
        if (this.mergeCache?.has(input)) {
            const result = this.mergeCache.get(input);
            // Move to end to mark as recently used
            this.mergeCache.delete(input);
            this.mergeCache.set(input, result);
            return result;
        }
        const inputBytes = this.textEncoder.encode(input);
        const result = this.bytePairMerge(inputBytes);
        this.addToMergeCache(input, result);
        return result;
    }
    bytePairMerge(// Input array of bytes to process
    piece) {
        // 'starts' holds the start indices of each partition
        const starts = [];
        // 'ranks' holds the BPE ranks of each partition pair
        const ranks = [];
        // Helper function to get the rank of a byte pair starting at 'startIndex'
        const getRank = (startIndex, pairStart = starts[startIndex], pairEnd = starts[startIndex + 2])=>{
            if (pairEnd === undefined) {
                // No valid pair exists
                return Number.POSITIVE_INFINITY;
            }
            // Extract the byte pair
            const key = piece.subarray(pairStart, pairEnd);
            // Retrieve the BPE rank of this byte pair (if it exists)
            const rank = this.getBpeRankFromBytes(key);
            return rank ?? Number.POSITIVE_INFINITY;
        };
        // Initialize the 'starts' array with all possible start indices
        for(let i = 0; i <= piece.length; i++){
            starts.push(i);
            if (i < piece.length - 1) {
                // Initialize the BPE values for all adjacent pairs
                ranks.push(getRank(i, i, i + 2));
            } else {
                // Initialize BPE values to infinity for the last pair
                ranks.push(Number.POSITIVE_INFINITY);
            }
        }
        // Iteratively merge byte pairs until no more useful merges can be done
        while(starts.length > 1){
            let lowestRank = Number.POSITIVE_INFINITY;
            let lowestPartitionIndex = -1;
            // Find the partition with the minimum rank
            for(let i = 0; i < ranks.length - 1; i++){
                const rank = ranks[i];
                if (rank < lowestRank) {
                    lowestRank = rank;
                    lowestPartitionIndex = i;
                }
            }
            // If no valid pair is left to merge, exit the loop
            if (lowestRank === Number.POSITIVE_INFINITY || lowestPartitionIndex === -1) {
                break;
            }
            // Merge the pair at 'lowestPartitionIndex' by removing the next start index
            starts.splice(lowestPartitionIndex + 1, 1);
            // Remove the BPE value of the merged pair
            ranks.splice(lowestPartitionIndex, 1);
            // Update the current merged pair's rank
            ranks[lowestPartitionIndex] = getRank(lowestPartitionIndex);
            // Update the rank of the previous pair, if it exists
            if (lowestPartitionIndex > 0) {
                ranks[lowestPartitionIndex - 1] = getRank(lowestPartitionIndex - 1);
            }
        }
        // Create the final output by applying the transform function to each partitioned range
        const output = [];
        for(let i = 0; i < starts.length - 1; i++){
            const pairStart = starts[i];
            const pairEnd = starts[i + 1];
            const bpeValue = this.getBpeRankFromBytesOrThrow(piece.subarray(pairStart, pairEnd));
            output.push(bpeValue);
        }
        return output;
    }
} //# sourceMappingURL=BytePairEncodingCore.js.map
}),
"[project]/node_modules/.pnpm/gpt-tokenizer@3.4.0/node_modules/gpt-tokenizer/esm/functionCalling.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "COMPLETION_REQUEST_TOKEN_OVERHEAD",
    ()=>COMPLETION_REQUEST_TOKEN_OVERHEAD,
    "FUNCTION_CALL_METADATA_TOKEN_OVERHEAD",
    ()=>FUNCTION_CALL_METADATA_TOKEN_OVERHEAD,
    "FUNCTION_CALL_NAME_TOKEN_OVERHEAD",
    ()=>FUNCTION_CALL_NAME_TOKEN_OVERHEAD,
    "FUNCTION_CALL_NONE_TOKEN_OVERHEAD",
    ()=>FUNCTION_CALL_NONE_TOKEN_OVERHEAD,
    "FUNCTION_DEFINITION_TOKEN_OVERHEAD",
    ()=>FUNCTION_DEFINITION_TOKEN_OVERHEAD,
    "FUNCTION_ROLE_TOKEN_DISCOUNT",
    ()=>FUNCTION_ROLE_TOKEN_DISCOUNT,
    "MESSAGE_NAME_TOKEN_OVERHEAD",
    ()=>MESSAGE_NAME_TOKEN_OVERHEAD,
    "MESSAGE_TOKEN_OVERHEAD",
    ()=>MESSAGE_TOKEN_OVERHEAD,
    "SYSTEM_FUNCTION_TOKEN_DEDUCTION",
    ()=>SYSTEM_FUNCTION_TOKEN_DEDUCTION,
    "computeChatCompletionTokenCount",
    ()=>computeChatCompletionTokenCount,
    "countMessageTokens",
    ()=>countMessageTokens,
    "estimateTokensInFunctions",
    ()=>estimateTokensInFunctions,
    "formatFunctionDefinitions",
    ()=>formatFunctionDefinitions,
    "formatFunctionType",
    ()=>formatFunctionType,
    "formatObjectProperties",
    ()=>formatObjectProperties,
    "padSystemMessage",
    ()=>padSystemMessage
]);
const MESSAGE_TOKEN_OVERHEAD = 3;
const MESSAGE_NAME_TOKEN_OVERHEAD = 1;
const FUNCTION_ROLE_TOKEN_DISCOUNT = 2;
const FUNCTION_CALL_METADATA_TOKEN_OVERHEAD = 3;
const FUNCTION_DEFINITION_TOKEN_OVERHEAD = 9;
const COMPLETION_REQUEST_TOKEN_OVERHEAD = 3;
const FUNCTION_CALL_NAME_TOKEN_OVERHEAD = 4;
const FUNCTION_CALL_NONE_TOKEN_OVERHEAD = 1;
const SYSTEM_FUNCTION_TOKEN_DEDUCTION = 4;
const NEWLINE = '\n';
function countMessageTokens(message, countStringTokens) {
    let tokens = 0;
    if (message.role) {
        tokens += countStringTokens(message.role);
    }
    if (message.content) {
        tokens += countStringTokens(message.content);
    }
    if (message.name) {
        tokens += countStringTokens(message.name) + MESSAGE_NAME_TOKEN_OVERHEAD;
    }
    if (message.function_call) {
        const { name, arguments: args } = message.function_call;
        if (name) {
            tokens += countStringTokens(name);
        }
        if (args) {
            tokens += countStringTokens(args);
        }
        tokens += FUNCTION_CALL_METADATA_TOKEN_OVERHEAD;
    }
    tokens += MESSAGE_TOKEN_OVERHEAD;
    if (message.role === 'function') {
        tokens -= FUNCTION_ROLE_TOKEN_DISCOUNT;
    }
    return tokens;
}
function formatObjectProperties(obj, indent, formatType) {
    if (!obj.properties) {
        return '';
    }
    const lines = [];
    const requiredParams = new Set(obj.required ?? []);
    const indentString = ' '.repeat(indent);
    for (const [name, param] of Object.entries(obj.properties)){
        if (param.description && indent < 2) {
            lines.push(`${indentString}// ${param.description}`);
        }
        const isRequired = requiredParams.has(name);
        const formattedType = formatType(param, indent);
        lines.push(`${indentString}${name}${isRequired ? '' : '?'}: ${formattedType},`);
    }
    return lines.join('\n');
}
function formatFunctionType(param, indent) {
    switch(param.type){
        case 'string':
            return param.enum?.map((value)=>JSON.stringify(value)).join(' | ') ?? 'string';
        case 'integer':
        case 'number':
            return param.enum?.map((value)=>`${value}`).join(' | ') ?? 'number';
        case 'boolean':
            return 'boolean';
        case 'null':
            return 'null';
        case 'array':
            return param.items ? `${formatFunctionType(param.items, indent)}[]` : 'any[]';
        case 'object':
            {
                const inner = formatObjectProperties(param, indent + 2, formatFunctionType);
                const closingIndent = ' '.repeat(indent);
                return `{
${inner}
${closingIndent}}`;
            }
        default:
            return 'any';
    }
}
function formatFunctionDefinitions(functions) {
    const lines = [
        'namespace functions {',
        ''
    ];
    for (const fn of functions){
        if (fn.description) {
            lines.push(`// ${fn.description}`);
        }
        const { parameters } = fn;
        const properties = parameters?.properties;
        if (!parameters || !properties || Object.keys(properties).length === 0) {
            lines.push(`type ${fn.name} = () => any;`);
        } else {
            lines.push(`type ${fn.name} = (_: {`);
            const formattedProperties = formatObjectProperties(parameters, 0, formatFunctionType);
            if (formattedProperties.length > 0) {
                lines.push(formattedProperties);
            }
            lines.push('}) => any;');
        }
        lines.push('');
    }
    lines.push('} // namespace functions');
    return lines.join('\n');
}
function estimateTokensInFunctions(functions, countStringTokens) {
    const formatted = formatFunctionDefinitions(functions);
    let tokens = countStringTokens(formatted);
    tokens += FUNCTION_DEFINITION_TOKEN_OVERHEAD;
    return tokens;
}
function padSystemMessage(message, hasFunctions, isSystemPadded) {
    if (!hasFunctions || isSystemPadded || message.role !== 'system') {
        return message;
    }
    if (!message.content || message.content.endsWith(NEWLINE)) {
        return message;
    }
    return {
        ...message,
        content: `${message.content}${NEWLINE}`
    };
}
function computeChatCompletionTokenCount(request, countStringTokens) {
    const { messages, functions, function_call: functionCall } = request;
    const hasFunctions = Boolean(functions && functions.length > 0);
    let paddedSystem = false;
    let total = 0;
    for (const message of messages){
        const messageToCount = padSystemMessage(message, hasFunctions, paddedSystem);
        if (messageToCount !== message && message.role === 'system') {
            paddedSystem = true;
        } else if (message.role === 'system' && hasFunctions && !paddedSystem) {
            paddedSystem = true;
        }
        total += countMessageTokens(messageToCount, countStringTokens);
    }
    total += COMPLETION_REQUEST_TOKEN_OVERHEAD;
    if (hasFunctions && functions) {
        total += estimateTokensInFunctions(functions, countStringTokens);
        if (messages.some((message)=>message.role === 'system')) {
            total -= SYSTEM_FUNCTION_TOKEN_DEDUCTION;
        }
    }
    if (functionCall && functionCall !== 'auto') {
        if (functionCall === 'none') {
            total += FUNCTION_CALL_NONE_TOKEN_OVERHEAD;
        } else if (typeof functionCall === 'object' && functionCall.name) {
            total += countStringTokens(functionCall.name) + FUNCTION_CALL_NAME_TOKEN_OVERHEAD;
        }
    }
    return total;
} //# sourceMappingURL=functionCalling.js.map
}),
"[project]/node_modules/.pnpm/gpt-tokenizer@3.4.0/node_modules/gpt-tokenizer/esm/modelsChatEnabled.gen.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// This file was generated by src/codegen/generateChatEnabled.ts.
// To regenerate, run: yarn codegen:chat-enabled.
// Source data: src/models.ts.
__turbopack_context__.s([
    "chatEnabledModels",
    ()=>chatEnabledModels
]);
const chatEnabledModels = [
    "chatgpt-4o-latest",
    "codex-mini-latest",
    "computer-use-preview",
    "computer-use-preview-2025-03-11",
    "gpt-3.5",
    "gpt-3.5-0301",
    "gpt-3.5-turbo",
    "gpt-3.5-turbo-0125",
    "gpt-3.5-turbo-0613",
    "gpt-3.5-turbo-1106",
    "gpt-3.5-turbo-16k-0613",
    "gpt-3.5-turbo-instruct",
    "gpt-4",
    "gpt-4-0125-preview",
    "gpt-4-0314",
    "gpt-4-0613",
    "gpt-4-1106-preview",
    "gpt-4-1106-vision-preview",
    "gpt-4-32k",
    "gpt-4-turbo",
    "gpt-4-turbo-2024-04-09",
    "gpt-4-turbo-preview",
    "gpt-4.1",
    "gpt-4.1-2025-04-14",
    "gpt-4.1-mini",
    "gpt-4.1-mini-2025-04-14",
    "gpt-4.1-nano",
    "gpt-4.1-nano-2025-04-14",
    "gpt-4.5-preview",
    "gpt-4.5-preview-2025-02-27",
    "gpt-4o",
    "gpt-4o-2024-05-13",
    "gpt-4o-2024-08-06",
    "gpt-4o-2024-11-20",
    "gpt-4o-audio-preview",
    "gpt-4o-audio-preview-2024-10-01",
    "gpt-4o-audio-preview-2024-12-17",
    "gpt-4o-audio-preview-2025-06-03",
    "gpt-4o-mini",
    "gpt-4o-mini-2024-07-18",
    "gpt-4o-mini-audio-preview",
    "gpt-4o-mini-audio-preview-2024-12-17",
    "gpt-4o-mini-search-preview",
    "gpt-4o-mini-search-preview-2025-03-11",
    "gpt-4o-search-preview",
    "gpt-4o-search-preview-2025-03-11",
    "gpt-5",
    "gpt-5-2025-08-07",
    "gpt-5-chat-latest",
    "gpt-5-codex",
    "gpt-5-mini",
    "gpt-5-mini-2025-08-07",
    "gpt-5-nano",
    "gpt-5-nano-2025-08-07",
    "gpt-5-pro",
    "gpt-5-pro-2025-10-06",
    "gpt-audio",
    "gpt-audio-2025-08-28",
    "gpt-audio-mini",
    "gpt-audio-mini-2025-10-06",
    "gpt-oss-120b",
    "gpt-oss-20b",
    "o1",
    "o1-2024-12-17",
    "o1-mini",
    "o1-mini-2024-09-12",
    "o1-preview",
    "o1-preview-2024-09-12",
    "o1-pro",
    "o1-pro-2025-03-19",
    "o3",
    "o3-2025-04-16",
    "o3-deep-research",
    "o3-deep-research-2025-06-26",
    "o3-mini",
    "o3-mini-2025-01-31",
    "o3-pro",
    "o3-pro-2025-06-10",
    "o4-mini",
    "o4-mini-2025-04-16",
    "o4-mini-deep-research",
    "o4-mini-deep-research-2025-06-26"
]; //# sourceMappingURL=modelsChatEnabled.gen.js.map
}),
"[project]/node_modules/.pnpm/gpt-tokenizer@3.4.0/node_modules/gpt-tokenizer/esm/modelsMap.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* eslint-disable camelcase */ // reference: https://github.com/openai/tiktoken/blob/4560a8896f5fb1d35c6f8fd6eee0399f9a1a27ca/tiktoken/model.py
// --- p50k_base models ---
__turbopack_context__.s([
    "cl100k_base",
    ()=>cl100k_base,
    "o200k_base",
    ()=>o200k_base,
    "o200k_harmony",
    ()=>o200k_harmony,
    "p50k_base",
    ()=>p50k_base,
    "p50k_edit",
    ()=>p50k_edit,
    "r50k_base",
    ()=>r50k_base
]);
const p50k_base = [
    // legacy models
    'text-davinci-002',
    'text-davinci-003',
    'code-davinci-001',
    'code-davinci-002',
    'davinci-codex',
    'code-cushman-001',
    'code-cushman-002',
    'cushman-codex'
];
const r50k_base = [
    // legacy models
    'text-ada-001',
    'text-babbage-001',
    'text-curie-001',
    'text-davinci-001',
    'ada',
    'babbage',
    'curie',
    'davinci',
    'code-search-ada-code-001',
    'code-search-ada-text-001',
    'text-similarity-ada-001',
    'text-search-ada-doc-001',
    'text-search-ada-query-001',
    'text-similarity-babbage-001',
    'text-search-babbage-doc-001',
    'text-search-babbage-query-001',
    'code-search-babbage-code-001',
    'code-search-babbage-text-001',
    'text-similarity-curie-001',
    'text-search-curie-doc-001',
    'text-search-curie-query-001',
    'text-similarity-davinci-001',
    'text-search-davinci-doc-001',
    'text-search-davinci-query-001'
];
const p50k_edit = [
    'code-davinci-edit-001',
    'text-davinci-edit-001'
];
const cl100k_base = [
    // all gpt-3.5 models:
    'gpt-3.5',
    'gpt-3.5-0301',
    'gpt-3.5-turbo',
    'gpt-3.5-turbo-0125',
    'gpt-3.5-turbo-0613',
    'gpt-3.5-turbo-1106',
    'gpt-3.5-turbo-16k-0613',
    'gpt-3.5-turbo-instruct',
    // all gpt-4.0 models:
    'gpt-4',
    'gpt-4-0125-preview',
    'gpt-4-0314',
    'gpt-4-0613',
    'gpt-4-1106-preview',
    'gpt-4-1106-vision-preview',
    'gpt-4-32k',
    'gpt-4-turbo',
    'gpt-4-turbo-2024-04-09',
    'gpt-4-turbo-preview',
    // embedding models:
    'text-embedding-3-large',
    'text-embedding-3-small',
    'text-embedding-ada-002',
    // still supported models:
    'babbage-002',
    'davinci-002'
];
const o200k_base = [];
const o200k_harmony = [
    'gpt-oss-20b',
    'gpt-oss-120b'
]; //# sourceMappingURL=modelsMap.js.map
}),
"[project]/node_modules/.pnpm/gpt-tokenizer@3.4.0/node_modules/gpt-tokenizer/esm/specialTokens.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EndOfPrompt",
    ()=>EndOfPrompt,
    "EndOfText",
    ()=>EndOfText,
    "FimMiddle",
    ()=>FimMiddle,
    "FimPrefix",
    ()=>FimPrefix,
    "FimSuffix",
    ()=>FimSuffix,
    "HarmonyCall",
    ()=>HarmonyCall,
    "HarmonyChannel",
    ()=>HarmonyChannel,
    "HarmonyConstrain",
    ()=>HarmonyConstrain,
    "HarmonyEnd",
    ()=>HarmonyEnd,
    "HarmonyMessage",
    ()=>HarmonyMessage,
    "HarmonyReturn",
    ()=>HarmonyReturn,
    "HarmonyStart",
    ()=>HarmonyStart,
    "HarmonyStartOfText",
    ()=>HarmonyStartOfText,
    "ImEnd",
    ()=>ImEnd,
    "ImSep",
    ()=>ImSep,
    "ImStart",
    ()=>ImStart
]);
const EndOfText = '<|endoftext|>';
const FimPrefix = '<|fim_prefix|>';
const FimMiddle = '<|fim_middle|>';
const FimSuffix = '<|fim_suffix|>';
const ImStart = '<|im_start|>'; // 100264
const ImEnd = '<|im_end|>'; // 100265
const ImSep = '<|im_sep|>'; // 100266
const EndOfPrompt = '<|endofprompt|>';
const HarmonyStartOfText = '<|startoftext|>';
const HarmonyStart = '<|start|>';
const HarmonyEnd = '<|end|>';
const HarmonyMessage = '<|message|>';
const HarmonyChannel = '<|channel|>';
const HarmonyReturn = '<|return|>';
const HarmonyConstrain = '<|constrain|>';
const HarmonyCall = '<|call|>'; //# sourceMappingURL=specialTokens.js.map
}),
"[project]/node_modules/.pnpm/gpt-tokenizer@3.4.0/node_modules/gpt-tokenizer/esm/mapping.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* eslint-disable camelcase */ __turbopack_context__.s([
    "DEFAULT_ENCODING",
    ()=>DEFAULT_ENCODING,
    "chatModelParams",
    ()=>chatModelParams,
    "cl100k_base",
    ()=>cl100k_base,
    "encodingNames",
    ()=>encodingNames,
    "modelToEncodingMap",
    ()=>modelToEncodingMap,
    "o200k_base",
    ()=>o200k_base,
    "o200k_harmony",
    ()=>o200k_harmony,
    "p50k_base",
    ()=>p50k_base,
    "p50k_edit",
    ()=>p50k_edit,
    "r50k_base",
    ()=>r50k_base
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$modelsChatEnabled$2e$gen$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/gpt-tokenizer@3.4.0/node_modules/gpt-tokenizer/esm/modelsChatEnabled.gen.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$modelsMap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/gpt-tokenizer@3.4.0/node_modules/gpt-tokenizer/esm/modelsMap.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$specialTokens$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/gpt-tokenizer@3.4.0/node_modules/gpt-tokenizer/esm/specialTokens.js [app-client] (ecmascript)");
;
;
;
const cl100k_base = 'cl100k_base';
const p50k_base = 'p50k_base';
const p50k_edit = 'p50k_edit';
const r50k_base = 'r50k_base';
const o200k_base = 'o200k_base';
const o200k_harmony = 'o200k_harmony';
const DEFAULT_ENCODING = o200k_base;
const encodingNames = [
    p50k_base,
    r50k_base,
    p50k_edit,
    cl100k_base,
    o200k_base,
    o200k_harmony
];
const modelToEncodingMap = Object.fromEntries(Object.entries(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$modelsMap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__).flatMap(([encodingName, models])=>models.map((modelName)=>[
            modelName,
            encodingName
        ])));
const gpt3params = {
    messageSeparator: '\n',
    roleSeparator: '\n'
};
const gpt4params = {
    messageSeparator: '',
    roleSeparator: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$specialTokens$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ImSep"]
};
const chatModelParams = Object.fromEntries(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$modelsChatEnabled$2e$gen$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["chatEnabledModels"].flatMap((modelName)=>modelName.startsWith('gpt-3.5') ? [
        [
            modelName,
            gpt3params
        ]
    ] : [
        [
            modelName,
            gpt4params
        ]
    ])); //# sourceMappingURL=mapping.js.map
}),
"[project]/node_modules/.pnpm/gpt-tokenizer@3.4.0/node_modules/gpt-tokenizer/esm/encodingParams/constants.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CL100K_TOKEN_SPLIT_REGEX",
    ()=>CL100K_TOKEN_SPLIT_REGEX,
    "O200K_TOKEN_SPLIT_REGEX",
    ()=>O200K_TOKEN_SPLIT_REGEX,
    "R50K_TOKEN_SPLIT_REGEX",
    ()=>R50K_TOKEN_SPLIT_REGEX
]);
const R50K_TOKEN_SPLIT_REGEX = /'s|'t|'re|'ve|'m|'ll|'d| ?\p{L}+| ?\p{N}+| ?[^\s\p{L}\p{N}]+|\s+(?!\S)|\s+/gu;
const CONTRACTION_SUFFIX_PATTERN = String.raw`'(?:[sS]|[dD]|[mM]|[tT]|[lL][lL]|[vV][eE]|[rR][eE])`;
const OPTIONAL_CONTRACTION_SUFFIX = String.raw`(?:${CONTRACTION_SUFFIX_PATTERN})?`;
const CL100K_TOKEN_SPLIT_PATTERN = String.raw`${CONTRACTION_SUFFIX_PATTERN}|[^\r\n\p{L}\p{N}]?\p{L}+|\p{N}{1,3}| ?[^\s\p{L}\p{N}]+[\r\n]*|\s+$|\s*[\r\n]|\s+(?!\S)|\s`;
const CL100K_TOKEN_SPLIT_REGEX = new RegExp(CL100K_TOKEN_SPLIT_PATTERN, 'gu');
const O200K_TOKEN_SPLIT_PATTERN = String.raw`[^\r\n\p{L}\p{N}]?[\p{Lu}\p{Lt}\p{Lm}\p{Lo}\p{M}]*[\p{Ll}\p{Lm}\p{Lo}\p{M}]+${OPTIONAL_CONTRACTION_SUFFIX}|[^\r\n\p{L}\p{N}]?[\p{Lu}\p{Lt}\p{Lm}\p{Lo}\p{M}]+[\p{Ll}\p{Lm}\p{Lo}\p{M}]*${OPTIONAL_CONTRACTION_SUFFIX}|\p{N}{1,3}| ?[^\s\p{L}\p{N}]+[\r\n/]*|\s*[\r\n]+|\s+(?!\S)|\s+`;
const O200K_TOKEN_SPLIT_REGEX = new RegExp(O200K_TOKEN_SPLIT_PATTERN, 'gu'); //# sourceMappingURL=constants.js.map
}),
"[project]/node_modules/.pnpm/gpt-tokenizer@3.4.0/node_modules/gpt-tokenizer/esm/encodingParams/cl100k_base.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Cl100KBase",
    ()=>Cl100KBase
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$specialTokens$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/gpt-tokenizer@3.4.0/node_modules/gpt-tokenizer/esm/specialTokens.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$encodingParams$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/gpt-tokenizer@3.4.0/node_modules/gpt-tokenizer/esm/encodingParams/constants.js [app-client] (ecmascript)");
;
;
function Cl100KBase(bytePairRankDecoder) {
    const specialTokenMapping = new Map([
        [
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$specialTokens$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EndOfText"],
            100_257
        ],
        [
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$specialTokens$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FimPrefix"],
            100_258
        ],
        [
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$specialTokens$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FimMiddle"],
            100_259
        ],
        [
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$specialTokens$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FimSuffix"],
            100_260
        ],
        [
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$specialTokens$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ImStart"],
            100_264
        ],
        [
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$specialTokens$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ImEnd"],
            100_265
        ],
        [
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$specialTokens$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ImSep"],
            100_266
        ],
        [
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$specialTokens$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EndOfPrompt"],
            100_276
        ]
    ]);
    return {
        tokenSplitRegex: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$encodingParams$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CL100K_TOKEN_SPLIT_REGEX"],
        bytePairRankDecoder,
        specialTokensEncoder: specialTokenMapping
    };
} //# sourceMappingURL=cl100k_base.js.map
}),
"[project]/node_modules/.pnpm/gpt-tokenizer@3.4.0/node_modules/gpt-tokenizer/esm/encodingParams/o200k_base.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "O200KBase",
    ()=>O200KBase,
    "createO200KSpecialTokenMap",
    ()=>createO200KSpecialTokenMap
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$specialTokens$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/gpt-tokenizer@3.4.0/node_modules/gpt-tokenizer/esm/specialTokens.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$encodingParams$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/gpt-tokenizer@3.4.0/node_modules/gpt-tokenizer/esm/encodingParams/constants.js [app-client] (ecmascript)");
;
;
const O200K_BASE_SPECIAL_TOKEN_ENTRIES = [
    [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$specialTokens$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EndOfText"],
        199_999
    ],
    [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$specialTokens$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FimPrefix"],
        200_000
    ],
    [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$specialTokens$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FimMiddle"],
        200_001
    ],
    [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$specialTokens$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FimSuffix"],
        200_002
    ],
    [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$specialTokens$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ImStart"],
        200_003
    ],
    [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$specialTokens$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ImEnd"],
        200_004
    ],
    [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$specialTokens$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ImSep"],
        200_005
    ],
    [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$specialTokens$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EndOfPrompt"],
        200_006
    ]
];
const createO200KSpecialTokenMap = ()=>new Map(O200K_BASE_SPECIAL_TOKEN_ENTRIES);
function O200KBase(bytePairRankDecoder) {
    return {
        tokenSplitRegex: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$encodingParams$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["O200K_TOKEN_SPLIT_REGEX"],
        bytePairRankDecoder,
        specialTokensEncoder: createO200KSpecialTokenMap()
    };
} //# sourceMappingURL=o200k_base.js.map
}),
"[project]/node_modules/.pnpm/gpt-tokenizer@3.4.0/node_modules/gpt-tokenizer/esm/encodingParams/o200k_harmony.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "O200KHarmony",
    ()=>O200KHarmony
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$specialTokens$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/gpt-tokenizer@3.4.0/node_modules/gpt-tokenizer/esm/specialTokens.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$encodingParams$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/gpt-tokenizer@3.4.0/node_modules/gpt-tokenizer/esm/encodingParams/constants.js [app-client] (ecmascript)");
;
;
const RESERVED_TOKEN_RANGE_START = 200_013;
const RESERVED_TOKEN_RANGE_END = 201_088; // exclusive upper bound per tiktoken
const STATIC_SPECIAL_TOKEN_ENTRIES = [
    [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$specialTokens$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HarmonyStartOfText"],
        199_998
    ],
    [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$specialTokens$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EndOfText"],
        199_999
    ],
    [
        '<|reserved_200000|>',
        200_000
    ],
    [
        '<|reserved_200001|>',
        200_001
    ],
    [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$specialTokens$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HarmonyReturn"],
        200_002
    ],
    [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$specialTokens$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HarmonyConstrain"],
        200_003
    ],
    [
        '<|reserved_200004|>',
        200_004
    ],
    [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$specialTokens$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HarmonyChannel"],
        200_005
    ],
    [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$specialTokens$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HarmonyStart"],
        200_006
    ],
    [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$specialTokens$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HarmonyEnd"],
        200_007
    ],
    [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$specialTokens$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HarmonyMessage"],
        200_008
    ],
    [
        '<|reserved_200009|>',
        200_009
    ],
    [
        '<|reserved_200010|>',
        200_010
    ],
    [
        '<|reserved_200011|>',
        200_011
    ],
    [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$specialTokens$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HarmonyCall"],
        200_012
    ]
];
function O200KHarmony(bytePairRankDecoder) {
    const specialTokensEncoder = new Map(STATIC_SPECIAL_TOKEN_ENTRIES);
    for(let tokenId = RESERVED_TOKEN_RANGE_START; tokenId < RESERVED_TOKEN_RANGE_END; tokenId += 1){
        specialTokensEncoder.set(`<|reserved_${tokenId}|>`, tokenId);
    }
    specialTokensEncoder.set(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$specialTokens$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EndOfPrompt"], 200_018);
    return {
        tokenSplitRegex: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$encodingParams$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["O200K_TOKEN_SPLIT_REGEX"],
        bytePairRankDecoder,
        specialTokensEncoder,
        chatFormatter: 'harmony'
    };
} //# sourceMappingURL=o200k_harmony.js.map
}),
"[project]/node_modules/.pnpm/gpt-tokenizer@3.4.0/node_modules/gpt-tokenizer/esm/encodingParams/p50k_base.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "P50KBase",
    ()=>P50KBase
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$modelParams$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/gpt-tokenizer@3.4.0/node_modules/gpt-tokenizer/esm/modelParams.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$specialTokens$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/gpt-tokenizer@3.4.0/node_modules/gpt-tokenizer/esm/specialTokens.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$encodingParams$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/gpt-tokenizer@3.4.0/node_modules/gpt-tokenizer/esm/encodingParams/constants.js [app-client] (ecmascript)");
;
;
;
function P50KBase(bytePairRankDecoder) {
    return {
        expectedVocabularySize: 50_281,
        tokenSplitRegex: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$encodingParams$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["R50K_TOKEN_SPLIT_REGEX"],
        bytePairRankDecoder,
        specialTokensEncoder: new Map([
            [
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$specialTokens$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EndOfText"],
                50_256
            ]
        ])
    };
} //# sourceMappingURL=p50k_base.js.map
}),
"[project]/node_modules/.pnpm/gpt-tokenizer@3.4.0/node_modules/gpt-tokenizer/esm/encodingParams/p50k_edit.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "P50KEdit",
    ()=>P50KEdit
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$modelParams$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/gpt-tokenizer@3.4.0/node_modules/gpt-tokenizer/esm/modelParams.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$specialTokens$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/gpt-tokenizer@3.4.0/node_modules/gpt-tokenizer/esm/specialTokens.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$encodingParams$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/gpt-tokenizer@3.4.0/node_modules/gpt-tokenizer/esm/encodingParams/constants.js [app-client] (ecmascript)");
;
;
;
function P50KEdit(bytePairRankDecoder) {
    const specialTokenMapping = new Map([
        [
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$specialTokens$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EndOfText"],
            50_256
        ],
        [
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$specialTokens$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FimPrefix"],
            50_281
        ],
        [
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$specialTokens$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FimMiddle"],
            50_282
        ],
        [
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$specialTokens$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FimSuffix"],
            50_283
        ]
    ]);
    return {
        tokenSplitRegex: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$encodingParams$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["R50K_TOKEN_SPLIT_REGEX"],
        bytePairRankDecoder,
        specialTokensEncoder: specialTokenMapping
    };
} //# sourceMappingURL=p50k_edit.js.map
}),
"[project]/node_modules/.pnpm/gpt-tokenizer@3.4.0/node_modules/gpt-tokenizer/esm/encodingParams/r50k_base.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "R50KBase",
    ()=>R50KBase
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$modelParams$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/gpt-tokenizer@3.4.0/node_modules/gpt-tokenizer/esm/modelParams.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$specialTokens$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/gpt-tokenizer@3.4.0/node_modules/gpt-tokenizer/esm/specialTokens.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$encodingParams$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/gpt-tokenizer@3.4.0/node_modules/gpt-tokenizer/esm/encodingParams/constants.js [app-client] (ecmascript)");
;
;
;
function R50KBase(bytePairRankDecoder) {
    return {
        expectedVocabularySize: 50_257,
        tokenSplitRegex: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$encodingParams$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["R50K_TOKEN_SPLIT_REGEX"],
        bytePairRankDecoder,
        specialTokensEncoder: new Map([
            [
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$specialTokens$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EndOfText"],
                50_256
            ]
        ])
    };
} //# sourceMappingURL=r50k_base.js.map
}),
"[project]/node_modules/.pnpm/gpt-tokenizer@3.4.0/node_modules/gpt-tokenizer/esm/modelParams.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getEncodingParams",
    ()=>getEncodingParams
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$encodingParams$2f$cl100k_base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/gpt-tokenizer@3.4.0/node_modules/gpt-tokenizer/esm/encodingParams/cl100k_base.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$encodingParams$2f$o200k_base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/gpt-tokenizer@3.4.0/node_modules/gpt-tokenizer/esm/encodingParams/o200k_base.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$encodingParams$2f$o200k_harmony$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/gpt-tokenizer@3.4.0/node_modules/gpt-tokenizer/esm/encodingParams/o200k_harmony.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$encodingParams$2f$p50k_base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/gpt-tokenizer@3.4.0/node_modules/gpt-tokenizer/esm/encodingParams/p50k_base.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$encodingParams$2f$p50k_edit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/gpt-tokenizer@3.4.0/node_modules/gpt-tokenizer/esm/encodingParams/p50k_edit.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$encodingParams$2f$r50k_base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/gpt-tokenizer@3.4.0/node_modules/gpt-tokenizer/esm/encodingParams/r50k_base.js [app-client] (ecmascript)");
;
;
;
;
;
;
function getEncodingParams(encodingName, getMergeableRanks) {
    const mergeableBytePairRanks = getMergeableRanks(encodingName);
    switch(encodingName.toLowerCase()){
        case 'r50k_base':
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$encodingParams$2f$r50k_base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["R50KBase"])(mergeableBytePairRanks);
        case 'p50k_base':
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$encodingParams$2f$p50k_base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["P50KBase"])(mergeableBytePairRanks);
        case 'p50k_edit':
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$encodingParams$2f$p50k_edit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["P50KEdit"])(mergeableBytePairRanks);
        case 'cl100k_base':
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$encodingParams$2f$cl100k_base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Cl100KBase"])(mergeableBytePairRanks);
        case 'o200k_base':
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$encodingParams$2f$o200k_base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["O200KBase"])(mergeableBytePairRanks);
        case 'o200k_harmony':
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$encodingParams$2f$o200k_harmony$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["O200KHarmony"])(mergeableBytePairRanks);
        default:
            throw new Error(`Unknown encoding name: ${encodingName}`);
    }
} //# sourceMappingURL=modelParams.js.map
}),
"[project]/node_modules/.pnpm/gpt-tokenizer@3.4.0/node_modules/gpt-tokenizer/esm/GptEncoding.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* eslint-disable @typescript-eslint/member-ordering */ /* eslint-disable no-param-reassign */ __turbopack_context__.s([
    "GptEncoding",
    ()=>GptEncoding
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$BytePairEncodingCore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/gpt-tokenizer@3.4.0/node_modules/gpt-tokenizer/esm/BytePairEncodingCore.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/gpt-tokenizer@3.4.0/node_modules/gpt-tokenizer/esm/constants.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$functionCalling$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/gpt-tokenizer@3.4.0/node_modules/gpt-tokenizer/esm/functionCalling.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$mapping$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/gpt-tokenizer@3.4.0/node_modules/gpt-tokenizer/esm/mapping.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$modelParams$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/gpt-tokenizer@3.4.0/node_modules/gpt-tokenizer/esm/modelParams.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$specialTokens$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/gpt-tokenizer@3.4.0/node_modules/gpt-tokenizer/esm/specialTokens.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$utfUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/gpt-tokenizer@3.4.0/node_modules/gpt-tokenizer/esm/utfUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$util$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/gpt-tokenizer@3.4.0/node_modules/gpt-tokenizer/esm/util.js [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
class GptEncoding {
    static EndOfPrompt = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$specialTokens$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EndOfPrompt"];
    static EndOfText = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$specialTokens$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EndOfText"];
    static FimMiddle = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$specialTokens$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FimMiddle"];
    static FimPrefix = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$specialTokens$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FimPrefix"];
    static FimSuffix = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$specialTokens$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FimSuffix"];
    modelName;
    modelSpec;
    bytePairEncodingCoreProcessor;
    specialTokensEncoder;
    specialTokensSet;
    allSpecialTokenRegex;
    defaultSpecialTokenConfig;
    chatFormatter;
    countChatCompletionTokens;
    vocabularySize;
    constructor({ bytePairRankDecoder: mergeableBytePairRanks, specialTokensEncoder, expectedVocabularySize, modelName, modelSpec, chatFormatter, ...rest }){
        this.specialTokensEncoder = specialTokensEncoder;
        this.specialTokensSet = new Set(this.specialTokensEncoder.keys());
        this.allSpecialTokenRegex = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$util$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSpecialTokenRegex"])(this.specialTokensSet);
        this.bytePairEncodingCoreProcessor = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$BytePairEncodingCore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BytePairEncodingCore"]({
            bytePairRankDecoder: mergeableBytePairRanks,
            specialTokensEncoder,
            ...rest
        });
        this.defaultSpecialTokenConfig = this.processSpecialTokens();
        const maxTokenValue = Math.max(mergeableBytePairRanks.length - 1, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$util$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getMaxValueFromMap"])(specialTokensEncoder));
        this.vocabularySize = this.bytePairEncodingCoreProcessor.mergeableBytePairRankCount + specialTokensEncoder.size;
        if (expectedVocabularySize !== undefined) {
            if (this.vocabularySize !== expectedVocabularySize) {
                throw new Error('The number of mergeable tokens and special tokens must be equal to expectedVocabularySize.');
            }
            if (maxTokenValue !== expectedVocabularySize - 1) {
                throw new Error(`The model encodings are invalid. The maximum token value must be equal to expectedVocabularySize - 1. Currently ${maxTokenValue}, expected ${expectedVocabularySize - 1}`);
            }
        }
        this.encode = this.encode.bind(this);
        this.decode = this.decode.bind(this);
        this.encodeGenerator = this.encodeGenerator.bind(this);
        this.decodeGenerator = this.decodeGenerator.bind(this);
        this.decodeAsyncGenerator = this.decodeAsyncGenerator.bind(this);
        this.decodeAsync = this.decodeAsync.bind(this);
        this.isWithinTokenLimit = this.isWithinTokenLimit.bind(this);
        this.encodeChat = this.encodeChat.bind(this);
        this.encodeChatGenerator = this.encodeChatGenerator.bind(this);
        this.countTokens = this.countTokens.bind(this);
        this.setMergeCacheSize = this.setMergeCacheSize.bind(this);
        this.clearMergeCache = this.clearMergeCache.bind(this);
        this.estimateCost = this.estimateCost.bind(this);
        if (modelSpec?.supported_features?.includes('function_calling')) {
            this.countChatCompletionTokens = this.countChatCompletionTokensInternal.bind(this);
        }
        this.modelName = modelName;
        this.modelSpec = modelSpec;
        this.chatFormatter = chatFormatter ?? 'chatml';
    }
    *encodeHarmonyChatGenerator(chat, encodeOptions) {
        const harmonyStart = this.specialTokensEncoder.get(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$specialTokens$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HarmonyStart"]);
        const harmonyMessage = this.specialTokensEncoder.get(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$specialTokens$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HarmonyMessage"]);
        const harmonyEnd = this.specialTokensEncoder.get(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$specialTokens$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HarmonyEnd"]);
        const harmonyReturn = this.specialTokensEncoder.get(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$specialTokens$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HarmonyReturn"]);
        const harmonyCall = this.specialTokensEncoder.get(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$specialTokens$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HarmonyCall"]);
        const harmonyChannel = this.specialTokensEncoder.get(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$specialTokens$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HarmonyChannel"]);
        const harmonyConstrain = this.specialTokensEncoder.get(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$specialTokens$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HarmonyConstrain"]);
        if (harmonyStart === undefined || harmonyMessage === undefined || harmonyEnd === undefined || harmonyReturn === undefined || harmonyCall === undefined || harmonyChannel === undefined || harmonyConstrain === undefined) {
            throw new Error('Harmony chat format requires dedicated special tokens.');
        }
        const encodeHeaderText = (text)=>text.length > 0 ? this.encode(text) : [];
        const resolveTerminatorToken = (terminator)=>{
            switch(terminator){
                case '<|return|>':
                    return harmonyReturn;
                case '<|call|>':
                    return harmonyCall;
                // eslint-disable-next-line unicorn/no-useless-switch-case
                case '<|end|>':
                default:
                    return harmonyEnd;
            }
        };
        for (const message of chat){
            if (message.content === undefined) {
                throw new Error('Content must be defined for all messages.');
            }
            const roleOrName = message.name ?? message.role ?? 'user';
            yield [
                harmonyStart
            ];
            yield encodeHeaderText(roleOrName);
            const recipientInRole = message.recipient && (message.recipientPlacement === 'role' || !message.channel);
            const recipientInChannel = message.recipient && !recipientInRole;
            if (recipientInRole) {
                yield encodeHeaderText(` to=${message.recipient}`);
            }
            if (message.channel) {
                yield [
                    harmonyChannel
                ];
                yield encodeHeaderText(message.channel);
                if (recipientInChannel) {
                    yield encodeHeaderText(` to=${message.recipient}`);
                }
            }
            if (message.constraint) {
                yield [
                    harmonyConstrain
                ];
                yield encodeHeaderText(message.constraint);
            }
            yield [
                harmonyMessage
            ];
            yield* this.encodeGenerator(message.content, encodeOptions);
            yield [
                resolveTerminatorToken(message.terminator)
            ];
        }
        const assistantPrime = encodeOptions?.primeWithAssistantResponse ?? 'assistant';
        if (assistantPrime.length > 0) {
            yield [
                harmonyStart
            ];
            yield encodeHeaderText(assistantPrime);
        }
    }
    static getEncodingApi(encodingName, getMergeableRanks) {
        const modelParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$modelParams$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getEncodingParams"])(encodingName, getMergeableRanks);
        return new GptEncoding(modelParams);
    }
    static getEncodingApiForModel(modelName, getMergeableRanks, modelSpec) {
        const encodingName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$mapping$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["modelToEncodingMap"][modelName] ?? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$mapping$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_ENCODING"];
        const modelParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$modelParams$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getEncodingParams"])(encodingName, getMergeableRanks);
        return new GptEncoding({
            ...modelParams,
            modelName,
            modelSpec
        });
    }
    processSpecialTokens({ allowedSpecial, disallowedSpecial } = {}) {
        let regexPattern;
        if (allowedSpecial === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ALL_SPECIAL_TOKENS"] || allowedSpecial?.has(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ALL_SPECIAL_TOKENS"])) {
            allowedSpecial = new Set(this.specialTokensSet);
            const allowedSpecialSet = allowedSpecial;
            if (disallowedSpecial === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ALL_SPECIAL_TOKENS"]) {
                throw new Error('allowedSpecial and disallowedSpecial cannot both be set to "all".');
            }
            if (typeof disallowedSpecial === 'object') {
                // remove any special tokens that are disallowed
                disallowedSpecial.forEach((val)=>allowedSpecialSet.delete(val));
            } else {
                // all special tokens are allowed, and no 'disallowedSpecial' is provided
                disallowedSpecial = new Set();
            }
        }
        if (!disallowedSpecial || disallowedSpecial === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ALL_SPECIAL_TOKENS"] || disallowedSpecial.has(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ALL_SPECIAL_TOKENS"])) {
            // by default, all special tokens are disallowed
            disallowedSpecial = new Set(this.specialTokensSet);
            const disallowedSpecialSet = disallowedSpecial;
            if (allowedSpecial?.size) {
                allowedSpecial.forEach((val)=>disallowedSpecialSet.delete(val));
                // disallowed takes precedence over allowed
                disallowedSpecial.forEach((val)=>allowedSpecial.delete(val));
                if (disallowedSpecial.size > 0) {
                    regexPattern = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$util$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSpecialTokenRegex"])(disallowedSpecial);
                }
            } else {
                regexPattern = this.allSpecialTokenRegex;
            }
        }
        return {
            allowedSpecial,
            regexPattern
        };
    }
    encodeGenerator(lineToEncode, encodeOptions) {
        const specialTokenConfig = encodeOptions ? this.processSpecialTokens(encodeOptions) : this.defaultSpecialTokenConfig;
        if (specialTokenConfig.regexPattern) {
            const match = lineToEncode.match(specialTokenConfig.regexPattern);
            if (match !== null) {
                throw new Error(`Disallowed special token found: ${match[0]}`);
            }
        }
        return this.bytePairEncodingCoreProcessor.encodeNativeGenerator(lineToEncode, specialTokenConfig.allowedSpecial);
    }
    encode(lineToEncode, encodeOptions) {
        const specialTokenConfig = encodeOptions ? this.processSpecialTokens(encodeOptions) : this.defaultSpecialTokenConfig;
        if (specialTokenConfig.regexPattern) {
            const match = lineToEncode.match(specialTokenConfig.regexPattern);
            if (match !== null) {
                throw new Error(`Disallowed special token found: ${match[0]}`);
            }
        }
        return this.bytePairEncodingCoreProcessor.encodeNative(lineToEncode, specialTokenConfig.allowedSpecial);
    }
    /**
     * Progressively tokenizes an OpenAI chat.
     * Warning: gpt-3.5-turbo and gpt-4 chat format may change over time.
     * Returns tokens assuming the 'gpt-3.5-turbo-0301' / 'gpt-4-0314' format.
     * Based on OpenAI's guidelines: https://github.com/openai/openai-python/blob/main/chatml.md
     * Also mentioned in section 6 of this document: https://github.com/openai/openai-cookbook/blob/main/examples/How_to_count_tokens_with_tiktoken.ipynb
     * @param encodeOptions Options controlling how special tokens are handled.
     */ *encodeChatGenerator(chat, model = this.modelName, encodeOptions) {
        if (!model) {
            throw new Error('Model name must be provided either during initialization or passed in to the method.');
        }
        const params = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$mapping$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["chatModelParams"][model];
        if (!params) {
            throw new Error(`Model '${model}' does not support chat.`);
        }
        if (this.chatFormatter === 'harmony') {
            yield* this.encodeHarmonyChatGenerator(chat, encodeOptions);
            return;
        }
        const chatStartToken = this.specialTokensEncoder.get(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$specialTokens$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ImStart"]);
        const chatEndToken = this.specialTokensEncoder.get(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$specialTokens$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ImEnd"]);
        if (chatStartToken === undefined || chatEndToken === undefined) {
            throw new Error(`Model '${model}' does not support chat.`);
        }
        const allowedSpecial = new Set([
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$specialTokens$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ImSep"]
        ]);
        const { messageSeparator, roleSeparator } = params;
        const encodedMessageSeparator = messageSeparator.length > 0 ? this.encode(messageSeparator) : [];
        const encodedRoleSeparator = roleSeparator.length > 0 ? this.encode(roleSeparator, {
            allowedSpecial
        }) : [];
        const nameCache = new Map();
        for (const { role = 'system', name = role, content } of chat){
            if (content === undefined) {
                throw new Error('Content must be defined for all messages.');
            }
            yield [
                chatStartToken
            ];
            const encodedName = nameCache.get(name) ?? this.encode(name);
            nameCache.set(name, encodedName);
            yield encodedName;
            if (encodedRoleSeparator.length > 0) {
                yield encodedRoleSeparator;
            }
            yield* this.encodeGenerator(content, encodeOptions);
            yield [
                chatEndToken
            ];
            yield encodedMessageSeparator;
        }
        // every reply is primed with <|start|>assistant<|message|>
        const assistantPrime = encodeOptions?.primeWithAssistantResponse ?? 'assistant';
        if (assistantPrime.length > 0) {
            yield [
                chatStartToken
            ];
            yield* this.encodeGenerator(assistantPrime, encodeOptions);
        }
        if (encodedRoleSeparator.length > 0) {
            yield encodedRoleSeparator;
        }
    }
    /**
     * Encodes a chat into a single array of tokens.
     * Warning: gpt-3.5-turbo and gpt-4 chat format may change over time.
     * Returns tokens assuming the 'gpt-3.5-turbo-0301' / 'gpt-4-0314' format.
     * Based on OpenAI's guidelines: https://github.com/openai/openai-python/blob/main/chatml.md
     * Also mentioned in section 6 of this document: https://github.com/openai/openai-cookbook/blob/main/examples/How_to_count_tokens_with_tiktoken.ipynb
     * @param encodeOptions Options controlling how special tokens are handled.
     */ encodeChat(chat, model = this.modelName, encodeOptions) {
        return [
            ...this.encodeChatGenerator(chat, model, encodeOptions)
        ].flat();
    }
    /**
     * Checks whether the provided input stays within the provided token limit.
     * @param input The string or chat messages to evaluate.
     * @param tokenLimit The maximum allowed number of tokens.
     * @param encodeOptions Options controlling how special tokens are handled.
     * @returns {false | number} false if token limit is exceeded, otherwise the number of tokens
     */ isWithinTokenLimit(input, tokenLimit, encodeOptions) {
        const tokenGenerator = typeof input === 'string' ? this.encodeGenerator(input, encodeOptions) : this.encodeChatGenerator(input, undefined, encodeOptions);
        let count = 0;
        for (const tokens of tokenGenerator){
            count += tokens.length;
            if (count > tokenLimit) {
                return false;
            }
        }
        return count;
    }
    /**
     * Counts the number of tokens in the input.
     * @param input The string or chat messages to evaluate.
     * @param encodeOptions Options controlling how special tokens are handled.
     * @returns {number} The number of tokens.
     */ countTokens(input, encodeOptions) {
        if (typeof input === 'string') {
            const specialTokenConfig = encodeOptions ? this.processSpecialTokens(encodeOptions) : this.defaultSpecialTokenConfig;
            if (specialTokenConfig.regexPattern) {
                const match = input.match(specialTokenConfig.regexPattern);
                if (match !== null) {
                    throw new Error(`Disallowed special token found: ${match[0]}`);
                }
            }
            return this.bytePairEncodingCoreProcessor.countNative(input, specialTokenConfig.allowedSpecial);
        }
        const tokenGenerator = this.encodeChatGenerator(input, undefined, encodeOptions);
        let count = 0;
        for (const tokens of tokenGenerator){
            count += tokens.length;
        }
        return count;
    }
    countStringTokens(text) {
        if (!text) {
            return 0;
        }
        return this.bytePairEncodingCoreProcessor.countNative(text);
    }
    countChatCompletionTokensInternal(request) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$functionCalling$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["computeChatCompletionTokenCount"])(request, (text)=>this.countStringTokens(text));
    }
    setMergeCacheSize(size) {
        this.bytePairEncodingCoreProcessor.setMergeCacheSize(size);
    }
    clearMergeCache() {
        this.bytePairEncodingCoreProcessor.clearMergeCache();
    }
    decode(inputTokensToDecode) {
        return this.bytePairEncodingCoreProcessor.decodeNative(inputTokensToDecode);
    }
    *decodeGenerator(inputTokensToDecode) {
        const decodedByteGenerator = this.bytePairEncodingCoreProcessor.decodeNativeGenerator(inputTokensToDecode);
        let buffer = '';
        for (const decodedPart of decodedByteGenerator){
            buffer += typeof decodedPart === 'string' ? decodedPart : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$BytePairEncodingCore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["decoder"].decode(decodedPart, {
                stream: true
            });
            if (buffer.length === 0 || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$utfUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["endsWithIncompleteUtfPairSurrogate"])(buffer)) {
                continue;
            } else {
                yield buffer;
                // reset buffer
                buffer = '';
            }
        }
        // Yield any remaining characters in the buffer
        if (buffer.length > 0) {
            yield buffer;
        }
    }
    async *decodeAsyncGenerator(inputTokensToDecode) {
        const decodedByteGenerator = this.bytePairEncodingCoreProcessor.decodeNativeAsyncIterable(inputTokensToDecode);
        let buffer = '';
        for await (const decodedPart of decodedByteGenerator){
            buffer += typeof decodedPart === 'string' ? decodedPart : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$BytePairEncodingCore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["decoder"].decode(decodedPart, {
                stream: true
            });
            if (buffer.length === 0 || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$utfUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["endsWithIncompleteUtfPairSurrogate"])(buffer)) {
                continue;
            } else {
                yield buffer;
                // reset buffer
                buffer = '';
            }
        }
        // Yield any remaining characters in the buffer
        if (buffer.length > 0) {
            yield buffer;
        }
    }
    async decodeAsync(inputTokensToDecode) {
        const decodedByteGenerator = this.bytePairEncodingCoreProcessor.decodeNativeAsyncIterable(inputTokensToDecode);
        let buffer = '';
        for await (const decodedPart of decodedByteGenerator){
            buffer += typeof decodedPart === 'string' ? decodedPart : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$BytePairEncodingCore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["decoder"].decode(decodedPart, {
                stream: true
            });
        }
        return buffer;
    }
    /**
     * Estimates the cost of processing a given token count using the model's pricing.
     *
     * @param tokenCount - The number of tokens to estimate cost for
     * @returns Cost estimate object with applicable price components (input, output, batchInput, batchOutput)
     */ estimateCost(tokenCount, modelSpec = this.modelSpec) {
        if (!modelSpec) {
            throw new Error('Model spec must be provided either during initialization or passed in to the method.');
        }
        if (!modelSpec.price_data) {
            throw new Error(`No cost information available for model: ${modelSpec.name}`);
        }
        const priceDataPerMillion = modelSpec.price_data;
        const result = {};
        // Calculate cost per token and multiply by token count
        // eslint-disable-next-line no-magic-numbers
        const millionTokens = tokenCount / 1_000_000;
        if (priceDataPerMillion.main) {
            result.main = {
                input: priceDataPerMillion.main.input && priceDataPerMillion.main.input * millionTokens,
                output: priceDataPerMillion.main.output && priceDataPerMillion.main.output * millionTokens,
                cached_input: priceDataPerMillion.main.cached_input && priceDataPerMillion.main.cached_input * millionTokens,
                cached_output: priceDataPerMillion.main.cached_output && priceDataPerMillion.main.cached_output * millionTokens
            };
        }
        if (priceDataPerMillion.batch) {
            result.batch = {
                input: priceDataPerMillion.batch.input && priceDataPerMillion.batch.input * millionTokens,
                output: priceDataPerMillion.batch.output && priceDataPerMillion.batch.output * millionTokens,
                cached_input: priceDataPerMillion.batch.cached_input && priceDataPerMillion.batch.cached_input * millionTokens,
                cached_output: priceDataPerMillion.batch.cached_output && priceDataPerMillion.batch.cached_output * millionTokens
            };
        }
        return result;
    }
} //# sourceMappingURL=GptEncoding.js.map
}),
"[project]/node_modules/.pnpm/gpt-tokenizer@3.4.0/node_modules/gpt-tokenizer/esm/encoding/o200k_base.js [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

/* eslint-disable import/extensions */ __turbopack_context__.s([
    "clearMergeCache",
    ()=>clearMergeCache,
    "countTokens",
    ()=>countTokens,
    "decode",
    ()=>decode,
    "decodeAsyncGenerator",
    ()=>decodeAsyncGenerator,
    "decodeGenerator",
    ()=>decodeGenerator,
    "default",
    ()=>__TURBOPACK__default__export__,
    "encode",
    ()=>encode,
    "encodeChat",
    ()=>encodeChat,
    "encodeChatGenerator",
    ()=>encodeChatGenerator,
    "encodeGenerator",
    ()=>encodeGenerator,
    "estimateCost",
    ()=>estimateCost,
    "isWithinTokenLimit",
    ()=>isWithinTokenLimit,
    "setMergeCacheSize",
    ()=>setMergeCacheSize,
    "vocabularySize",
    ()=>vocabularySize
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$bpeRanks$2f$o200k_base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/gpt-tokenizer@3.4.0/node_modules/gpt-tokenizer/esm/bpeRanks/o200k_base.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$GptEncoding$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/gpt-tokenizer@3.4.0/node_modules/gpt-tokenizer/esm/GptEncoding.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/gpt-tokenizer@3.4.0/node_modules/gpt-tokenizer/esm/constants.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$specialTokens$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/gpt-tokenizer@3.4.0/node_modules/gpt-tokenizer/esm/specialTokens.js [app-client] (ecmascript)");
;
;
;
;
const api = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$GptEncoding$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GptEncoding"].getEncodingApi('o200k_base', ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$bpeRanks$2f$o200k_base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]);
const { decode, decodeAsyncGenerator, decodeGenerator, encode, encodeGenerator, isWithinTokenLimit, countTokens, encodeChat, encodeChatGenerator, vocabularySize, setMergeCacheSize, clearMergeCache, estimateCost } = api;
;
const __TURBOPACK__default__export__ = api;
 //# sourceMappingURL=o200k_base.js.map
}),
"[project]/node_modules/.pnpm/gpt-tokenizer@3.4.0/node_modules/gpt-tokenizer/esm/encoding/o200k_base.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ALL_SPECIAL_TOKENS",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ALL_SPECIAL_TOKENS"],
    "DEFAULT_MERGE_CACHE_SIZE",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_MERGE_CACHE_SIZE"],
    "EndOfPrompt",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$specialTokens$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EndOfPrompt"],
    "EndOfText",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$specialTokens$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EndOfText"],
    "FimMiddle",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$specialTokens$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FimMiddle"],
    "FimPrefix",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$specialTokens$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FimPrefix"],
    "FimSuffix",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$specialTokens$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FimSuffix"],
    "HarmonyCall",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$specialTokens$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HarmonyCall"],
    "HarmonyChannel",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$specialTokens$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HarmonyChannel"],
    "HarmonyConstrain",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$specialTokens$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HarmonyConstrain"],
    "HarmonyEnd",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$specialTokens$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HarmonyEnd"],
    "HarmonyMessage",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$specialTokens$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HarmonyMessage"],
    "HarmonyReturn",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$specialTokens$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HarmonyReturn"],
    "HarmonyStart",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$specialTokens$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HarmonyStart"],
    "HarmonyStartOfText",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$specialTokens$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HarmonyStartOfText"],
    "ImEnd",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$specialTokens$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ImEnd"],
    "ImSep",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$specialTokens$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ImSep"],
    "ImStart",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$specialTokens$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ImStart"],
    "clearMergeCache",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$encoding$2f$o200k_base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["clearMergeCache"],
    "countTokens",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$encoding$2f$o200k_base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["countTokens"],
    "decode",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$encoding$2f$o200k_base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["decode"],
    "decodeAsyncGenerator",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$encoding$2f$o200k_base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["decodeAsyncGenerator"],
    "decodeGenerator",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$encoding$2f$o200k_base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["decodeGenerator"],
    "default",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$encoding$2f$o200k_base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"],
    "encode",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$encoding$2f$o200k_base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["encode"],
    "encodeChat",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$encoding$2f$o200k_base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["encodeChat"],
    "encodeChatGenerator",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$encoding$2f$o200k_base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["encodeChatGenerator"],
    "encodeGenerator",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$encoding$2f$o200k_base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["encodeGenerator"],
    "estimateCost",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$encoding$2f$o200k_base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["estimateCost"],
    "isWithinTokenLimit",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$encoding$2f$o200k_base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["isWithinTokenLimit"],
    "setMergeCacheSize",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$encoding$2f$o200k_base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["setMergeCacheSize"],
    "vocabularySize",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$encoding$2f$o200k_base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["vocabularySize"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$encoding$2f$o200k_base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/gpt-tokenizer@3.4.0/node_modules/gpt-tokenizer/esm/encoding/o200k_base.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/gpt-tokenizer@3.4.0/node_modules/gpt-tokenizer/esm/constants.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$specialTokens$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/gpt-tokenizer@3.4.0/node_modules/gpt-tokenizer/esm/specialTokens.js [app-client] (ecmascript)");
}),
"[project]/node_modules/.pnpm/gpt-tokenizer@3.4.0/node_modules/gpt-tokenizer/esm/main.js [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

// eslint-disable-next-line no-restricted-exports, import/no-default-export
__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gpt$2d$tokenizer$40$3$2e$4$2e$0$2f$node_modules$2f$gpt$2d$tokenizer$2f$esm$2f$encoding$2f$o200k_base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/gpt-tokenizer@3.4.0/node_modules/gpt-tokenizer/esm/encoding/o200k_base.js [app-client] (ecmascript) <locals>");
;
;
 //# sourceMappingURL=main.js.map
}),
]);

//# sourceMappingURL=9b47c_gpt-tokenizer_esm_fcf49c53._.js.map