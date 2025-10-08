import os
from PIL import Image, ImageDraw, ImageFont
import textwrap

def create_placeholder_image(name, filename, size=(400, 400), bg_color=(220, 20, 60), text_color=(255, 255, 255)):
    """Create a placeholder image for a WWE superstar"""
    # Create image
    img = Image.new('RGB', size, bg_color)
    draw = ImageDraw.Draw(img)
    
    # Try to use a default font, fallback to built-in if not available
    try:
        font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 24)
    except:
        try:
            font = ImageFont.load_default()
        except:
            font = None
    
    # Wrap text if too long
    lines = textwrap.wrap(name, width=15)
    
    # Calculate text position
    total_height = len(lines) * 30
    y_start = (size[1] - total_height) // 2
    
    # Draw each line
    for i, line in enumerate(lines):
        if font:
            bbox = draw.textbbox((0, 0), line, font=font)
            text_width = bbox[2] - bbox[0]
        else:
            text_width = len(line) * 12
        
        x = (size[0] - text_width) // 2
        y = y_start + i * 30
        
        if font:
            draw.text((x, y), line, fill=text_color, font=font)
        else:
            draw.text((x, y), line, fill=text_color)
    
    # Add WWE logo text
    wwe_text = "WWE SUPERSTAR"
    if font:
        bbox = draw.textbbox((0, 0), wwe_text, font=font)
        wwe_width = bbox[2] - bbox[0]
    else:
        wwe_width = len(wwe_text) * 10
    
    wwe_x = (size[0] - wwe_width) // 2
    wwe_y = size[1] - 60
    
    if font:
        draw.text((wwe_x, wwe_y), wwe_text, fill=text_color, font=font)
    else:
        draw.text((wwe_x, wwe_y), wwe_text, fill=text_color)
    
    # Save image
    img.save(filename, 'JPEG', quality=85)
    print(f"Created image: {filename}")

def main():
    # Create superstars folder if it doesn't exist
    os.makedirs('assets/images/superstars', exist_ok=True)
    
    # List of superstars who need images
    superstars = [
        "Cody Rhodes",
        "Seth Rollins", 
        "Becky Lynch",
        "Roman Reigns",
        "John Cena",
        "Brock Lesnar",
        "Jimmy Uso",
        "Jey Uso",
        "Solo Sikoa",
        "Jacob Fatu",
        "LA Knight",
        "Jade Cargill",
        "Trick Williams",
        "Giulia",
        "Kelani Jordan",
        "Jacy Jayne",
        "Thea Hail",
        "Gunther",
        "Sami Zayn",
        "Oba Femi",
        "Chase U",
        "Andre Chase",
        "Duke Hudson",
        "Dragon Lee",
        "Roxanne Perez",
        "Lyra Valkyria",
        "Isla Dawn",
        "Alba Fyre",
        "Lash Legend",
        "Jakara Jackson",
        "Sol Ruca",
        "Fallon Henley"
    ]
    
    # Create images for each superstar
    for superstar in superstars:
        filename = f"assets/images/superstars/{superstar.lower().replace(' ', '-')}.jpg"
        create_placeholder_image(superstar, filename)
    
    print(f"\nCreated {len(superstars)} superstar images!")

if __name__ == "__main__":
    main()