const Product = require("../models/Product");
const { connectToDB } = require("../database/db");

const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;
const DELAY_MS = 1300;
const BATCH_START = parseInt(process.env.IMAGE_FIX_BATCH_START || "0");
const BATCH_SIZE = parseInt(process.env.IMAGE_FIX_BATCH_SIZE || "20");

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const cleanQuery = (title) => {
  return title
    .replace(/\(.*?\)/g, "")
    .replace(/\d+(GB|TB|MB|ml|g|kg|cm|mm|inch)/gi, "")
    .trim();
};

const searchUnsplash = async (query) => {
  const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
    query
  )}&per_page=3`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Unsplash API error: ${response.status}`);
  }

  const data = await response.json();
  return data.results || [];
}

const fixProductImagesWithRealPhotos = async () => {
  try {
    if (!UNSPLASH_ACCESS_KEY) {
      console.error("UNSPLASH_ACCESS_KEY environment variable is missing");
      process.exit(1);
    }

    await connectToDB();
    console.log("Fix Product Images (Unsplash) [started] please wait..");

    const allProducts = await Product.find({}).sort({ _id: 1 });
    console.log(`Total products in DB: ${allProducts.length}`);

    const products = allProducts.slice(BATCH_START, BATCH_START + BATCH_SIZE);
    console.log(`Processing batch: products ${BATCH_START} to ${BATCH_START + products.length - 1}`);

    let updatedCount = 0;
    let skippedCount = 0;

    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      const query = cleanQuery(product.title);

      try {
        const results = await searchUnsplash(query);

        if (results.length > 0) {
          const photo = results[0];
          product.thumbnail = photo.urls.small;
          product.images = results
            .slice(0, 3)
            .map((p) => p.urls.regular);

          await product.save();
          updatedCount++;
          console.log(`[${i + 1}/${products.length}] Updated: ${product.title}`);
        } else {
          skippedCount++;
          console.log(`[${i + 1}/${products.length}] No results for: ${product.title}`);
        }
      } catch (err) {
        skippedCount++;
        console.error(`[${i + 1}/${products.length}] Failed for "${product.title}":`, err.message);
      }

      await sleep(DELAY_MS);
    }

    console.log(`Updated ${updatedCount} products, skipped ${skippedCount}`);
    console.log("Fix Product Images (Unsplash) completed..");
    process.exit(0);
  } catch (error) {
    console.error("FIX PRODUCT IMAGES (UNSPLASH) ERROR:", error);
    process.exit(1);
  }
};

fixProductImagesWithRealPhotos();
