import os
import argparse
from PIL import Image
import numpy as np
import torch
from torchvision.transforms.functional import to_tensor, to_pil_image
from __model__ import Generator
torch.backends.cudnn.enabled = False
torch.backends.cudnn.benchmark = False
torch.backends.cudnn.deterministic = True

def load_image(image_path, x32=False):
    img = Image.open(image_path).convert("RGB")

    if x32:
        def to_32s(x):
            return 256 if x < 256 else x - x % 32
        w, h = img.size
        img = img.resize((to_32s(w), to_32s(h)))

    return img

def convert( model):
    # 변환 관련 설정
    parser = argparse.ArgumentParser()
    # 모델 설정
    parser.add_argument(
        '--checkpoint',
        type=str,
        default='./models/' + model + 'pt',
    )
    # 입력받은 이미지 저장 경로 설정
    parser.add_argument(
        '--input_dir', 
        type=str, 
        default='./static/inputs',
    )
    # 변환 이미지 저장 경로 설정
    parser.add_argument(
        '--output_dir', 
        type=str, 
        default='./static/outputs',
    )
    # 이미지 변환 디바이스 설정
    parser.add_argument(
        '--device',
        type=str,
        # default='cuda:0',
        default='mps',
        # default='cpu',
    )
    # 이미지 해상도 업샘플링 설정
    parser.add_argument(
        '--upsample_align',
        type=bool,
        default=False,
        help="Align corners in decoder upsampling layers"
    )
    # 이미지 해상도 설정
    parser.add_argument(
        '--x32',
        action="store_true",
        help="Resize images to multiple of 32"
    )
    args = parser.parse_args()
    # 변환 기능
    device = args.device
    
    net = Generator()
    net.load_state_dict(torch.load(args.checkpoint, map_location="cpu"))
    net.to(device).eval()
    print(f"model loaded: {args.checkpoint}")
    
    os.makedirs(args.output_dir, exist_ok=True)

    for image_name in sorted(os.listdir(args.input_dir)):
        if os.path.splitext(image_name)[-1].lower() not in [".jpg", ".png", ".bmp", ".tiff"]:
            continue
            
        image = load_image(os.path.join(args.input_dir, image_name), args.x32)

        with torch.no_grad():
            image = to_tensor(image).unsqueeze(0) * 2 - 1
            out = net(image.to(device), args.upsample_align).cpu()
            out = out.squeeze(0).clip(-1, 1) * 0.5 + 0.5
            out = to_pil_image(out)
        # 변환 이미지 저장
        out.save(os.path.join(args.output_dir, image_name))
        print(f"image saved: {image_name}")
    print("변환 완료")
    return 0
