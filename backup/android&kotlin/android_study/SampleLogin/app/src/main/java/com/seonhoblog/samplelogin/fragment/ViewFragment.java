package com.seonhoblog.samplelogin.fragment;

import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;

import com.seonhoblog.samplelogin.R;

public class ViewFragment extends Fragment {

    ImageView imageView;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {

        ViewGroup rootView = (ViewGroup) inflater.inflate(R.layout.activity_fragment_view, container, false);

        imageView = (ImageView) rootView.findViewById(R.id.imageView);

        return rootView;

    }

    public void setImage(int resId){
        imageView.setImageResource(resId);
    }

}
