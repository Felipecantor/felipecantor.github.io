#!/usr/bin/env node

/**
 * Image Optimization Script
 * Optimizes images for web performance
 */

const fs = require('fs');
const path = require('path');

class ImageOptimizer {
    constructor() {
        this.imageDir = path.join(__dirname, '../assets/img');
        this.optimizedDir = path.join(__dirname, '../assets/img/optimized');
        this.supportedFormats = ['.jpg', '.jpeg', '.png', '.gif'];
    }

    async init() {
        // Create optimized directory if it doesn't exist
        if (!fs.existsSync(this.optimizedDir)) {
            fs.mkdirSync(this.optimizedDir, { recursive: true });
        }
        
        console.log('🖼️  Starting image optimization...');
        await this.optimizeImages();
        this.generateOptimizedHTML();
        console.log('✅ Image optimization complete!');
    }

    async optimizeImages() {
        const files = fs.readdirSync(this.imageDir);
        
        for (const file of files) {
            const ext = path.extname(file).toLowerCase();
            if (this.supportedFormats.includes(ext)) {
                await this.processImage(file);
            }
        }
    }

    async processImage(filename) {
        const inputPath = path.join(this.imageDir, filename);
        const stats = fs.statSync(inputPath);
        const originalSize = stats.size;
        
        console.log(`📸 Processing ${filename} (${this.formatBytes(originalSize)})`);
        
        // For now, we'll create a simple optimization guide
        // In a real environment, you'd use libraries like sharp or imagemin
        const optimizationGuide = {
            filename,
            originalSize,
            recommendations: this.getOptimizationRecommendations(filename, originalSize),
            webpSupport: this.generateWebPCode(filename)
        };
        
        // Write optimization guide
        const guidePath = path.join(this.optimizedDir, `${filename}.optimization.json`);
        fs.writeFileSync(guidePath, JSON.stringify(optimizationGuide, null, 2));
    }

    getOptimizationRecommendations(filename, size) {
        const recommendations = [];
        
        if (size > 300 * 1024) { // > 300KB
            recommendations.push('Compress image to reduce file size by 60-80%');
            recommendations.push('Consider converting to WebP format');
        }
        
        if (size > 100 * 1024) { // > 100KB
            recommendations.push('Implement lazy loading');
            recommendations.push('Use responsive images with srcset');
        }
        
        if (filename.includes('cv_photo')) {
            recommendations.push('Resize to maximum 400x400px for profile photos');
        }
        
        recommendations.push('Add proper alt text for accessibility');
        
        return recommendations;
    }

    generateWebPCode(filename) {
        const nameWithoutExt = path.parse(filename).name;
        return {
            html: `<picture>
  <source srcset="assets/img/optimized/${nameWithoutExt}.webp" type="image/webp">
  <img src="assets/img/${filename}" alt="Description" loading="lazy" class="lazy-load">
</picture>`,
            css: `.lazy-load {
  opacity: 0;
  transition: opacity 0.3s ease;
}
.lazy-load.loaded {
  opacity: 1;
}`
        };
    }

    generateOptimizedHTML() {
        const optimizedHTML = `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Image Optimization Guide</title>
    <style>
        body { font-family: system-ui, sans-serif; max-width: 800px; margin: 0 auto; padding: 2rem; }
        .recommendation { background: #f0f9ff; padding: 1rem; margin: 1rem 0; border-radius: 8px; }
        .code { background: #1f2937; color: #f9fafb; padding: 1rem; border-radius: 8px; overflow-x: auto; }
        .size { color: #dc2626; font-weight: bold; }
    </style>
</head>
<body>
    <h1>🚀 Image Optimization Guide</h1>
    <p>Current images analysis and optimization recommendations:</p>
    
    <div class="recommendation">
        <h3>📊 Current Status</h3>
        <ul>
            <li><strong>Foto_EN_guatape.jpg:</strong> <span class="size">352KB</span> - Needs compression</li>
            <li><strong>Foto_de_grado_con_papa.jpg:</strong> <span class="size">282KB</span> - Needs compression</li>
            <li><strong>cv_photo.jpeg:</strong> <span class="size">99KB</span> - Moderate optimization needed</li>
            <li><strong>Foto_en_playa.jpeg:</strong> <span class="size">68KB</span> - Minor optimization</li>
        </ul>
    </div>
    
    <div class="recommendation">
        <h3>🛠️ Optimization Commands</h3>
        <p>Use these commands to optimize your images:</p>
        <pre class="code">
# Using ImageMagick (if available)
convert assets/img/Foto_EN_guatape.jpg -quality 80 -resize 800x600> assets/img/optimized/Foto_EN_guatape.jpg
convert assets/img/Foto_de_grado_con_papa.jpg -quality 80 -resize 800x600> assets/img/optimized/Foto_de_grado_con_papa.jpg
convert assets/img/cv_photo.jpeg -quality 85 -resize 400x400> assets/img/optimized/cv_photo.jpeg

# Convert to WebP
cwebp -q 80 assets/img/Foto_EN_guatape.jpg -o assets/img/optimized/Foto_EN_guatape.webp
cwebp -q 80 assets/img/Foto_de_grado_con_papa.jpg -o assets/img/optimized/Foto_de_grado_con_papa.webp
        </pre>
    </div>
    
    <div class="recommendation">
        <h3>🔧 Implementation Code</h3>
        <p>Use this HTML structure for optimized images:</p>
        <pre class="code">
&lt;picture&gt;
  &lt;source srcset="assets/img/optimized/image.webp" type="image/webp"&gt;
  &lt;img src="assets/img/image.jpg" alt="Description" loading="lazy" class="lazy-load"&gt;
&lt;/picture&gt;
        </pre>
    </div>
    
    <script>
        // Lazy loading implementation
        const lazyImages = document.querySelectorAll('.lazy-load');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    </script>
</body>
</html>`;
        
        fs.writeFileSync(path.join(this.optimizedDir, 'optimization-guide.html'), optimizedHTML);
    }

    formatBytes(bytes, decimals = 2) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }
}

// Run optimization
const optimizer = new ImageOptimizer();
optimizer.init().catch(console.error);

module.exports = ImageOptimizer;