import { useEffect, useState, useRef } from 'react';
import {
  callApiGetDistrict,
  callApiGetProvincial,
  callApiGetWard,
} from '@/api/managerOrder';

import HANDLE_ERROR from '@/utils/handleError';

export default function useAddress({ defaultValue }) {
  const [listProvincial, setListProvincial] = useState([]);
  const [listDistrict, setListDistrict] = useState([]);
  const [listWard, setListWard] = useState([]);
  const [address, setAddress] = useState({
    city: defaultValue?.city,
    district: defaultValue?.district,
    wards: defaultValue?.wards,
  });

  const { city, district } = address;

  // minimize call api in first render component
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (!isFirstRender?.current) {
      handleGetDistrict(city);
    }
  }, [listProvincial]);

  useEffect(() => {
    if (!isFirstRender?.current) {
      handleGetWards(district);
    }
  }, [listDistrict]);

  useEffect(() => {
    if (!isFirstRender?.current) {
      handleGetDistrict(city);
    }
  }, [city]);

  useEffect(() => {
    if (!isFirstRender?.current) {
      handleGetWards(district);
    }
  }, [district]);

  useEffect(() => {
    handleGetProvincial();
    isFirstRender.current = false;
  }, []);

  const handleGetProvincial = async () => {
    try {
      const results = await callApiGetProvincial();
      setListProvincial(results?.data || []);
      return results?.data || [];
    } catch (error) {
      return HANDLE_ERROR(error);
    }
  };

  const handleGetDistrict = async (newCity) => {
    const provincialId = listProvincial?.find(
      (item) => item?.name === newCity,
    )?.id;
    try {
      const results = await callApiGetDistrict({ provincialId });
      return setListDistrict(results?.data || []);
    } catch (error) {
      return HANDLE_ERROR(error);
    }
  };

  const handleGetWards = async (newDistrict) => {
    const districtId = listDistrict?.find(
      (item) => item?.nameDistrict === newDistrict,
    )?.id;
    try {
      const results = await callApiGetWard({ districtId });
      return setListWard(results?.data || []);
    } catch (error) {
      return HANDLE_ERROR(error);
    }
  };

  const onChangeCity = (value) => setAddress({ ...address, city: value });

  const onChangeDistrict = (value) =>
    setAddress({ ...address, district: value });

  return [
    listWard,
    listProvincial,
    listDistrict,
    onChangeCity,
    onChangeDistrict,
  ];
}
