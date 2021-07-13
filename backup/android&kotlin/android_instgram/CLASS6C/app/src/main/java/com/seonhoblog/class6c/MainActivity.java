package com.seonhoblog.class6c;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;

import com.seonhoblog.class6c.model.PostItem;
import com.seonhoblog.class6c.recycleView.PostAdapter;


import java.util.ArrayList;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        ArrayList<PostItem>  listItem = new ArrayList<PostItem>();

        RecyclerView rvList = (RecyclerView) findViewById(R.id.rv_list);

        for (int i = 0 ; i < 5 ; i ++){
            PostItem item = new PostItem(
                    true, 125, "back",
                    "http://www.asiae.co.kr/news/view.htm?idxno=2017090912402625418", "WOW!!"
            );
            listItem.add(i, item);

        }

        PostAdapter adapter = new PostAdapter(this, listItem);
        rvList.setLayoutManager(new LinearLayoutManager(this, LinearLayoutManager.VERTICAL, false));
        rvList.setAdapter(adapter);

    }
}
