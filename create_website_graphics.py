import os
from PIL import Image, ImageDraw, ImageFont
import textwrap

def create_banner_image(text, filename, size=(1200, 400), bg_color=(220, 20, 60), text_color=(255, 255, 255)):
    """Create a banner image for the website"""
    # Create image
    img = Image.new('RGB', size, bg_color)
    draw = ImageDraw.Draw(img)
    
    # Try to use a default font
    try:
        font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 48)
    except:
        try:
            font = ImageFont.load_default()
        except:
            font = None
    
    # Wrap text
    lines = textwrap.wrap(text, width=25)
    
    # Calculate text position
    total_height = len(lines) * 60
    y_start = (size[1] - total_height) // 2
    
    # Draw each line
    for i, line in enumerate(lines):
        if font:
            bbox = draw.textbbox((0, 0), line, font=font)
            text_width = bbox[2] - bbox[0]
        else:
            text_width = len(line) * 24
        
        x = (size[0] - text_width) // 2
        y = y_start + i * 60
        
        if font:
            draw.text((x, y), line, fill=text_color, font=font)
        else:
            draw.text((x, y), line, fill=text_color)
    
    # Save image
    img.save(filename, 'JPEG', quality=85)
    print(f"Created banner: {filename}")

def create_event_banner(text, filename, size=(800, 300), bg_color=(0, 0, 0), text_color=(255, 215, 0)):
    """Create an event banner with WWE colors"""
    # Create image
    img = Image.new('RGB', size, bg_color)
    draw = ImageDraw.Draw(img)
    
    # Try to use a default font
    try:
        font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 36)
    except:
        try:
            font = ImageFont.load_default()
        except:
            font = None
    
    # Wrap text
    lines = textwrap.wrap(text, width=20)
    
    # Calculate text position
    total_height = len(lines) * 50
    y_start = (size[1] - total_height) // 2
    
    # Draw each line
    for i, line in enumerate(lines):
        if font:
            bbox = draw.textbbox((0, 0), line, font=font)
            text_width = bbox[2] - bbox[0]
        else:
            text_width = len(line) * 18
        
        x = (size[0] - text_width) // 2
        y = y_start + i * 50
        
        if font:
            draw.text((x, y), line, fill=text_color, font=font)
        else:
            draw.text((x, y), line, fill=text_color)
    
    # Add decorative border
    border_width = 5
    draw.rectangle([0, 0, size[0]-1, size[1]-1], outline=(220, 20, 60), width=border_width)
    
    # Save image
    img.save(filename, 'JPEG', quality=85)
    print(f"Created event banner: {filename}")

def main():
    # Create banners folder if it doesn't exist
    os.makedirs('assets/images/banners', exist_ok=True)
    
    # Create main website banners
    create_banner_image("WWE ACCESS ORGANIZATION", "assets/images/banners/main-banner.jpg")
    create_banner_image("BOOK YOUR FAVORITE SUPERSTAR", "assets/images/banners/booking-banner.jpg")
    create_banner_image("CHAMPIONSHIP HISTORY", "assets/images/banners/championships-banner.jpg")
    create_banner_image("MEET THE SUPERSTARS", "assets/images/banners/superstars-banner.jpg")
    
    # Create event-specific banners
    create_event_banner("BIRTHDAY PARTY EVENTS", "assets/images/banners/birthday-banner.jpg")
    create_event_banner("MEET & GREET EVENTS", "assets/images/banners/meet-greet-banner.jpg")
    create_event_banner("BURIAL CEREMONY EVENTS", "assets/images/banners/burial-banner.jpg")
    create_event_banner("CHARITY EVENTS", "assets/images/banners/charity-banner.jpg")
    
    # Create NXT banners
    create_event_banner("NXT CHAMPIONSHIP", "assets/images/banners/nxt-banner.jpg", bg_color=(0, 0, 128))
    create_event_banner("WOMEN'S NXT CHAMPIONSHIP", "assets/images/banners/nxt-womens-banner.jpg", bg_color=(128, 0, 128))
    
    print("\nCreated 10 website banners!")

if __name__ == "__main__":
    main()