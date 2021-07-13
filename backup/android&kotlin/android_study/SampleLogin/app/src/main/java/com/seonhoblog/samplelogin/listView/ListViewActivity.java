package com.seonhoblog.samplelogin.listView;

import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.BaseAdapter;
import android.widget.EditText;
import android.widget.GridView;
import android.widget.ListView;
import android.widget.Toast;

import com.seonhoblog.samplelogin.R;

import java.util.ArrayList;

public class ListViewActivity extends AppCompatActivity {

    EditText editText;

    GridView gridView;
//    ListView listView;
    SingleAdapter adapter;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_listview);

        gridView = (GridView) findViewById(R.id.gv_listview_list);
        adapter = new SingleAdapter();

        adapter.addItem(new SingleItemActivity("소녀시대" ,"010-0000-0000", 20, R.drawable.singer));
        adapter.addItem(new SingleItemActivity("트와이스" ,"010-1000-0000", 20, R.drawable.singer2));
        adapter.addItem(new SingleItemActivity("모모랜드" ,"010-2000-0000", 20, R.drawable.singer3));
        adapter.addItem(new SingleItemActivity("우주소녀" ,"010-3000-0000", 20, R.drawable.singer4));
        adapter.addItem(new SingleItemActivity("백진희" ,"010-4000-0000", 20, R.drawable.singer5));

        gridView.setAdapter(adapter);

        editText = (EditText) findViewById(R.id.et_listview_text);

        gridView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                SingleItemActivity item = (SingleItemActivity) adapter.getItem(position);
                Toast.makeText(getApplicationContext(), "선택 : " + item.getName(), Toast.LENGTH_SHORT).show();
            }
        });

    }

    class SingleAdapter extends BaseAdapter{
        ArrayList<SingleItemActivity> items = new ArrayList<SingleItemActivity>();

        @Override
        public int getCount() {
            return items.size();
        }

        public void addItem(SingleItemActivity item){
            items.add(item);
        }

        @Override
        public Object getItem(int position) {
            return items.get(position);
        }

        @Override
        public long getItemId(int position) {
            return position;
        }

        @Override
        public View getView(int position, View convertView, ViewGroup viewGroup) {
            SingleItemViewActivity view = new SingleItemViewActivity(getApplicationContext());
            SingleItemActivity item = items.get(position);
            view.setName(item.name);
            view.setMobild(item.mobile);
            view.setAge(item.age);
            view.setImage(item.resId);
            return view;
        }
    }
}

