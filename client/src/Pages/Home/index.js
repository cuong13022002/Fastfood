import HomeBanner from "../../Components/HomeBanner";
import Button from "@mui/material/Button";
import { IoIosArrowRoundForward } from "react-icons/io";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import ProductItem from "../../Components/ProductItem";
import HomeCat from "../../Components/HomeCat";

import { MyContext } from "../../App";
import { fetchDataFromApi } from "../../utils/api";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import CircularProgress from "@mui/material/CircularProgress";

import homeBannerPlaceholder from "../../assets/images/homeBannerPlaceholder.jpg";
import Banners from "../../Components/banners";
import { Link } from "react-router-dom";

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [productsData, setProductsData] = useState([]);
  const [selectedCat, setselectedCat] = useState();
  const [filterData, setFilterData] = useState([]);
  const [homeSlides, setHomeSlides] = useState([]);

  const [value, setValue] = React.useState(0);

  const [isLoading, setIsLoading] = useState(false);
  const [bannerList, setBannerList] = useState([]);
  const [randomCatProducts, setRandomCatProducts] = useState([]);
  const [homeSideBanners, setHomeSideBanners] = useState([]);
  const [homeBottomBanners, setHomeBottomBanners] = useState([]);

  const context = useContext(MyContext);
  const filterSlider = useRef();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const selectCat = (cat) => {
    setselectedCat(cat);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    context.setisHeaderFooterShow(true);
    setselectedCat(context.categoryData[0]?.name);

    const location = localStorage.getItem("location");

    if (location !== null && location !== "" && location !== undefined) {
      fetchDataFromApi(`/api/products/featured?location=${location}`).then(
        (res) => {
          setFeaturedProducts(res);
        }
      );

      fetchDataFromApi(
        `/api/products?page=1&perPage=16&location=${location}`
      ).then((res) => {
        setProductsData(res);
      });
    }

    fetchDataFromApi("/api/homeBanner").then((res) => {
      setHomeSlides(res);
    });

    fetchDataFromApi("/api/banners").then((res) => {
      setBannerList(res);
    });

    fetchDataFromApi("/api/homeSideBanners").then((res) => {
      setHomeSideBanners(res);
    });

    fetchDataFromApi("/api/homeBottomBanners").then((res) => {
      setHomeBottomBanners(res);
    });

    context.setEnableFilterTab(false);
    context.setIsBottomShow(true);
  }, []);

  useEffect(() => {
    if (context.categoryData[0] !== undefined) {
      setselectedCat(context.categoryData[0].name);
    }

    if (context.categoryData?.length !== 0) {
      const randomIndex = Math.floor(
        Math.random() * context.categoryData.length
      );

      fetchDataFromApi(
        `/api/products/catId?catId=${
          context.categoryData[randomIndex]?.id
        }&location=${localStorage.getItem("location")}`
      ).then((res) => {
        setRandomCatProducts({
          catName: context.categoryData[randomIndex]?.name,
          catId: context.categoryData[randomIndex]?.id,
          products: res?.products,
        });
      });
    }
  }, [context.categoryData]);

  useEffect(() => {
    if (selectedCat !== undefined) {
      setIsLoading(true);
      const location = localStorage.getItem("location");
      fetchDataFromApi(
        `/api/products/catName?catName=${selectedCat}&location=${location}`
      ).then((res) => {
        setFilterData(res.products);
        setIsLoading(false);
        filterSlider?.current?.swiper?.slideTo(0);
      });
    }
  }, [selectedCat]);

  return (
    <>
      {homeSlides?.length !== 0 ? (
        <HomeBanner data={homeSlides} />
      ) : (
        <div className="container mt-3">
          <div className="homeBannerSection">
            <img src={homeBannerPlaceholder} className="w-100" />
          </div>
        </div>
      )}

      {context.categoryData?.length !== 0 && (
        <HomeCat catData={context.categoryData} />
      )}

      <section className="homeProducts pb-0">
        <div className="container">
          <div className="row homeProductsRow">
            <div className="col-md-3">
              <div className="sticky">
                {homeSideBanners?.length !== 0 &&
                  homeSideBanners?.map((item, index) => {
                    return (
                      <div className="banner mb-3" key={index}>
                        {item?.subCatId !== null ? (
                          <Link
                            to={`/products/subCat/${item?.subCatId}`}
                            className="box"
                          >
                            <img
                              src={item?.images[0]}
                              className="w-100 transition"
                              alt="banner img"
                            />
                          </Link>
                        ) : (
                          <Link
                            to={`/products/category/${item?.catId}`}
                            className="box"
                          >
                            <img
                              src={item?.images[0]}
                              className="cursor w-100 transition"
                              alt="banner img"
                            />
                          </Link>
                        )}
                      </div>
                    );
                  })}
              </div>
            </div>

            <div className="col-md-9 productRow">
              <div className="d-flex align-items-center res-flex-column">
                <div className="info" style={{ width: "35%" }}>
                  <h3 className="mb-0 hd">Sản phẩm phổ biến</h3>
                  <p className="text-light text-sml mb-0">
                    Đừng bỏ lỡ các ưu đãi hiện tại cho đến cuối tháng 12.
                  </p>
                </div>

                <div
                  className="ml-auto d-flex align-items-center justify-content-end res-full"
                  style={{ width: "65%" }}
                >
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    className="filterTabs"
                  >
                    {context.categoryData?.map((item, index) => {
                      return (
                        <Tab
                          className="item"
                          label={item.name}
                          onClick={() => selectCat(item.name)}
                        />
                      );
                    })}
                  </Tabs>
                </div>
              </div>

              <div
                className="product_row w-100 mt-2"
                style={{
                  opacity: `${isLoading === true ? "0.5" : "1"}`,
                }}
              >
                {context.windowWidth > 992 ? (
                  <Swiper
                    ref={filterSlider}
                    slidesPerView={4}
                    spaceBetween={0}
                    navigation={true}
                    slidesPerGroup={context.windowWidth > 992 ? 3 : 1}
                    modules={[Navigation]}
                    className="mySwiper"
                  >
                    {filterData?.length !== 0 &&
                      filterData
                        ?.slice(0)
                        ?.reverse()
                        ?.map((item, index) => {
                          return (
                            <SwiperSlide key={index}>
                              <ProductItem item={item} />
                            </SwiperSlide>
                          );
                        })}

                    <SwiperSlide style={{ opacity: 0 }}>
                      <div className={`productItem`}></div>
                    </SwiperSlide>
                  </Swiper>
                ) : (
                  <div className="productScroller">
                    {filterData?.length !== 0 &&
                      filterData
                        ?.slice(0)
                        ?.reverse()
                        ?.map((item, index) => {
                          return <ProductItem item={item} key={index} />;
                        })}
                  </div>
                )}
              </div>

              <div className="d-flex align-items-center mt-2">
                <div className="info w-75">
                  <h3 className="mb-0 hd">Sản phẩm mới</h3>
                  <p className="text-light text-sml mb-0">
                    Sản phẩm mới với ưu đãi đặc biệt.
                  </p>
                </div>
              </div>

              {productsData?.products?.length === 0 && (
                <div
                  className="d-flex align-items-center justify-content-center"
                  style={{ minHeight: "300px" }}
                >
                  <CircularProgress />
                </div>
              )}

              <div className="product_row productRow2 w-100 mt-4 d-flex productScroller ml-0 mr-0">
                {productsData?.products?.length !== 0 &&
                  productsData?.products
                    ?.slice(0)
                    .reverse()
                    .map((item, index) => {
                      return <ProductItem key={index} item={item} />;
                    })}
              </div>

              {bannerList?.length !== 0 && (
                <Banners data={bannerList} col={3} />
              )}
            </div>
          </div>

          <div className="d-flex align-items-center mt-4">
            <div className="info">
              <h3 className="mb-0 hd">SẢn phẩm đặc trưng</h3>
              <p className="text-light text-sml mb-0">
                Đừng bỏ lỡ các ưu đãi hiện tại cho đến cuối tháng 12.
              </p>
            </div>
          </div>

          {featuredProducts?.length !== 0 && (
            <div className="product_row w-100 mt-2">
              {context.windowWidth > 992 ? (
                <Swiper
                  slidesPerView={4}
                  spaceBetween={0}
                  navigation={true}
                  slidesPerGroup={context.windowWidth > 992 ? 3 : 1}
                  modules={[Navigation]}
                  className="mySwiper"
                  breakpoints={{
                    300: {
                      slidesPerView: 1,
                      spaceBetween: 5,
                    },
                    400: {
                      slidesPerView: 2,
                      spaceBetween: 5,
                    },
                    600: {
                      slidesPerView: 3,
                      spaceBetween: 5,
                    },
                    750: {
                      slidesPerView: 5,
                      spaceBetween: 5,
                    },
                  }}
                >
                  {featuredProducts?.length !== 0 &&
                    featuredProducts
                      ?.slice(0)
                      ?.reverse()
                      ?.map((item, index) => {
                        return (
                          <SwiperSlide key={index}>
                            <ProductItem item={item} />
                          </SwiperSlide>
                        );
                      })}

                  <SwiperSlide style={{ opacity: 0 }}>
                    <div className={`productItem`}></div>
                  </SwiperSlide>
                </Swiper>
              ) : (
                <div className="productScroller">
                  {featuredProducts?.length !== 0 &&
                    featuredProducts
                      ?.slice(0)
                      ?.reverse()
                      ?.map((item, index) => {
                        return <ProductItem item={item} key={index} />;
                      })}
                </div>
              )}
            </div>
          )}

          {bannerList?.length !== 0 && (
            <Banners data={homeBottomBanners} col={3} />
          )}
        </div>
      </section>

      <div className="container">
        {randomCatProducts?.length !== 0 &&
          randomCatProducts?.products?.length !== 0 && (
            <>
              <div className="d-flex align-items-center mt-1 pr-3">
                <div className="info">
                  <h3 className="mb-0 hd">{randomCatProducts?.catName}</h3>
                  <p className="text-light text-sml mb-0">
                    Đừng bỏ lỡ các ưu đãi hiện tại cho đến cuối tháng 12.
                  </p>
                </div>

                <Link
                  to={`/products/category/${randomCatProducts?.catId}`}
                  className="ml-auto"
                >
                  <Button className="viewAllBtn">
                    Xem thêm <IoIosArrowRoundForward />
                  </Button>
                </Link>
              </div>

              {randomCatProducts?.length === 0 ? (
                <div
                  className="d-flex align-items-center justify-content-center"
                  style={{ minHeight: "300px" }}
                >
                  <CircularProgress />
                </div>
              ) : (
                <div className="product_row w-100 mt-2">
                  {context.windowWidth > 992 ? (
                    <Swiper
                      slidesPerView={5}
                      spaceBetween={0}
                      navigation={true}
                      slidesPerGroup={context.windowWidth > 992 ? 3 : 1}
                      modules={[Navigation]}
                      className="mySwiper"
                      breakpoints={{
                        300: {
                          slidesPerView: 1,
                          spaceBetween: 5,
                        },
                        400: {
                          slidesPerView: 2,
                          spaceBetween: 5,
                        },
                        600: {
                          slidesPerView: 4,
                          spaceBetween: 5,
                        },
                        750: {
                          slidesPerView: 5,
                          spaceBetween: 5,
                        },
                      }}
                    >
                      {randomCatProducts?.length !== 0 &&
                        randomCatProducts?.products
                          ?.slice(0)
                          ?.reverse()
                          ?.map((item, index) => {
                            return (
                              <SwiperSlide key={index}>
                                <ProductItem item={item} />
                              </SwiperSlide>
                            );
                          })}

                      <SwiperSlide style={{ opacity: 0 }}>
                        <div className={`productItem`}></div>
                      </SwiperSlide>
                    </Swiper>
                  ) : (
                    <div className="productScroller">
                      {randomCatProducts?.length !== 0 &&
                        randomCatProducts?.products
                          ?.slice(0)
                          ?.reverse()
                          ?.map((item, index) => {
                            return <ProductItem item={item} key={index} />;
                          })}
                    </div>
                  )}
                </div>
              )}
            </>
          )}
      </div>
      <div className="container">
       {/* <img className="w-100" src="https://klbtheme.com/bacola/wp-content/plugins/bacola-core/elementor/images/banner-box2.jpg"/> */}
      </div>
      <div className="container mt-3">
        <h3 className="mb-4">Tin tức mới nhất</h3>
        <div className="row">
          <div className="col-md-4  ">
            <Link to="#">
              <img
                src="https://file.hstatic.net/1000359458/article/gian-hang-nafoods-tai-hoi-thao-doanh-nhan-2024_f068535730fd4212bb60394d0bd8f04f.jpg"
                className="w-100 rounded-3"
              />

              <h4 className="mt-4">
              Sản Phẩm Nafoods Trưng Bày Tại Diễn Đàn Chuyển Hóa Lãnh Đạo & Tổ Chức
              </h4>
              <p>Tháng 12 2024, 3 Bình luận </p>
            </Link>
          </div>
          <div className="col-md-4  ">
            <Link to="#">
              <img
                src="https://file.hstatic.net/1000359458/article/cac-loai-hat-dieu_fe338176c56e4f998c35a85c1342e664.jpg"
                className="w-100 rounded-3"
              />
              <h4 className="mt-4">Hạt Điều Có Mấy Loại? Cách Phân Loại Hạt Điều Trên Thị Trường Hiện Nay?</h4>
              <p className="">Tháng 12 2024, 3 Bình luận </p>
            </Link>
          </div>
          <div className="col-md-4">
            <Link to="#">
              <img
                src="https://file.hstatic.net/1000359458/article/nafoods-tai-hoi-cho-du-lich-quoc-te-va-hoi-cho-qua-tang-qua-luu-niem_182547a3423842cdab1764b9791c3b90.png"
                className="w-100 rounded-3"
              />
              <h4 className="mt-4">
              Nafoods Trưng Bày Sản Phẩm Tại Hội Chợ Du Lịch Quốc Tế & Hội Chợ Triển Lãm Quốc Tế Quà Tặng, Quà Lưu Niệm
              </h4>
              <p>Tháng 12 2024, 3 Bình luận </p>
            </Link>
          </div>
          <div className="col-md-4">
            <Link to="#">
              <img
                src="https://file.hstatic.net/1000359458/article/nafoods-tai-hoi-cho-du-lich-quoc-te-va-hoi-cho-qua-tang-qua-luu-niem_182547a3423842cdab1764b9791c3b90.png"
                className="w-100 rounded-3"
              />
              <h4 className="mt-4">
              Nafoods Trưng Bày Sản Phẩm Tại Hội Chợ Du Lịch Quốc Tế & Hội Chợ Triển Lãm Quốc Tế Quà Tặng, Quà Lưu Niệm
              </h4>
              <p>Tháng 12 2024, 3 Bình luận </p>
            </Link>
          </div>
          <div className="col-md-4">
            <Link to="#">
              <img
                src="https://file.hstatic.net/1000359458/article/nafoods-tai-hoi-cho-du-lich-quoc-te-va-hoi-cho-qua-tang-qua-luu-niem_182547a3423842cdab1764b9791c3b90.png"
                className="w-100 rounded-3"
              />
              <h4 className="mt-4">
              Nafoods Trưng Bày Sản Phẩm Tại Hội Chợ Du Lịch Quốc Tế & Hội Chợ Triển Lãm Quốc Tế Quà Tặng, Quà Lưu Niệm
              </h4>
              <p>Tháng 12 2024, 3 Bình luận </p>
            </Link>
          </div>
          <div className="col-md-4">
            <Link to="#">
              <img
                src="https://file.hstatic.net/1000359458/article/nafoods-tai-hoi-cho-du-lich-quoc-te-va-hoi-cho-qua-tang-qua-luu-niem_182547a3423842cdab1764b9791c3b90.png"
                className="w-100 rounded-3"
              />
              <h4 className="mt-4">
              Nafoods Trưng Bày Sản Phẩm Tại Hội Chợ Du Lịch Quốc Tế & Hội Chợ Triển Lãm Quốc Tế Quà Tặng, Quà Lưu Niệm
              </h4>
              <p>Tháng 12 2024, 3 Bình luận </p>
            </Link>
          </div>
        </div>
      </div>
      
    </>
  );
};

export default Home;
