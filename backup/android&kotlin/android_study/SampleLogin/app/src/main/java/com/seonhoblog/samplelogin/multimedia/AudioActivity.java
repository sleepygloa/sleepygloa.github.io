package com.seonhoblog.samplelogin.multimedia;

import android.media.MediaPlayer;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;

import com.seonhoblog.samplelogin.R;

public class AudioActivity extends AppCompatActivity {
    static final String AUDIO_URL = "http://sites.google.com/site/ubiaccessmobile/sample_audio.amr";
    private MediaPlayer mediaPlayer;
    private int playbackPosition = 0;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        Button startBtn = (Button) findViewById(R.id.btn_multimedia_audio_play);
        Button pauseBtn = (Button) findViewById(R.id.btn_multimedia_audio_pause);
        Button restartBtn = (Button) findViewById(R.id.btn_multimedia_audio_restart);

        startBtn.setOnClickListener(new View.OnClickListener() {
            public void onClick(View view) {
                try {
                    playAudio(AUDIO_URL);

                    Toast.makeText(getApplicationContext(), "음악 파일 재생 시작됨.", Toast.LENGTH_LONG).show();
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });

        pauseBtn.setOnClickListener(new View.OnClickListener() {
            public void onClick(View view) {
                if (mediaPlayer != null) {
                    playbackPosition = mediaPlayer.getCurrentPosition();
                    mediaPlayer.pause();
                    Toast.makeText(getApplicationContext(), "음악 파일 재생 중지됨.", Toast.LENGTH_LONG).show();
                }
            }
        });

        restartBtn.setOnClickListener(new View.OnClickListener() {
            public void onClick(View view) {
                if (mediaPlayer != null && !mediaPlayer.isPlaying()) {
                    mediaPlayer.start();
                    mediaPlayer.seekTo(playbackPosition);
                    Toast.makeText(getApplicationContext(), "음악 파일 재생 재시작됨.", Toast.LENGTH_LONG).show();
                }
            }
        });
    }

    private void playAudio(String url) throws Exception {
        killMediaPlayer();

        mediaPlayer = new MediaPlayer();
        mediaPlayer.setDataSource(url);
        mediaPlayer.prepare();
        mediaPlayer.start();
    }

    protected void onDestroy() {
        super.onDestroy();
        killMediaPlayer();
    }

    private void killMediaPlayer() {
        if (mediaPlayer != null) {
            try {
                mediaPlayer.release();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }


}
