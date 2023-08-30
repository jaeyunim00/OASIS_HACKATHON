const parks = [
  {
    img: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzAzMjNfNTIg%2FMDAxNjc5NDk4ODA0Njg2.r5NDVcbQv_VqgHT5w28nnyvvaTgN8l3pS9027-kLzYQg.DU8xP__oJHDF1NQuxV8sMdE8gVtygrNvBnJb2e-X5EEg.JPEG.happy0463%2FIMG_6135.JPG",
    name: "푸른길공원",
    address: "광주 동구 계림동 730",
    latitude: 35.1274805,
    longitude: 126.89652,
    rate: 4.2,
    type: "근린공원",
    detail:
      "https://map.naver.com/v5/search/%EA%B3%B5%EC%9B%90/place/16291431?c=13.76,0,0,0,dh",
    facility: [""],
  },
  {
    img: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjExMTFfOSAg%2FMDAxNjY4MDk1NzA4OTc3.NoHQawcvHZXFSGISH4ZSiAXgrKTqTQRAf5oanfMa8Pwg.3-eoL382ilAIZoCPvQwEUm79pmqIOGF0OcRmdMYAHmMg.JPEG.hmsduri%2F20221106%25A3%25DF162042.jpg",
    name: "봉선공원",
    address: "광주 남구 봉선중앙로 102",
    latitude: 35.1303684,
    longitude: 126.912184,
    rate: 4.1,
    type: "근린공원",
    detail:
      "https://map.naver.com/v5/search/%EA%B3%B5%EC%9B%90/place/16296883?c=13.76,0,0,0,dh",
  },
  {
    img: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzA3MjJfMjYy%2FMDAxNjg5OTc4MjIwNzIw.FffTmAmjQyFJKGtJiHbvAmUES2M5c5R45xFhwtPrzacg.dNJl5GPPdGtOSua8XMmDV3SRFxbZQD70MRYedjszCsIg.JPEG.sara2520%2F20230722%25A3%25DF061556.jpg",
    name: "유안근린공원",
    address: "광주 남구 봉선로 195",
    latitude: 35.1234671,
    longitude: 126.916613,
    rate: 2.5,
    type: "근린공원",
    detail:
      "https://map.naver.com/v5/entry/place/16297111?entry=plt&c=15,0,0,0,dh",
  },
  {
    img: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjA0MDRfMTIw%2FMDAxNjQ5MDE1NjM2NzA0.Fz3NNA39HvkpQCtCryFpHueU1D0Pm442fvpkaxAhaDkg.llEkxp8lwDRDkOvDROBlZAD1U844eZ_2O6XR2jTc_gEg.JPEG.marinblue666%2FIMG_2666.JPG",
    name: "전평제근린공원",
    address: "광주 서구 매월동 519-1",
    latitude: 35.1155491,
    longitude: 126.848225,
    rate: null,
    type: "근린공원",
    detail:
      "https://map.naver.com/v5/search/%EA%B4%91%EC%A3%BC%20%EA%B3%B5%EC%9B%90/place/16283054?c=13.04,0,0,0,dh",
  },
  {
    img: "https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20150831_91%2F1441010475163pRCCp_JPEG%2F126172525026627_0.jpg",
    name: "518자유공원",
    address: "광주 서구 상무평화로 13",
    latitude: 35.1487991,
    longitude: 126.840426,
    rate: null,
    type: "도시,테마공원",
    detail:
      "https://map.naver.com/p/search/5.18%EC%9E%90%EC%9C%A0%EA%B3%B5%EC%9B%90/place/19699817?c=15.00,0,0,0,dh&isCorrectAnswer=true",
  },
  {
    img: "https://postfiles.pstatic.net/MjAyMTA0MTRfMjgx/MDAxNjE4Mzg2OTg5OTE1.KdvCluP6pzjQjvhsib1jJhhi2e5tZkdwUQ5gvx86wEkg.zfLlAz3VsbAuRdFU1mucRbU4mjbNnKuRxRxS_qrChZ0g.JPEG.s1930911/20210414%EF%BC%BF134521.jpg?type=w580",
    name: "치평어린이공원",
    address: "광주 서구 상무공원로 58",
    latitude: 35.1499033,
    longitude: 126.843869,
    rate: null,
    type: "공원",
    detail:
      "https://map.naver.com/p/search/%EC%B9%98%ED%8F%89%EC%96%B4%EB%A6%B0%EC%9D%B4%EA%B3%B5%EC%9B%90/place/1993780010?c=15.00,0,0,0,dh&placePath=%3Fentry%253Dbmp",
  },
  {
    img: "https://postfiles.pstatic.net/MjAyMjA2MTVfMjAx/MDAxNjU1Mjg4MjUxNDI4.kQDkO8H0VtCkqg0ifJNooNgghAnGsUDTb2926l3vNmUg.NytZ_lHdmKVhJ7yGhHUFLhGkXFrR9jspc7cyU1CyoTog.JPEG.huhajung/20220614_145024.jpg?type=w966",
    name: "해오리어린이공원",
    address: "광주 서구 마륵로 115",
    latitude: 35.1464419,
    longitude: 126.843711,
    rate: 4.2,
    type: "공원",
    detail:
      "https://map.naver.com/p/search/%ED%95%B4%EC%98%A4%EB%A6%AC%EC%96%B4%EB%A6%B0%EC%9D%B4%EA%B3%B5%EC%9B%90/place/19611423?c=15.00,0,0,0,dh&placePath=%3Fentry%253Dbmp",
  },
  {
    img: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAxNzExMDNfMjIg%2FMDAxNTA5Njk1MjQ0NjE1.piIunyZXM8O10c6Y_7HjU-GmqpCMJ1CdQeT4Ds5nGr4g.OCEVp24nu6U2wrwmYkFN0x7Gh0PrfsqlN9irVTrG4LUg.JPEG.kimyd4100%2FDSC_4508.jpg%23900x599",
    name: "상무시민공원",
    address: "광주 서구 상무공원로 101 5.18시민공원",
    latitude: 35.1534238,
    longitude: 126.840954,
    rate: 4.33,
    type: "시민공원",
    detail:
      "https://map.naver.com/p/search/%EC%83%81%EB%AC%B4%EC%8B%9C%EB%AF%BC%EA%B3%B5%EC%9B%90/place/16055211?c=15.00,0,0,0,dh&placePath=%3Fentry%253Dbmp",
  },
  {
    img: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzA4MDFfMTEy%2FMDAxNjkwODU5Mjk0Njcy.ByCGxrpytAc7PLPhR3tk3IhC5fvTfx_w6KAuRUmkQksg.PObofQAS1Y2AiGAKhBnSqM5-g0XN1hp0SlhPlWZQpdog.JPEG.ddung78%2F1690804711173.jpg",
    name: "상무조각공원",
    address: "광주 서구 상무시민로 3 세계광엑스포주제관",
    latitude: 35.1558664,
    longitude: 126.840949,
    rate: 4.2,
    type: "근린공원",
    detail:
      "https://map.naver.com/p/search/%EC%83%81%EB%AC%B4%EC%A1%B0%EA%B0%81%EA%B3%B5%EC%9B%90/place/16278610?c=15.00,0,0,0,dh&isCorrectAnswer=true",
  },
  {
    img: "https://postfiles.pstatic.net/MjAyMDEwMjhfNTYg/MDAxNjAzODYzMzg3NDU5.jfnunYzb7cTu-2NKC2aXMW85DdO3xmDlTvZ1pftqytMg.xAP2wE1AA0JP4BOULCXba8jQRZ4ts3fvEWLSWzpo8zYg.JPEG.gwangjuseogu/4.jpg?type=w966",
    name: "운천어린이공원",
    address: "광주 서구 치평로 67",
    latitude: 35.1531787,
    longitude: 126.846618,
    rate: 4.1,
    type: "공원",
    detail:
      "https://map.naver.com/p/search/%EC%9A%B4%EC%B2%9C%20%EC%96%B4%EB%A6%B0%EC%9D%B4%EA%B3%B5%EC%9B%90/place/1413729938?c=12.00,0,0,0,dh&placePath=%3Fentry%253Dbmp",
  },
  {
    img: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2F20151220_209%2Fgongju7000_14506062309628ar6n_JPEG%2FDSC01566.JPG%23776x1203",
    name: "송정공원",
    address: "광주 광산구 신촌동 산95-1",
    latitude: 35.1474599,
    longitude: 126.800714,
    rate: 4.5,
    type: "도시,테마공원",
    detail:
      "https://map.naver.com/p/search/%EC%86%A1%EC%A0%95%EA%B3%B5%EC%9B%90/place/19589193?c=15.00,0,0,0,dh&placePath=%3Fentry%253Dbmp",
  },
];

export default parks;
