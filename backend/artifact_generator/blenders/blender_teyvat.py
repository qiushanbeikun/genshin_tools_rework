import base64
from PIL import ImageDraw
from io import BytesIO
from .utils import *
from ..models import ArtifactDesc


def generate_teyvat(config):
    background, vice_font, main_prop_font, main_prop_rate_font, header_font, title_font = get_bases(
        "teyvat_template.png")
    print(config)

    # todo: make name const at this moment, support of other artifacts are in future releases
    title = config['artiSet']
    template = ArtifactDesc.objects.get(title=title)
    dirname = template.img_path
    position = config["position"]
    artifact_name = get_arti_position_name(template, position)
    artifact_desc = get_arti_position_desc(template, position)
    artifact_img = get_arti_image(position, dirname)
    artifact_img = artifact_img.resize((TEYVAT_PHOTO_SIZE, TEYVAT_PHOTO_SIZE))

    background.paste(artifact_img, (341, 73), artifact_img)
    image = ImageDraw.Draw(background)

    print("23232323322322", artifact_name, template.sand)

    image.text((39, 12), artifact_name, (255, 255, 255), font=header_font)
    image.text((37, 90), config['position_name'], (255, 255, 255), font=main_prop_font)
    image.text((37, 195), config['mainProp'], (194, 175, 168), font=main_prop_font)
    image.text((39, 230), config['mainPropRate'], (255, 255, 255), font=main_prop_rate_font)

    image.text((68, 467), config['viceOne'], (73, 82, 103), font=vice_font)
    image.text((68, 516), config['viceTwo'], (73, 82, 103), font=vice_font)
    image.text((68, 565), config['viceThree'], (73, 82, 103), font=vice_font)
    image.text((68, 615), config['viceFour'], (73, 82, 103), font=vice_font)

    buff_lines = len(template.four_set_buff.split("\n"))
    desc_height = 893 if buff_lines == 3 else 926

    image.text((38, 664), title, (92, 178, 86), font=title_font)
    image.text((74, 713), template.two_set_buff, (114, 118, 131), font=title_font)
    image.text((74, 763), template.four_set_buff, (114, 118, 131), font=title_font)
    image.text((36, desc_height), artifact_desc, (114, 118, 131), font=title_font)

    buffer = BytesIO()
    background.save(buffer, format='PNG')
    return base64.b64encode(buffer.getvalue())

# title = '大氵逼的帖子'
# position = '时之沙'
# main_prop = '水贴效率'
# main_prop_rate = '114.514%'
#
# vice_one = '回复量+11.4%'
# vice_two = '经验+5'
# vice_three = '色图+14'
# vice_four = '广告麦片数-5'
