export const getCloudinaryImageId = (url: string) => {
    const urlImageSplit = url.split('/');
    const imageName = urlImageSplit[urlImageSplit.length - 1];
    const [imageId] = imageName.split('.');

    return imageId
}