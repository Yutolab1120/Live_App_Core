let localStream;//グローバル変数として用意

const peer = new Peer({
    key: '320e8f26-3e2a-4804-b922-e59bd58b7d37',// PeerKey (各自変更必須)
    debug: 1
});

peer.on('open', () => {
    document.getElementById('my-id').textContent = peer.id;
});//ここでpeerID取得

document.getElementById('share').onclick = () => {
    navigator.mediaDevices.getDisplayMedia({ video: { width: 1280, height: 720, frameRate: 60 }, audio: true })
        .then(stream => {
            const videoElm = document.getElementById('my-video')
            videoElm.srcObject = stream;
            videoElm.play();
            localStream = stream;//映像をグローバル変数に
            const theirID = document.getElementById('their-id').value;
            const mediaConnection = peer.call(theirID, localStream, { videoBandwidth: 14000 });
        });
}

document.getElementById('camera').onclick = () => {
    navigator.mediaDevices.getUserMedia({ video: { width: 1280, height: 720, frameRate: 60 }, audio: true })//set video quality 
        .then(stream => {
            const videoElm = document.getElementById('my-video')
            videoElm.srcObject = stream;
            videoElm.play();
            localStream = stream;//カメラをグローバル変数に
            const theirID = document.getElementById('their-id').value;
            const mediaConnection = peer.call(theirID, localStream, { videoBandwidth: 14000 });
        });
}

document.getElementById('stop').onclick = () => {
    localStream.getVideoTracks()[0].stop();
}

document.getElementById('make-call').onclick = () => {
    const theirID = document.getElementById('their-id').value;
    const mediaConnection = peer.call(theirID, localStream, { videoBandwidth: 14000 });//request bandwidth
    setEventListener(mediaConnection);
}

const setEventListener = mediaConnection => {
    mediaConnection.on('stream', stream => {
        const videoElm = document.getElementById('their-video')
        videoElm.srcObject = stream;
        videoElm.play();
    });
}

peer.on('call', mediaConnection => {
    mediaConnection.answer(localStream, { videoBandwidth: 14000 });
    setEventListener(mediaConnection);
});
