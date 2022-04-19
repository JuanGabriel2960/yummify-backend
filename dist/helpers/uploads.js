"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCloudinaryImageId = void 0;
const getCloudinaryImageId = (url) => {
    const urlImageSplit = url.split('/');
    const imageName = urlImageSplit[urlImageSplit.length - 1];
    const [imageId] = imageName.split('.');
    return imageId;
};
exports.getCloudinaryImageId = getCloudinaryImageId;
//# sourceMappingURL=uploads.js.map