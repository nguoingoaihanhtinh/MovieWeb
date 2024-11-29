import { Button } from 'antd';
import React from 'react';

const Filter = ({onFilterChange }) => {
  const movieTypes = [
    { value: "", label: "- Tất cả -" },
    { value: "phim-le", label: "Phim lẻ" },
    { value: "phim-bo", label: "Phim bộ" },
    { value: "hoat-hinh", label: "Phim hoạt hình" },
    { value: "tv-shows", label: "TV Shows" },
  ];

  const genres = [
    { value: '', label: '- Tất cả -' },
    { value: 'hanh-dong', label: 'Hành Động' },
    { value: 'tinh-cam', label: 'Tình Cảm' },
    { value: 'hai-huoc', label: 'Hài Hước' },
    { value: 'co-trang', label: 'Cổ Trang' },
    { value: 'tam-ly', label: 'Tâm Lý' },
    { value: 'hinh-su', label: 'Hình Sự' },
    { value: 'chien-tranh', label: 'Chiến Tranh' },
    { value: 'the-thao', label: 'Thể Thao' },
    { value: 'vo-thuat', label: 'Võ Thuật' },
    { value: 'vien-tuong', label: 'Viễn Tưởng' },
    { value: 'phieu-luu', label: 'Phiêu Lưu' },
    { value: 'khoa-hoc', label: 'Khoa Học' },
    { value: 'kinh-di', label: 'Kinh Dị' },
    { value: 'am-nhac', label: 'Âm Nhạc' },
    { value: 'than-thoai', label: 'Thần Thoại' },
    { value: 'tai-lieu', label: 'Tài Liệu' },
    { value: 'gia-dinh', label: 'Gia Đình' },
    { value: 'chinh-kich', label: 'Chính kịch' },
    { value: 'bi-an', label: 'Bí ẩn' },
    { value: 'hoc-duong', label: 'Học Đường' },
    { value: 'kinh-dien', label: 'Kinh Điển' },
    { value: 'phim-18', label: 'Phim 18+' },
  ];
  const years = [
    { value: '', label: '- Tất cả -' },
    { value: '2024', label: '2024' },
    { value: '2023', label: '2023' },
    { value: '2022', label: '2022' },
    { value: '2021', label: '2021' },
    { value: '2020', label: '2020' },
    { value: '2019', label: '2019' },
    { value: '2018', label: '2018' },
    { value: '2017', label: '2017' },
    { value: '2016', label: '2016' },
    { value: '2015', label: '2015' },
    { value: '2014', label: '2014' },
    { value: '2013', label: '2013' },
    { value: '2012', label: '2012' },
    { value: '2011', label: '2011' },
    { value: '2010', label: '2010' },
    { value: 'before-2010', label: 'Trước 2010' },
  ];
  

  const countries = [
    { value: '', label: '- Tất cả -' },
    { value: 'trung-quoc', label: 'Trung Quốc' },
    { value: 'han-quoc', label: 'Hàn Quốc' },
    { value: 'nhat-ban', label: 'Nhật Bản' },
    { value: 'thai-lan', label: 'Thái Lan' },
    { value: 'au-my', label: 'Âu Mỹ' },
    { value: 'dai-loan', label: 'Đài Loan' },
    { value: 'hong-kong', label: 'Hồng Kông' },
    { value: 'an-do', label: 'Ấn Độ' },
    { value: 'anh', label: 'Anh' },
    { value: 'phap', label: 'Pháp' },
    { value: 'canada', label: 'Canada' },
    { value: 'quoc-gia-khac', label: 'Quốc Gia Khác' },
    { value: 'duc', label: 'Đức' },
    { value: 'tay-ban-nha', label: 'Tây Ban Nha' },
    { value: 'tho-nhi-ky', label: 'Thổ Nhĩ Kỳ' },
    { value: 'ha-lan', label: 'Hà Lan' },
    { value: 'indonesia', label: 'Indonesia' },
    { value: 'nga', label: 'Nga' },
    { value: 'mexico', label: 'Mexico' },
    { value: 'ba-lan', label: 'Ba Lan' },
    { value: 'uc', label: 'Úc' },
    { value: 'thuy-dien', label: 'Thụy Điển' },
    { value: 'malaysia', label: 'Malaysia' },
    { value: 'brazil', label: 'Brazil' },
    { value: 'philippines', label: 'Philippines' },
    { value: 'bo-dao-nha', label: 'Bồ Đào Nha' },
    { value: 'y', label: 'Ý' },
    { value: 'dan-mach', label: 'Đan Mạch' },
    { value: 'uae', label: 'UAE' },
    { value: 'na-uy', label: 'Na Uy' },
    { value: 'thuy-si', label: 'Thụy Sĩ' },
    { value: 'chau-phi', label: 'Châu Phi' },
    { value: 'nam-phi', label: 'Nam Phi' },
    { value: 'ukraina', label: 'Ukraina' },
    { value: 'a-rap-xe-ut', label: 'Ả Rập Xê Út' },
    { value: 'bi', label: 'Bỉ' },
    { value: 'ireland', label: 'Ireland' },
    { value: 'colombia', label: 'Colombia' },
    { value: 'phan-lan', label: 'Phần Lan' },
    { value: 'viet-nam', label: 'Việt Nam' },
    { value: 'chile', label: 'Chile' },
    { value: 'hy-lap', label: 'Hy Lạp' },
    { value: 'nigeria', label: 'Nigeria' },
    { value: 'argentina', label: 'Argentina' },
    { value: 'singapore', label: 'Singapore' },
  ];
  

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    onFilterChange(name, value);
  };

  return (
    <div className="flex flex-wrap justify-center gap-4 max-w-[1200px] mb-8">
      <FilterSection
        label="Loại phim"
        options={movieTypes}
        name="movieType"
        onChange={handleFilterChange}
      />
      <FilterSection
        label="Thể loại"
        options={genres}
        name="genre"
        onChange={handleFilterChange}
      />
      <FilterSection
        label="Quốc gia"
        options={countries}
        name="country"
        onChange={handleFilterChange}
      />
       <FilterSection
        label="Năm"
        options={years}
        name="year"
        onChange={handleFilterChange}
      />
      {/* Add other sections (Year, Sort) similarly */}

    </div>
  );
};

const FilterSection = ({ label, options, name, onChange }) => (
  <div className="flex flex-col flex-grow">
    <label className="text-[15px] my-2 font-semibold">{label}</label>
    <select
      name={name}
      onChange={onChange}
      className="bg-[#29293e] text-slate-300 p-2 text-sm rounded-md transition-colors duration-300 hover:bg-[#25253e]"
    >
      {options.map((opt, index) => (
        <option key={index} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);

export default Filter;
