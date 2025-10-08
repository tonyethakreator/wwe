from PIL import Image, ImageDraw, ImageFont
import random
import os

def create_championship_belt(filename, title, size=(300, 200)):
    """Create a stylized championship belt graphic"""
    # Create base image
    img = Image.new('RGB', size, (255, 215, 0))
    draw = ImageDraw.Draw(img)
    
    # Create belt shape
    belt_width = size[0] - 40
    belt_height = size[1] - 40
    belt_x = 20
    belt_y = 20
    
    # Draw main belt
    draw.rectangle([belt_x, belt_y, belt_x + belt_width, belt_y + belt_height], 
                   fill=(139, 69, 19), outline=(255, 215, 0), width=3)
    
    # Draw center plate
    plate_size = min(belt_width, belt_height) // 2
    plate_x = size[0] // 2 - plate_size // 2
    plate_y = size[1] // 2 - plate_size // 2
    
    draw.ellipse([plate_x, plate_y, plate_x + plate_size, plate_y + plate_size], 
                 fill=(255, 215, 0), outline=(0, 0, 0), width=2)
    
    # Add title text
    try:
        font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 12)
    except:
        font = None
    
    if font:
        bbox = draw.textbbox((0, 0), title, font=font)
        text_width = bbox[2] - bbox[0]
        text_height = bbox[3] - bbox[1]
    else:
        text_width = len(title) * 6
        text_height = 12
    
    text_x = size[0] // 2 - text_width // 2
    text_y = size[1] // 2 - text_height // 2
    
    if font:
        draw.text((text_x, text_y), title, fill=(0, 0, 0), font=font)
    else:
        draw.text((text_x, text_y), title, fill=(0, 0, 0))
    
    # Add side plates
    side_plate_size = plate_size // 3
    left_plate_x = plate_x - side_plate_size - 10
    right_plate_x = plate_x + plate_size + 10
    side_plate_y = plate_y + plate_size // 3
    
    draw.rectangle([left_plate_x, side_plate_y, left_plate_x + side_plate_size, side_plate_y + side_plate_size], 
                   fill=(255, 215, 0), outline=(0, 0, 0), width=1)
    draw.rectangle([right_plate_x, side_plate_y, right_plate_x + side_plate_size, side_plate_y + side_plate_size], 
                   fill=(255, 215, 0), outline=(0, 0, 0), width=1)
    
    # Save image
    img.save(filename, 'PNG')
    print(f"Created championship belt: {filename}")

def create_wwe_logo(filename, size=(200, 200)):
    """Create a WWE-style logo"""
    # Create base image
    img = Image.new('RGB', size, (220, 20, 60))
    draw = ImageDraw.Draw(img)
    
    # Draw stylized W
    center_x, center_y = size[0] // 2, size[1] // 2
    
    # W shape
    w_points = [
        (center_x - 60, center_y - 40),
        (center_x - 30, center_y + 40),
        (center_x, center_y - 20),
        (center_x + 30, center_y + 40),
        (center_x + 60, center_y - 40)
    ]
    
    # Draw W
    for i in range(len(w_points) - 1):
        draw.line([w_points[i], w_points[i + 1]], fill=(255, 255, 255), width=8)
    
    # Add outer circle
    draw.ellipse([20, 20, size[0] - 20, size[1] - 20], outline=(255, 215, 0), width=5)
    
    # Add text
    try:
        font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 16)
    except:
        font = None
    
    if font:
        draw.text((center_x - 25, center_y + 50), "WWE", fill=(255, 215, 0), font=font)
    else:
        draw.text((center_x - 25, center_y + 50), "WWE", fill=(255, 215, 0))
    
    # Save image
    img.save(filename, 'PNG')
    print(f"Created WWE logo: {filename}")

def create_trophy_icon(filename, size=(150, 150)):
    """Create a trophy icon"""
    # Create base image
    img = Image.new('RGB', size, (0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # Draw trophy cup
    cup_width = 80
    cup_height = 60
    cup_x = (size[0] - cup_width) // 2
    cup_y = 30
    
    # Cup body
    draw.ellipse([cup_x, cup_y, cup_x + cup_width, cup_y + cup_height], 
                 fill=(255, 215, 0), outline=(255, 255, 255), width=3)
    
    # Cup handles
    handle_width = 20
    draw.arc([cup_x - handle_width, cup_y + 10, cup_x, cup_y + cup_height - 10], 
             start=90, end=270, fill=(255, 215, 0), width=5)
    draw.arc([cup_x + cup_width, cup_y + 10, cup_x + cup_width + handle_width, cup_y + cup_height - 10], 
             start=270, end=90, fill=(255, 215, 0), width=5)
    
    # Trophy base
    base_width = 40
    base_height = 30
    base_x = (size[0] - base_width) // 2
    base_y = cup_y + cup_height + 10
    
    draw.rectangle([base_x, base_y, base_x + base_width, base_y + base_height], 
                   fill=(139, 69, 19), outline=(255, 255, 255), width=2)
    
    # Save image
    img.save(filename, 'PNG')
    print(f"Created trophy icon: {filename}")

def main():
    # Create graphics folder if it doesn't exist
    os.makedirs('assets/images/graphics', exist_ok=True)
    
    # Create championship belts
    championships = [
        "WWE Championship",
        "World Heavyweight Championship", 
        "Intercontinental Championship",
        "United States Championship",
        "Women's Intercontinental Championship",
        "NXT Championship",
        "NXT Women's Championship",
        "NXT North American Championship"
    ]
    
    for championship in championships:
        filename = f"assets/images/graphics/{championship.lower().replace(' ', '-')}-belt.png"
        create_championship_belt(filename, championship)
    
    # Create WWE logo
    create_wwe_logo("assets/images/graphics/wwe-logo.png")
    
    # Create trophy icon
    create_trophy_icon("assets/images/graphics/trophy.png")
    
    print(f"\nCreated {len(championships) + 2} graphics!")

if __name__ == "__main__":
    main()