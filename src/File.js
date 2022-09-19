import React, {useState, useEffect, useRef, useCallback} from 'react';
import upload from './assets/upload.png';
import left from './assets/left-arrow.png';
import right from './assets/right-arrow.png';

const File = (props) => {
  const max = 10737418240; // 10GB
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef(null);
  const attachEl = (file) => {
    let div = document.createElement("div");
    div.key = file.link;
    div.classList = "fileName";
    let a = document.createElement("a");
    a.href = file.link;
    a.innerHTML = file.name;
    let span = document.createElement("span");
    span.innerHTML = file.unit;
    a.appendChild(span);
    div.appendChild(a);
    dragRef.current.appendChild(div);
  }
  const uploadedFileEl = (files) => {
    for (const f of files) {
      return attachEl(f);
    }
  }
  const fileHandler = (file) => {
    attachEl(file)
    props.fileHandler([...props.file, file]);
  }
  useEffect(() => {
    uploadedFileEl(props.file);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // useEffect(() => {
  //   props.totalHandler(size);
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [size]);
  const fileErr = () => {
    alert(`파일 크기를 확인해주세요`);
  }
  const uploadHandler = (files) => {
    for (const file of files) {
      let sizeUnit = '';
      if (props.total + file.size >= max) return fileErr();
      props.totalHandler(props.total + file.size);
      let video = document.createElement('video');
      video.preload = 'metadata';
      video.onloadedmetadata = function() {
        window.URL.revokeObjectURL(video.src);
      }
      let objUrl = URL.createObjectURL(file);
      video.src = objUrl;
      if (file.size < 1024*1024) sizeUnit = Math.round(file.size / 1024) + "KB";
      else if (file.size < 1024*1024*1024) sizeUnit = Math.round(file.size / (1024*1024)) + "MB";
      else if (file.size < 1024*1024*1024*1024) sizeUnit = Math.round(file.size / (1024*1024*1024)) + "GB";

      video.onloadeddata = () => {
        fileHandler({
          name: file.name,
          unit: sizeUnit,
          size: file.size,
          link: objUrl,
          duration: video.duration
        });
      }
    }
  }
  const onChangeFiles = useCallback((e) => {
    let selectedFiles = [];

    if (e.type === "drop") selectedFiles = e.dataTransfer.files;
    else selectedFiles = e.target.files;
    uploadHandler(selectedFiles);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.file]);

  const handleDragIn = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);
  const handleDragOut = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);
  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files) {
      setIsDragging(true);
    }
  }, []);
  const handleDrop= useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    onChangeFiles(e);
    setIsDragging(false);
  }, [onChangeFiles]);

  const initDragEvents = useCallback(() => {
    if (dragRef.current !== null) {
      dragRef.current.addEventListener("dragenter", handleDragIn);
      dragRef.current.addEventListener("dragleave", handleDragOut);
      dragRef.current.addEventListener("dragover", handleDragOver);
      dragRef.current.addEventListener("drop", handleDrop);
    }
  }, [handleDragIn, handleDragOut, handleDragOver, handleDrop]);

  const resetDragEvents = useCallback(() => {
    if (dragRef.current !== null) {
      dragRef.current.removeEventListener("dragenter", handleDragIn);
      dragRef.current.removeEventListener("dragleave", handleDragOut);
      dragRef.current.removeEventListener("dragover", handleDragOver);
      dragRef.current.removeEventListener("drop", handleDrop);
    }
  }, [handleDragIn, handleDragOut, handleDragOver, handleDrop])

  useEffect(() => {
    initDragEvents();
    return () => resetDragEvents();
  }, [initDragEvents, resetDragEvents]);

  return (
    <div className="wrapper fileWrapper">
      <h1>2. 파일 업로드<span>(필수입력)</span></h1>
      <div className="main container">
        <span className="fileHeader">
          <p>음성파일 또는 영상파일을 업로드해주세요.
            <span className="secP">* 개수 제한 없음. 10GB 제한</span>
          </p>
          <span>
            <input type="file" id="fileUpload" 
                  style={{display: "none"}}
                  onChange={(e) => {uploadHandler(e.target.files)}}
                  multiple="multiple"
                  accept="audio/*, video/*"/>
            <label className="btn uploadFile" htmlFor="fileUpload">
              업로드
            </label>
            <button disabled className="btn deleteFile">삭제</button>
          </span>
        </span>

        <input type="file" id="fileDrag"
               style={{display: "none"}}
               accept="audio/*, video/*"
               multiple="multiple"
               onChange={onChangeFiles} />
        <label className={isDragging ? "dragFile dragging" : "dragFile"}
               id="targetLabel"
               htmlFor="fileDrag" ref={dragRef}>
          {props.file.length ? "" : (<p className="secP">
            <img src={upload} alt="upload" />
            업로드한 파일이 없습니다.
            드래그하여 파일을 추가하세요.
          </p>)}
        </label>
        <p className="sizeP">
          {(props.total < 1024*1024) ? Math.round(props.total / 1024) + "KB " :
           (props.total < 1024*1024*1024) ? Math.round(props.total / (1024*1024)) + "MB " :
           Math.round(props.total / (1024*1024*1024)) + "GB "}
          / 10GB
        </p>
        <p>부분 녹취가 필요한 경우, 해당 파일의 녹취 구간을 설정해주세요.</p>
        <span className="secP">* 1분 미만의 부분 녹취 구간은 1분 단위로 처리되어 견적에 포함됩니다</span>
        <div className="buttons">
          <button onClick={(e) => {
                    e.preventDefault();
                    props.stepHandler(1);
                  }} className="btn prev">
            <img className="left" src={left} alt="left"></img>
            이전으로
          </button>
          <button onClick={(e) => {
                    e.preventDefault();
                    props.stepHandler(3)
                  }}
                  className="btn next"
                  disabled={props.verified[2] ? "" : true}>
            다음으로
            <img className="right" src={right} alt="right"></img>
          </button>
        </div>
      </div>

    </div>
  );
};

export default File;