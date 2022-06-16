from PIL import Image, ImageFont
from ..models import ArtifactDesc

TEYVAT_PHOTO_SIZE = 295
CELESTIA_PHOTO_SIZE = 240
ARTIFACT_PHOTO_DIR = "./artifact_generator/assets/artifacts"
ZN_FONT_DIR = "./artifact_generator/assets/fonts/zh-cn.ttf"
BACKGROUND_DIR = "./artifact_generator/assets/images/"


def get_arti_image(pos, dirname):
    return Image.open(ARTIFACT_PHOTO_DIR + "/" + dirname + "_" + pos_parser(pos) + '.png').convert('RGBA')


# god damn heroku doesnt support python switch???
def pos_parser(pos):
    if pos == "head":
        return "goblet"
    else: return pos


def get_arti_position_name(template, position):
    if position == "flower":
        return template.flower
    if position == "feather":
        return template.feather
    if position == "glass":
        return template.glass
    if position == "cup":
        return template.cup
    if position == "head":
        return template.head


def get_bases(background_file_name):
    background = Image.open(BACKGROUND_DIR + background_file_name).convert('RGBA')
    vice_font = ImageFont.truetype(ZN_FONT_DIR, 30)
    main_prop_font = ImageFont.truetype(ZN_FONT_DIR, 28)
    main_prop_rate_font = ImageFont.truetype(ZN_FONT_DIR, 55)
    title_font = ImageFont.truetype(ZN_FONT_DIR, 43)
    return background, vice_font, main_prop_font, main_prop_rate_font, title_font
