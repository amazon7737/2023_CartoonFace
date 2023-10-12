from flask import Flask, render_template, request
from werkzeug.utils import secure_filename
import os
import torch
from PIL import Image
import shutil


app = Flask(__name__)

original_arr = []
theme_arr = []
trans_arr = []

# get , post
@app.route("/", methods = ["GET", "POST"])
def upload_file():
    if request.method == "GET":
        return render_template("index.html" )
    if request.method == "POST":
        type = request.form['type']
        pre_name = request.form['pre_name']
        upload_img = 0
        print(type)
        theme_arr.append(type)
        # original
        try:
            upload_img = request.files['file']

            upload_img.save('./static/original/' + secure_filename(request.files['file'].filename))
            original_arr.append()

        except:
            upload_img = (str(pre_name))
        # 원본 X    
        upload_img_name = str(request.files['file'].filename)
        upload_img_url = "./static/original/"+upload_img_name
        translate(upload_img, type)

        convert_img_url = "./static/trans/"+upload_img_name
        print("!!!",theme_arr)
        print("!!!",original_arr)
        print("!!!",trans_arr)
        return render_template("index.html",  original_name = upload_img_url, convert_name = convert_img_url)

# 변환
def translate(upload_img, type):
    # 모델 실행 자리
    # type 값으로 직접 변경
    model = torch.hub.load("bryandlee/animegan2-pytorch:main", "generator", pretrained=type)
    face2paint = torch.hub.load("bryandlee/animegan2-pytorch:main", "face2paint", size=512)

    img = Image.open(upload_img).convert("RGB")
    out = face2paint(model, img)

    # 변환
    out.save('./static/trans/' + secure_filename(request.files['file'].filename))
    trans_arr.append(secure_filename(request.files['file'].filename))


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5001, debug=True)