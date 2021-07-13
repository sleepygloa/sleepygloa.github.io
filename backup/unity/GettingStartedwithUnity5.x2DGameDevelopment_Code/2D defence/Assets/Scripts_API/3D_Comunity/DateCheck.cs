using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class DateCheck : MonoBehaviour {

    public AudioClip[,] voice_date;

    public AudioClip voice_date0101;
    public AudioClip voice_date0115;
    public AudioClip voice_date0201;
    public AudioClip voice_date0215;
    public AudioClip voice_date0301;
    public AudioClip voice_date0315;
    public AudioClip voice_date0401;
    public AudioClip voice_date0415;
    public AudioClip voice_date0501;
    public AudioClip voice_date0515;
    public AudioClip voice_date0601;
    public AudioClip voice_date0615;
    public AudioClip voice_date0619;
    public AudioClip voice_date0701;
    public AudioClip voice_date0715;
    public AudioClip voice_date0801;
    public AudioClip voice_date0815;
    public AudioClip voice_date0901;
    public AudioClip voice_date0915;
    public AudioClip voice_date1001;
    public AudioClip voice_date1015;
    public AudioClip voice_date1101;
    public AudioClip voice_date1115;
    public AudioClip voice_date1201;
    public AudioClip voice_date1215;

    private AudioSource univoice;

    System.DateTime now;

    int nowMonth;
    int nowDay;

    
        

	// Use this for initialization
	void Start () {

        //이전에 프로그램을 실행한 날짜를 담는 변수
        int oldMonth = 0;
        int oldDay = 0;

        univoice = GetComponent<AudioSource>();


        //이전에 이 프로그램을 실행한 날짜를 불러온.
        oldMonth = PlayerPrefs.GetInt("Month");
        oldDay = PlayerPrefs.GetInt("Day");

        //현재 시간을 얻는다.
        now = System.DateTime.Now;

        nowMonth = now.Month;
        nowDay = now.Day;

        //오늘 날짜를 저장
        PlayerPrefs.SetInt("Month", now.Month);
        PlayerPrefs.SetInt("Day", now.Day);

        voice_date = new AudioClip[12 + 1, 31 + 1];

        voice_date[1, 1] = voice_date0101;
        voice_date[1, 15] = voice_date0115;
        voice_date[2, 1] = voice_date0201;
        voice_date[2, 15] = voice_date0215;
        voice_date[3, 1] = voice_date0301;
        voice_date[3, 15] = voice_date0315;
        voice_date[4, 1] = voice_date0401;
        voice_date[4, 15] = voice_date0415;
        voice_date[5, 1] = voice_date0501;
        voice_date[5, 15] = voice_date0515;
        voice_date[6, 1] = voice_date0601;
        voice_date[6, 15] = voice_date0615;
        voice_date[6, 19] = voice_date0619;
        voice_date[7, 1] = voice_date0701;
        voice_date[7, 15] = voice_date0715;
        voice_date[8, 1] = voice_date0801;
        voice_date[8, 15] = voice_date0815;
        voice_date[9, 1] = voice_date0901;
        voice_date[9, 15] = voice_date0915;
        voice_date[10, 1] = voice_date1001;
        voice_date[10, 15] = voice_date1015;
        voice_date[11, 1] = voice_date1101;
        voice_date[11, 15] = voice_date1115;
        voice_date[12, 1] = voice_date1201;
        voice_date[12, 15] = voice_date1215;

        if(voice_date[nowMonth, nowDay] != null){
            univoice.PlayOneShot(voice_date[nowMonth, nowDay]);
        }
	}
	
	// Update is called once per frame
	void Update () {
		
	}
}
