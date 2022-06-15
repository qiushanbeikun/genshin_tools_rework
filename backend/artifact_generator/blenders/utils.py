from PIL import Image, ImageFont

TEYVAT_PHOTO_SIZE = 295
CELESTIA_PHOTO_SIZE = 240
ARTIFACT_PHOTO_DIR = "./artifact_generator/assets/images/artifacts/data/"
ZN_FONT_DIR = "./artifact_generator/assets/fonts/zh-cn.ttf"
BACKGROUND_DIR = "./artifact_generator/assets/images/"


def get_arti_image(pos, name):
    return Image.open(ARTIFACT_PHOTO_DIR + name + "/" + pos + '.png').convert('RGBA')


def get_bases(background_file_name):
    background = Image.open(BACKGROUND_DIR+background_file_name).convert('RGBA')
    vice_font = ImageFont.truetype(ZN_FONT_DIR, 30)
    main_prop_font = ImageFont.truetype(ZN_FONT_DIR, 28)
    main_prop_rate_font = ImageFont.truetype(ZN_FONT_DIR, 55)
    title_font = ImageFont.truetype(ZN_FONT_DIR, 43)
    return background, vice_font, main_prop_font, main_prop_rate_font, title_font
