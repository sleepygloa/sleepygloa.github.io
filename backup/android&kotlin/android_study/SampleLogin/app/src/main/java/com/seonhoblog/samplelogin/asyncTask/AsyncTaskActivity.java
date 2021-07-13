package com.seonhoblog.samplelogin.asyncTask;

import android.os.AsyncTask;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;
import android.widget.ProgressBar;
import android.widget.TextView;

import com.seonhoblog.samplelogin.R;

public class AsyncTaskActivity extends AppCompatActivity {

    TextView textView;
    ProgressBar progress;
    AsyncTaskActivity.BackgroundTask task;
    int value;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        textView = (TextView) findViewById(R.id.tv_asynctask_text);
        progress = (ProgressBar) findViewById(R.id.pb_asynctask_bar);

        // 실행 버튼 이벤트 처리
        Button executeButton = (Button) findViewById(R.id.btn_asynctask_execute);
        executeButton.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v) {
                // 새로운 Task 객체를 만들고 실행
                task = new AsyncTaskActivity.BackgroundTask();
                task.execute(100);
            }
        });

        // 취소 버튼 이벤트 처리
        Button cancelButton = (Button) findViewById(R.id.btn_asynctask_cancle);
        cancelButton.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v) {
                task.cancel(true);
            }
        });
    }

    /**
     * 새로운 Task 객체를 정의
     */
    class BackgroundTask extends AsyncTask<Integer , Integer , Integer> {
        protected void onPreExecute() {
            value = 0;
            progress.setProgress(value);
        }

        protected Integer doInBackground(Integer ... values) {
            while (isCancelled() == false) {
                value++;
                if (value >= 100) {
                    break;
                } else {
                    publishProgress(value);
                }

                try {
                    Thread.sleep(100);
                } catch (InterruptedException ex) {}
            }

            return value;
        }

        protected void onProgressUpdate(Integer ... values) {
            progress.setProgress(values[0].intValue());
            textView.setText("Current Value : " + values[0].toString());
        }

        protected void onPostExecute(Integer result) {
            progress.setProgress(0);
            textView.setText("Finished.");
        }

        protected void onCancelled() {
            progress.setProgress(0);
            textView.setText("Cancelled.");
        }
    }

}
