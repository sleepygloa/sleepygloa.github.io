package com.seonhoblog.samplelogin.listView;

import android.content.Context;
import android.util.AttributeSet;
import android.view.LayoutInflater;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.seonhoblog.samplelogin.R;

public class SingleItemViewActivity extends LinearLayout {

    TextView textView;
    TextView textView2;
    TextView textView3;
    ImageView imageView;

    public SingleItemViewActivity(Context context){
        super(context);
        init(context);
    }

    public SingleItemViewActivity(Context context, AttributeSet atts){
        super(context, atts);
        init(context);
    }

    public void init(Context context){
        LayoutInflater inflater = (LayoutInflater) context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
        inflater.inflate(R.layout.activity_listview, this, true);

        textView = (TextView) findViewById(R.id.tv_listview_single_item_textview1);
        textView2 = (TextView) findViewById(R.id.tv_listview_single_item_textview2);
        textView3 = (TextView) findViewById(R.id.tv_listview_single_item_textview3);
        imageView = (ImageView) findViewById(R.id.iv_listview_single_item_img);
    }

    public void setName(String name){
        textView.setText(name);
    }

    public void setMobild(String mobile){
        textView2.setText(mobile);
    }

    public void setAge(int age){
        textView3.setText(age);
    }

    public void setImage(int resId){
        imageView.setImageResource(resId);
    }


}
