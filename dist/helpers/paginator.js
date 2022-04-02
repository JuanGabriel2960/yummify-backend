"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.previousOffset = exports.nextOffset = void 0;
const nextOffset = (count, limit, offset) => {
    if ((offset + limit) >= count) {
        return null;
    }
    else {
        return offset + limit;
    }
};
exports.nextOffset = nextOffset;
const previousOffset = (count, limit, offset) => {
    if (offset <= 0) {
        return null;
    }
    else {
        return Math.max(0, (offset - limit));
    }
};
exports.previousOffset = previousOffset;
//# sourceMappingURL=paginator.js.map