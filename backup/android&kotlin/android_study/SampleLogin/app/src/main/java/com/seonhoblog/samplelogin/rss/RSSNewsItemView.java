package com.seonhoblog.samplelogin.rss;

import android.content.Context;
import android.graphics.drawable.Drawable;
import android.util.Log;
import android.view.LayoutInflater;
import android.webkit.WebView;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.seonhoblog.samplelogin.R;

public class RSSNewsItemView extends LinearLayout {

	/**
	 * Icon
	 */
	private ImageView mIcon;

	/**
	 * TextView 01
	 */
	private TextView mText01;

	/**
	 * TextView 02
	 */
	private TextView mText02;

	/**
	 * TextView 03
	 */
	private TextView mText03;

	/**
	 * WebView 04
	 */
	private WebView mText04;

	public RSSNewsItemView(Context context, RSSNewsItem aItem) {
		super(context);

		// Layout Inflation
		LayoutInflater inflater = (LayoutInflater) context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
		inflater.inflate(R.layout.activity_rss_item, this, true);

		// Set Icon
		mIcon = (ImageView) findViewById(R.id.iv_rss_item_img);
		mIcon.setImageDrawable(aItem.getIcon());

		// Set Text 01
		mText01 = (TextView) findViewById(R.id.tv_rss_item_text);
		mText01.setText(aItem.getTitle());

		// Set Text 02
		mText02 = (TextView) findViewById(R.id.tv_rss_item_text2);
		mText02.setText(aItem.getPubDate());

		// Set Text 03
		mText03 = (TextView) findViewById(R.id.tv_rss_item_text3);
		String category = aItem.getCategory();
		if (category != null) {
			mText03.setText(category);
		}

		// Set Text 04
		mText04 = (WebView) findViewById(R.id.wv_rss_item_contents);
		//mText04.setText(aItem.getDescription());
		
		setTextToWebView(aItem.getDescription());
		 
	}

	/**
	 * set Text
	 *
	 * @param index
	 * @param data
	 */
	public void setText(int index, String data) {
		if (index == 0) {
			mText01.setText(data);
		} else if (index == 1) {
			mText02.setText(data);
		} else if (index == 2) {
			mText03.setText(data);
		} else if (index == 3) {
			//mText04.setText(data);
			
			setTextToWebView(data);
			
		} else {
			throw new IllegalArgumentException();
		}
	}

	
	private void setTextToWebView(String msg) {
		Log.d("RSSNewsItemView", "setTextToWebView() called.");
		
		//String outData = "<meta http-equiv='Content-Type' content='text/html; charset=utf-8' /><html><body>"
		//		+ msg
		//		+ "</body></html>";

		String outData = msg;
		
		// ????????? src ?????? http:// ??? ?????? // ??? ????????? ??????
		outData = outData.replace("\"//", "\"http://");
		
		mText04.loadDataWithBaseURL("http://localhost/", outData, "text/html", "utf-8", null);
	}
	
	/**
	 * set Icon
	 *
	 * @param icon
	 */
	public void setIcon(Drawable icon) {
		mIcon.setImageDrawable(icon);
	}

}
