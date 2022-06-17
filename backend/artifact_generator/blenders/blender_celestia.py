import base64
from PIL import Image, ImageFont, ImageDraw
from io import BytesIO
from .utils import *


def generate_celestia(config):
    background, vice_font, main_prop_font, main_prop_rate_font, header_font, title_font = get_bases(
        "all_empty_template.png")

    # artifact_img = Image.fromstring("RGB", base64.decodestring(config["photo"]))
    print(config["photo"])
    print(base64.b64decode(config["photo"]))
    artifact_img = Image.open(BytesIO(base64.b64decode(config["photo"])))
    artifact_img = artifact_img.resize((CELESTIA_PHOTO_SIZE, CELESTIA_PHOTO_SIZE))
    background.paste(artifact_img, (369, 99), artifact_img)

    image = ImageDraw.Draw(background)

    image.text((39, 12), config['title'], (255, 255, 255), font=header_font)
    image.text((37, 93), config['position'], (255, 255, 255), font=main_prop_font)
    image.text((37, 195), config['main_prop'], (194, 175, 168), font=main_prop_font)
    image.text((39, 230), config['main_prop_val'], (255, 255, 255), font=main_prop_rate_font)

    image.text((68, 467), config['vice_prop1'], (73, 82, 103), font=vice_font)
    image.text((68, 516), config['vice_prop2'], (73, 82, 103), font=vice_font)
    image.text((68, 565), config['vice_prop3'], (73, 82, 103), font=vice_font)
    image.text((68, 615), config['vice_prop4'], (73, 82, 103), font=vice_font)

    image.text((38, 664), config['desc_title'], (92, 178, 86), font=title_font)
    image.text((71, 713), config['desc'], (114, 118, 131), font=title_font)
    image.text((39, 1035), config['owner'], (114, 118, 131), font=title_font)

    # background.save('./output/test_image.png')

    buffer = BytesIO()
    background.save(buffer, format='PNG')

    return base64.b64encode(buffer.getvalue())
