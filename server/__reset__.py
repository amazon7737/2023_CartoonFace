import os
import shutil

# 임시 폴더 비우기
for file in os.scandir("./static/original"):
    os.remove(file)
# 원본 폴더 비우기
for file in os.scandir("./static/inputs"):
    os.remove(file)
# 변환 폴더 비우기
for file in os.scandir("./static/outputs"):
    os.remove(file)
# 결과 폴더 비우기
for file in os.scandir("./static/results"):
    os.remove(file)
for file in os.scandir("./static/samples"):
    print(str(file).split("'")[1])
    file_name = str(file).split("'")[1]
    shutil.copyfile('./static/samples/' + file_name, './static/outputs/' + file_name)