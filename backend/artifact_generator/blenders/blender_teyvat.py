import base64
from PIL import Image, ImageFont, ImageDraw
from io import BytesIO
from .utils import *


def generate_teyvat(config):
    background, vice_font, main_prop_font, main_prop_rate_font, title_font = get_bases("template_blank1.png")
    image_position = get_arti_pos(config['position'])

    # todo: make name const at this moment, support of other artifacts are in future releases
    name = "绝缘之旗印"
    artifact_img = get_arti_image(image_position, name)
    artifact_img = artifact_img.resize((TEYVAT_PHOTO_SIZE, TEYVAT_PHOTO_SIZE))

    background.paste(artifact_img, (341, 73), artifact_img)
    image = ImageDraw.Draw(background)

    image.text((39, 12), config['title'], (255, 255, 255), font=title_font)
    image.text((37, 93), config['position'], (255, 255, 255), font=main_prop_font)
    image.text((39, 197), config['mainProp'], (194, 175, 168), font=main_prop_font)
    image.text((39, 230), config['mainPropRate'], (255, 255, 255), font=main_prop_rate_font)

    image.text((68, 467), config['viceOne'], (73, 82, 103), font=vice_font)
    image.text((68, 516), config['viceTwo'], (73, 82, 103), font=vice_font)
    image.text((68, 565), config['viceThree'], (73, 82, 103), font=vice_font)
    image.text((68, 615), config['viceFour'], (73, 82, 103), font=vice_font)
    # background.save('./output/test_image.png')

    buffer = BytesIO()
    background.save(buffer, format='PNG')
    return base64.b64encode(buffer.getvalue())


# title = 'whatever123'
#
# position = '时之沙'
# main_prop = '元素充能效率'
# main_prop_rate = '51.8%'
#
# vice_one = '暴击率+1433.1%'
# vice_two = '暴击伤害+22125.8%'
# vice_three = '攻击力+53332.4%'
# vice_four = '生命值+4113.5%'

# title = '大氵逼的帖子'
# position = '时之沙'
# main_prop = '水贴效率'
# main_prop_rate = '114.514%'
#
# vice_one = '回复量+11.4%'
# vice_two = '经验+5'
# vice_three = '色图+14'
# vice_four = '广告麦片数-5'
