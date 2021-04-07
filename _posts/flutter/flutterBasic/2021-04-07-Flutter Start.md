---
title: Flutter 시작하기
categories: 
  - Flutter
tags:
  - Flutter
toc: true
---



# Flutter 기본 



## Flutter ?
- 구글에서 만든 라이브러리
- Dart 언어 사용
- 한번에 ```Android```, ```Ios``` 개발가능
- 다른 하이브리드 개발과 다르게 Native 성능을 보여줌.


## 시작하기
- 다운로드 URL : https://flutter-ko.dev/docs/get-started/install/windows
- 환경변수 세팅하기 : 
>flutter\bin

- 안드로이드 스튜디오 설치 : 
- SDK 설치 : 개발하고자하는 안드로이드 버전 설치
- Plugin 설치 : Flutter

- 실행환경 확인 : ```cmd``` 실행하여 아래 명령어 실행
```
flutter docotr
```
사진과 같은 결과가 나올 것이다.
[![install](./images/2021-04-07-1-img-install.png)](./images/2021-04-07-1-img-install.png)
toolchain 해결을 위해 아래 명령어를 실행하자
```
flutter doctor --android-licenses
y
y
y
y
```

## 프로젝트 세팅
1. Flutter 프로젝트 실행
   - [File] - [new Flutter Project] - [Flutter Application] - [com.회사명.어플리케이션 이름] (Kotlin, IOS 체크!!) - [완료]
   - [![install](./images/2021-04-07-3-flutter-application.png)](./images/2021-04-07-3-flutter-application.png)
   - ```Flutter SDK Path``` 경로가 아까 다운받은 경로로 설정되어있는지 확인
   - [![install](./images/2021-04-07-4-flutter-sdk-path.png)](./images/2021-04-07-4-flutter-sdk-path.png)
   - 프로젝트 위치 설정
   - [![install](./images/2021-04-07-5-application-name.png)](./images/2021-04-07-5-application-name.png)
   - 완료
  
2. Device 설치
Android Studio 에서 개발하기 위해서 핸드폰과 같은 ```가상 Device```를 띄워 테스트를 할 수 있다.
   - [AVD Manager] - [원하는 기기 설치 및 클릭] - [Device 선택] - [실행]
   - [![install](./images/2021-04-07-6-findavdmanager.png)](./images/2021-04-07-6-findavdmanager.png)
   - 아래에서 설치한 Device 를 찾아 선택하면 Device가 실행된다. 
   - [![install](./images/2021-04-07-7-finddevice.png)](./images/2021-04-07-7-finddevice.png)
   - Device 실행 확인
   - [![install](./images/2021-04-07-8-checkDevice.png)](./images/2021-04-07-8-checkDevice.png)

3. 프로젝트 구조 확인

> .dart_tool :
> .idea : 
> android : 안드로이드 소스
> build 
> ios : IOS 소스
> lib : 주로 수정하게 될 폴더, main.dart 파일이 현재 보여지는 화면이다.
> test : 테스트 코드 작성하는 폴더
> .gitignore : 버전관리시 누락 시킬 파일명명
> .metadata 
> .packages
> flutter_basic.iml
> pubspec.lock
> pubspec.yaml
> READMD.md : GIT 프로젝트 설명


## 구현하기
1. AppBar
```
      home: Scaffold(
        appBar : AppBar(
           title :  Text('헬로 월드')
        ),
        body : Text('헬로 월드2'
        ,style : TextStyle(fontSize:30))
      ),
```

2. StatefulWidget
   - 상태값을 이용한 조절이 가능한 화면
   - 만들어진 Widget을 다른 곳에서 불러와 활용이 가능하다.
```
home: HelloPage('Hello World'),
....


class HelloPage extends StatefulWidget {
  final String title;

  HelloPage(this.title);

  @override
  _HelloPageState createState() => _HelloPageState();
}

class _HelloPageState extends State<HelloPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title : Text(widget.title)
      ),
      body : Text(widget.title, style : TextStyle(fontSize: 30))
    );
  }
}
```

3. FloatingActtionButton 
[![install](./images/2021-04-07-9-floatingactionbutton.png)](./images/2021-04-07-9-floatingactionbutton.png)

```
      floatingActionButton: FloatingActionButton(
        child:Icon(Icons.add),
        onPressed: ()=>{},
      ),
```

4. setState()
이벤트가 발생했을때 ```_changeMessage()```을 실행시켜 ```setState()```로 ```_message``` 값을 변경시킨다.
```
  String _message = 'Hello World';

  void _changeMessage(){
    setState(() {
      _message = '헬로 월드';
    });
  }
```

5. Alignment
```Center```, ```Column```, ```mainAxisAlignment.center``` 를 이용한 화면 가로, 세로 가운데 정렬.
```
      body : Center(
        child:Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text(_message, style:TextStyle(fontSize:30)),
            Text('$_counter', style:TextStyle(fontSize:30)),
          ],
        )
      )
```

