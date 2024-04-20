import { useEffect, useRef, useState } from 'react';
import { Button, Image, Avatar, Row, Col , Modal } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const UploadAvatar = () => {
  const videoWidth = '300'
  const videoHeight = '300'
  
  const [avatarUrl, setAvatarUrl] = useState<any>('')
  const [avatarPreViewUrl, setAvatarPreViewUrl] = useState<any>('')
  const [isShowTakePhoto, setIsShowTakePhoto] = useState<boolean>(false);
  const [isReTakePhoto, setIsReTakePhoto] = useState<boolean>(false)
  const inputRef = useRef<any>(null)
  const canvasCameraRef = useRef<any>(null)
  const videoCamera = useRef<any>(null)

  const uploadAvatarClick = () => {
    inputRef.current!.click()
  }

  const avatarFileChange = (e: any) => {
    const files = [...e.target.files];    
		if (files.length === 0) return;
		let result = files.map(file => {
      let url = null;
      if (window?.createObjectURL != undefined) {
        url = window?.createObjectURL(file)
      } else if (window.URL != undefined) {
        url = window.URL.createObjectURL(file)
      } else if (window.webkitURL != undefined) {
        url = window.webkitURL.createObjectURL(file)
      }
      return url;
    })
    setAvatarUrl(result)
  }

  useEffect(() => {
    // 等拍照弹框显示后执行打开摄像头
    if(isShowTakePhoto) {
      openPhoto()
    }
  },[isShowTakePhoto])

  /** 开启摄像头 */
  const openPhoto = () => {
    const canvasCamera = canvasCameraRef.current
    const thisVideo = videoCamera.current
    const thisContext = canvasCamera?.getContext('2d')
    // 旧版本浏览器可能根本不支持mediaDevices，我们首先设置一个空对象
    if (navigator.mediaDevices === undefined) {
      navigator.mediaDevices = {}
    }
    // 一些浏览器实现了部分mediaDevices，我们不能只分配一个对象
    // 使用getUserMedia，因为它会覆盖现有的属性。
    // 这里，如果缺少getUserMedia属性，就添加它。
    if (navigator.mediaDevices.getUserMedia === undefined) {
      navigator.mediaDevices.getUserMedia = function (constraints) {
        // 首先获取现存的getUserMedia(如果存在)
        var getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.getUserMedia
        // 有些浏览器不支持，会返回错误信息
        // 保持接口一致
        if (!getUserMedia) {
          return Promise.reject(new Error('getUserMedia is not implemented in this browser'))
        }
        // 否则，使用Promise将调用包装到旧的navigator.getUserMedia
        return new Promise(function (resolve, reject) {
          getUserMedia.call(navigator, constraints, resolve, reject)
        })
      }
    }
    var constraints = { audio: false, video: { width: videoWidth, height: videoHeight } }
    navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
      // 旧的浏览器可能没有srcObject
      if ('srcObject' in thisVideo) {
        thisVideo.srcObject = stream
      } else {
        // 避免在新的浏览器中使用它，因为它正在被弃用。
        thisVideo.src = window.URL.createObjectURL(stream)
      }
      thisVideo.onloadedmetadata = function (e) {
        thisVideo.play()
      }
    }).catch(err => {
      console.log(err)
    })
  }

  // base64转文件
  const dataURLtoFile  = (dataurl, filename) => {
    var arr = dataurl.split(',')
    var mime = arr[0].match(/:(.*?);/)[1]
    var bstr = atob(arr[1])
    var n = bstr.length
    var u8arr = new Uint8Array(n)
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }
    return new File([u8arr], filename, { type: mime })
  }

  /** 拍照并转换 */
  const takePhoto = () => {
    // 点击，canvas画图
    const canvasCamera = canvasCameraRef.current
    const thisVideo = videoCamera.current
    const thisContext = canvasCamera.getContext('2d')
    thisContext.drawImage(thisVideo, 0, 0, videoWidth, videoHeight)
    // 获取图片base64链接
    var image = canvasCamera.toDataURL('image/png')
    console.log('image',image);
    
    const file = dataURLtoFile(image, '')
    let url = '';
    if (window?.createObjectURL != undefined) {
      url = window?.createObjectURL(file)
    } else if (window.URL != undefined) {
      url = window.URL.createObjectURL(file)
    } else if (window.webkitURL != undefined) {
      url = window.webkitURL.createObjectURL(file)
    }
    setAvatarUrl(url)
    setAvatarPreViewUrl(url)
    if(thisVideo && thisVideo?.srcObject){
      thisVideo.srcObject.getTracks()[0].stop()
    }
    setIsReTakePhoto(false)
  }

  /** 重新拍照，重置临时图片 */
  const handleReTakePhoto = () => {
    setAvatarPreViewUrl('')
    setIsReTakePhoto(true)
    // setTimeout(() => {
    //   takePhoto()
    // }, 200)
  }

  useEffect(() => {
    if(isReTakePhoto) {
      openPhoto()
    }
  },[isReTakePhoto])

  const onCancel = () => {
    const thisVideo = videoCamera.current
    if(thisVideo && thisVideo?.srcObject){
      thisVideo.srcObject.getTracks()[0].stop()
    }
    setIsShowTakePhoto(false)
    setIsReTakePhoto(false)
    setAvatarPreViewUrl('')
  }
  
  return (
    <div>
      <div>
        {avatarUrl ? 
        <Image src={avatarUrl} style={{width: '100px', height: '100px', borderRadius: '10px'}} />
        :
        <Avatar shape="square" size={100} icon={<UserOutlined />} />
        }
      </div>
      <Row>
        <Col span={4}>
          <Button
            type='primary'
            onClick={uploadAvatarClick}
          >
            上传图片
          </Button>
          <input
            ref={inputRef}
            id="inputFile"
            type="file" 
            hidden
            onChange={avatarFileChange}
          />
        </Col>
        <Col span={4}>
          <Button
            type='primary'
            onClick={() => {
              setAvatarPreViewUrl('')
              setIsShowTakePhoto(true)
              setIsReTakePhoto(false)
            }}
          >
            拍照上传
          </Button>
        </Col>
      </Row>
      <Modal 
        title="拍照上传" 
        visible={isShowTakePhoto}
        onCancel={onCancel}
        bodyStyle={{height: '345px'}}
        footer={
          avatarPreViewUrl? 
          [
            <Button
              type='default'
              onClick={onCancel}
            >
              取消
            </Button>,
            <Button
              type='primary'
              onClick={handleReTakePhoto}
            >
              重新拍照
            </Button>,
            <Button
              type='primary'
              // onClick={hanldeOk}
            >
              确定
            </Button>
          ]:
          [
            <Button
              type='default'
              onClick={onCancel}
            >
              取消
            </Button>,
            <Button
              type='primary'
              onClick={takePhoto}
            >
              拍照
            </Button>
          ]
        }
      >
        {avatarPreViewUrl ? <Image src={avatarPreViewUrl} style={{width: '300px', height: '300px', borderRadius: '10px'}} />
        :
        <video ref={videoCamera} style={{width:`${videoWidth}`, height:`${videoHeight}`}} autoPlay></video>
        }
        <canvas ref={canvasCameraRef} width={300} height={300} style={{display: 'none', width: `${videoWidth}`, height: `${videoHeight}`}}></canvas>
      </Modal>
    </div>
  )
}
export default UploadAvatar;