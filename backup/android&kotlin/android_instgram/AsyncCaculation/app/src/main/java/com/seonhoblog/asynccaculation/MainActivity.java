package com.seonhoblog.asynccaculation;

import android.os.AsyncTask;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.TextView;

public class MainActivity extends AppCompatActivity {

    private TextView tvDisplay;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        tvDisplay = (TextView) findViewById(R.id.tv_display);

        findViewById(R.id.btn_start).setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View view){
                startAsyncCalculation();
            }
        });
    }

    private void startAsyncCalculation(){
        // execute(1, 100_000_000)
        AsyncCalculateTask task = new AsyncCalculateTask();
            task.execute(1, Integer.MAX_VALUE);

    }

    class AsyncCalculateTask extends AsyncTask<Integer, Integer, Integer>{

        @Override
        protected Integer doInBackground(Integer... integers) {

            int number = integers[0];
            int count = integers[1];
            int result = 0;

            int percentUnit = count / 100;

            for(int i = 0; i < count; i++){
                result += number;

                if(result % percentUnit == 0){
                    //1% 2% 25%...
                    publishProgress(result/percentUnit);

                }
            }

            return result;
        }

        @Override
        protected void onProgressUpdate(Integer... values){
            super.onProgressUpdate(values);
//            tvDisplay.setText(values[0]+ "Percent");
            Log.d("AsyncCalculatorTask ", values[0] + " percent");
        }

        /** UI Thread */
        @Override
        protected void onPostExecute(Integer integer){
            super.onPostExecute(integer);
            tvDisplay.setText("Result : " + integer);
        }
    }
}
