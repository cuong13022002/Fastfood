
import React, { useEffect, useRef } from "react";
import { emphasize, styled } from '@mui/material/styles';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import HomeIcon from '@mui/icons-material/Home';
import Button from '@mui/material/Button';

import { MdBrandingWatermark } from "react-icons/md";
import { BiSolidCategoryAlt } from "react-icons/bi";
import UserAvatarImgComponent from "../../components/userAvatarImg";
import Rating from '@mui/material/Rating';
import { FaReply } from "react-icons/fa";
import { MdFilterVintage } from "react-icons/md";
import { IoIosColorPalette } from "react-icons/io";
import { MdPhotoSizeSelectActual } from "react-icons/md";
import { IoIosPricetags } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";
import { MdRateReview } from "react-icons/md";
import { BsPatchCheckFill } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { fetchDataFromApi } from "../../utils/api";
import ProductZoom from '../../components/ProductZoom';

//breadcrumb code
const StyledBreadcrumb = styled(Chip)(({ theme }) => {
    const backgroundColor =
        theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[800];
    return {
        backgroundColor,
        height: theme.spacing(3),
        color: theme.palette.text.primary,
        fontWeight: theme.typography.fontWeightRegular,
        '&:hover, &:focus': {
            backgroundColor: emphasize(backgroundColor, 0.06),
        },
        '&:active': {
            boxShadow: theme.shadows[1],
            backgroundColor: emphasize(backgroundColor, 0.12),
        },
    };
});



const ProductDetails = () => {

    const [productData, setProductData] = useState([]);
    const [reviewsData, setreviewsData] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);



    useEffect(() => {
        window.scrollTo(0, 0);
        fetchDataFromApi(`/api/products/${id}`).then((res) => {
            setProductData(res);
        })

        fetchDataFromApi(`/api/productReviews?productId=${id}`).then((res) => {
            setreviewsData(res)
        })

    }, [id]);



    return (
        <>
            <div className="right-content w-100 productDetails">
                <div className="card shadow border-0 w-100 flex-row p-4">
                    <h5 className="mb-0">Xem sản phẩm</h5>
                    <Breadcrumbs aria-label="breadcrumb" className="ml-auto breadcrumbs_">
                        <StyledBreadcrumb
                            component="a"
                            href="#"
                            label="Dashboard"
                            icon={<HomeIcon fontSize="small" />}
                        />

                        <StyledBreadcrumb
                            label="Sản phẩm"
                            component="a"
                            href="#"
                        />
                        <StyledBreadcrumb
                            label="Xem sản phẩm"

                        />
                    </Breadcrumbs>
                </div>



                <div className='card productDetailsSEction'>
                    <div className='row'>
                        <div className='col-md-5'>
                            <div className="sliderWrapper pt-3 pb-3 pl-4 pr-4">
                                <h6 className="mb-4">Ảnh</h6>
                                <ProductZoom images={productData?.images} discount={productData?.discount} />
                            </div>
                        </div>

                        <div className='col-md-7'>
                            <div className=" pt-3 pb-3 pl-4 pr-4">
                                <h6 className="mb-4">
                                Chi tiết sản phẩm</h6>

                                <h4>{productData?.name}</h4>

                                <div className="productInfo mt-4">
                                    <div className="row mb-2">
                                        <div className="col-sm-3 d-flex align-items-center">
                                            <span className="icon"><MdBrandingWatermark /></span>
                                            <span className="name">Thuơng hiệu</span>
                                        </div>

                                        <div className="col-sm-9">

                                            :   <span>{productData?.brand}</span>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-sm-3 d-flex align-items-center">
                                            <span className="icon"><BiSolidCategoryAlt /></span>
                                            <span className="name">Danh mục</span>
                                        </div>

                                        <div className="col-sm-9">

                                            : <span>{productData?.catName}</span>
                                        </div>
                                    </div>

                                    {
                                        productData?.productRam?.length !== 0 &&
                                        <div className="row">
                                            <div className="col-sm-3 d-flex align-items-center">
                                                <span className="icon"><MdFilterVintage /></span>
                                                <span className="name">RAM</span>
                                            </div>

                                            <div className="col-sm-9">

                                                : <span>
                                                    <div className="row">
                                                        <ul className="list list-inline tags sml">

                                                            {
                                                                productData?.productRam?.map((item, index) => {
                                                                    return (
                                                                        <li className="list-inline-item">
                                                                            <span>{item}</span>
                                                                        </li>
                                                                    )
                                                                })
                                                            }


                                                        </ul>
                                                    </div>
                                                </span>
                                            </div>
                                        </div>
                                    }


                                    {
                                        productData?.size?.length !== 0 &&
                                        <div className="row">
                                            <div className="col-sm-3 d-flex align-items-center">
                                                <span className="icon"><MdFilterVintage /></span>
                                                <span className="name">SIZE</span>
                                            </div>

                                            <div className="col-sm-9">

                                                : <span>
                                                    <div className="row">
                                                        <ul className="list list-inline tags sml">

                                                            {
                                                                productData?.size?.map((item, index) => {
                                                                    return (
                                                                        <li className="list-inline-item">
                                                                            <span>{item}</span>
                                                                        </li>
                                                                    )
                                                                })
                                                            }


                                                        </ul>
                                                    </div>
                                                </span>
                                            </div>
                                        </div>
                                    }
                                    {
                                        productData?.productWeight?.length !== 0 &&
                                        <div className="row">
                                            <div className="col-sm-3 d-flex align-items-center">
                                                <span className="icon"><MdFilterVintage /></span>
                                                <span className="name">Trọng lượng</span>
                                            </div>

                                            <div className="col-sm-9">

                                                : <span>
                                                    <div className="row">
                                                        <ul className="list list-inline tags sml">

                                                            {
                                                                productData?.productWeight?.map((item, index) => {
                                                                    return (
                                                                        <li className="list-inline-item">
                                                                            <span>{item}</span>
                                                                        </li>
                                                                    )
                                                                })
                                                            }


                                                        </ul>
                                                    </div>
                                                </span>
                                            </div>
                                        </div>
                                    }


                                    <div className="row">
                                        <div className="col-sm-3 d-flex align-items-center">
                                            <span className="icon"><MdRateReview /></span>
                                            <span className="name">Bình luận</span>
                                        </div>

                                        <div className="col-sm-9">

                                            : <span>({reviewsData?.length}) Bình luận</span>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-sm-3 d-flex align-items-center">
                                            <span className="icon"><BsPatchCheckFill /></span>
                                            <span className="name">Ngày tạo</span>
                                        </div>

                                        <div className="col-sm-9">

                                            : <span>{productData?.dateCreated?.split("T")[0]}</span>
                                        </div>
                                    </div>




                                </div>

                            </div>

                        </div>
                    </div>


                    <div className="p-4">
                        <h6 className="mt-4 mb-3">Product Description</h6>
                        <p>{productData?.description}</p>


                        <br />


                        <br />


                        {
                            reviewsData?.length !== 0 &&
                            <>
                                <h6 className="mt-4 mb-4">Customer Reviews</h6>

                                <div className="reviewsSecrion">

                                    {
                                        reviewsData?.length !== 0 && reviewsData?.map((review, index) => {
                                            return (
                                                <div className="reviewsRow">
                                                    <div className="row">
                                                        <div className="col-sm-7 d-flex">
                                                            <div className="d-flex flex-column">
                                                                <div className="userInfo d-flex align-items-center mb-3">
                                                                    <UserAvatarImgComponent  lg={true} />

                                                                    <div className="info pl-3">
                                                                        <h6>{review?.customerName}</h6>
                                                                        <span>{review?.dateCreated?.split("T")[0]}</span>
                                                                    </div>

                                                                </div>


                                                                <Rating name="read-only" value={review?.customerRating} readOnly />


                                                            </div>
                                                        </div>


                                                        <p className="mt-3">{review?.review}</p>


                                                    </div>
                                                </div>
                                            )
                                        })
                                    }




                                </div>
                            </>
                        }



                    </div>

                </div>



            </div>






        </>
    )
}

export default ProductDetails;