
	var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    mapOption = {
        center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
        level: 1 // 지도의 확대 레벨
    };
var tmp = new kakao.maps.LatLng();
var tmp2 = "";
var sel_pos = new kakao.maps.LatLng();
var sel_address = "";
// 지도를 생성합니다    
var map = new kakao.maps.Map(mapContainer, mapOption); 

// 주소-좌표 변환 객체를 생성합니다
var geocoder = new kakao.maps.services.Geocoder();

var marker = new kakao.maps.Marker(), // 클릭한 위치를 표시할 마커입니다
    infowindow = new kakao.maps.InfoWindow({zindex:1}); // 클릭한 위치에 대한 주소를 표시할 인포윈도우입니다

// 현재 지도 중심좌표로 주소를 검색해서 지도 좌측 상단에 표시합니다
searchAddrFromCoords(map.getCenter(), displayCenterInfo);

// 지도를 클릭했을 때 클릭 위치 좌표에 대한 주소정보를 표시하도록 이벤트를 등록합니다
kakao.maps.event.addListener(map, 'click', function(mouseEvent) {
    searchDetailAddrFromCoords(mouseEvent.latLng, function(result, status) {
        if (status === kakao.maps.services.Status.OK) {
            var detailAddr = !!result[0].road_address ? '<div>도로명주소 : ' + result[0].road_address.address_name + '</div>' : '';
            detailAddr += '<div>지번 주소 : ' + result[0].address.address_name + '</div>';
            tmp = new kakao.maps.LatLng(mouseEvent.latLng.getLat(),mouseEvent.latLng.getLng());
			tmp2= result[0].address.address_name;
            var content = '<div class="bAddr">' +
                            '<span class="title">법정동 주소정보</span>' + 
                            detailAddr +
							'<button type="button" onclick="select_pos()">거래장소로설정</button>'+
                        '</div>';

            // 마커를 클릭한 위치에 표시합니다 
            marker.setPosition(mouseEvent.latLng);
            marker.setMap(map);

            // 인포윈도우에 클릭한 위치에 대한 법정동 상세 주소정보를 표시합니다
            infowindow.setContent(content);
            infowindow.open(map, marker);
        }   
    });
});

// 중심 좌표나 확대 수준이 변경됐을 때 지도 중심 좌표에 대한 주소 정보를 표시하도록 이벤트를 등록합니다
kakao.maps.event.addListener(map, 'idle', function() {
    searchAddrFromCoords(map.getCenter(), displayCenterInfo);
});

function searchAddrFromCoords(coords, callback) {
    // 좌표로 행정동 주소 정보를 요청합니다
    geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);         
}

function searchDetailAddrFromCoords(coords, callback) {
    // 좌표로 법정동 상세 주소 정보를 요청합니다
    geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
}

// 지도 좌측상단에 지도 중심좌표에 대한 주소정보를 표출하는 함수입니다
function displayCenterInfo(result, status) {
    if (status === kakao.maps.services.Status.OK) {
        var infoDiv = document.getElementById('centerAddr');

        for(var i = 0; i < result.length; i++) {
            // 행정동의 region_type 값은 'H' 이므로
            if (result[i].region_type === 'H') {
                infoDiv.innerHTML = result[i].address_name;
                break;
            }
        }
    }    
}

	function locationLoadSuccess(pos){
		// 현재 위치 받아오기
		var currentPos = new kakao.maps.LatLng(pos.coords.latitude,pos.coords.longitude);
		// 지도 이동(기존 위치와 가깝다면 부드럽게 이동)
		map.panTo(currentPos);
	
		// 마커 생성
		var marker = new kakao.maps.Marker();
		marker.setPosition(currentPos);
        marker.setMap(map);
		kakao.maps.event.addListener(marker, 'click', function() {
			searchDetailAddrFromCoords(currentPos, function(result, status) {
        		if (status === kakao.maps.services.Status.OK) {
        		    var detailAddr = !!result[0].road_address ? '<div>도로명주소 : ' + result[0].road_address.address_name + '</div>' : '';
        		    detailAddr += '<div>지번 주소 : ' + result[0].address.address_name + '</div>';
        		    tmp = currentPos;
					tmp2= result[0].address.address_name;
        		    var content = '<div class="bAddr">' +
        		                    '<span class="title">법정동 주소정보</span>' +
        		                    detailAddr + 
									'<button type="button" onclick="select_pos()">거래장소로설정</button>'+
        		                '</div>';

        		    // 마커를 클릭한 위치에 표시합니다 
        		    

        		    // 인포윈도우에 클릭한 위치에 대한 법정동 상세 주소정보를 표시합니다
        		    infowindow.setContent(content);
        		    infowindow.open(map, marker);
        		}   
    		});
		});
	
		// 기존에 마커가 있다면 제거
		marker.setMap(null);
		marker.setMap(map);
	};

	function locationLoadError(pos){
		alert('위치 정보를 가져오는데 실패했습니다.');
	};
	
	// 위치 가져오기 버튼 클릭시
	function getCurrentPosBtn(){
		navigator.geolocation.getCurrentPosition(locationLoadSuccess,locationLoadError);
	};

	function getSearchPos(){
		var ps = new kakao.maps.services.Places();
		var keyword=document.getElementById("search_pos").value; 
		ps.keywordSearch(keyword, placesSearchCB);
	};

	function select_pos(){
		sel_pos = tmp;
		sel_address = tmp2;
		document.getElementById("sel_latitude").value=sel_pos.getLat();
		document.getElementById("sel_longitude").value=sel_pos.getLng();
		document.getElementById("sel_address").value=sel_address;
		alert("거래장소가 설정됐습니다.")	
	};


	
	function placesSearchCB (data, status, pagination) {
    	if (status === kakao.maps.services.Status.OK) {

    	    // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
    	    // LatLngBounds 객체에 좌표를 추가합니다
    	    var bounds = new kakao.maps.LatLngBounds();

    	    for (var i=0; i<data.length; i++) {
    	        displayMarker(data[i]);    
    	        bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
    	    }       

    	    // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
    	    map.setBounds(bounds);
    	}
	// 지도에 마커를 표시하는 함수입니다

	function displayMarker(place) {
		
    	// 마커를 생성하고 지도에 표시합니다
    	var marker = new kakao.maps.Marker({
    	    map: map,
    	    position: new kakao.maps.LatLng(place.y, place.x) 
    	});


    	// 마커에 클릭이벤트를 등록합니다
    	kakao.maps.event.addListener(marker, 'click', function() {
    	    searchDetailAddrFromCoords(new kakao.maps.LatLng(place.y, place.x), function(result, status) {
        		if (status === kakao.maps.services.Status.OK) {
        		    var detailAddr = !!result[0].road_address ? '<div>도로명주소 : ' + result[0].road_address.address_name + '</div>' : '';
        		    detailAddr += '<div>지번 주소 : ' + result[0].address.address_name + '</div>';
        		    tmp = new kakao.maps.LatLng(place.y, place.x);
					tmp2= result[0].address.address_name;
        		    var content = '<div class="bAddr">' +
        		                    '<span class="title">법정동 주소정보</span>' +
        		                    detailAddr +
									place.place_name+
									'<br>'+
									'<button type="button" onclick="select_pos()">거래장소로설정</button>'+
        		                '</div>';

        		    // 인포윈도우에 클릭한 위치에 대한 법정동 상세 주소정보를 표시합니다
        		    infowindow.setContent(content);
        		    infowindow.open(map, marker);
        		}   
    		});
    	});
	}
}
