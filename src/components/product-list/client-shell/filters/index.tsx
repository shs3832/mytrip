import {
  UserOutlined,
  ApartmentOutlined,
  BankOutlined,
  FlagOutlined,
  CustomerServiceOutlined,
  FireOutlined,
  MedicineBoxOutlined,
  HomeOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
export default function ProductListFilters() {
  return (
    <section className="mb-10 flex items-center justify-between">
      <button className="flex flex-col items-center gap-2 text-gray-800">
        <UserOutlined className="text-3xl" />
        <span className="text-sm font-medium">1인 전용</span>
      </button>

      <button className="flex flex-col items-center gap-2 text-gray-800">
        <ApartmentOutlined className="text-3xl" />
        <span className="text-sm font-medium">아파트</span>
      </button>

      <button className="flex flex-col items-center gap-2 text-gray-800">
        <BankOutlined className="text-3xl" />
        <span className="text-sm font-medium">호텔</span>
      </button>

      <button className="flex flex-col items-center gap-2 text-gray-800">
        <FlagOutlined className="text-3xl" />
        <span className="text-sm font-medium">캠핑</span>
      </button>

      <button className="flex flex-col items-center gap-2 text-gray-800">
        <CustomerServiceOutlined className="text-3xl" />
        <span className="text-sm font-medium">룸 서비스 가능</span>
      </button>

      <button className="flex flex-col items-center gap-2 text-gray-800">
        <FireOutlined className="text-3xl" />
        <span className="text-sm font-medium">불멍</span>
      </button>

      <button className="flex flex-col items-center gap-2 text-gray-800">
        <MedicineBoxOutlined className="text-3xl" />
        <span className="text-sm font-medium">반신욕&스파</span>
      </button>

      <button className="flex flex-col items-center gap-2 text-gray-800">
        <HomeOutlined className="text-3xl" />
        <span className="text-sm font-medium">바다 위 숙소</span>
      </button>

      <button className="flex flex-col items-center gap-2 text-gray-800">
        <AppstoreOutlined className="text-3xl" />
        <span className="text-sm font-medium">플랜테리어</span>
      </button>
    </section>
  );
}
