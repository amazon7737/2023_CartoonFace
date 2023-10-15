import React from "react";

const Upload = () => {
  return (
    <>
      <form
        action="http:///http://20.30.169.231:3001/convert"
        method="post"
        enctype="multipart/form-data"
      >
        <input type="file" name="file" />
        <input type="hidden" value="{{original_name}}" name="pre_name" />
        <select name="theme">
          <option value="face_paint_512_v1.pt" selected>
            v1
          </option>
          <option value="face_paint_512_v2.pt">v2</option>
          <option value="celeba_distill.pt">celeba_distill</option>
          <option value="paprika.pt">paprika</option>
          <option value="arcane.pt">arcane</option>
        </select>
        <input type="submit" value="변환" />
      </form>
      <form action="http://127.0.0.1:3001/reset" method="post">
        <button type="submit">저장소 초기화</button>
      </form>

      {/* <h1>{{ name }}</h1> */}

      <img class="upload_img" id="upload_img" src="{{original_name}}" />

      <img class="upload_img" id="upload_img" src="{{convert_name}}" />
      <div class="img_history">
        {/* {% for idx in range(img_num) %} */}
        <div class="img_wrap">
          <img
            class="img_original"
            id="upload_img"
            src="{{original_img_path[idx]}}"
          />
          <img
            class="img_convert"
            id="upload_img"
            src="{{convert_img_path[idx]}}"
          />
        </div>
        {/* {% endfor %} */}
      </div>
    </>
  );
};

export default Upload;
