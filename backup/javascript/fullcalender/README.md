# fullcalender 사용하기
## 세팅
	<link rel='stylesheet' href='fullcalendar/fullcalendar.css' />
	<script src='lib/jquery.min.js'></script>
	<script src='lib/moment.min.js'></script>
	<script src='fullcalendar/fullcalendar.js'></script>

## 코드시작하기
	$(document).ready(function() {
	    // page is now ready, initialize the calendar...
	    // 이곳에 초기화 코드를 넣어준다
	    $('#calendar').fullCalendar({
		// put your options and callbacks here
	    })
	});

## 코드시작하기2
	<div id='calendar'></div>

### 간단한코드들

#### 주말(토일)을 없앤다.
	weekends: false
  
#### 클릭 시 알람을 띄운다.
	dayClick: function() {
	alert('a day has been clicked!');
	}
#### Calender 의 헤더부분에 버튼과 월, 주, 일 별로 달력을 변경하는 버튼을 만든다.
	customButtons: {// 버튼
		myCustomButton: {
		    text: 'custom!',
		    click: function() {
			alert('clicked the custom button!');
		    }
	}
	},
	header: {
		left: 'prev,next today myCustomButton',
		center: 'title',
		right: 'month,agendaWeek,agendaDay'
	}
img 링크

#### 전월로가기, 다음월로가기 및 전년으로가기, 앞년으로가기
header : { left :
'prev, next, prevYear, nextYear'  //이부분에 추가하면된다.
}

####
firstDay (월의 첫뻔째날) : Integer, default : 0 (sun), 1(mon)....

isRTL : Boelean, default :  false; (달력을 왼쪽에서 오른쪽으로 읽기, true : 오른쪽에서 왼쪽으로)

weekends : Boolean, default : true; (달력에 토일을 포함할지, 포함한다)

hiddenDays: [] (숨길 column(요일)을 숨긴다. 표시숫자는 default 값에 따른다. 0(sun)...

fixedWeekCount : true (일반적으로 표시될 달력에 주(record, 행)수를 정함, true : 6, false: 4 또는 5)

weekNumbers : true (년단위의 주 수를 왼쪽에 따로 컬럼으로 나타낼지를 정함.)

weekNumbersWithinDays : false (주수를 따로 컬럼으로 표시할지, 달력안 왼쪽상단에 표시할지를 정함)

weekNumberCalculation : "local" (default), "ISO", or a function (주 번호를 계산하는 방법을 설정)

	businessHours: {
	    // days of week. an array of zero-based day of week integers (0=Sunday)
	    dow: [ 1, 2, 3, 4 ], // Monday - Thursday

	    start: '10:00', // a start time (10am in this example)
	    end: '18:00', // an end time (6pm in this example)
	}
: 업무시간, 일과시간을 정함. 이것을 쓰게되면 일과시간외의 grid가 표시가 된다. 시간의 내용은 따로 공부하고
시간은 이런식으로 표현 할 수 있다.
"23:59"       // hours/minutes
"23:59:59"    // hours/minutes/seconds
"1.23:59:59"  // days/hours/minutes/seconds
{ days:1, hours:23, minutes:59 } // an object

showNonCurrentDates : true (달력에 포함하지않는 일을 블럭 처리하지않고 보여 줄수 있다.)

height: 650 (달력의 높이를 지정해줍니다. option으로 parent는 달력의 부모요소와 높이가 같게되고, auto는 유연성을 가지게된다.

contentHeight: 600 (내용의 높이일듯)

aspectRatio: 2 (가로대세로비이다. 세로기준으로 가로의 길이가 배율로 정해진다.)

handleWindowResize : true (창크기가 변경될때 달력의 내용크기도 자동으로 변경될지 여부를 결정)

windowResizeDelay : 100 (창크기가 너무 자주 변경되는 것을 막기위해 딜레이시간이 존재)

	eventLimit: true, // for all non-agenda views
	views: {
		agenda: {
		    eventLimit: 6 // adjust to 6 only for agendaWeek/agendaDay
		}
	} (하루에 표시되는 이벤트의 수를 정함. 6보다 클때 +7 이런식으로 표현됨)

eventLimitClick (위의 eventLimit 을 클릭 했을 때의 이벤트를 결정한다)

"popover" (the default)
해당 날의 전체 이벤트 목록과 함께 셀 위에 사각형 패널을 표시합니다.

"week"
머리글의보기에 따라 결정되는 주보기로 이동합니다.

"day"
머리글의보기에 따라 하루보기로 이동합니다.

view name
사용 가능한 뷰의 리터럴 문자열 이름입니다

function
임의 코드 실행을위한 콜백 함수..
function( cellInfo, jsEvent ) (cellInfo 셸의 정보를 포함한 객체)

date - 당일의 일시

dayEl - 요일 셀의 jQuery 요소

moreEl - "more"링크를위한 jQuery 요소

segs - 지정된 날의 모든 이벤트 「segment」객체의 배열

hiddenSegs - 이전에 표시되지 않았던 세그먼트 객체 만의 배열

jsEvent는 클릭에 대한 기본 JavaScript 이벤트를 보유합니다.


### view 설정하기
    header: {
        center: 'month,agendaFourDay' // buttons for switching between views
    },
    views: {
        agendaFourDay: {
            type: 'agenda',
            duration: { days: 4 },
            buttonText: '4 day'
        }
    }

//이렇게 설정하면 agendaFourDay 처럼 변수를 지정하고 변수를 받아올수도 있다.

#### agenda option

allDaySlot : true (내용중 all-day 체크된 내용은 하루종일 상단에 표시되도록 한다)

allDayText : 'all-day' (하루종일 체크된 제목을 나타낸다)

slotDuration : 00:30:00 (기본으로 시간 칸에 표현될 시간을 나타낸다)

slotLabelFormat : h(:mm)a (일정 목록보기의 세로 축에 표시 될 시간 텍스트를 결정합니다.)

slotLabelInterval : 00:00:00 (시간 축에 슬롯의 날짜 / 시간을 표시하는 텍스트가 표시되는 빈도를 결정합니다. 시간단위인듯)

snapDuration : 00:30:00 (끌린 이벤트일정이 내려앉을 기준을 맞춘다)

scrollTime : 06:00:00 (6시간, 스크롤따운할때 보여지는 시간의 간격)

minTime : 00:00:00 (스크롤 막대가 끝까지 스크롤 된 경우에도 표시 할 시작 시간을 결정합니다.)

maxTime : 24:00:00 (스크롤 막대가 끝까지 되었을대 종료될 시각)

(minTime과 maxTime 을 정하면 제일처음시간과 제일마지막시각을 정할 수 잇는듯)

slotEventOverlap : true (이벤트 일정간 서로 중첩으로 쌓을 수 있는지를 표시)


#### Current date
defaultDate : moment (ISO8601에 적합한 2017-06-19 타입의 날짜를 반환한다. moment()식으로 사용)

nowIndicator : false (주간 달력등에서 현재시각을 레드라인으로 표시한다)

	defaultView: 'agenda',
	visibleRange: {
	    start: '2017-03-22',
	    end: '2017-03-25'
	} (이런식으로 지정하면, agenda 타입의 원하는 날짜만 볼 수있다.)
	defaultView: 'agenda',
	visibleRange: function(currentDate) {
	    return {
		start: currentDate.clone().subtract(1, 'days'),
		end: currentDate.clone().add(3, 'days') // exclusive end, so 3
	    };
	} (시작날짜를 현재날짜로 하고, 3일 추가한 날짜로 표시할 수 도 있다.)
	validRange : ------
	defaultView: 'month',
	validRange: {
	    start: '2017-05-01',
	    end: '2017-06-01'
	} (이렇게 month로 지정하면 그달만 보여주는 달력이된다.end 값이 없다면 5월까지만 보고 그이후로는 계속 볼수있다.)
	defaultView: 'month',
	validRange: function(nowDate) {
	    return {
		start: nowDate,
		end: nowDate.clone().add(1, 'months')
	    };
	}(이런식으로쓰면 언제든지 다음 1달까지만 볼수있다)
	
dateIncrement  : duration-ish object (<> 를 눌렀을때, 얼마나 경과하게 될지를 설정할수있다.)

dateAlignment : String (사용자 정의 또는 일반보기의 첫 번째 표시 일을 결정합니다.)

	weekends: false,
	defaultView: 'agendaFourDay',
	views: {
	    agendaFourDay: {
		type: 'agenda',
		dayCount: 4
	    }
	} : dayCoiunt :Integer (표시한 일수만큼 나타낸다)
--
	$('#my-prev-button').click(function() {
	    $('#calendar').fullCalendar('prev');
	}) (document 안애 이런 메서드를 추가하면 버튼을 만들수있다. 만들수 잇는 버튼으로는
	  prev, next, prevYear, nextYear, tody, gotoDate, incrementDate,getDate)
	  .fullCalendar( 'gotoDate', date ),
	  .fullCalendar( 'incrementDate', duration ),
	  $('#my-button').click(function() {
	    var moment = $('#calendar').fullCalendar('getDate');
	    alert("The current date of the calendar is " + moment.format());
	}); (getDate)

#### 번역과 관련된 자료

해당 js를 추가하던가
	<script src='fullcalendar/locale/es.js'></script>
	
전체를 추가하여 해당 지역을 추가하던가
	<script src='fullcalendar/locale-all.js'></script>
	
 locale: 'es'
이런식으로도 쓸수있다
	<script src='lib/moment.js'></script>
	<script src='lib/jquery-ui.custom-datepicker.js'></script>
	<script src='fullcalendar/fullcalendar.js'></script>
	<script src='fullcalendar/locale-all.js'></script>

timeFormat:
'H(:mm)' // uppercase H for 24-hour clock (시간을 24시간으로표현)
'ddd'     // like 'Mon', for month view (달을 일반적mon으로표현)
'ddd M/D' // like 'Mon 9/7', for week views (mon 9/7)
'dddd'    // like 'Monday', for day views (Monday)
'MMMM YYYY'   // like 'September 2009', for month view
'MMM D YYYY'  // like 'Sep 13 2009', for week views
'MMMM D YYYY' // like 'September 8 2009', for day views
	{ (버튼 아이콘 이름 표시하기 (버튼아이콘과 심버튼))
	    today:    'today',
	    month:    'month',
	    week:     'week',
	    day:      'day',
	    list:     'list'
	}
displayEventTime : Boolean (이벤트에 표시되는시간과 텍스트중에 텍스트트 보이게하지여부결정)
displayEventEnd : Boolean (캘린더에 이벤트가 렌더링 될 때 이벤트의 종료 시간 텍스트를 표시할지 여부.)
eventLimitText : more (+2 more 처럼 표시할수 있나보다)
dayPopoverFormat : String (popover창의 제목을 결정하는데 날짜형식 영어여야한다 ,dddd,MMMM d 등)

#### Click 과 Hover 기능
navLinks : false( 요일이름과 주이름을 클릭할수잇는지 결정, 모든요일상세일정으로갈수잇다)
이기능은 날짜 칸을 클릭시 알람으로 날짜, 좌표, 요일과 선택후 색상처리를 할수잇따.
dayClick: function(date, jsEvent, view) {

    alert('Clicked on: ' + date.format());

    alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);

    alert('Current view: ' + view.name);

    // change the day's background color just for fun
    $(this).css('background-color', 'red');

}
이벤트를 클릭햇을대 url로 이동한다. eventclick 메서드가 없으면 현재창에서이동, false면 새창으로 이동
events: [
         {
             title: 'My Event',
             start: '2017-06-01',
             url: 'http://google.com/'
         }
         // other events here
     ],
     eventClick: function(event) {
         if (event.url) {
             window.open(event.url);
             return false;
         }
     }
마우스 오버시
eventMouseover: function(event, jsEvent, view){}
마우스 오버아웃
eventMouseout : function(event, jsEvent, view){}

#### 이벤트 드래그 및 크기재조정

editable : false(수정가능하게할껀지)

eventStartEditable : true(모든이벤트시작시간은 조정가능)

eventDurationEditable : true (모든이벤트 기간은 조정가능)

dragRevertDuration : 500(0.5s 마우스끌기 실패후 원래 위치로 돌아가는시간)

dragOpacity : 0.75 (드래그되는 이벤트의 불투명도)

dragScroll  : true (끌기, 이동 중 스크롤이 자동으로 이동해줄지 여부)

eventOverlap : true ( 이벤트들이 겹치게 하는 것이 가능하게 할 것인지)

	events: [ <!-- event data here  -->  ]
	   eventOverlap: function(stillEvent, movingEvent) {
	       return stillEvent.allDay && movingEvent.allDay;
	   }
eventConstraint (이벤트 제약조건 : 업무시간에만 이벤트를 넣을수 있게 할 수 있다.)
	{
	    start: '10:00', // a start time (10am in this example)
	    end: '18:00', // an end time (6pm in this example)

	    dow: [ 1, 2, 3, 4 ]
	    // days of week. an array of zero-based day of week integers (0=Sunday)
	    // (Monday-Thursday in this example)
	}
	
longPressDelay : 1000 (모바일, 태블릿 경우의 터치시간조정)

eventLongPressDelay : 1000 위와같다

eventDragStart: function( event, jsEvent, ui, view ) { }

eventDragStop : function( event, jsEvent, ui, view ) { }

eventDrop : function( event, delta, revertFunc, jsEvent, ui, view ) { }

eventResizeStart : function( event, jsEvent, ui, view ) { }

eventResizeStop : function( event, jsEvent, ui, view ) { }

eventResize : function( event, delta, revertFunc, jsEvent, ui, view ) { }


#### 선택
selectable : false (클릭 및 드래그로 여러 요일또는 시간대를 강조할수있다. 선택을 지우는 방법은 unselect,  그러니까 선택했을때 표시됨)

selectHelper : false (클릭 및 드래그 했을때 표시할지)

unselectAuto : true (페이지의 다른 곳을 클릭했을때 선택항목이지워짐, selectable이있어야함)

unselectCancle : '' (unselectAuto 옵션을 무시할 요소를 지정하는 방법입니다.)

selectOverlap  : true (이벤트가 있는기간과 겹치게 선택할수있을지 결정)

	selectOverlap: function(event) {
		return event.rendering === 'background';
	    }    (추가하면 겹치게 설정할수없다.)
	    
selectConstraint : event ID, "businessHours", obejct

selectAllow : function(selectInfo){start, end, resouceId} (처럼 선택할수있는방향을설정)

selectMinDistance  : 0 (클릭했을대 바로선택되면 0, 숫자가증가하면 선택하고 그만큼 끌어야 선택된다)

selectLongPressDelay : 1000 (터치장치일때 설정)

select : function( start, end, jsEvent, view, [ resource ] )

unselect : function( view, jsEvent )

select method : .fullCalendar( 'select', start, [ end ], [ resource ] )

unselect : .fullCalendar( 'unselect' )


#### utilites

var m = moment(); (순간의 시간을 저장한다.)

var noTime = $.fullCalendar.moment('2014-05-01');

var local = $.fullCalendar.moment('2014-05-01T12:00:00');

var utc = $.fullCalendar.moment.utc('2014-05-01T12:00:00');

var noTZ = $.fullCalendar.moment.parseZone('2014-05-01T12:00:00');

var calendar = $('#calendar').fullCalendar('getCalendar');

var m = calendar.moment();

#### 이벤트 정하기
id
String/Integer. Optional
지정한 이벤트를 식별한다.

title
String. Required.
이벤트요소의 텍스트

allDay
true or false. Optional.
이값을 사용하지않으면 allDayDefault가 사용됨

start
이벤트 시간날짜의 시작, 필수사항.

end
이벤트가 끝나는 날짜/시간, 선택적임
끝나는 시간을정할경우 종료는 그날의 24시이다

url
String. Optional.
url 링크를 걸수있다. eventClick을 하면 설정을 할 수 있다.

className
String/Array. Optional.
이벤트요소에 첨부되는 CSS클래스(배열)

editable
true or false. Optional.
편집가능옵션

startEditable
true or false. Optional.
단일이벤트에 대해선 마스터 eventDurationEditable 옵션을 대체

durationEditable
true or false. Optional.
이 단일 이벤트에 대한 마스터 eventDurationEditable 옵션을 대체합니다

resourceEditable
true or false. Optional.
이 단일 이벤트에 대한 마스터 eventResourceEditable 옵션을 대체합니다.

rendering
배경 이벤트같은 요소의 대체 렌더링을 허용

overlap
true or false. Optional.
이 단일 이벤트에 대한 마스터 eventOverlap 옵션을 대체합니다.
false의 경우,이 이벤트가 다른 이벤트에 대해서 드래그 또는 사이즈 변경되는 것을 방지합니다. 또한이 이벤트를 통해 다른 이벤트가 드래그 / 크기 조정되는 것을 방지합니다.

constraint
an event ID, "businessHours", object. Optional.
이 단일 이벤트에 대한 마스터 eventConstraint 옵션을 대체합니다.

source
이벤트 소스 개체. 자동으로 채워집니다.
이 이벤트가 발생한 이벤트 소스에 대한 참조입니다.

color
달력의 eventColor 옵션과 마찬가지로 이벤트의 배경색과 테두리 색상을 설정합니다.

backgroundColor
달력 전체의 eventBackgroundColor 옵션과 마찬가지로 이벤트의 배경색을 설정합니다.

borderColor
달력 전체의 eventBorderColor 옵션과 마찬가지로 이벤트의 테두리 색상을 설정합니다.

textColor
달력 전체의 eventTextColor 옵션과 마찬가지로 이벤트의 텍스트 색상을 설정합니다.


#### 이벤트를 표현하는 방법
1. 일반적인 JS로 저장하는 방법
 events: [
        {
            title: 'Event1',
            start: '2011-04-04'
        },
        {
            title: 'Event2',
            start: '2011-05-05'
        }
        // etc...
    ],
    color: 'yellow',   // an option!
    textColor: 'black' // an option!
2. form 에서 데이터를 주고받는 방법
events: function(start, end, callback) {
        // ...
    },
    color: 'yellow',   // an option!
    textColor: 'black' // an option!
3.JSON 으로 주고받는방법
    url: '/myfeed.php',
    color: 'yellow',   // an option!
    textColor: 'black' // an option!
4. 구글에서 주고받는 방법
    googleCalendarId: 'abcd1234@group.calendar.google.com',
    color: 'yellow',   // an option!
    textColor: 'black' // an option!

#### 이벤트를 JSON 으로 처리하는 방법 상세
$('#calendar').fullCalendar({
    events: '/myfeed.php'
});
이방법을 사용하면 JSON 파일을 GET 방식으로 가져오게 됩니다.
예시 : /myfeed.php?start=2013-12-01&end=2014-01-12&_=1386054751381

확장되는 방법으로는 좀전에 공부했던 방법
    eventSources: [

        // your event source
        {
            url: '/myfeed.php', // use the `url` property
            color: 'yellow',    // an option!
            textColor: 'black'  // an option!
        }

        // any other sources...

    ]
으로 처리하고

AJAX로 처리하는 방법
    eventSources: [

        // your event source
        {
            url: '/myfeed.php',
            type: 'POST',
            data: {
                custom_param1: 'something',
                custom_param2: 'somethingelse'
            },
            error: function() {
                alert('there was an error while fetching events!');
            },
            color: 'yellow',   // a non-ajax option
            textColor: 'black' // a non-ajax option
        }

        // any other sources...

    ]


캐싱을 막는 방법
cache: true


이벤트함수
function( start, end, timezone, callback ) { }
$('#calendar').fullCalendar({
    events: function(start, end, timezone, callback) {
        $.ajax({
            url: 'myxmlfeed.php',
            dataType: 'xml',
            data: {
                // our hypothetical feed requires UNIX timestamps
                start: start.unix(),
                end: end.unix()
            },
            success: function(doc) {
                var events = [];
                $(doc).find('event').each(function() {
                    events.push({
                        title: $(this).attr('title'),
                        start: $(this).attr('start') // will be parsed
                    });
                });
                callback(events);
            }
        });
    }
});

확장 폼
    eventSources: [

        // your event source
        {
            events: function(start, end, timezone, callback) {
                // ...
            },
            color: 'yellow',   // an option!
            textColor: 'black' // an option!
        }

        // any other sources...

    ]

두개이상의 JSON FEED를 가져오는 방법이다
 eventSources: [
        '/feed1.php',
        '/feed2.php'
    ]


allDayDefault : NONE (allDaydefault는 기본적으로 정의되어있지않고 allDay속성의 기본값을 설정한다. boolean)
startParam : 'start' (이 이름의 매개 변수는 각 JSON 이벤트 피드로 전송됩니다. 이는 가져 오는 간격의 시작을 설명합니다.)
endParam : 'end'
timezoneParam : 'timezone' (startParam, endParam 사이의 시간대와 반환된 이벤트의 원하는 시간대를 설명
lazyFetching : true (AJAX가 아닌 이벤트가져오기를 진행할 시간 빈도를 정함)
defaultTimedEventDuration : 02:00:00 (end 값을 지정하지않았을때 기본으로 지정될 시간)
defaultAllDayEventDuration : 1day (allDay를 눌렀을때 기본으로 지정되는 시간)
forceEventDuration : false (default가 지정되지 않았을때 발동하는 강제로 종료시키는 그런것)


eventDataTransform : function( eventData ) {}
loading : function( isLoading, view ) (이벤트가겨오기 시작/중지될때 트리거된다, 로딩인디게이터를 숨길때)
updateEvent : 이벤트 변경사항을 저장하고 달력에 렌더링
클릭후 이벤트를 업데이트하는 방법
eventClick: function(event, element) {

        event.title = "CLICKED!";

        $('#calendar').fullCalendar('updateEvent', event);

    }
updateEvents  : .fullCalendar( 'updateEvents', events )

clientEvents : fullcalender 메모리가 가지고 있는 이벤트를 검색
.fullCalendar( 'clientEvents' [, idOrFilter ] ) -> Array
idOrFilter 가 생략되면 모든 이벤트가 리턴됨


removeEvents : 달력에서 이벤트를 제거
.fullCalendar( 'removeEvents' [, idOrFilter ] )
idOrFilter가 true 일수도있다 이벤트가 하나일때
refetchEvents : .fullCalendar( 'refetchEvents' ) (모든 이벤트를 다시가져와 화면에 표시)
refetchEventSources : .fullCalendar( 'refetchEventSources', sources ) (하나이상의 특정이벤트를 다시가져와 표시)
addEventSource : .fullCalendar( 'addEventSource', source ) (동적으로 이벤트를 추가함)
removeEventSource : .fullCalendar( 'removeEventSource', source ) (동적으로 이벤트를 제거함)
removeEventSources : .fullCalendar( 'removeEventSources', optionalSourcesArray )
getEventSources : .fullCalendar( 'getEventSources' )
getEventSourceById  : .fullCalendar( 'getEventSourceById', id ) (특정 이벤트 소스객체를 검색)

#### 이벤트 렌더링
eventColor: '#378006' (색지정)
Background Events :
defaultDate: '2014-11-10',
    defaultView: 'agendaWeek',
    events: [
        {
            start: '2014-11-10T10:00:00',
            end: '2014-11-10T16:00:00',
            rendering: 'background'
        }
    ]
eventBorderColor : String
eventTextColor : String
nextDayThreshold : "09:00:00" (기본값임, 요일에 표시되는 시간 초과 이벤트에만 영향을줌)
eventOrder : 기본적으로 FullCalendar는 기간이 길고 시작 시간이 이전 인 이벤트가 다른 이벤트보다 먼저 정렬되도록 결정합니다. 그러나 이벤트의 시작 시간과 지속 시간은 항상 동일하므로 종일 이벤트의 경우 특히 그렇습니다. 기본적으로이 경우 이벤트는 제목별로 사전 순으로 정렬됩니다. eventOrder는이 동작을 재정의하는 기능을 제공합니다.
eventRenderWait  : Integer / null (이벤트를 렌더링하기전, 조작 후 대기시간)

eventRender : function( event, element, view ) { }
(이요소의 기본값으로 시간과 제목으로 정해져있고 색상과같은 CSS를 지정할 수 있다)
  events: [
        {
            title: 'My Event',
            start: '2010-01-01',
            description: 'This is a cool event'
        }
        // more events here
    ],
    eventRender: function(event, element) {
        element.qtip({
            content: event.description
        });
    }
eventAfterRender : function( event, element, view ) { }(이벤트가 최종 위치의 달력에 배치 된 후에 트리거된다.)
eventAfterAllRender : function( view ) { } (모든이벤트가 최종위치의 달력에 배치된 후에 트리거됨)
eventDestroy : function( event, element, view ) { } () (이벤트요소가 DOM에서 제거되기전에 호출)
(객체, JQ, 콜백)

renderEvent : .fullCalendar( 'renderEvent', event [, stick ] ) (달력에서 새이벤트를 렌더링함)
renderEvents : .fullCalendar( 'renderEvents', events [, stick ] )
rerenderEvents : .fullCalendar( 'rerenderEvents' ) (모든 이벤트를 리렌더링한다)








