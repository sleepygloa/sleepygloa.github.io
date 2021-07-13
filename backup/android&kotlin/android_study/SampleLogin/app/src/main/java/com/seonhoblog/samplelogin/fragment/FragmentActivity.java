package com.seonhoblog.samplelogin.fragment;

import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.app.FragmentManager;
import android.support.v7.app.AppCompatActivity;

import com.seonhoblog.samplelogin.R;

public class FragmentActivity extends AppCompatActivity implements ListFragment.ImageSelectionCallback{

    ListFragment listFragment;
    ViewFragment viewFragment;

    int[] images = {R.drawable.back01, R.drawable.back02};

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_fragment);


        FragmentManager manager = getSupportFragmentManager();
        listFragment = (ListFragment) manager.findFragmentById(R.id.fr_fragment_list);
        viewFragment = (ViewFragment) manager.findFragmentById(R.id.fr_fragment_view);
    }

    @Override
    public void onImageSelected(int position){
        viewFragment.setImage(images[position]);
    }

}
