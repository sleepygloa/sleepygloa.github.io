package com.seonhoblog.samplelogin.multimedia;

import android.media.AudioManager;
import android.media.MediaPlayer;
import android.net.Uri;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;
import android.widget.MediaController;
import android.widget.Toast;
import android.widget.VideoView;

import com.seonhoblog.samplelogin.R;

public class VideoActivity extends AppCompatActivity {

    static final String VIDEO_URL = "http://sites.google.com/site/ubiaccessmobile/sample_video.mp4";
    private VideoView videoView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_multimedia_video);

        Button startBtn = (Button) findViewById(R.id.btn_multimedia_video_play);
        Button volumeBtn = (Button) findViewById(R.id.btn_multimedia_video_volumn_maxup);

        startBtn.setOnClickListener(new View.OnClickListener() {
            public void onClick(View view) {
                videoView.seekTo(0);
                videoView.start();
            }
        });

        volumeBtn.setOnClickListener(new View.OnClickListener() {
            public void onClick(View view) {
                AudioManager mAudioManager = (AudioManager) getSystemService(AUDIO_SERVICE);
                int maxVolume = mAudioManager.getStreamMaxVolume(AudioManager.STREAM_MUSIC);
                mAudioManager.setStreamVolume(AudioManager.STREAM_MUSIC, maxVolume, AudioManager.FLAG_SHOW_UI);
            }
        });

        videoView = (VideoView) findViewById(R.id.vv_multimedia_video_view);

        MediaController mc = new MediaController(this);
        videoView.setMediaController(mc);
        videoView.setVideoURI(Uri.parse(VIDEO_URL));
        videoView.requestFocus();

        videoView.setOnPreparedListener(new MediaPlayer.OnPreparedListener() {
            public void onPrepared(MediaPlayer player) {
                Toast.makeText(getApplicationContext(), "동영상이 준비되었습니다.\n'재생' 버튼을 누르세요.", Toast.LENGTH_LONG).show();
            }
        });

        videoView.setOnCompletionListener(new MediaPlayer.OnCompletionListener() {
            public void onCompletion(MediaPlayer player) {
                Toast.makeText(getApplicationContext(), "동영상 재생이 완료되었습니다.", Toast.LENGTH_LONG).show();
            }
        });

    }

    protected void onResume() {
        Toast.makeText(getApplicationContext(), "동영상 준비중입니다.\n잠시 기다려주세요.", Toast.LENGTH_LONG).show();

        super.onResume();
    }

}
