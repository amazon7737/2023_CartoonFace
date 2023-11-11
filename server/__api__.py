from flask import Flask, request, Response,redirect, url_for, render_template, jsonify
from werkzeug.utils import secure_filename
from flask_cors import CORS
import base64
import io
import cv2
import numpy as np

import os
import torch
from PIL import Image
import shutil
import __convert__
from time import time
import math
import asyncio

app = Flask(__name__)
# CORS(app, resources={r"/*": {"origins": "*"}})
CORS(app, resources={r'*': {'origins': 'http://localhost:3000'}})

global pre_file_name
global img_num
global original_arr
global output_arr
pre_file_name = ""

# 남은 촬영 횟수
global cnt
cnt=1

# 서버 상태 확인
@app.route("/", methods = ["GET"])
def check_api():
    msg = {
        "status": 0,
        "msg": "",
        "data": None
    }
    msg["status"] = 200
    msg["msg"] = "Server is Running..."
    return jsonify(msg)
    
# 이미지 변환
@app.route("/convert", methods = ["POST"])
def convert_img():
    global img_num
    global original_arr
    global output_arr
    # get_recent_imgs()
    
    msg = {
        "status": 0,
        "msg": "",
        "data": None
    }

    # 변수 초기화
    data = request.json

    file_name = ""
    file_extension = ".jpg"
    theme = ""
    upload_img_list = []
    upload_img = None
    temp_img = None
    input_img_name = []
    output_img_name = []
    output_img_path = []

    # 테마 설정
    theme = data['theme']
    print("THEME: ", theme)
    upload_img_list = data['picList']
    print("사진(개) : ", len(upload_img_list))

    # 오류 예상 지점 ---
    if len(upload_img_list) == 0:
        msg["status"] = 201
        msg["msg"] = "업로드 사진 없음"
        return jsonify(msg)
    else:
        time_stamp = str(math.floor(time()))
        for idx in range(0, len(upload_img_list)):
            # 파일 이름 설정 (ex : 타임스탬프.확장자)
            file_name = time_stamp + "_" + str(idx)
            input_img_name.append(file_name)


            imgdata = base64.b64decode(upload_img_list[idx][22:])
            image = Image.open(io.BytesIO(imgdata))
            upload_img = image.convert("RGB")
            # 원본 이미지 저장
            upload_img.save('./static/original/' + file_name + file_extension)
            # 임시 이미지 복사
            shutil.copyfile('./static/original/' + file_name + file_extension, './static/inputs/' + file_name + file_extension)
            # print("!!!오류!!!")

        # 변환 및 변환 이미지 저장
        try:
            output_img_name.append(__convert__.convert("face_paint_512_v1", False))
            # output_img_name.append(__convert__.convert("arcane", False))
            # print("!!!오류!!!")

            output_img_name.append(__convert__.convert("face_paint_512_v2", False))
            # output_img_name.append(__convert__.convert("arcane", False))
            print(output_img_name)
             # 임시 폴더 비우기
            for file in os.scandir("./static/inputs"):
                os.remove(file)
            shutil.copyfile('./static/outputs/' + output_img_name[0], './static/inputs/' + output_img_name[0])
            output_img_name.append(__convert__.convert("face_paint_512_v2", False))
            # 임시 폴더 비우기
            for file in os.scandir("./static/inputs"):
                os.remove(file)
            shutil.copyfile('./static/outputs/' + output_img_name[1], './static/inputs/' + output_img_name[1])
            output_img_name.append(__convert__.convert("face_paint_512_v1", False))
            # 임시 폴더 비우기
            for file in os.scandir("./static/inputs"):
                os.remove(file)
            # output_img_name.append(__convert__.convert("celeba_distill"))
            # output_img_name.append(__convert__.convert("paprika"))
        except:
            msg["status"] = 202
            msg["msg"] = "변환 모델 오류"
            return jsonify(msg)
        
        # 원본 및 변환 이미지 경로 설정
        for name in output_img_name:
            output_img_path.append("/static/outputs/" + name)
        
        msg["status"] = 200
        msg["msg"] = "사진 변환 성공"
        msg["data"] = output_img_path
        return jsonify(msg)

# 프린트 이미지 받기 및 출력
@app.route("/print", methods = ["POST"])
def print_image():
    msg = {
        "status": 0,
        "msg": "",
        "data": None
    }
    data = request.json
    image = data["img"]
    time_stamp = str(math.floor(time()))
    file_name = time_stamp
    imgdata = base64.b64decode(image[22:])
    print("프린트!!",imgdata)

    image = Image.open(io.BytesIO(imgdata))
    upload_img = image.convert("RGB")
    # 원본 이미지 저장
    upload_img.save('./static/results/' + file_name + ".png")
    file_path = '/static/results/' + file_name + ".png"
    os.startfile(os.getcwd() + file_path, "print")
    return file_path

# 최근 이미지 경로 받아오기
@app.route("/recent", methods = ["GET"])
def get_recent():
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
def reset_store():
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
        for file in os.scandir("./static/samples"):
            print(str(file).split("'")[1])
            file_name = str(file).split("'")[1]
            shutil.copyfile('./static/samples/' + file_name, './static/outputs/' + file_name)
        msg["status"] = 200
        msg["msg"] = "Reset Storage Success"
    except:
        msg["status"] = 201
        msg["msg"] = "Reset Storage Fail"
    return jsonify(msg)

# 결과 이미지 초기화
@app.route("/result/reset", methods = ["GET"])
def reset_result():
    msg = {
        "status": 0,
        "msg": "",
        "data": None
    }
    try:
        for file in os.scandir("./static/results"):
            os.remove(file)
        msg["status"] = 200
        msg["msg"] = "Reset Storage Success"
    except:
        msg["status"] = 201
        msg["msg"] = "Reset Storage Fail"
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