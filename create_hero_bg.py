from PIL import Image, ImageDraw, ImageFont
import random

def create_hero_background(filename, size=(1920, 600)):
    """Create a dynamic hero background for WWE website"""
    # Create base image with WWE red gradient
    img = Image.new('RGB', size, (220, 20, 60))
    draw = ImageDraw.Draw(img)
    
    # Create gradient effect
    for y in range(size[1]):
        # Calculate gradient color
        red = max(0, 220 - int(y * 0.3))
        green = max(0, 20 - int(y * 0.1))
        blue = max(0, 60 - int(y * 0.1))
        
        draw.line([(0, y), (size[0], y)], fill=(red, green, blue))
    
    # Add some decorative elements
    # WWE logo-like shapes
    for i in range(5):
        x = random.randint(0, size[0] - 100)
        y = random.randint(0, size[1] - 100)
        size_w = random.randint(50, 150)
        size_h = random.randint(50, 150)
        
        # Draw semi-transparent rectangles
        draw.rectangle([x, y, x + size_w, y + size_h], 
                      fill=(0, 0, 0, 30), outline=(255, 215, 0, 100))
    
    # Add diagonal lines for dynamic effect
    for i in range(10):
        x1 = random.randint(0, size[0])
        y1 = 0
        x2 = x1 + random.randint(-200, 200)
        y2 = size[1]
        
        draw.line([(x1, y1), (x2, y2)], fill=(255, 215, 0, 50), width=2)
    
    # Save image
    img.save(filename, 'JPEG', quality=85)
    print(f"Created hero background: {filename}")

def create_championship_bg(filename, size=(1200, 800)):
    """Create a championship background"""
    # Create base image
    img = Image.new('RGB', size, (0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # Add gold gradient
    for x in range(size[0]):
        gold_intensity = int((x / size[0]) * 100)
        color = (255 - gold_intensity, 215 - gold_intensity, 0)
        draw.line([(x, 0), (x, size[1])], fill=color)
    
    # Add decorative elements
    for i in range(20):
        x = random.randint(0, size[0] - 50)
        y = random.randint(0, size[1] - 50)
        draw.ellipse([x, y, x + 50, y + 50], fill=(255, 215, 0, 30))
    
    # Save image
    img.save(filename, 'JPEG', quality=85)
    print(f"Created championship background: {filename}")

def create_superstars_bg(filename, size=(1200, 800)):
    """Create a superstars background"""
    # Create base image with dark red
    img = Image.new('RGB', size, (139, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # Add spotlight effect
    center_x, center_y = size[0] // 2, size[1] // 2
    max_radius = min(size) // 2
    
    for radius in range(max_radius, 0, -10):
        intensity = int((radius / max_radius) * 100)
        color = (220 - intensity, 20 - intensity // 2, 60 - intensity // 2)
        draw.ellipse([center_x - radius, center_y - radius, 
                     center_x + radius, center_y + radius], 
                     fill=color, outline=None)
    
    # Save image
    img.save(filename, 'JPEG', quality=85)
    print(f"Created superstars background: {filename}")

def main():
    # Create main hero background
    create_hero_background("assets/images/hero-bg.jpg")
    
    # Create championship background
    create_championship_bg("assets/images/championships-bg.jpg")
    
    # Create superstars background
    create_superstars_bg("assets/images/superstars-bg.jpg")
    
    print("\nCreated 3 website backgrounds!")

if __name__ == "__main__":
    main()