/**
 * Created by gomes on 24/11/16.
 */
(function () {
    'user strict';
    $(document).ready(function () {
        var player = videojs('candidate-video',
            {
                controls: true,
                width: 320,
                height: 240,
                plugins: {
                    record: {
                        audio: true,
                        video: true,
                        maxLength: 5,
                        debug: true
                    }
                }
            });
        player.on('finishRecord', function () {
            console.log('finished recording: ', player.recordedData);
            // upload the video
        });
        // error handling
        player.on('deviceError', function () {
            console.log('device error:', player.deviceErrorCode);
        });
        player.on('error', function (error) {
            console.log('error:', error);
        });

        // user clicked the record button and started recording
        player.on('startRecord', function () {
            console.log('started recording!');
        });

        $('#save-video-button').on('click', function (e) {
                var fd = new FormData();
                fd.append('candidate-video', 'test.mp4');
                fd.append('data', player.recordedData.video);
                $.ajax({
                    type: 'POST',
                    url: '/video/gomes',
                    data: fd,
                    processData: false,
                    contentType: false
                }).done(function (data) {
                    data = JSON.parse(data);
                    console.log(data);
                    window.location = data.redirect;
                });
            }
        )
    });
})();
