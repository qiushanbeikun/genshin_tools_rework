import {IMAGE_SIZE_LIMIT} from "./constants";

let previewUrl = ''

async function toBlob(canvas) {
  return new Promise((resolve) => {
    canvas.toBlob(resolve)
  })
}

export async function getCroppedImg(image, crop) {
  console.log(image, crop);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.style.display = "none";
  canvas.width = Math.floor(crop.width);
  canvas.height = Math.floor(crop.height);
  const cropX = crop.x;
  const cropY = crop.y;
  const centerX = image.naturalWidth / 2
  const centerY = image.naturalHeight / 2
  console.log(cropX, cropY, centerX, centerY)
  ctx.save();
  ctx.drawImage(
    image,
    crop.x,
    crop.y,
    crop.width,
    crop.height,
    0,
    0,
    crop.width,
    crop.height,
  )
  ctx.restore();

  const blob = await toBlob(canvas)

  if (previewUrl) {
    URL.revokeObjectURL(previewUrl)
  }

  previewUrl = URL.createObjectURL(blob)

  const base64Image = canvas.toDataURL();

  return [previewUrl, base64Image];
}

// export async function blobToBase64(blob) {
//   let reader = new FileReader();
//   reader.readAsDataURL(blob);
//   reader.onloadend = await function () {
//     if (reader.result.length > IMAGE_SIZE_LIMIT) {
//       alert("Image size should be less than 2MB");
//     } else {
//       return reader.result;
//     }
//   }
// }
