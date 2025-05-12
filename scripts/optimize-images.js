const sharp = require("sharp")
const fs = require("fs")
const path = require("path")

const inputDir = path.join(process.cwd(), "public")
const outputDir = path.join(process.cwd(), "public")

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
}

// Get all image files
const imageFiles = fs.readdirSync(inputDir).filter((file) => /\.(jpg|jpeg|png|webp)$/i.test(file))

// Process each image
async function optimizeImages() {
    console.log(`Found ${imageFiles.length} images to optimize`)

    for (const file of imageFiles) {
        const inputPath = path.join(inputDir, file)
        const outputPath = path.join(outputDir, file.replace(/\.(jpg|jpeg|png)$/i, ".webp"))

        try {
            // Skip if already optimized
            if (fs.existsSync(outputPath)) {
                console.log(`Skipping ${file} - already optimized`)
                continue
            }

            console.log(`Optimizing ${file}...`)

            // Get image metadata
            const metadata = await sharp(inputPath).metadata()

            // Resize if too large (max width 1920px)
            let sharpInstance = sharp(inputPath)
            if (metadata.width > 1920) {
                sharpInstance = sharpInstance.resize({ width: 1920 })
            }

            // Convert to WebP with good quality
            await sharpInstance.webp({ quality: 80 }).toFile(outputPath)

            const originalSize = fs.statSync(inputPath).size
            const optimizedSize = fs.statSync(outputPath).size
            const savings = (((originalSize - optimizedSize) / originalSize) * 100).toFixed(2)

            console.log(
                `✅ ${file}: ${(originalSize / 1024).toFixed(2)}KB → ${(optimizedSize / 1024).toFixed(2)}KB (${savings}% saved)`,
            )

            fs.unlinkSync(inputPath);
            console.log(`🗑️ Deleted original file: ${file}`);
        } catch (error) {
            console.error(`❌ Error optimizing ${file}:`, error)
        }
    }
}

optimizeImages()
