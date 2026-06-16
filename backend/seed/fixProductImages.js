const Product = require("../models/Product");
const { connectToDB } = require("../database/db");

// DummyJSON's dummy image generator is stable and documented:
// https://dummyjson.com/image/WIDTHxHEIGHT/BACKGROUND/TEXTCOLOR?text=...
// We use it here because the old cdn.dummyjson.com/product-images/...
// URLs baked into the original seed data are no longer valid.

const colors = [
  ["4F46E5", "FFFFFF"],
  ["059669", "FFFFFF"],
  ["DC2626", "FFFFFF"],
  ["D97706", "FFFFFF"],
  ["7C3AED", "FFFFFF"],
  ["0891B2", "FFFFFF"],
  ["DB2777", "FFFFFF"],
  ["65A30D", "FFFFFF"],
];

const buildImageUrl = (title, width, height, colorIndex) => {
  const [bg, fg] = colors[colorIndex % colors.length];
  const encodedText = encodeURIComponent(title.slice(0, 30));
  return `https://dummyjson.com/image/${width}x${height}/${bg}/${fg}?text=${encodedText}`;
};

const fixProductImages = async () => {
  try {
    await connectToDB();
    console.log("Fix Product Images [started] please wait..");

    const products = await Product.find({});
    console.log(`Found ${products.length} products to fix`);

    let updatedCount = 0;

    for (let i = 0; i < products.length; i++) {
      const product = products[i];

      const newThumbnail = buildImageUrl(product.title, 400, 400, i);
      const newImages = [
        buildImageUrl(product.title, 600, 600, i),
        buildImageUrl(product.title, 600, 600, i + 1),
        buildImageUrl(product.title, 600, 600, i + 2),
      ];

      product.thumbnail = newThumbnail;
      product.images = newImages;

      await product.save();
      updatedCount++;
    }

    console.log(`Fixed images for ${updatedCount} products`);
    console.log("Fix Product Images completed..");
    process.exit(0);
  } catch (error) {
    console.error("FIX PRODUCT IMAGES ERROR:", error);
    process.exit(1);
  }
};

fixProductImages();
