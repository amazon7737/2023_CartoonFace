from flask import Flask, render_template, request, jsonify
from werkzeug.utils import secure_filename
import os
import torch
from PIL import Image
import shutil
import __convert__
from time import time
import math

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
        # 변수 초기화
        file_name = ""
        file_extension = ".jpg"
        theme = ""
        upload_img = None
        input_img_path = ""
        output_img_path = ""

        # 변환 모델 설정
        file_name = math.floor(time())
        file_extension = ""
        theme = request.form['type']
        upload_img
        upload_img = request.files['file']
        file_extension = secure_filename(request.files['file'].suffix).split["."][-1]
        upload_img.save('./static/inputs/' + file_name + file_extension)
        # __convert__.convert(theme)
        # input_img_path = "./static/inputs/" + file_name + file_extension
        # output_img_path = "./static/outputs/" + file_name + file_extension
        # return render_template("index.html",  original_name = input_img_path, convert_name = output_img_path)
        return render_template("index.html" )
# 변환
# def translate(upload_img, type):
#     # 모델 실행 자리
#     # type 값으로 직접 변경
#     model = torch.hub.load("bryandlee/animegan2-pytorch:main", "generator", pretrained=type)
#     face2paint = torch.hub.load("bryandlee/animegan2-pytorch:main", "face2paint", size=512)

#     img = Image.open(upload_img).convert("RGB")
#     out = face2paint(model, img)

#     # 변환
#     out.save('./static/trans/' + secure_filename(request.files['file'].filename))
#     trans_arr.append(secure_filename(request.files['file'].filename))


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=3001, debug=True)