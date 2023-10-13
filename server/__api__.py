from flask import Flask, request, Response,redirect, url_for, render_template, jsonify
from werkzeug.utils import secure_filename
import os
import torch
from PIL import Image
import shutil
import __convert__
from time import time
import math
import asyncio

app = Flask(__name__)

global pre_file_name
global img_num
global original_arr
global output_arr
pre_file_name = ""

# 서버 상태 확인
@app.route("/", methods = ["GET"])
def check_api():
    msg = {
        "status": 0,
        "msg": "",
        "data": None
    }
    msg["status"] = 200
    msg["msg"] = "서버가 정상적으로 동작중입니다."
    return jsonify(msg)
    

# 이미지 변환
@app.route("/convert", methods = ["POST"])
async def convert_img():
    global pre_file_name
    global img_num
    global original_arr
    global output_arr
    get_recent_imgs()
    # 변수 초기화
    file_name = ""
    file_extension = ".jpg"
    theme = ""
    upload_img = None
    temp_img = None
    input_img_path = ""
    output_img_path = ""

    print("이전 이미지: ", pre_file_name)
    # 테마 설정
    theme = request.form['theme']
    # 파일 이름 설정 (ex : 타임스탬프.확장자)
    file_name = str(math.floor(time()))
    # 업로드 이미지 수신
    if request.files['file'].filename != '':
        # [업로드 파일 있을 때]
        upload_img = request.files['file']
        # 이전 파일 이름 설정
        pre_file_name = file_name + file_extension
    else:
        # [업로드 파일 없을 때]
        upload_img = Image.open("./static/original/" + pre_file_name)
        print("[이미지불러옴] : ", pre_file_name, upload_img)
    # 원본 이미지 저장
    upload_img.save('./static/original/' + file_name + file_extension)
    # 임시 이미지 복사
    shutil.copyfile('./static/original/' + file_name + file_extension, './static/inputs/' + file_name + file_extension)
    # 변환 및 변환 이미지 저장
    try:
        __convert__.convert(theme)
    except:
        return redirect(url_for("main"))
    # 임시 폴더 비우기
    for file in os.scandir("./static/inputs"):
        os.remove(file)
    # 원본 및 변환 이미지 경로 설정
    input_img_path = "./static/original/" + file_name + file_extension
    output_img_path = "./static/outputs/" + file_name + file_extension
    print("이전 이미지: ", pre_file_name)
    return render_template("index.html", img_num = img_num, original_img_path = original_arr, convert_img_path = output_arr, original_name = input_img_path, convert_name = output_img_path)

# 최근 이미지 경로 받아오기
@app.route("/recent", methods = ["GET"])
async def get_recent():
    msg = {
        "status": 0,
        "msg": "",
        "data": None
    }
    get_recent_imgs()
    msg["status"] = 200
    msg["msg"] = "최근 이미지 경로 조회 성공"
    msg["data"] = {
        "original" : [original_arr],
        "convert" : [output_arr]
    }
    return jsonify(msg)

# 저장소 초기화
@app.route("/reset", methods = ["GET"])
async def reset_store():
    msg = {
        "status": 0,
        "msg": "",
        "data": None
    }
    try:
        # 임시 폴더 비우기
        for file in os.scandir("./static/original"):
            os.remove(file)
        # 원본 폴더 비우기
        for file in os.scandir("./static/inputs"):
            os.remove(file)
        # 변환 폴더 비우기
        for file in os.scandir("./static/outputs"):
            os.remove(file)
        msg["status"] = 200
        msg["msg"] = "저장소 초기화 성공"
    except:
        msg["status"] = 201
        msg["msg"] = "저장소 초기화 실패"
    return jsonify(msg)

def get_recent_imgs():
    global img_num
    global original_arr
    global output_arr

    img_num = 0
    original_arr = []
    output_arr = []
    for file in os.listdir("./static/original"):
        original_arr.append("/static/original/" + file)
    for file in os.listdir("./static/outputs"):
        output_arr.append("/static/outputs/" + file)
    img_num = len(original_arr)
    original_arr.sort(reverse=True)
    output_arr.sort(reverse=True)

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=3001, debug=True)