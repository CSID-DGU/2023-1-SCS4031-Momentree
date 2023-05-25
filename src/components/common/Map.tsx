import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { IRecordedPlace } from 'types/post';
import PlaceModal from 'components/post/PlaceModal';

interface IMapOptions {
  center: any;
  level: number;
}
interface MapProps {
  places: IRecordedPlace[];
}

const Map = ({ places }: MapProps) => {
  const { kakao } = window;
  const [isOpenPlace, setIsOpenPlace] = useState<boolean>(false);
  const [clickedMarkerIdx, setClickedMarkerIdx] = useState<number>(0); // 지도에서 클릭한 마커의 인덱스
  const [markers, setMarkers] = useState<any>([]);
  const [map, setMap] = useState<any>(null);

  // 지도를 불러옵니다
  useEffect(() => {
    const container = document.getElementById('map');
    if (places.length === 0) {
      // 선택한 장소가 없을 때, 지도에 표시할 default 장소
      const options: IMapOptions = {
        center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표
        level: 4, //지도의 레벨(확대, 축소 정도)
      };
      const map = new kakao.maps.Map(container, options);
      setMap(map);
    } else {
      const options: IMapOptions = {
        center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표
        level: 4, //지도의 레벨(확대, 축소 정도)
      };
      const map = new kakao.maps.Map(container, options);
      addMarker(map);
    }
  }, []);

  useEffect(() => {
    // 기존 마커 초기화
    markers.forEach((marker: any) => marker.setMap(null));
    setMarkers([]);
    // 새 마커 추가
    if (places.length !== 0 && map) {
      addMarker(map);
    }
  }, [places]);

  const addMarker = (newMap: any) => {
    // 마커 이미지
    const imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
      imageSize = new kakao.maps.Size(36, 37); // 마커 이미지의 크기

    // 지도 범위 재설정 위한 바운더리 객체
    const bounds = new kakao.maps.LatLngBounds();
    for (let i = 0; i < places.length; i++) {
      /* 1. 위치 객체 생성 */
      const placePosition = new kakao.maps.LatLng(places[i].addressY, places[i].addressX);

      /* 2. 해당 위치의 마커 생성 */
      // 마커 생성
      const imgOptions = {
          spriteSize: new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
          spriteOrigin: new kakao.maps.Point(0, i * 46 + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
          offset: new kakao.maps.Point(13, 37), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
        },
        markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions);
      const marker = new kakao.maps.Marker({
        position: placePosition, // 마커의 위치
        image: markerImage,
        map: newMap,
      });
      // 마커에 클릭 이벤트를 등록합니다
      kakao.maps.event.addListener(marker, 'click', function () {
        setIsOpenPlace(true);
        setClickedMarkerIdx(i);
      });
      setMarkers((prevArr: any) => [...prevArr, marker]);

      /* 3. 지도 범위 재설정 */
      bounds.extend(new kakao.maps.LatLng(places[i].addressY, places[i].addressX));
    }
    newMap.setBounds(bounds);
    setMap(newMap);
  };

  return (
    <MapLayout>
      <MapBox id="map" />
      {isOpenPlace ? <PlaceModal placeIdx={clickedMarkerIdx} handleModalClose={() => setIsOpenPlace(false)} /> : null}
    </MapLayout>
  );
};
export default Map;

const MapLayout = styled.div`
  padding: 1.5rem 0;
`;
const MapBox = styled.div`
  width: 100%;
  height: 20rem;
  border-radius: 1.2rem;
`;
