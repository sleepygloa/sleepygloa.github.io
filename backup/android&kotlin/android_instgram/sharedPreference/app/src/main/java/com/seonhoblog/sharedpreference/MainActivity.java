package com.seonhoblog.sharedpreference;

import android.content.Context;
import android.content.SharedPreferences;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.TextView;

import org.w3c.dom.Text;

public class MainActivity extends AppCompatActivity {

    // default = -1 -> first user
    // user = 1
    public static final String SHARED_PREF_FIRST_USER_KEY = "1000";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        TextView tvHello = (TextView) findViewById(R.id.tv_hello);


        SharedPreferences sharedPref = getPreferences(Context.MODE_PRIVATE);
        int firstUser = sharedPref.getInt(SHARED_PREF_FIRST_USER_KEY, -1);

        if (firstUser == 1){
            //기존 유저
            //오늘도 감사합니다. 호갱님
            tvHello.setText(getString(R.string.hello_user));
        }
        else if(firstUser == -1){
            //최초 실행 유저
            //만나서 반갑습니다. 고갱님
            tvHello.setText(getString(R.string.hello_first));

            saveUserIsNotFirst();
        }

    }

    private void saveUserIsNotFirst(){
        SharedPreferences sharedPref = getPreferences(Context.MODE_PRIVATE);
        SharedPreferences.Editor editor = sharedPref.edit();
        editor.putInt(SHARED_PREF_FIRST_USER_KEY, 1);
        editor.commit();
    }

}
