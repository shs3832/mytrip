import {
  UserOutlined,
  ApartmentOutlined,
  BankOutlined,
  FlagOutlined,
  FireOutlined,
  MedicineBoxOutlined,
  HomeOutlined,
  CustomerServiceOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
export const filters = [
  { label: "1인 전용", value: "1인 전용", Icon: UserOutlined },
  { label: "아파트", value: "아파트", Icon: ApartmentOutlined },
  { label: "호텔", value: "호텔", Icon: BankOutlined },
  { label: "캠핑", value: "캠핑", Icon: FlagOutlined },
  {
    label: "룸 서비스 가능",
    value: "룸 서비스 가능",
    Icon: CustomerServiceOutlined,
  },
  { label: "불멍", value: "불멍", Icon: FireOutlined },
  { label: "반신욕&스파", value: "반신욕&스파", Icon: MedicineBoxOutlined },
  { label: "바다 위 숙소", value: "바다 위 숙소", Icon: HomeOutlined },
  { label: "플랜테리어", value: "플랜테리어", Icon: AppstoreOutlined },
];
