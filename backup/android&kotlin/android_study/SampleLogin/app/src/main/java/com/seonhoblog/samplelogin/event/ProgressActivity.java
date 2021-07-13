package com.seonhoblog.samplelogin.event;

import android.app.ProgressDialog;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;
import android.widget.ProgressBar;

import com.seonhoblog.samplelogin.R;

public class ProgressActivity  extends AppCompatActivity{

    ProgressDialog dialog;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_event_progress);

        ProgressBar progressBar = (ProgressBar) findViewById(R.id.prog_event_progressbar);

        progressBar.setIndeterminate(false);
        progressBar.setMax(100);
        progressBar.setProgress(100);

        Button btnProgBarShow = (Button) findViewById(R.id.btn_event_progress_show);
        btnProgBarShow.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                dialog = new ProgressDialog(getApplicationContext());
                dialog.setProgressStyle(ProgressDialog.STYLE_SPINNER);
                dialog.setMessage("데이터를 확인하는 중입니다. ");

                dialog.show();
            }
        });
        Button btnProgBarClose = (Button) findViewById(R.id.btn_event_progress_close);
        btnProgBarClose.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if (view != null) {
                    dialog.dismiss();
                }
            }
        });
    }
}
