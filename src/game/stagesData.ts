import { StageData } from './riverLogic';

export const HISTORICAL_STAGES: StageData[] = [
  {
    id: 1,
    key: 'van_lang',
    title: 'Bình Minh Văn Lang',
    period: 'Thời đại các Vua Hùng (Khoảng thế kỷ VII TCN)',
    distance: 800,
    theme: {
      skyTop: '#1E3A8A', // Deep dawn blue
      skyBottom: '#FDE68A', // Warm golden dawn glow
      riverColor: '#1E40AF',
      riverWave: '#60A5FA',
      mountainFar: '#1E3A5F',
      mountainMid: '#166534',
      bankFlora: '#15803D',
      landmarkIcon: 'bronze-drum',
    },
    story: {
      headline: 'Buổi Đầu Dựng Nước – Nền Văn Minh Sông Hồng Rực Rỡ',
      timeframe: 'Thế kỷ VII TCN – Thế kỷ III TCN',
      paragraphs: [
        'Bên dòng sông Hồng cuộn đỏ phù sa, nhà nước đầu tiên của dân tộc mang tên Văn Lang đã ra đời dưới sự trị vì của các Vua Hùng.',
        'Người dân Lạc Việt đúc trống đồng, trồng lúa nước, chế tạo lưỡi cày đồng, cùng nhau đắp đê ngăn lũ và dựng nên những nếp nhà sàn thanh bình ven sông.',
        'Tiếng trống đồng Đông Sơn rộn rã không chỉ là thanh âm của lễ hội mùa vàng, mà còn là linh hồn của sự đoàn kết và cội nguồn bất diệt của con cháu Lạc Hồng.'
      ],
      historicalMeaning: 'Thời đại Hùng Vương đặt nền móng thiêng liêng cho sự hình thành dân tộc, bồi đắp truyền thống yêu nước, đoàn kết và tinh thần hướng về cội nguồn sâu sắc của người Việt Nam.',
      quote: '"Dù ai đi ngược về xuôi / Nhớ ngày Giỗ Tổ mùng mười tháng ba"'
    },
    quiz: {
      question: 'Nhà nước Văn Lang gắn liền với thời đại của những vị vua nào?',
      options: [
        'Các vua Hùng',
        'Các vua triều Lý',
        'Các vua triều Trần',
        'Các vua triều Nguyễn'
      ],
      correctIndex: 0,
      hint: 'Hãy nhớ đến truyền thuyết Lạc Long Quân - Âu Cơ và ngày Giỗ Tổ mùng mười tháng ba.',
      explanation: 'Chính xác! Nhà nước Văn Lang là nhà nước đầu tiên trong lịch sử Việt Nam do các Vua Hùng trị vì, đặt kinh đô tại Phong Châu (Phú Thọ ngày nay).'
    },
    badge: {
      id: 'badge-van-lang',
      name: 'Trống Đồng Đông Sơn',
      subtitle: 'Ký ức cội nguồn ngàn năm',
      iconSvg: 'drum',
      description: 'Biểu tượng của nền văn minh sông Hồng và cội nguồn dựng nước Lạc Hồng.'
    },
    imageUrl: '/src/assets/images/stage_van_lang_1794321319762.jpg'
  },
  {
    id: 2,
    key: 'hai_ba_trung',
    title: 'Ngọn Lửa Hai Bà Trưng',
    period: 'Năm 40 Sau Công Nguyên (Mùa Xuân)',
    distance: 1600,
    theme: {
      skyTop: '#0F766E', // Emerald jungle teal
      skyBottom: '#FEF08A', // Flare of rebellion gold
      riverColor: '#115E59',
      riverWave: '#2DD4BF',
      mountainFar: '#042F2E',
      mountainMid: '#065F46',
      bankFlora: '#047857',
      landmarkIcon: 'rebel-flag',
    },
    story: {
      headline: 'Lời Thề Sông Hát – Khúc Ca Tráng Kiệt Của Nữ Anh Hùng',
      timeframe: 'Mùa xuân năm 40 Sau Công Nguyên',
      paragraphs: [
        'Trước ách đô hộ tàn bạo của nhà Đông Hán, mùa xuân năm 40, tại cửa sông Hát (Hát Môn), hai chị em Trưng Trắc và Trưng Nhị đã phất cờ khởi nghĩa.',
        '"Một xin rửa sạch nước thù / Hai xin dựng lại nghiệp xưa họ Hùng". Tiếng cồng chiêng vang dậy khắp Mê Linh, hàng vạn nghĩa quân cùng các nữ tướng cưỡi voi xông pha trận mạc.',
        'Chỉ trong một thời gian ngắn, 65 huyện thành được giải phóng, ách đô hộ bị quét sạch, nền độc lập tự chủ được khôi phục.'
      ],
      historicalMeaning: 'Khởi nghĩa Hai Bà Trưng là cuộc khởi nghĩa đầu tiên của nhân dân ta chống lại ách đô hộ phong kiến phương Bắc, khẳng định khí phách quật cường và tinh thần bất khuất của phụ nữ Việt Nam.',
      quote: '"Đô kỳ đóng cõi Mê Linh / Chưng Trắc đối với Chưng Nhị xưng vương"'
    },
    quiz: {
      question: 'Cuộc khởi nghĩa Hai Bà Trưng bùng nổ vào năm nào?',
      options: [
        'Năm 40',
        'Năm 938',
        'Năm 1010',
        'Năm 1288'
      ],
      correctIndex: 0,
      hint: 'Cuộc khởi nghĩa diễn ra vào đầu thế kỷ thứ I SCN, đúng vào mùa xuân năm bốn mươi.',
      explanation: 'Chính xác! Mùa xuân năm 40 SCN, Hai Bà Trưng phất cờ khởi nghĩa tại Hát Môn (Hà Nội ngày nay) và nhanh chóng giành thắng lợi lẫy lừng.'
    },
    badge: {
      id: 'badge-hai-ba-trung',
      name: 'Ngọn Lửa Mê Linh',
      subtitle: 'Khí phách ngàn thu bất khuất',
      iconSvg: 'flame',
      description: 'Ngọn đuốc quật khởi mở đầu trang sử đấu tranh chống Bắc thuộc.'
    },
    imageUrl: '/src/assets/images/stage_hai_ba_trung_1794321320774.jpg'
  },
  {
    id: 3,
    key: 'bach_dang',
    title: 'Hào Khí Bạch Đằng',
    period: 'Năm 938 (Mùa Đông)',
    distance: 2400,
    theme: {
      skyTop: '#1E293B', // Dramatic storm cloud grey-blue
      skyBottom: '#93C5FD', // Tidal silver light
      riverColor: '#0F172A',
      riverWave: '#38BDF8',
      mountainFar: '#0F172A',
      mountainMid: '#1E293B',
      bankFlora: '#334155',
      landmarkIcon: 'wooden-stakes',
    },
    story: {
      headline: 'Đóng Cọc Gỗ Ngăn Thuyền Giặc – Mở Ra Kỷ Nguyên Độc Lập Lâu Dài',
      timeframe: 'Cuối năm 938',
      paragraphs: [
        'Mùa đông năm 938, thủy quân Nam Hán hung hãn kéo vào cửa sông Bạch Đằng. Người anh hùng Ngô Quyền đã sáng tạo trận địa cọc gỗ bịt sắt cắm ngầm dưới đáy sông.',
        'Khi thủy triều dâng, thuyền ta vờ thua nhử giặc vào sâu. Khi thủy triều rút xuống cực nhanh, đoàn thuyền chiến khổng lồ của giặc đâm vào cọc gỗ nhọn hoắt vỡ tan tành.',
        'Tướng giặc Lưu Hoằng Tháo đền tội, sông Bạch Đằng nhuốm đỏ hào khí muôn đời của dân tộc quật cường.'
      ],
      historicalMeaning: 'Chiến thắng Bạch Đằng năm 938 đã chấm dứt hoàn toàn hơn 1000 năm Bắc thuộc, mở ra kỷ nguyên độc lập tự chủ lâu dài và vẻ vang cho dân tộc Việt Nam.',
      quote: '"Tiền Ngô Vương có thể lấy quân mới nhóm họp của đất Việt ta mà phá được trăm vạn quân của Lưu Hoằng Tháo..." - Lê Văn Hưu'
    },
    quiz: {
      question: 'Ai là người lãnh đạo quân dân ta giành chiến thắng Bạch Đằng năm 938?',
      options: [
        'Ngô Quyền',
        'Trần Hưng Đạo',
        'Lý Thường Kiệt',
        'Lê Lợi'
      ],
      correctIndex: 0,
      hint: 'Vị anh hùng quê ở Đường Lâm (Sơn Tây), người dùng mưu cọc gỗ bịt sắt diệt quân Nam Hán.',
      explanation: 'Chính xác! Ngô Quyền chính là người chỉ huy trận địa cọc gỗ lịch sử trên sông Bạch Đằng năm 938, mở ra thời kỳ độc lập tự chủ lâu dài.'
    },
    badge: {
      id: 'badge-bach-dang',
      name: 'Cọc Gỗ Bạch Đằng',
      subtitle: 'Trận địa sóng gió ngút trời',
      iconSvg: 'stake',
      description: 'Biểu trưng của trí tuệ quân sự và mốc son chấm dứt nghìn năm Bắc thuộc.'
    },
    imageUrl: '/src/assets/images/stage_bach_dang_1794321320839.jpg'
  },
  {
    id: 4,
    key: 'dien_bien',
    title: 'Bản Hùng Ca Điện Biên',
    period: 'Năm 1954 (56 Ngày Đêm)',
    distance: 3200,
    theme: {
      skyTop: '#831843', // Heroic crimson twilight
      skyBottom: '#FDE047', // Radiant gold dawn
      riverColor: '#701A75',
      riverWave: '#F472B6',
      mountainFar: '#4C0519',
      mountainMid: '#831843',
      bankFlora: '#15803D',
      landmarkIcon: 'victory-flag',
    },
    story: {
      headline: 'Lừng Lẫy Năm Châu, Chấn Động Địa Cầu',
      timeframe: '13/3/1954 – 07/5/1954 (56 ngày đêm khoét núi ngủ hầm)',
      paragraphs: [
        'Giữa lòng chảo Mường Thanh quanh năm mây phủ, thực dân Pháp xây dựng tập đoàn cứ điểm quân sự kiên cố nhất Đông Dương.',
        'Dưới sự lãnh đạo tài tình của Đại tướng Võ Nguyên Giáp, quân và dân ta đã "khoét núi, ngủ hầm, mưa dầm, cơm vắt", kéo những cỗ pháo nặng hàng tấn qua đèo cao dốc thẳm.',
        'Chiều ngày 7/5/1954, lá cờ "Quyết chiến - Quyết thắng" tung bay trên nóc hầm tướng De Castries, báo hiệu thắng lợi trọn vẹn của chiến dịch lịch sử.'
      ],
      historicalMeaning: 'Chiến thắng Điện Biên Phủ đập tan ý chí xâm lược của thực dân, bảo vệ vững chắc thành quả cách mạng và trở thành nguồn cổ vũ lớn lao cho các dân tộc bị áp bức trên toàn thế giới.',
      quote: '"56 ngày đêm khoét núi, ngủ hầm, mưa dầm, cơm vắt / Máu trộn bùn non / Gan không núng / Chí không mòn!" - Tố Hữu'
    },
    quiz: {
      question: 'Chiến thắng Điện Biên Phủ diễn ra vào năm nào?',
      options: [
        'Năm 1954',
        'Năm 1945',
        'Năm 1975',
        'Năm 1968'
      ],
      correctIndex: 0,
      hint: 'Chiến dịch kết thúc vẻ vang vào ngày 7 tháng 5, mở đường cho Hiệp định Giơ-ne-vơ cùng năm.',
      explanation: 'Chính xác! Chiến thắng Điện Biên Phủ diễn ra năm 1954 sau 56 ngày đêm chiến đấu kiên cường, "lừng lẫy năm châu, chấn động địa cầu".'
    },
    badge: {
      id: 'badge-dien-bien',
      name: 'Ngôi Sao Điện Biên',
      subtitle: 'Quyết chiến quyết thắng',
      iconSvg: 'star',
      description: 'Lá cờ đỏ sao vàng tung bay trên nóc hầm De Castries ngày 7/5/1954.'
    },
    imageUrl: '/src/assets/images/stage_dien_bien_1794321322280.jpg'
  },
  {
    id: 5,
    key: 'thong_nhat',
    title: 'Bến Bờ Thống Nhất',
    period: 'Ngày 30 Tháng 4 Năm 1975',
    distance: 4000,
    theme: {
      skyTop: '#C2410C', // Sunset crimson-gold
      skyBottom: '#FEF08A', // Warm golden peace
      riverColor: '#0369A1',
      riverWave: '#38BDF8',
      mountainFar: '#334155',
      mountainMid: '#0284C7',
      bankFlora: '#16A34A',
      landmarkIcon: 'peace-dove',
    },
    story: {
      headline: 'Đất Nước Trọn Niềm Vui – Non Sông Liền Một Dải',
      timeframe: 'Mùa xuân năm 1975 (Chiến dịch Hồ Chí Minh lịch sử)',
      paragraphs: [
        'Sau hơn hai mươi năm chia cắt với biết bao gian lao và hy sinh, cuộc Tổng tiến công và nổi dậy mùa Xuân năm 1975 đã đi đến thắng lợi cuối cùng.',
        'Đúng 11 giờ 30 phút ngày 30/4/1975, xe tăng của quân giải phóng húc đổ cánh cổng Dinh Độc Lập, lá cờ cách mạng tung bay trên nóc tòa nhà.',
        'Hàng triệu con tim vỡ òa trong niềm vui thống nhất: Bắc - Nam sum họp một nhà, giang sơn thu về một mối, mở ra kỷ nguyên hòa bình và độc lập tự do.'
      ],
      historicalMeaning: 'Ngày 30/4/1975 là mốc son chói lọi kết thúc 30 năm chiến tranh giải phóng dân tộc, hoàn thành sự nghiệp thống nhất đất nước và đưa non sông Việt Nam bước vào kỷ nguyên xây dựng hòa bình.',
      quote: '"Như có Bác Hồ trong ngày vui đại thắng / Lời Bác nay đã thành chiến thắng huy hoàng"'
    },
    quiz: {
      question: 'Ngày 30/4/1975 gắn với sự kiện lịch sử trọng đại nào?',
      options: [
        'Giải phóng miền Nam, thống nhất đất nước',
        'Cách mạng Tháng Tám thành công',
        'Chiến dịch Điện Biên Phủ trên không',
        'Ký kết Hiệp định Paris'
      ],
      correctIndex: 0,
      hint: 'Sự kiện xe tăng húc đổ cánh cổng Dinh Độc Lập, non sông Bắc - Nam sum họp một nhà.',
      explanation: 'Chính xác! Trưa ngày 30/4/1975, chiến dịch Hồ Chí Minh toàn thắng, miền Nam hoàn toàn được giải phóng, đất nước thống nhất non sông liền một dải.'
    },
    badge: {
      id: 'badge-thong-nhat',
      name: 'Hòa Bình Thống Nhất',
      subtitle: 'Non sông liền một dải',
      iconSvg: 'peace',
      description: 'Biểu trưng của khát vọng hòa bình và ngày vui đại thắng 30/4/1975.'
    },
    imageUrl: '/src/assets/images/stage_thong_nhat_1794321321724.jpg'
  }
];
