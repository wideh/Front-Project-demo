import QRCode from 'qrcode.react';

const Qrcode = () => {
  return (
    <QRCode
      value={'http://local'}
      size={100}
      fgColor={'#000'}
      bgColor={'#fff'}
      level={'L'}
      renderAs={'svg'}
    />
  )
}
export default Qrcode;